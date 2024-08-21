import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';

import {IParams} from './cadastro-base.interface';

@Injectable()
export class CadastroBaseService {

  private _reorder: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _params: BehaviorSubject<IParams> = new BehaviorSubject<IParams>(null);
  private _refreshDataGrid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  set reorder(data: any) {
    this._reorder.next(data);
  }

  get refreshDataGrid$(): Observable<boolean> {
    return this._refreshDataGrid.asObservable();
  }

  get params$(): Observable<IParams> {
    return this._params.asObservable();
  }

  get paramsValue(): IParams {
    return this._params.getValue();
  }

  set params(params: IParams) {
    this._params.next(params);
  }

  set refreshDataGrid$(refresh: boolean) {
    this._refreshDataGrid.next(refresh);
  }
}
