import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of, throwError} from 'rxjs';
import {catchError, mergeMap, retry, tap} from 'rxjs/operators';

import {RouteUtils} from '../../shared/utils/route.utils';
import {SharedUtils} from '../../shared/utils/shared.utils';
import {EndpointUtils} from '../../shared/utils/endpoint.utils';
import {ConstantUtils} from '../../shared/utils/constant.utils';

import {TokenPayload} from '../../model/token-payload.model';
import {AuthCredential, AuthKey, AuthToken} from '../../model/credential.model';

import {IServerTimestamp} from '../../interface/server-timestamp.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,
              private http: HttpClient) {
  }

  private _date: IServerTimestamp;

  get date(): IServerTimestamp {
    return this._date;
  }

  get access$(): Observable<any> {
    if (this.authToken && this.payload) {
      return of(this.payload);
    } else if (this.authToken) {
      this.savePayload(this.authToken);
      return of(this.payload);
    } else {
      return of(false);
    }

  }


  get accessToken(): string {
    return this.authToken?.accessToken;
  }

  get user(): string {
    return this.tokenPayload.user?.login;
  }


  get payload(): TokenPayload {
    return SharedUtils.valueStorage(ConstantUtils.STORAGE.PAYLOAD, 'sessionStorage');
  }

  get isLoggedIn(): boolean {
    return this.payload !== null;
  }


  get logout$(): Observable<any> {
    return this.http.delete(new EndpointUtils().ApiBaseUrl.AUTH.LOGOUT).pipe(
      tap(() => {
        this.removeToken();
        this.removePayload();
        this.router.navigate([RouteUtils.CREDENCIAMENTO.CREDENCIAL, RouteUtils.CREDENCIAMENTO.LOGIN]);
      })
    );

  }

  get refresh$(): Observable<any> {
    let url;
    let headers = new HttpHeaders();
    url = new EndpointUtils().ApiBaseUrl.AUTH.REFRESH;
    headers = headers.append('Authorization', this.authToken.refreshToken);

    return this.http.get(url, {headers}).pipe(
      retry(3),
      catchError(error => throwError(error))
    );
  }


  private get tokenPayload(): TokenPayload {
    return new TokenPayload(this.payload);
  }

  private get authToken(): AuthToken {
    return SharedUtils.valueStorage(ConstantUtils.STORAGE.TOKEN, 'sessionStorage');
  }

  login$(credential: AuthCredential): Observable<any> {
    credential.username = this.normalizeDocument(credential.username);
    return this.authenticate$(credential);
  }

  authenticate$(credential: AuthCredential): Observable<any> {
    return this.http.post<AuthKey>(new EndpointUtils().ApiBaseUrl.AUTH.LOGIN, {
      usuario: credential.username,
      senha: credential.password
    }).pipe(
      mergeMap(key => this.authorize$(key.bearer)),
      catchError(error => throwError(error)),
      tap((token: AuthToken) => {
        if (token) {
          this.removeToken();
          this.saveToken(token);

          this.removePayload();
          this.savePayload(token);
        }
      })
    );
  }

  private authorize$(key: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', key);
    return this.http.get<any>(new EndpointUtils().ApiBaseUrl.AUTH.AUTORIZAR, {headers});
  }

  private normalizeDocument = (username: string) => {
    const text = username.replace(/\D/gi, '');
    if (text.length === 11 || text.length === 14) {
      return text;
    }
    return username;
  };

  private savePayload = (tokens: any) => {
    SharedUtils.storage(ConstantUtils.STORAGE.PAYLOAD, tokens);
  };

  private removePayload = () => {
    sessionStorage.removeItem(ConstantUtils.STORAGE.PAYLOAD);
  };

  private saveToken = (token: AuthToken) => {
    SharedUtils.storage(ConstantUtils.STORAGE.TOKEN, token);
  };

  private removeToken = () => {
    sessionStorage.removeItem(ConstantUtils.STORAGE.TOKEN);
  };


}
