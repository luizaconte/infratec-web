import {Type} from '@angular/core';

import {HttpParams} from '@angular/common/http';

import {FilterField} from '../../../model/filterable.model';

import {ICustomButtonOption, ICustomSummary} from '../../../shared/component/data-grid/data-grid.interface';

import {ExpressionLanguage} from '../../../enum/expression-language.enum';
import {Sortable} from '../../../model/sortable.model';

export interface IBase {
  columns: Array<any>;
  columnId?: string | Array<{ path?: string, id: string }>;
  campoDataFim?: string;
  columnOrder?: string;
  setId?: boolean;
  autoExpandAll?: boolean;
  customSummary?: ICustomSummary;
  buttons?: {
    new?: boolean | Function;
    edit?: boolean | Function;
    delete?: boolean | Function;
    view?: boolean | Function;
    addButtons?: Array<ICustomButtonOption>;
    addFunction?: { onClick: Function, items: unknown[] };
  };
  treeListOptions?: {
    key: string;
    parent: string;
    rootValue: any;
  };
  filterClient?: IFilterClient;
}

export interface IFilterClient {
  field: any;
  value: any;
}

export interface IParams {
  filterBase?: Array<IFilterBase> | Type<any>;
  editOnly?: boolean;
  currentCrumb?: string;
  crumb?: Array<string>;
  customCadastro?: { url?: string, model?: object };
  value?: any;
}

export interface IToolbarButton {
  buttons?: {
    add?: boolean;
    export?: boolean;
    history?: boolean;
  };
}

export interface IFilterValue {
  filterComponent: string;
  filterField: Array<FilterField>;
  filterParam: HttpParams | any;
  pageIndex?: number;
  pageSize?: number;
  sort?: Sortable;
}

export interface IFilterBase {
  text: string;
  fieldName: string;
  expression: ExpressionLanguage;
  editorType: 'dxTextBox' | 'dxNumberBox' | 'dxDateBox' | 'dxSelectBox';
  colSpan: number;
  items?: Array<any>;
  displayExpr?: string;
}
