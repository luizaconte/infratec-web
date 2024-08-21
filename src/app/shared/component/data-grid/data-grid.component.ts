import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {lastValueFrom} from 'rxjs';

import 'jspdf-autotable';
import {SharedUtils} from '../../utils/shared.utils';
import {ConstantUtils} from '../../utils/constant.utils';
import {NavigationUtils} from '../../utils/navigation.utils';

import {Pageable} from '../../../model/pageable.model';
import {Sortable, SortField} from '../../../model/sortable.model';
import {Filterable, FilterField} from '../../../model/filterable.model';

import {TransformTemplatePipe} from '../../pipes/transform-template.pipe';
import {ExpressionLanguage} from '../../../enum/expression-language.enum';

import DataSource from 'devextreme/data/data_source';
import {DxDataGridComponent} from 'devextreme-angular/ui/data-grid';
import {ScrollMode, SelectAllMode, SingleMultipleOrNone} from 'devextreme/common';
import {Column, RowDblClickEvent, SelectionChangedEvent} from 'devextreme/ui/data_grid';

import {INavigation} from '../../../interface/navigation.interface';
import {IOptionsRequest} from '../../../interface/options-request.interface';
import {IConfigTreeView, ICustomButtonOption, ICustomSummary} from './data-grid.interface';

import {DataGridService} from './data-grid.service';
import {RequestService} from '../../../core/services/request.service';
import {DataViewPipe} from '../../pipes/data-view.pipe';
import {ComponentBaseType} from "../../../layout/cadastro-base-layout/cadastro/cadastro-base/cadastro-base.component";
import {DxTreeListComponent} from "devextreme-angular";
import {IFilterClient} from "../../../layout/cadastro-base-layout/cadastro/cadastro-base.interface";

@Component({
  selector: 'infratec-data-grid',
  templateUrl: './data-grid.component.html'
})
export class DataGridComponent implements OnInit, OnChanges {

  @ViewChild(DxDataGridComponent)
  protected dataGrid: DxDataGridComponent;

  @ViewChild(DxTreeListComponent)
  protected dataTreeList: DxTreeListComponent;

  @Input()
  columns: any[];

  @Input()
  protected url: string;

  @Input()
  fileExportName: string;

  @Input()
  filterable: Filterable;

  @Input()
  protected keyExpr: string;

  @Input()
  protected pageSize: number;

  @Input()
  protected componentBaseType: ComponentBaseType = ComponentBaseType.GRID;

  @Input()
  protected pageIndex: number;

  @Input()
  protected showPager: boolean;

  @Input()
  protected sortable: Sortable;

  @Input()
  protected fieldDataFim: string;

  @Input()
  protected firstRequest: boolean;

  @Input()
  protected allowUpdating: boolean;

  @Input()
  protected showFilterRow: boolean;

  @Input()
  dataSource: DataSource | unknown[];

  @Input()
  protected showPaging: boolean = true;

  @Input()
  protected searchPanel: boolean = true;

  @Input()
  protected columnFixing: boolean = true;

  @Input()
  protected selectAllMode: SelectAllMode;

  @Input()
  protected autoExpandAll: boolean = true;

  @Input()
  protected selectOnlyChildNodes: boolean;

  @Input()
  protected customSummary: ICustomSummary;

  @Input()
  protected allowSelectAll: boolean = true;

  @Input()
  protected configTreeView: IConfigTreeView;

  @Input()
  protected filterClient: IFilterClient;

  @Input()
  protected optionsRequest: IOptionsRequest;

  @Input()
  protected onReorder: EventEmitter<unknown>;

  @Input()
  protected showCustomButtons: boolean = true;

  @Input()
  selectionMode: SingleMultipleOrNone = 'none';

  @Input()
  allowedPageSizes: Array<number> = [10, 20, 50];

  @Input()
  protected rowPrepared: EventEmitter<unknown>;

  @Input()
  protected rowAlternationEnabled: boolean = true;

  @Input()
  protected executeBeforeLoadDataSource: Function;

  @Input()
  protected onExportChanged: EventEmitter<unknown>;

  @Input()
  protected initializeRowSelected: boolean = false;

  @Input()
  protected scrollingMode: ScrollMode = 'standard';

  @Input()
  protected customButtonOption: ICustomButtonOption[] = new Array<ICustomButtonOption>();

  @Input()
  protected focusedRowEnabled: boolean = false;

