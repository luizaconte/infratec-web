import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, UrlSegment} from '@angular/router';

import {finalize} from 'rxjs/operators';

import {IBase, IParams} from '../cadastro-base.interface';
import {IIHandlerAction} from '../../../../interface/handler-actions.interface';
import {ICustomButtonOption} from '../../../../shared/component/data-grid/data-grid.interface';

import {Filterable} from '../../../../model/filterable.model';

import {CadastroBaseService} from '../cadastro-base.service';
import {RequestService} from '../../../../core/services/request.service';

import {CadastroBaseUtils} from '../cadastro-base.utils';
import {ToastUtils} from '../../../../shared/utils/toast.utils';
import {FilterUtils} from '../../../../shared/utils/filter.utils';
import {ConstantUtils} from '../../../../shared/utils/constant.utils';
import {DialogUtils, IDialogUtils, IInputMessage} from '../../../../shared/utils/dialog.utils';

import {ICadastroBase} from './cadastro-base.component';
import {DataGridComponent} from '../../../../shared/component/data-grid/data-grid.component';

import {ButtonAction} from '../../../../enum/button-action.enum';
import {ObjectStateType} from '../../../../enum/type/object-state-type.enum';
import {Sortable} from '../../../../model/sortable.model';
import {CadastroBaseNavigationService} from '../cadastro-base-navigation.service';
import {NavigationUtils} from '../../../../shared/utils/navigation.utils';
import {StorageUtils} from '../../../../shared/utils/storage.utils';
import {NavigationType} from '../../../../enum/type/navigation-type.enum';
import {SingleMultipleOrNone} from 'devextreme/common';
import {SelectionChangedEvent} from 'devextreme/ui/data_grid';

@Component({
  selector: 'infratec-cadastro-base-layout',
  templateUrl: 'cadastro-base-layout.component.html'
})
export class CadastroBaseLayoutComponent implements OnInit, OnChanges {

  @ViewChild('dataGrid', {static: false})
  dataGrid: DataGridComponent;

  @Input()
  showCadastroDialog = false;

  @Input()
  current: string;

  @Input()
  crumbs: any[] = [];

  @Input()
  cadastroBase: ICadastroBase;

  @Input()
  dadosBase: IBase;

  @Input()
  inputMessageDelete: IInputMessage;

  @Input()
  model: Object;

  @Input()
  filterable: Filterable;

  @Input()
  selectionMode: SingleMultipleOrNone = 'single';

  @Input()
  initializeRowSelected = true;

  @Input()
  selectOnlyChildNodes: boolean;

  @Input()
  selectAction: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  popupVisible: boolean;

  @Input()
  autoSearch: boolean = true;

  @Input()
  focusedRowEnabled: boolean;

  @Input()
  useParentFilter = true;

  @Input()
  callback: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  enableHandler = true;

  @Input()
  afterAction: EventEmitter<IIHandlerAction> = new EventEmitter<IIHandlerAction>();

  @Input()
  beforeAction: EventEmitter<IIHandlerAction> = new EventEmitter<IIHandlerAction>();

  @Input()
  changeAction: EventEmitter<IIHandlerAction> = new EventEmitter<IIHandlerAction>();

  @Output()
  dispose: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  popupVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  modelChange: EventEmitter<Object> = new EventEmitter<Object>();

  @Output()
  rowDblClick: EventEmitter<unknown> = new EventEmitter<unknown>();

  @Output()
  confirmedButton: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  actionDialog: EventEmitter<IIHandlerAction> = new EventEmitter<IIHandlerAction>();

  @Input()
  reloadDataSource: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  toggleList: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  afterSearch: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  selectionChanged: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  changeFilter: EventEmitter<boolean> = new EventEmitter<boolean>();

  onReorder: EventEmitter<any>;

  buttons: Array<ICustomButtonOption>;
  customButtonOption: Array<ICustomButtonOption> = new Array<ICustomButtonOption>();

