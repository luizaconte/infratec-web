import {DxDataGridComponent} from 'devextreme-angular/ui/data-grid';

import {Filterable} from '../../../model/filterable.model';
import {Sortable} from '../../../model/sortable.model';
import {ButtonAction} from '../../../enum/button-action.enum';

export interface IExportDataGrid {
  dataGrid: DxDataGridComponent;
  fileExportName: string;
  url?: string;
  filterable?: Filterable;
  sortable?: Sortable;
}

export interface ICustomSummary {
  totalItems: Array<{
    column: string;
    summaryType: string;
    customizeText?: Function;
    valueFormat?: string | { type: string, precision: number }
  }>;
}

export interface ICustomButtonOption {
  nameAction?: string;
  widget: 'dxAutocomplete' | 'dxButton' | 'dxCheckBox' | 'dxDateBox' | 'dxMenu' | 'dxSelectBox' | 'dxTabs' | 'dxTextBox' | 'dxButtonGroup' | 'dxDropDownButton';
  location?: 'before' | 'after';
  locateInMenu?: 'always' | 'auto' | 'never';
  options: {
    cssClass?: string;
    stylingMode?: string;
    icon?: string;
    type?: string;
    items?: string[] | unknown;
    text?: string;
    onItemClick?: Function;
    onItemRendered?: Function;
    onClick?: Function;
    onValueChanged?: Function;
    width?: number;
    visible?: boolean | Function;
    disabled?: boolean | Function;
    value?: unknown;
    elementAttr?: unknown;
    hint?: string;
    buttonAction?: ButtonAction;
    orientation?: 'vertical' | 'horizontal'
    dropDownOptions?: unknown;
    onInitialized?: Function,
  };
}

export interface IConfigTreeView {
  rootValue?: unknown;
  hasItemsExpr?: string;
  parentIdExpr?: string;
  columnId?: string | {
    path?: string,
    id: string
  }[];
}