  @Output()
  protected rowClick: EventEmitter<unknown> = new EventEmitter<unknown>();

  @Output()
  protected cellClick: EventEmitter<unknown> = new EventEmitter<unknown>();

  @Output()
  protected rowUpdating: EventEmitter<unknown> = new EventEmitter<unknown>();

  @Output()
  protected contentReady: EventEmitter<unknown> = new EventEmitter<unknown>();

  @Output()
  protected cellPrepared: EventEmitter<unknown> = new EventEmitter<unknown>();

  @Output()
  protected dataSourceChange: EventEmitter<unknown> = new EventEmitter<unknown>();

  @Output()
  protected contextMenuPreparing: EventEmitter<unknown> = new EventEmitter<unknown>();

  @Output()
  protected rowDblClick: EventEmitter<RowDblClickEvent> = new EventEmitter<RowDblClickEvent>();

  @Output()
  protected selectionChanged: EventEmitter<SelectionChangedEvent> = new EventEmitter<SelectionChangedEvent>();

  @Output()
  protected sizeOrIndexPageChange: EventEmitter<{ size: number; index: number }> = new EventEmitter<{
    size: number;
    index: number
  }>();

  protected page: Pageable;


  private _focusedRow: Object;

  private _totalCount: number = 0;

  protected usePagination: boolean = true;

  protected serverOperation: boolean = true;

  protected customColumn: { dataField, enum, customDataField?, customReplaceSort? };

  protected componentBaseTypes = ComponentBaseType;

  protected isGrid: boolean;

  constructor(private requestService: RequestService,
              private dataViewService: DataGridService) {
    this.showFilterRow = false;
    this.selectAllMode = 'page';
  }

  ngOnChanges(): void {
    this.configCustomizelookup();
  }

  ngOnInit(): void {
    this.isGrid = this.componentBaseType === ComponentBaseType.GRID || this.componentBaseType === undefined;
    this.configureButtons();
    if (this.url) {
      this.usePagination = !this.columns?.some((column) => column.hasOwnProperty('groupIndex'));
      this.showPager = this.usePagination;
      this.page = new Pageable();
      if (this.isGrid) {
        this.loadIndexOrSizePage();
        if (Number.isInteger(this.pageSize)) {
          this.page.pageSize = this.pageSize;
        }
        if (Number.isInteger(this.pageIndex)) {
          this.page.pageIndex = this.pageIndex;
        }
      }
      this.isFistRequest ? this.loadDataSource() : this.emptyDataSource();
    }

    this.configCustomizelookup();

    if (this.columns?.length && !this.isGrid) {
      this.columns.forEach(({type, buttons}) => {
        if (type && type === 'buttons') {
          buttons?.forEach(button => button.visible = (event) => this.visibleChange(event));
        }
      });
    }

    this.onExportChanged?.subscribe(event => this.exportDataGrid(event));
  }

  onContentReadyHandler(event: any): void {
    if (this.initializeRowSelected && this.selectionMode === 'single') {
      event.component.selectRowsByIndexes([this.dataGrid?.columns?.find((column: any) => column.groupIndex) ? 1 : 0]);
      if (event.component.getSelectedRowsData().length) {
        this.rowClick.emit(event.component.getSelectedRowsData()[0]);
      }
    }
    this.contentReady.emit(event);
  }

  onPagingChange(event: any): void {
    if (this.page) {
      this.page.pageSize = event.pageSize;
      this.page.pageIndex = event.pageIndex;
      this.reload();
    }
  }

  onRowUpdating(event): void {
    this.rowUpdating.emit(event);
  }

  onRowPrepared(event: any): void {
    for (const object in event.data) {
      if (object === this.fieldDataFim) {
        if (event.data[object]) {
          event.rowElement.style.color = 'red';
        }
      }
    }

    if (this.rowPrepared) {
      this.rowPrepared.emit(event);
    }
  }

  onCellPrepared(event: unknown): void {
    if (this.cellPrepared) {
      this.cellPrepared.emit(event);
    }
  }

  onCellClick(event: any): void {
    this.customColumn = (event.rowType === 'header' && event.column.lookup);
    if (this.customColumn) {
      this.customColumn = {
        dataField: event.column.dataField,
        enum: event.column.lookup.dataSource,
        customDataField: event.column.lookup.customExpr,
        customReplaceSort: event.column.lookup.customReplaceSort
      };
    }
    this.cellClick.emit(event);
  }

