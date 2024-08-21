import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';

import DataSource from 'devextreme/data/data_source';

import {DataGridComponent} from '../../../../shared/component/data-grid/data-grid.component';

import {ButtonAction} from '../../../../enum/button-action.enum';
import {CallbackType} from '../../../../enum/type/callback-type.enum';
import {ObjectStateType} from '../../../../enum/type/object-state-type.enum';

import {CadastroBaseUtils} from '../cadastro-base.utils';
import {DialogUtils, IInputMessage} from '../../../../shared/utils/dialog.utils';

import {IBase} from '../cadastro-base.interface';
import {ICustomButtonOption} from '../../../../shared/component/data-grid/data-grid.interface';
import {IIHandlerAction, IIHandlerActionFilho} from '../../../../interface/handler-actions.interface';

import {AuthService} from '../../../../core/services/auth.service';
import {ObjectState} from '../../../../model/object-state.model';
import {v4 as uuidv4} from 'uuid';
import {SingleMultipleOrNone} from 'devextreme/common';
import {SelectionChangedEvent} from 'devextreme/ui/data_grid';
import {Router} from '@angular/router';

@Component({
  selector: 'infratec-cadastro-filho-base-layout',
  templateUrl: 'cadastro-filho-base.component.html'
})
export class CadastroFilhoBaseLayoutComponent implements OnInit, OnChanges {

  @ViewChild('dataGrid')
  dataGrid: DataGridComponent;

  @Input()
  dadosBase: IBase;

  @Input()
  pageSize: number;

  @Input()
  headerTitle: string;

  @Input()
  object: Object | any;

  @Input()
  allowUpdating: boolean;

  @Input()
  showFilterRow: boolean;

  @Input()
  fileExportName: string;

  @Input()
  objects: Object[] | any;

  @Input()
  showRowDragging: boolean;

  @Input()
  showPager: boolean = false;

  @Input()
  showButtons: boolean = true;

  @Input()
  columnFixing: boolean = true;

  @Input()
  disableButtons: boolean = false;

  @Input()
  inputMessageDelete: IInputMessage;

  @Input()
  showCustomButtons: boolean = false;

  @Input()
  initializeRowSelected: boolean = true;

  @Input()
  showConfirmationDelete: boolean = true;

  @Input()
  callback: CallbackType = CallbackType.UNUSED;

  @Input()
  selectionMode: SingleMultipleOrNone = 'single';

  @Input()
  cadastroSia = true;

  @Output()
  rowClick: EventEmitter<unknown> = new EventEmitter<unknown>();

  @Output()
  cellClick: EventEmitter<unknown> = new EventEmitter<unknown>();

  @Output()
  rowUpdating: EventEmitter<unknown> = new EventEmitter<unknown>();

  @Output()
  objectChange: EventEmitter<unknown> = new EventEmitter<unknown>();

  @Output()
  objectsChange: EventEmitter<unknown> = new EventEmitter<unknown>();

  @Output()
  enableHandler: EventEmitter<unknown> = new EventEmitter<unknown>();

  @Output()
  afterAction: EventEmitter<IIHandlerAction> = new EventEmitter<IIHandlerAction>();

  @Output()
  beforeAction: EventEmitter<IIHandlerAction> = new EventEmitter<IIHandlerAction>();

  @Output()
  toggleAction: EventEmitter<IIHandlerActionFilho> = new EventEmitter<IIHandlerActionFilho>();

  @Output()
  selectionChanged: EventEmitter<SelectionChangedEvent> = new EventEmitter<SelectionChangedEvent>();

  dataSource: DataSource;

  private _isNew: boolean;

  onReorder: EventEmitter<any>;

  viewMode: boolean = false;
  editingMode: boolean = false;
  checkHistoryValue: boolean = false;

  _buttonsToolbar: ICustomButtonOption[];

  constructor(private router: Router,
              private authService: AuthService,
              private changeDetectorRef: ChangeDetectorRef) {
    this.dataSource = this.data;
  }

  get isNew(): boolean {
    return this._isNew;
  }

  get data(): DataSource {
    return new DataSource({
      load: () => {
        return this.checkHistoryValue ?
          this.objects?.filter((load: ObjectState) => load._KEY_ = uuidv4()) :
          this.objects?.filter((item: ObjectState) => item[this.cadastroSia ? 'object_state' : 'objectState'] === undefined || this.filterObject(item)).filter(load => load._KEY_ = uuidv4());
      },
      update: () => {
        if (this.checkHistoryValue) {
          return new Promise((resolve) => {
            resolve(this.objects?.filter(update => update._KEY_ = uuidv4()));
          });
        }
        return new Promise((resolve) => {
          resolve(this.objects?.filter((item: ObjectState) => {
            return item[this.cadastroSia ? 'object_state' : 'objectState'] === undefined || item[this.cadastroSia ? 'object_state' : 'objectState'] !== ObjectStateType.DELETED;
          }).filter((update: ObjectState) => update._KEY_ = uuidv4()));
        });
      }
    });
  }

