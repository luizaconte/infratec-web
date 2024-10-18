import {NgModule} from "@angular/core";

import {InputSearchModule} from "../../input-search/input-search.module";

import {InputSearchDialogUsuariosComponent} from "./input-search-dialog-usuarios.component";
import {SearchDialogUsuariosModule} from "../../search-dialog/search-dialog-usuarios/search-dialog-usuarios.module";

@NgModule({
  declarations: [InputSearchDialogUsuariosComponent],
  exports: [InputSearchDialogUsuariosComponent],
  imports: [InputSearchModule, SearchDialogUsuariosModule]
})
export class InputSearchDialogUsuariosModule {
}
