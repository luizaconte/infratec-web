import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HttpParams} from '@angular/common/http';

import {Sortable} from '../../../../model/sortable.model';
import {Filterable} from '../../../../model/filterable.model';

import {IBase} from '../cadastro-base.interface';
import {IPage} from '../../../../interface/page.interface';
import {IIHandlerAction} from '../../../../interface/handler-actions.interface';

@Component({
  selector: 'infratec-base-cadastro',
  template: ''
})
export class CadastroBaseComponent {

  @Input()
  listMode: boolean = true;

  @Input()
  enableHandler: boolean = true;

  @Input()
  callback: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  afterAction: EventEmitter<IIHandlerAction> = new EventEmitter<IIHandlerAction>();

  @Input()
  beforeAction: EventEmitter<IIHandlerAction> = new EventEmitter<IIHandlerAction>();

  @Input()
  changeAction: EventEmitter<IIHandlerAction> = new EventEmitter<IIHandlerAction>();

  @Output()
  enableHandlerChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  dadosBase: IBase;
  cadastroBase: ICadastroBase;

  showCadastroDialog = false;

  onEnableHandlerChange(handler: boolean): void {
    this.enableHandler = handler;
    this.enableHandlerChange.emit(this.enableHandler);
  }
}

export interface ICadastroBase {
  page: IPage;

  params?: HttpParams;
  sortable?: Sortable;
  firstRequest?: boolean;
  filterable?: Filterable;
  useParentFilter?: boolean;
  useUrlWithoutId?: boolean;
  showRowDragging?: boolean;
  customCadastro?: INew | IEdit;
  componentBaseType?: ComponentBaseType;
  disableFieldsFilter?: string[];
}

export interface INew {
  new: boolean;
  modelValues?: unknown;
}

export interface IEdit {
  id: number | string;
  view?: Boolean;
}

export enum ComponentBaseType {
  GRID,
  TREE_LIST
}
