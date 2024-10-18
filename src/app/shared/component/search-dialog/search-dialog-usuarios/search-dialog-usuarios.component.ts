import {Component} from "@angular/core";
import {SearchDialogBaseComponent} from "../search-dialog-base.component";
import {
  UsuariosContainerComponent,
} from "../../../../pages/admin/usuarios/usuarios-container.component";

@Component({
  selector: 'infratec-search-dialog-usuarios',
  template: `
    <infratec-dialog #searchDialog [selectionMode]="selectionMode" [title]="title" [dialogCadastro]="dialogCadastro"
                     [dispose]="dispose" [showCadastroDialog]="showCadastroDialog"
                     [(model)]="customContainer?.instance.usuario"
                     [afterAction]="afterAction" [beforeAction]="beforeAction"
                     [currentCrumb]="customContainer?.instance.cadastroBase.page.currentCrumb"
                     descriptionField="nome" (showPopup)="onShow()">
      <ng-template #componentContainer></ng-template>
    </infratec-dialog>
  `
})
export class SearchDialogUsuariosComponent extends SearchDialogBaseComponent {
  constructor() {
    super();
    this.title = 'Selecione um Usuário';
  }

  onShow() {
    super.detectComponent(UsuariosContainerComponent)
  }
}
