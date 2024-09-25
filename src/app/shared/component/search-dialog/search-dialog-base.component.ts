import {Component, EventEmitter, Input, Type, ViewChild, ViewContainerRef} from '@angular/core';

import {DialogComponent} from '../dialog/dialog.component';

import {IDialog} from '../../../interface/dialog.interface';
import {IDialogCadastro} from '../../../interface/dialog-cadastro.interface';
import {IIHandlerAction} from '../../../interface/handler-actions.interface';

import {Sortable} from '../../../model/sortable.model';
import {Filterable} from '../../../model/filterable.model';

import {FilterUtils} from '../../utils/filter.utils';

import {ButtonAction} from '../../../enum/button-action.enum';

@Component({
  selector: 'int-search-dialog',
  template: ``
})
export class SearchDialogBaseComponent {

  @ViewChild('searchDialog', {static: false})
  searchDialog: DialogComponent;

  @ViewChild('componentContainer', {read: ViewContainerRef, static: false})
  componentContainer: ViewContainerRef;

  @Input()
  selectionMode: 'single' | 'multiple' | 'none' = 'single';

  @Input()
  title: string;

  @Input()
  autoSearch: boolean;

  @Input()
  useParentFilter = true;

  @Input()
  dispose: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  actionDialog: EventEmitter<IIHandlerAction> = new EventEmitter<IIHandlerAction>();

  @Input()
  disableFieldsFilter?: Array<string>;

  afterAction: EventEmitter<IIHandlerAction>;

  beforeAction: EventEmitter<IIHandlerAction>;

  enableHandlerChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  dialogCadastro: IDialogCadastro;

  dialog: IDialog;

  filterable: Filterable;

  sortable: Sortable;

  showCadastroDialog = true;

  customContainer: any;

  protected detectComponent(componentCadastro: Type<any>) {
    this.componentContainer?.clear();
    this.customContainer = this.componentContainer.createComponent(componentCadastro);
    if (this.filterable) {
      FilterUtils.applyFilter(this.filterable, this.customContainer?.instance.cadastroBase.page.currentCrumb);
    }
    this.customContainer.instance.showCadastroDialog = this.showCadastroDialog;
    this.afterAction = this.customContainer.instance.afterAction;
    this.beforeAction = this.customContainer.instance.beforeAction;
    this.enableHandlerChange = this.customContainer.instance.enableHandlerChange;
    this.dialogCadastro = {
      cadastroBase: this.customContainer.instance.cadastroBase,
      dadosBase: this.customContainer.instance.dadosBase
    };

    this.dialogCadastro.cadastroBase.disableFieldsFilter = this.disableFieldsFilter;

    this.enableHandlerChange.subscribe(handler => this.searchDialog.base.enableHandler = handler);

    this.afterAction.subscribe(button => {
      this.customContainer.instance.listMode = button.action !== ButtonAction.EDITAR && button.action !== ButtonAction.ADICIONAR;
    });
  }
}
