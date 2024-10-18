import {Component} from "@angular/core";

import {EndpointUtils} from "../../../utils/endpoint.utils";

import {InputSearchDialogBaseComponent} from "../input-search-dialog-base.component";

@Component({
  selector: 'infratec-input-search-dialog-usuarios',
  template: `
    <infratec-input-search [(value)]="value" [(description)]="description" codeLabel="Código"
                           [descriptionLabel]="placeholder" [focus]="focus"
                           valueExpr="id" descriptionExpr="nome" [dataSelected]="dispose" [readOnly]="readOnly"
                           [dispose]="dispose" [url]="url" (buttonClick)="dialogUsuarios.searchDialog.show()"
                           (descriptionChange)="onDescriptionChange($event)" (valueChange)="onValueChange($event)">
      <infratec-search-dialog-usuarios #dialogUsuarios [dispose]="dispose"></infratec-search-dialog-usuarios>
    </infratec-input-search>
  `
})
export class InputSearchDialogUsuariosComponent extends InputSearchDialogBaseComponent {
  constructor() {
    super();
    this.placeholder= "Usuário";
    this.url = new EndpointUtils().ApiBaseUrl.USUARIOS;
  }
}