  private isNew: boolean;
  listMode: boolean = true;
  protected firstRequest: boolean;
  protected viewMode: boolean = false;
  protected showLoading: boolean = false;

  protected url: string;
  protected routeFull: string;

  protected callbackValue: boolean;

  private dataSave = [
    {verbo: 'put$', titleSuccess: 'alterado'},
    {verbo: 'post$', titleSuccess: 'cadastrado'}
  ];

  protected actionSalvar: ButtonAction = ButtonAction.SALVAR;

  protected _buttonsToolbar: ICustomButtonOption[];
  protected _buttonsNavigation: ICustomButtonOption[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private requestService: RequestService,
              private changeDetectorRef: ChangeDetectorRef,
              private cadastroBaseService: CadastroBaseService,
              private cadastroBaseNavigationService: CadastroBaseNavigationService) {
  }

  ngOnChanges(): void {
    this.callback.subscribe((_callback: boolean) => this.callbackValue = _callback);
    this.buttonsToolbar();
    this.buttonsNavigation();
  }

  ngOnInit(): void {
    this.url = this.cadastroBase.page.endpoint;
    this.routeFull = this.cadastroBase.page.route;
    this.firstRequest = this.cadastroBase.firstRequest;
    if (this.cadastroBase.customCadastro) {
      const id = Object.assign(this.cadastroBase.customCadastro).id;
      const viewMode = Object.assign(this.cadastroBase.customCadastro).view;
      const modelValues = Object.assign(this.cadastroBase.customCadastro).modelValues;
      id ? this.edit(id, viewMode) : this.add(modelValues);
    } else {
      if (!this.showCadastroDialog) {
        this.route.url.subscribe((url: UrlSegment[]) => {
          this.viewMode = url.length === 2 && url[0]?.path === 'view';
          this.matchWithId(url);
        });
      }
      this.observerParams();
      this.observerRowDragging();
      this.observerRefreshDataGrid();
    }
    if (this.useParentFilter) {
      this.useParentFilter = this.cadastroBase.useParentFilter === undefined && this.cadastroBase.useParentFilter;
    }
    this.changeDetectorRef.detectChanges();
    this.reloadDataSource?.subscribe(() => this.dataGrid.reload());
    this.cadastroBaseNavigationService.navigation = NavigationUtils.navigation(this.current);
    this.changeAction.subscribe((action) => {
      if (action.action === ButtonAction.EDITAR) {
        this.edit(action.value, false)
      }
    })
  }

  clearFilter(event: boolean): void {
    this.changeFilter.emit(event);
  }

  onSelectionChanged(event: SelectionChangedEvent): void {
    if (this.showCadastroDialog && this.selectionMode === 'multiple') {
      this.selectionChanged.emit(event);
    }
  }

  protected add(model?: Object): void {
    this.beforeAction.emit({action: ButtonAction.ADICIONAR});
    this.isNew = true;
    const instance = Object?.getPrototypeOf(this.model).constructor;
    this.model = new instance;
    if (model) {
      this.model = Object.assign(this.model, model);
    }
    this.modelChange.emit(this.model);
    if (this.showCadastroDialog) {
      this.toggleListMode(true);
    } else {
      this.router.navigate(['form'], {relativeTo: this.route});
    }
    this.afterAction.emit({action: ButtonAction.ADICIONAR});
  }

  private ruleToAction(event: unknown, action: ButtonAction): void {
    if (action === ButtonAction.EXCLUIR) {
      this.ruleToDelete(event);
    } else if (ButtonAction.SALVAR) {
      this.ruleToSave();
    }
  }