  get descricaoBotao(): string {
    return this._isNew ? 'Adicionar' : 'Editar';
  }

  private loadPage(): void {
    this.object = {};
    this.toggleMode();
    if (this.checkHistoryValue) {
      const checkHistory: ICustomButtonOption = this._buttonsToolbar.find((option: ICustomButtonOption) => option.widget === 'dxCheckBox');
      if (checkHistory) {
        checkHistory.options.onValueChanged(event => event.value = this.checkHistoryValue);
      }
    }
    this.enableHandler.emit(this.editingMode);
  }

  get dataFim(): string {
    const index: number = this.dadosBase.columns.findIndex(col => col.type !== 'buttons');
    return this.dadosBase.columns[index].dataField.split('_')[1];
  }

  onRowDblClick(event): void {
    if (this._buttonsToolbar.find((button: ICustomButtonOption) => button.options.text === 'Editar').options.visible) {
      this.edit(event['data']);
    }
  }

  ngOnChanges(): void {
    if (this.showRowDragging) {
      this.objects?.sort((a: Object, b: Object) => a[this.dadosBase.columnOrder] - b[this.dadosBase.columnOrder]);
    }
    this.buttonsToolbar();
    setTimeout(() => this.reloadDataGrid(), 400);
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
    if (this.showRowDragging) {
      this.onReorder = new EventEmitter<unknown>();
      this.onReorder.subscribe(value => {
        const visibleRows = value.component.getVisibleRows();
        const toIndex = this.objects.indexOf(visibleRows[value.toIndex].data);
        const fromIndex = this.objects.indexOf(value.itemData);
        this.objects.splice(fromIndex, 1);
        this.objects.splice(toIndex, 0, value.itemData);
        this.reloadDataGrid();
      });
    }
    this.changeDetectorRef.detectChanges();
    this.observerEditMode();
  }


  private observerEditMode(): void {
    const viewModeBase = this.router.routerState.snapshot.url.includes('/view/');
    if (viewModeBase && this.dadosBase.buttons) {
      this.dadosBase.buttons.new = false;
      this.dadosBase.buttons.edit = false;
      this.dadosBase.buttons.delete = false;
      this.buttonsToolbar();
    }
  }

  save = () => {
    this.beforeAction.emit({action: ButtonAction.SALVAR});
    setTimeout(() => {
      if (this.callback === CallbackType.UNUSED || this.callback === CallbackType.FINALIZED || !this.callback) {
        const index = this.objects.findIndex((key: ObjectState) => key._KEY_ === this.object._KEY_);
        if (index !== -1) {
          if (this.object[this.cadastroSia ? 'object_state' : 'objectState'] !== ObjectStateType.INSERTED) {
            this.object[this.cadastroSia ? 'object_state' : 'objectState'] = ObjectStateType.MODIFIED;
          }
          Object.assign(this.objects[index], this.object);
        } else {
          this.object[this.cadastroSia ? 'object_state' : 'objectState'] = ObjectStateType.INSERTED;
          if (this.dadosBase.columnOrder) {
            this.object[this.dadosBase.columnOrder] = this.objects.length;
          }
          this.object.newValue = true;
          this.objects.push(this.object);
        }
        this.objectsChange?.emit(this.objects);
        this.afterAction.emit({action: ButtonAction.SALVAR});
        this.loadPage();
      }
    }, 100);
  };

  add = () => {
    this.disableButtons = false;
    this._isNew = true;
    this.viewMode = false;
    this.object = {};
    this.beforeAction.emit({action: ButtonAction.ADICIONAR});
    this.toggleMode();
    this.afterAction.emit({action: ButtonAction.ADICIONAR});
    this.enableHandler.emit(this.editingMode);
  };

  edit = (event): void => {
    if (this.dataGrid.selectedRowsData[0]) {
      this.viewMode = false;
      this._isNew = false;
      Object.assign(this.object, event?.row ? event.row.data : event);
      this.objectChange.emit(this.object);
      this.beforeAction.emit({action: ButtonAction.EDITAR});
      this.toggleMode();
      this.afterAction.emit({action: ButtonAction.EDITAR, value: this.object});
      this.enableHandler.emit(this.editingMode);
    }
  };


  view = (event): void => {
    if (this.dataGrid.selectedRowsData[0]) {
      this.viewMode = true;
      this._isNew = false;
      Object.assign(this.object, event?.row ? event.row.data : event);
      this.objectChange.emit(this.object);
      this.beforeAction.emit({action: ButtonAction.VISUALIZAR});
      this.toggleMode();
      this.afterAction.emit({action: ButtonAction.VISUALIZAR, value: this.object});
      this.enableHandler.emit(this.editingMode);
    }
  };

