import {NgModule} from "@angular/core";

import {InputSearchModule} from "../../input-search/input-search.module";
import {
  SearchDialogDepartamentoModule
} from "../../search-dialog/search-dialog-departamento/search-dialog-departamento.module";

import {InputSearchDialogDepartamentoComponent} from "./input-search-dialog-departamento.component";

@NgModule({
  declarations: [InputSearchDialogDepartamentoComponent],
  exports: [InputSearchDialogDepartamentoComponent],
  imports: [InputSearchModule, SearchDialogDepartamentoModule]
})
export class InputSearchDialogDepartamentoModule {
}