  onRowClick(event: unknown): void {
    this.rowClick.emit(event);
    this._focusedRow = event['data'];
  }

  onRowDblClick(event: any): void {
    if (this.selectionMode === 'single') {
      this.rowDblClick.emit(event);
    }
  }

  onEditorPreparing(event: any) {
    if (event.parentType == 'headerRow' && event.command == 'select' && !this.allowSelectAll) {
      event.editorElement.remove();
    }
  }

  onSelectionChanged(event: unknown): void {
    const changedEvent: SelectionChangedEvent = event as SelectionChangedEvent;
    if (this.selectionChanged) {
      if (!this.selectOnlyChildNodes) {
        this.dataViewService.rowSelected = changedEvent.component.getSelectedRowsData()[0];
        this.selectionChanged.emit(changedEvent);
      } else if (changedEvent.component.getSelectedRowKeys()[0]) {
        const rowSelected = this.findItemDataSource(changedEvent.component.getSelectedRowKeys()[0], this.dataSourceValue);
        if (rowSelected && (!rowSelected.children || rowSelected.children.length)) {
          this.deselectRows(changedEvent.component.getSelectedRowKeys()[0]);
        } else {
          this.dataViewService.rowSelected = changedEvent.component.getSelectedRowsData()[0];
          this.selectionChanged.emit(changedEvent);
        }
      }
    }
  }

  private visibleChange(event: any): unknown {
    const columnId = this.configTreeView.columnId;
    return typeof columnId !== 'object' ? !!event.row.data[columnId] : !!event.row.data[columnId[0].id];
  }

  onContextMenuPreparing(event: any): void {
    this.contextMenuPreparing.emit(event);
  }

  customizeLookup(columns: any[]): void {
    columns.forEach(column => {
      if (column.lookup) {
        column.sortingMethod = (current, previous) => {
          current = column.lookup.dataSource.find((item: any) => item.type === current)?.description ?? '';
          previous = column.lookup.dataSource.find((item: any) => item.type === previous)?.description ?? '';
          return current.localeCompare(previous);
        };
        if (column.lookup.transformPipe) {
          column.cellTemplate = (element, info) => new TransformTemplatePipe()[column.lookup.transformPipe](element, info, column.lookup.dataSource);
        } else {
          column.cellTemplate = (element, info) => new TransformTemplatePipe().transform(element, info, column.lookup.dataSource);
        }
      } else if (column.dataType === 'string') {
        column.sortingMethod = (current, previous) => (current ?? '').localeCompare((previous ?? ''));
      }
      if (column.columns) {
        this.customizeLookup(column.columns);
      }
    });
  }

  emptyDataSource(): void {
    if (!this.isFistRequest) {
      this.dataSource = new DataSource(({load: () => new Promise((resolve) => resolve({data: [], totalCount: 0}))}));
    }
  }

  rowIntercept(rowDataView: Function, args: 'disable' | 'visible'): boolean {
    return !this.dataSourceValue?.length ? args === 'disable' : rowDataView(this.selectedRowsData[0]);
  }

  loadDataSource(clearFilters: boolean = false): void {
    this.dataSource = new DataSource({
      load: (options) => {
        if (!this.url) {
          return {data: [], totalCount: 0};
        }
        this.page.removeLimitOffset = !this.isGrid || !this.usePagination;
        this.page.sort = this.parseSort(options.sort);
        if (this.sortable) {
          this.sortable.query?.forEach((item: SortField) => this.page.sort.query.push(item));
        }
        this.page.filter = this.parseFilter(options.filter);
        if (this.filterable) {
          this.filterable.query.forEach((item: FilterField) => this.page.filter.add(item));
        }
        if (this.filterable?.queryParam) {
          this.page.queryParam = this.filterable.queryParam;
        }
        this.addFiltersNavigation();
        return this.lastValueFrom
          .catch(() => ({data: [], totalCount: 0}))
          .finally(() => {
            this.dataSourceChange.emit();
            this.configIndexOrSizePage(clearFilters);
          });
      }
    });
  }


  reload(): void {
    this[this.componentType].instance.getDataSource()?.reload();
  }

  refresh(): void {
    this[this.componentType].instance.refresh();
  }

  repaint(): void {
    this[this.componentType].instance.repaint();
  }

