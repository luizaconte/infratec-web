import {NgModule} from "@angular/core";

import {DialogModule} from "../../dialog/dialog.module";

import {SearchDialogUsuariosComponent} from "./search-dialog-usuarios.component";

@NgModule({
  declarations: [SearchDialogUsuariosComponent],
  exports: [SearchDialogUsuariosComponent],
  imports: [DialogModule]
})
export class SearchDialogUsuariosModule {
}