  private ruleToDelete(event: unknown): void {
    const dialogDelete: Promise<IDialogUtils> = this.inputMessageDelete ? DialogUtils.inputMessage(this.inputMessageDelete) : DialogUtils.delete();
    dialogDelete.then(result => {
      if (result.isConfirmed) {
        if (this.inputMessageDelete && !result?.value) {
          DialogUtils.info('Campo Obrigatório', `Informe o ${this.inputMessageDelete.inputPlaceholder}`);
        } else if (this.inputMessageDelete) {
          this.deleteRequest(event, {[this.inputMessageDelete.fieldInputName]: result.value});
        } else {
          this.deleteRequest(event);
        }
      }
    });
  }

  private ruleToSave(): void {
    this.showLoading = true;
    const dataSave = !this.isNew && (this.dadosBase.setId === undefined || !this.dadosBase.setId) ? this.dataSave[0] : this.dataSave[1];
    this.requestService[dataSave.verbo](this.object, this.endpoint()).pipe(
      finalize(() => this.showLoading = false)
    ).subscribe({
      next: (body: object) => {
        const value: Object = dataSave.titleSuccess === 'alterado' ? this.object : body;
        this.postOrPutSuccess({action: ButtonAction.SALVAR, value}, dataSave.titleSuccess);
      },
      error: (resp: unknown) => this.postOrPutError(resp)
    });
  }

  protected edit = (event: any, viewMode: boolean = false): void => {
    this.viewMode = viewMode;
    if (event) {
      if (!this.showCadastroDialog) {
        this.router.navigate(this.pathUrlSegment(event), {relativeTo: this.route.parent});
      } else {
        this.getById(event);
        this.toggleListMode(true);
      }
      if (this.viewMode) {
        this.afterAction.emit({action: ButtonAction.VISUALIZAR});
      } else {
        this.afterAction.emit({action: ButtonAction.EDITAR});
      }
    }
  };

  private deleteRequest(event: unknown, body?: Object): void {
    this.showLoading = true;
    this.requestService.delete$(null, this.endpoint(event), body).pipe(
      finalize(() => this.showLoading = !this.showLoading)
    ).subscribe({
      next: () => {
        this.afterAction.emit({action: ButtonAction.EXCLUIR});
        this.dataGrid.refresh();
        ToastUtils.success(`Registro excluído com sucesso`);
      },
      error: (resp) => DialogUtils.customMessage(resp)
    });
  }

  onAfterSearchOrPrint(filterable: Filterable): void {
    FilterUtils.applyFilter(filterable, this.current);
    this.afterSearch.emit();
  }

  onSizeOrIndexPageChange(event: { size?: number; index?: number, sort?: Sortable }): void {
    this.configNavigation({size: event.size, index: event.index});
  }

  protected doAction(event: unknown, action: ButtonAction): void {
    this.beforeAction.emit({action, value: event});
    setTimeout(() => {
      if (this.callbackValue !== true) {
        this.ruleToAction(event, action);
      }
    }, 100);
  }

  protected onRowClick(): void {
    this.buttonsToolbar();
  }

  private postOrPutError(resp: unknown): void {
    this.cadastroBaseService.params = null;
    DialogUtils.customMessage(resp);
  }

  private configNavigation(navigation: { size?: number, index?: number }): void {
    if (this.listMode) {
      this.cadastroBaseNavigationService.configNavigation({
        componentName: this.current,
        totalPageCount: this.dataGrid.totalPageCount,
        totalNavigationCount: this.dataGrid?.totalCount,
        url: this.dataGrid?.fullUrl(false),
        filterable: structuredClone(FilterUtils.filterable(this.current)),
        sortable: this.dataGrid?.fullUrl().split('sort')[1],
        items: this.dataGrid?.dataSourceValue.map((value: unknown) => String(value[this.dadosBase.columnId as string])),
        pageSize: navigation?.size,
        pageIndex: navigation?.index
      });
    }
  }


