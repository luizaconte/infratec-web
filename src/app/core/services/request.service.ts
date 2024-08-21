import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {Filterable} from '../../model/filterable.model';
import {Pageable} from '../../model/pageable.model';
import {PageResult} from '../../model/page-result.model';
import {IOptionsRequest} from '../../interface/options-request.interface';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) {
  }

  getById$<T>(id: any, url?: string, options?: any): Observable<T | any> {
    return this.http.get<T>(`${url}/${id}`, options);
  }

  get$<T>(filterOrUrl: string | Filterable, url?: string, options?: any): Observable<T | any> {
    const _url = ((typeof filterOrUrl !== 'string') && (typeof filterOrUrl !== 'undefined')) ? filterOrUrl.createUrl(url) : filterOrUrl;
    return this.http.get<T>(_url, options);
  }

  post$<T>(body: any, url?: string, options?: any): Observable<T | any> {
    return this.http.post<T>(url, body, options);
  }

  put$<T>(body: any, url?: string, options?: any): Observable<T | any> {
    return this.http.put<T>(url, body, options);
  }

  patch$<T>(body: any, url?: string, options?: any): Observable<T | any> {
    return this.http.patch<T>(url, body, options);
  }

  delete$(id: number, url?: string, options?: any): Observable<any> {
    return this.http.request('delete', id ? `${url}/${id}` : url, options);
  }

  pageResult$<T>(url: string, pageable?: Pageable, opt?: IOptionsRequest): Observable<PageResult<T> | any> {
    return this.http.get<T>(pageable ? pageable.createUrl(url) : url, opt?.options);
  }
}
