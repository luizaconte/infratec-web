import {Component} from "@angular/core";

import {EndpointUtils} from "../../../utils/endpoint.utils";

import {InputSearchDialogBaseComponent} from "../input-search-dialog-base.component";

@Component({
  selector: 'infratec-input-search-dialog-departamento',
  template: `
    <infratec-input-search [(value)]="value" [(description)]="description" codeLabel="Código"
                           descriptionLabel="Departamento" [focus]="focus"
                           valueExpr="id" descriptionExpr="nome" [dataSelected]="dispose" [readOnly]="readOnly"
                           [dispose]="dispose" [url]="url" (buttonClick)="dialogCbo.searchDialog.show()"
                           (descriptionChange)="onDescriptionChange($event)" (valueChange)="onValueChange($event)">
      <infratec-search-dialog-departamento #dialogCbo [dispose]="dispose"></infratec-search-dialog-departamento>
    </infratec-input-search>
  `
})
export class InputSearchDialogDepartamentoComponent extends InputSearchDialogBaseComponent {
  constructor() {
    super();
    this.url = new EndpointUtils().ApiBaseUrl.DEPARTAMENTO;
  }
}