  private loadPage(): void {
    this.cadastroBaseService.params = null;
    if (this.cadastroBase.useUrlWithoutId) {
      this.router.navigate(['/']);
    } else if (this.cadastroBase.customCadastro) {
      this.showCadastroDialog ? this.popupVisibleChange.emit(false) : this.router.navigate(this.urlSegment);
    } else {
      this.showCadastroDialog ? this.toggleListMode(false) : this.router.navigate(this.urlSegment);
    }
  }

  private postOrPutSuccess(value: IIHandlerAction, title: string): void {
    this.afterAction.emit(value);
    this.actionDialog.emit(value);
    this.loadPage();
    ToastUtils.success(`Registro ${title} com sucesso`);
  }

  private matchWithId(url: any): void {
    if (url.length > 1 || this.cadastroBase.useUrlWithoutId) {
      this.getById();
    }

    if (url.length === 1 && url[0]?.path === 'form') {
      this.isNew = true;
      setTimeout(() => this.beforeAction.emit({action: ButtonAction.ADICIONAR}), 500);
    }

    if (url.length > 0) {
      this.toggleListMode(true);
    }
  }

  private getById(event?: unknown): void {
    this.isNew = false;
    const params = this.route.snapshot.params?.id !== undefined ? this.route.snapshot.params.id : this.route.snapshot.params;
    this.requestService.get$(this.endpoint(this.showCadastroDialog ? event : params)).subscribe(data => {
      this.model = data;
      this.modelChange.emit(this.model);
      this.changeDetectorRef.detectChanges();
      StorageUtils.addSession<string>(ConstantUtils.STORAGE.CURRENT_NAVIGATION, this.showCadastroDialog ? event : params);
      this._buttonsNavigation = this.cadastroBaseNavigationService.buttonsNavigation(this.viewMode);
      if (this.viewMode) {
        this.beforeAction.emit({action: ButtonAction.VISUALIZAR});
      } else {
        this.beforeAction.emit({action: ButtonAction.EDITAR, value: this.model});
      }
      setTimeout(() => this.objectUnmodified = this.model, 500);
    });
  }

  private id(event: any, field?: string): number | string {
    const columnId: string = !Array.isArray(this.dadosBase.columnId) ? this.dadosBase.columnId : field;
    let value = event;
    if (typeof value === 'string') {
      return value;
    }
    if (value !== undefined) {
      value = event?.row ? event.row.data[columnId] : event[columnId];
      if (!value === undefined) {
        value = columnId;
      }
    } else {
      value = this.object[columnId];
    }
    if (value === undefined) {
      return event;
    }
    return value;
  }

  private toggleListMode(enableHandler): void {
    this.listMode = !enableHandler;
    this.enableHandler = enableHandler;
    this.buttonsToolbar();
    this.toggleList.emit(!enableHandler);
    this.changeDetectorRef.detectChanges();
  }

  private observerRowDragging(): void {
    if (this.cadastroBase.showRowDragging) {
      this.onReorder = new EventEmitter<any>();
      this.onReorder.subscribe(value => {
        if (value) {
          this.cadastroBaseService.reorder = value;
        }
      });
    }
  }

  private observerRefreshDataGrid(): void {
    this.cadastroBaseService.refreshDataGrid$.subscribe(refresh => {
      if (refresh) {
        this.dataGrid?.refresh();
        this.dataGrid?.clearSelection();
      }
    });
  }

  protected onCancel(): void {
    this.actionDialog.emit({action: ButtonAction.CANCELAR});
    this.beforeAction.emit({action: ButtonAction.CANCELAR});
    this.loadPage();
    this.afterAction.emit({action: ButtonAction.CANCELAR});

    if (this.showCadastroDialog) {
      this.buttonsToolbar();
    }
  }

  private observerParams(): void {
    this.cadastroBaseService.params$.subscribe((param: IParams) => {
      if (param) {
        // tslint:disable:no-unused-expression
        param.crumb ? this.crumbs = param.crumb : null;
        param.currentCrumb ? this.current = param.currentCrumb : null;
        param.filterBase ? this.cadastroBase.page.filterBase = param.filterBase : null;
      }
    });
  }

