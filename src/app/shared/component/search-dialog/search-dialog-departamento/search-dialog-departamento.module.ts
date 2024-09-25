import {NgModule} from "@angular/core";

import {DialogModule} from "../../dialog/dialog.module";

import {SearchDialogDepartamentoComponent} from "./search-dialog-departamento.component";

@NgModule({
  declarations: [SearchDialogDepartamentoComponent],
  exports: [SearchDialogDepartamentoComponent],
  imports: [DialogModule]
})
export class SearchDialogDepartamentoModule {
}
