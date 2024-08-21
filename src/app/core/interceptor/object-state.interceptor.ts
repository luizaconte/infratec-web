import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';

import {ObjectStateType} from '../../enum/type/object-state-type.enum';

@Injectable()
export class ObjectStateInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(
      request.method === 'PUT' && request.body ? request.clone({body: this.removeUnmodified(request.body)}) : request
    );
  }

  private removeUnmodified(body) {
    for (const i in body) {
      if (Array.isArray(body[i])) {
        body[i].forEach((child) => {
          for (const j in child) {
            if (Array.isArray(child[j])) {
              this.removeUnmodified(child);
            }
          }
        });
        body[i] = body[i].filter((child) => child.object_state !== ObjectStateType.UNMODIFIED || child.objectState !== ObjectStateType.UNMODIFIED);
      }
    }
    return body;
  }
}