  delete = (event) => {
    if (this.dataGrid.selectedRowsData[0]) {
      const object = event.row ? event.row.data : event;
      if (this.inputMessageDelete) {
        DialogUtils.inputMessage(this.inputMessageDelete).then((result) => {
          if (result.isConfirmed) {
            if (!result.value) {
              DialogUtils.info('Campo Obrigatório', `Informe o ${this.inputMessageDelete.inputPlaceholder}`);
            } else {
              this.object[this.inputMessageDelete.fieldInputName] = result.value;
              if (this.inputMessageDelete?.callback) {
                this.inputMessageDelete?.callback(object);
              }
              this.deletedOrModified(event);
            }
          }
        });
      } else {
        if (this.showConfirmationDelete) {
          DialogUtils.delete().then((result) => {
            if (result.isConfirmed) {
              this.deletedOrModified(event);
            }
          });
        } else {
          this.deletedOrModified(event);
        }
      }
    }
  };

  cancel() {
    this.beforeAction.emit({action: ButtonAction.CANCELAR});
    this.loadPage();
    this.afterAction.emit({action: ButtonAction.CANCELAR});
  }

  reloadDataGrid() {
    this.reorder();
    this.buttonsToolbar();
    this.dataGrid?.reload();
  }

  onRowUpdating(event) {
    this.rowUpdating.emit(event);
  }

  onRowClick(event) {
    this.rowClick.emit(event);
  }

  onCellClick(event) {
    this.cellClick.emit(event);
    this.buttonsToolbar();
  }

  private deletedOrModified(event): void {
    const key = event.row ? event.row.data._KEY_ : event._KEY_;
    const index = this.objects.findIndex(value => value._KEY_ === key);
    if (index !== -1) {
      if (this.objects[index] && !this.objects[index]?.newValue) {
        let existEndDate = false;
        for (const object in this.objects[index]) {
          if (object === this.dataFim) {
            this.objects[index][object] = this.authService.date.timestamp;
            existEndDate = true;
          }
        }
        const obj = this.objects[index];
        obj[this.cadastroSia ? 'object_state' : 'objectState'] = existEndDate ? ObjectStateType.MODIFIED : ObjectStateType.DELETED;
        if (this.inputMessageDelete) {
          this.objects[index][this.inputMessageDelete.fieldInputName] = this.object[this.inputMessageDelete.fieldInputName];
        }
        this.afterAction.emit({action: ButtonAction.EXCLUIR});
      } else {
        this.objects.splice(index, 1);
      }
    }
    this.objectsChange?.emit(this.objects);
    this.buttonsToolbar();
    this.reloadDataGrid();
  }

  private filterObject = (item): boolean => {
    return item[this.dataFim] === undefined ? item[this.cadastroSia ? 'object_state' : 'objectState'] !== ObjectStateType.DELETED : !item[this.dataFim];
  };

  private reorder(reorder: boolean = true): number {
    if (!this.dadosBase.columnOrder || !this.objects) {
      return;
    }
    if (reorder) {
      const objects = this.objects.filter((value: ObjectState) => value.object_state !== ObjectStateType.DELETED);
      objects.forEach((value: ObjectState, index: number) => {
        if (value[this.cadastroSia ? 'object_state' : 'objectState'] !== ObjectStateType.INSERTED) {
          value[this.cadastroSia ? 'object_state' : 'objectState'] = ObjectStateType.MODIFIED;
        }
        value[this.dadosBase.columnOrder] = index;
      });
    }
    this.objects?.sort((a: Object, b: Object) => a[this.dadosBase.columnOrder] - b[this.dadosBase.columnOrder]);
  }

  onSelectionChanged(event: SelectionChangedEvent): void {
    this.selectionChanged.emit(event);
  }

  buttonsToolbar(): void {
    setTimeout(() => {
      this._buttonsToolbar = CadastroBaseUtils.buttonsToolbar(this.dadosBase, [
        {buttonType: ButtonAction.ADICIONAR, onClick: () => this.add()},
        {buttonType: ButtonAction.EDITAR, onClick: () => this.edit(this.dataGrid.selectedRowsData[0])},
        {buttonType: ButtonAction.EXCLUIR, onClick: () => this.delete(this.dataGrid.selectedRowsData[0])},
        {buttonType: ButtonAction.VISUALIZAR, onClick: () => this.view(this.dataGrid.selectedRowsData[0])},
      ], this.dataGrid);
    }, 100);
  }

  private toggleMode(): void {
    this.editingMode = !this.editingMode;
    this.buttonsToolbar();
    this.toggleAction?.emit({editingMode: this.editingMode, isEdit: !this.isNew});
  }

}
