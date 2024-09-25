import {Component} from "@angular/core";
import {SearchDialogBaseComponent} from "../search-dialog-base.component";
import {
  DepartamentoContainerComponent,
} from "../../../../pages/admin/departamento/departamento-container.component";

@Component({
  selector: 'infratec-search-dialog-departamento',
  template: `
    <infratec-dialog #searchDialog [selectionMode]="selectionMode" [title]="title" [dialogCadastro]="dialogCadastro"
                     [dispose]="dispose" [showCadastroDialog]="showCadastroDialog"
                     [(model)]="customContainer?.instance.departamento"
                     [afterAction]="afterAction" [beforeAction]="beforeAction"
                     [currentCrumb]="customContainer?.instance.cadastroBase.page.currentCrumb"
                     descriptionField="nome" (showPopup)="onShow()">
      <ng-template #componentContainer></ng-template>
    </infratec-dialog>
  `
})
export class SearchDialogDepartamentoComponent extends SearchDialogBaseComponent {
  constructor() {
    super();
    this.title = 'Selecione uma Classificação Brasileira de Ocupações';
  }

  onShow() {
    super.detectComponent(DepartamentoContainerComponent)
  }
}