  clearSelection(): void {
    this[this.componentType].instance.clearSelection();
  }

  clearSorting(): void {
    this[this.componentType].instance.clearSorting();
  }

  selectRowsByIndexes(indexes: number[]): void {
    this[this.componentType].instance.selectRowsByIndexes(indexes);
  }

  cellValue(rowIndex: number, visibleColumnIndex: number, value: any): void {
    this[this.componentType].instance.cellValue(rowIndex, visibleColumnIndex, value);
  }

  saveEditData(): void {
    this[this.componentType].instance.saveEditData();
  }

  selectAll(): void {
    this[this.componentType].instance.selectAll();
  }

  deselectAll(): void {
    this[this.componentType].instance.deselectAll();
  }

  deselectRows<T>(keys: T[]): void {
    this[this.componentType].instance.deselectRows(keys);
  }

  clearFilters(): void {
    this[this.componentType]?.instance.clearFilter();
  }

  disableButtons(): void {
    const index: number = this.columns.findIndex(item => item.type === 'buttons');
    if (index !== -1) {
      this.columns.splice(index, 1);
    }
  }

  private get componentType(): string {
    return this.isGrid ? 'dataGrid' : 'dataTreeList';
  }

  filter(filters: unknown[]): void {
    this.dataGrid.instance.filter(filters);
  }

  fullUrl(fullUrl: boolean = true): string {
    if (fullUrl) {
      return this.page ? this.page.createUrl(this.url) : this.url;
    }
    return this.url;
  }

  reorder = (event): void => {
    this.onReorder.emit(event);
  };

  set selectedRowKeys(value: any[]) {
    this[this.componentType].instance.selectedRowKeys = value;
  }

  get getColumns(): any[] {
    return this[this.componentType].instance.columns;
  }

  get visibleColumns(): Column[] {
    return this[this.componentType].instance.getVisibleColumns();
  }

  get selectedRowKeys(): any[] {
    return this[this.componentType].instance.selectedRowKeys;
  }

  get dataSourceValue(): any[] {
    return this[this.componentType].instance.getDataSource()?.items();
  }

  get isFistRequest(): boolean {
    return this.firstRequest === true || this.firstRequest === undefined;
  }

  get getDataSource(): DataSource {
    return this[this.componentType].instance.getDataSource();
  }

  get selectedRowsData(): any[] {
    return this[this.componentType]?.instance.getSelectedRowsData();
  }

  get totalCount(): number {
    return this._totalCount;
  }

  get totalPageCount(): number {
    return this.dataGrid?.instance.pageCount();
  }

  get focusedRow(): Object {
    return this._focusedRow ?? this.selectedRowsData[this.selectedRowsData.length - 1];
  }

  private get lastValueFrom(): Promise<any> {
    return lastValueFrom(this.requestService.pageResult$(this.url, this.page, this.optionsRequest)).then(data => {
      if (data.result) {
        this._totalCount = data.count;
        if (data.result.length === 0 && this.page.pageIndex >= 1) {
          this.page.pageIndex = this.page.pageIndex - 1;
        }
        if (this.filterClient && this.filterClient.field && this.filterClient.value) {
          data.result = data.result.filter(item => item[this.filterClient.field] == this.filterClient.value);
        }
        return {data: data.result, totalCount: data.count};
      } else if (data.data) {
        this._totalCount = data.records;

        if (data.data.length === 0 && this.page.pageIndex >= 1) {
          this.page.pageIndex = this.page.pageIndex - 1;
        }
        if (this.filterClient && this.filterClient.field && this.filterClient.value) {
          data.data = data.data.filter(item => item[this.filterClient.field] == this.filterClient.value);
        }
        return {data: data.data, totalCount: data.records};
      } else {
        this.serverOperation = false;
        if (this.filterClient && this.filterClient.field && this.filterClient.value) {
          data.result = data.result.filter(item => item[this.filterClient.field] == this.filterClient.value);
        }
        return {data: data.result, totalCount: data.result.length};
      }
    });
  }

  private addFiltersNavigation(): void {
    const navigation: INavigation = NavigationUtils.navigation(this.fileExportName);
    if (this.isFistRequest && navigation?.filterable?._query?.length) {
      navigation.filterable._query.forEach((item: any) => this.page.filter.add(new FilterField(item._name, item._expression, item._filterName, item._value)));
    }
  }