  onRowDblClick(event): void {
    if (this._buttonsToolbar.find((button: ICustomButtonOption) => button.options.text === 'Editar').options.visible) {
      !this.showCadastroDialog ? this.edit(event.data) : this.rowDblClick.emit(event);
    }
  }

  private endpoint(event?: any): string {
    let endpoint = this.cadastroBaseService.paramsValue?.customCadastro?.url;
    if (!endpoint) {
      if (!Array.isArray(this.dadosBase.columnId)) {
        if ((this.cadastroBase.useUrlWithoutId || this.isNew && this.objectDefault[this.dadosBase.columnId] !== 0)) {
          endpoint = this.cadastroBase.page.endpoint;
        } else {
          endpoint = `${this.cadastroBase.page.endpoint}/${this.id(event)}`;
        }
      } else {
        if (this.isNew) {
          return this.cadastroBase.page.endpoint;
        }
        endpoint = `${this.cadastroBase.page.endpoint}/`;
        this.dadosBase.columnId.forEach((column: any, index) => {
          if (index) {
            endpoint += '/';
          }
          endpoint += !event ? this.objectDefault[column.id] : event[column.id];
        });
      }
    }
    return endpoint;
  }

  private pathUrlSegment(event: unknown): unknown[] {
    let path: string[] = [this.viewMode ? 'view' : 'form'];
    if (Array.isArray(this.dadosBase.columnId)) {
      this.dadosBase.columnId.forEach(value => path = path.concat(value.path).concat(String(this.id(event, value.id))));
      return path;
    }
    return path.concat(String(this.id(event)));
  }

  private get objectDefault(): Object {
    return JSON.parse(JSON.stringify(this.model));
  }

  private get object(): Object {
    let model = this.cadastroBaseService.paramsValue?.customCadastro?.model;
    if (!model) {
      model = JSON.parse(JSON.stringify(this.model));
    }
    return model;
  }

  private get urlSegment(): Array<any> {
    return [this.router.routerState.snapshot.url.split(`/${this.viewMode ? 'view' : 'form'}`)[0]];
  }

  private set objectUnmodified(object) {
    for (const i in object) {
      if (Array.isArray(object[i])) {
        object[i].forEach((child) => {
          for (const j in child) {
            if (Array.isArray(child[j])) {
              this.objectUnmodified = child;
            } else if (child._KEY_) {
              child.object_state = ObjectStateType.UNMODIFIED;
            }
          }
        });
      }
    }
  }

  private buttonsNavigation(): void {
    this._buttonsNavigation = this.cadastroBaseNavigationService.buttonsNavigation(this.viewMode, (navigationType: NavigationType) => {
      this.showLoading = true;
      this.cadastroBaseNavigationService.handlerNavigation(this.dadosBase.columnId as string, this.current, navigationType).pipe(
        finalize(() => this.showLoading = !this.showLoading)
      ).subscribe((navigation: number) => this.edit(String(navigation), true));
    });
  }

  protected buttonsToolbar(): void {
    setTimeout(() => {
      this._buttonsToolbar = [];
      const row: Object = this.focusedRowEnabled ? this.dataGrid?.focusedRow : this.dataGrid?.selectedRowsData[0];
      if (this.listMode) {
        this._buttonsToolbar = CadastroBaseUtils.buttonsToolbar(this.dadosBase, [
          {buttonType: ButtonAction.ADICIONAR, onClick: () => this.add()},
          {buttonType: ButtonAction.EDITAR, onClick: () => this.edit(row)},
          {buttonType: ButtonAction.EXCLUIR, onClick: () => this.doAction(row, ButtonAction.EXCLUIR)},
          {buttonType: ButtonAction.VISUALIZAR, onClick: () => this.edit(row, true)},
        ], this.dataGrid);
      }
    }, 100);
  }
}
