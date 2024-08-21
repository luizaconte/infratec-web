import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map, shareReplay, switchMap} from 'rxjs/operators';

import {AuthService} from './core/services/auth.service';

import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  private readonly configUrl = '/config.json';

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  get loadConfiguration$(): Observable<any> {
    if (environment.production) {
      return this.http.get(this.configUrl).pipe(
        shareReplay(1),
        map((config: any) => {
          environment.baseUrl = config.baseUrl;
          environment.authUrl = config.authUrl;
        }),
        switchMap(() => {
          return this.authService.access$;
        })
      )
    } else {
      return this.authService.access$;
    }
  }
}