  private parseSort(sorts: any[] | any): Sortable {
    const sortable: Sortable = new Sortable();
    if (!sorts) {
      return sortable;
    }
    sorts.forEach((sort) => sortable.query.push({...sort}));
    return sortable;
  }

  private parseFilter(filters: unknown[]): Filterable {
    const filterable: Filterable = new Filterable();
    if (!filters || filters.length === 0) {
      return filterable;
    }
    const filterFields: FilterField[] = [];
    if (!Array.isArray(filters[0])) {
      filterFields.push(this.buildFilter(filters[0], filters[1], filters[2]));
    } else {
      filters.filter((item) => Array.isArray(item)).forEach(item => filterFields.push(this.buildFilter(item[0], item[1], item[2])));
    }
    filterable.query = filterFields;
    return filterable;
  }

  private configCustomizelookup(): void {
    if (this.columns?.length) {
      this.customizeLookup(this.columns);
    }
  }

  private buildFilter(column, operator, value): FilterField {
    const type: string = Object.keys(ExpressionLanguage).filter((item: string) => ExpressionLanguage[item].operator === operator)[0];
    return new FilterField(column, ExpressionLanguage[type], null, value);
  }

  private loadIndexOrSizePage(): void {
    const navigations: INavigation[] = JSON.parse(localStorage.getItem(ConstantUtils.STORAGE.NAVIGATION)) ?? [] as INavigation[];
    const navigation: INavigation = navigations.find((_navigation: INavigation) => _navigation.componentName === this.fileExportName);
    if (navigation) {
      this.pageIndex = navigation.pageIndex;
      this.pageSize = navigation.pageSize;
    }
  }

  private configIndexOrSizePage(clearFilters: boolean = false): void {
    const index: number = clearFilters ? 0 : this.page.pageIndex;
    const size: number = clearFilters ? 20 : this.page.pageSize;
    setTimeout(() => {
      this.pageIndex = index;
      this.pageSize = size;
      this.sizeOrIndexPageChange.emit({index, size});
      const navigation: INavigation = NavigationUtils.navigation(this.fileExportName);
      if (navigation) {
        const index: number = navigation.items.findIndex((item: string) => item === NavigationUtils.current);
        if (index >= 0) {
          this.selectRowsByIndexes([index]);
        }
      }
    });
  }

  private customSort(data: any, ordinationType: boolean): unknown[] {
    data = this.replaceData(data, true);
    data.sort((a, b) => this.sortType(a[this.customColumn.dataField], b[this.customColumn.dataField], ordinationType));
    data = this.replaceData(data, false);
    return data;
  }

  private sortType(current, previous, ordinationType?): number {
    if (!SharedUtils.isValueEmpty(previous) && !SharedUtils.isValueEmpty(current)) {
      return ordinationType ? previous.localeCompare(current) : current.localeCompare(previous);
    }
  }

  private replaceData(data, typeToDescription: boolean): unknown[] {
    data.forEach(item => {
      this.customColumn.enum.find(foundItem => {
        if (this.customColumn.customReplaceSort) {
          new DataViewPipe()[this.customColumn.customReplaceSort](foundItem, item, this.customColumn, typeToDescription);
        } else {
          if (item[this.customColumn.dataField] === (typeToDescription ? foundItem.type : foundItem.description)) {
            item[this.customColumn.dataField] = typeToDescription ? foundItem.description : foundItem.type;
          }
        }
      });
    });
    return data;
  }

  private configureButtons(): void {
    if (this.fileExportName && this.fileExportName.split(' ').length > 1) {
      this.fileExportName = this.fileExportName.replace(/ /g, '_');
    }
    this.customButtonOption?.forEach((customButton: ICustomButtonOption) => customButton.options.hint = customButton.options.hint ?? customButton.options.text);
  }

  private exportDataGrid(event): void {
    this.dataViewService.export(event.itemId, {
      dataGrid: this.dataGrid,
      fileExportName: this.fileExportName,
      url: this.url,
      sortable: this.sortable,
      filterable: this.filterable
    });
  }

  private findItemDataSource(key: any, dataSourceValue: any[]): any {
    let row: any;
    dataSourceValue?.forEach(item => {
      if (item.key === key) {
        row = item;
      } else if (item.children?.length) {
        row = row ?? this.findItemDataSource(key, item.children);
      }
    });
    return row;
  }
}


