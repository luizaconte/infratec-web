import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, switchMap, take} from 'rxjs/operators';

import {AuthService} from '../services/auth.service';

import {RouteUtils} from '../../shared/utils/route.utils';
import {WhiteListUtils} from '../../shared/utils/white-list.utils';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private readonly blackList = [];

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (WhiteListUtils.isWhiteListed(req, this.blackList)) {
      let headers = req.headers;
      if (this.authService.accessToken && !req.url.includes('refresh')) {
        headers = headers.append('Authorization', `Bearer ${this.authService.accessToken}`);
      }

      const authRequest = req.clone({
        withCredentials: true,
        headers: headers
      });

      return next.handle(authRequest).pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 403 && req.url.includes('refresh')) {
            return this.authService.logout$;
          } else if (error instanceof HttpErrorResponse && error.status === 403 && !req.url.includes('cookie')) {
            return this.handle403Error(req, next);
          } else {
            return throwError(error);
          }
        })
      );
    }
    return next.handle(req);
  }

  private handle403Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refresh$.pipe(
        switchMap(() => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(true);
          return next.handle(request.clone({
            withCredentials: true
          }));
        }),
        catchError(error => {
          this.router.navigate([RouteUtils.INICIO]);
          return throwError(error);
        })
      );

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(() => {
          return next.handle(request.clone({
            withCredentials: true
          }));
        }));
    }
  }

}
