import {ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';

import {DxPopupComponent} from 'devextreme-angular';

import {IDialog} from '../../../interface/dialog.interface';
import {IDialogCadastro} from '../../../interface/dialog-cadastro.interface';
import {IIHandlerAction} from '../../../interface/handler-actions.interface';

import {Sortable} from '../../../model/sortable.model';
import {Filterable} from '../../../model/filterable.model';

import {DataGridComponent} from '../data-grid/data-grid.component';
import {CadastroBaseLayoutComponent} from '../../../layout/cadastro-base-layout/cadastro/cadastro-base/cadastro-base-layout.component';
import {SingleMultipleOrNone} from 'devextreme/common';
import {SelectionChangedEvent} from 'devextreme/ui/data_grid';

@Component({
  selector: 'infratec-dialog',
  template: `
    <dx-popup #popup title="{{ title }}" [showTitle]="true" [dragEnabled]="false" [showCloseButton]="true" height="98%" width="98%">
      <ng-container *ngIf="popup.visible">
        <dx-scroll-view showScrollbar="onScroll">
          <div class="pe-3">
            <ng-container *ngIf="showCadastroDialog; else showOnlyDialog">
              <div class="mb-4">
                <infratec-cadastro-base-layout #base [(popupVisible)]="popup.visible" [(model)]="model"
                                          [showCadastroDialog]="true" [filterable]="filterable" [afterAction]="afterAction"
                                          [actionDialog]="actionDialog" [dadosBase]="dialogCadastro.dadosBase"
                                          [cadastroBase]="dialogCadastro.cadastroBase" [current]="currentCrumb"
                                          [selectionMode]="selectionMode" [beforeAction]="beforeAction" [callback]="callback"
                                          [useParentFilter]="useParentFilter" [selectOnlyChildNodes]="selectOnlyChildNodes"
                                          [focusedRowEnabled]="focusedRowEnabled" (toggleList)="onToggleList($event)"
                                          (modelChange)="onModelChange()" (dispose)="onDispose($event)"
                                          (afterSearch)="onAfterSearch()"
                                          (confirmedButton)="onConfirmed()" (selectionChanged)="selectionChanged($event)"
                                          (rowDblClick)="onConfirmed()">
                  <ng-content></ng-content>
                  <ng-container tagBox *ngTemplateOutlet="tagBoxTemplate"></ng-container>
                </infratec-cadastro-base-layout>
              </div>
            </ng-container>
          </div>
          <ng-template #showOnlyDialog>
            <infratec-filter-base *ngIf="dialog?.filterBase" [filterBase]="dialog.filterBase" [dataGrid]="dataGrid" [useParentFilter]="useParentFilter"
                             (afterSearchOrPrint)="onAfterSearch()" (clearFilter)="onClearFilter($event)">
            </infratec-filter-base>
            <ng-container *ngTemplateOutlet="tagBoxTemplate"></ng-container>
            <div class="mb-4">
              <infratec-data-grid #dataGrid [columns]="dialog?.columns" [url]="dialog?.url"
                             [showFilterRow]="!dialog?.filterBase" [sortable]="sortable" [filterable]="filterable"
                             [optionsRequest]="dialog?.options" [selectionMode]="selectionMode"
                             [firstRequest]="firstRequest" [executeBeforeLoadDataSource]="executeBeforeLoadDataSource"
                             (selectionChanged)="onSelectionChanged($event)">
              </infratec-data-grid>
            </div>
          </ng-template>
          <ng-container *ngIf="showConfirmButton">
            <div class="position-fixed bottom-0 start-0 bg-white w-full py-3 px-5" style="z-index: 160">
              <div class="row">
                <div class="offset-xl-10 offset-md-9 col-xl-2 col-md-3">
                  <dx-button intDoubleClick type="default" stylingMode="contained" text="Confirmar" class="d-block"
                             (onClick)="onConfirmed()">
                  </dx-button>
                </div>
              </div>
            </div>
          </ng-container>
        </dx-scroll-view>
      </ng-container>
    </dx-popup>
    <ng-template #tagBoxTemplate>
      <div *ngIf="selectionMode === 'multiple' && selectedItems.length" class="row">
        <div class="col mb-4">
          <dx-tag-box [value]="selectedItems" [displayExpr]="descriptionField" [openOnFieldClick]="false" (onValueChanged)="removedItem($event)"
                      [showDropDownButton]="false">
          </dx-tag-box>
        </div>
      </div>
    </ng-template>
  `
})
export class DialogComponent {
  @ViewChild(DxPopupComponent, {static: false})
  private popup: DxPopupComponent;

  @ViewChild(CadastroBaseLayoutComponent, {static: false})
  base: CadastroBaseLayoutComponent;

  @ViewChild('dataGrid', {static: false})
  dataGrid: DataGridComponent;

  @Input()
  dialog: IDialog;

  @Input()
  title: string;

  @Input()
  model: Object;

  @Input()
  selectionMode: SingleMultipleOrNone = 'single';

  @Input()
  focusedRowEnabled: boolean = false;

  @Input()
  selectOnlyChildNodes: boolean;

  @Input()
  callback: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  currentCrumb: string;

  @Input()
  showCadastroDialog: boolean;

  @Input()
  dialogCadastro: IDialogCadastro;

  @Input()
  firstRequest: boolean;

  @Input()
  dispose: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  actionDialog: EventEmitter<IIHandlerAction> = new EventEmitter<IIHandlerAction>();

  @Input()
  filterable: Filterable;

  @Input()
  sortable: Sortable;

  @Input()
  afterAction: EventEmitter<IIHandlerAction>;

  @Input()
  beforeAction: EventEmitter<IIHandlerAction>;

  @Input()
  autoSearch: boolean;

  @Input()
  useParentFilter = true;

  @Input()
  descriptionField: string;

  @Input()
  executeBeforeLoadDataSource: Function;

  @Output()
  modelChange: EventEmitter<Object> = new EventEmitter<Object>();

  @Output()
  showPopup: EventEmitter<any> = new EventEmitter<any>();


  protected keepSelected: boolean = false;
  showConfirmButton = true;
  manterSelecionados = false;

  selectedItems: Array<any>;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  onSelectionChanged(event: SelectionChangedEvent): void {
    if (this.selectionMode !== 'multiple' && !this.dialog.childColumns?.length) {
      this.onDispose(event.selectedRowsData[0]);
    } else if (this.selectionMode === 'multiple' || this.dialog.childColumns?.length) {
      this.selectionChanged(event);
    }
  }

  show(): void {
    this.popup.visible = true;
    this.selectedItems = [];
    this.showPopup.emit();
  }

  onModelChange(): void {
    this.modelChange.emit(this.model);
  }

  onDispose(data): void {
    this.dispose.emit(data);
    this.popup.visible = false;
  }

  onConfirmed(): void {
    if (this.selectionMode === 'multiple') {
      if (this.selectedItems.length) {
        this.onDispose(this.selectedItems);
      }
    } else {
      this.onDispose(this.showCadastroDialog ? this.base.dataGrid.selectedRowsData[0] : this.dataGrid.selectedRowsData[0]);
    }
  }

  onClearFilter(event): void {
    if (event) {
      this.filterable = new Filterable();
    }
  }

  selectionChanged(data): void {
    if (!this.manterSelecionados) {
      if (data.currentSelectedRowKeys.length) {
        data.currentSelectedRowKeys.forEach((selected) => {
          if (!this.selectedItems.find(item => item === selected)) {
            this.selectedItems.push(selected);
          }
        });
      }

      if (data.currentDeselectedRowKeys.length) {
        data.currentDeselectedRowKeys.forEach((deselected) => {
          if (this.selectedItems.find(item => item === deselected)) {
            this.selectedItems.splice(this.selectedItems.indexOf(deselected), 1);
          }
        });
      }
    }
    this.manterSelecionados = false;
  }

  protected onToggleList(listMode: boolean): void {
    this.showConfirmButton = listMode;
    this.changeDetectorRef.detectChanges();
  }

  protected onAfterSearch(): void {
    if (!!this.selectedItems.length) {
      this.keepSelected = true;
      this.dataSelectedGrid(this.selectedItems);
    }
  }

  removedItem(e): void {
    if (e.event) {
      const dataView: DataGridComponent = this.showCadastroDialog ? this.base.dataGrid : this.dataGrid;
      dataView.selectedRowKeys = e.value;
      this.selectedItems = dataView.selectedRowKeys;
    }
  }

  private dataSelectedGrid(items: unknown[]): void {
    const dataView: DataGridComponent = this.showCadastroDialog ? this.base.dataGrid : this.dataGrid;
    dataView.selectedRowKeys = items;
  }
}
