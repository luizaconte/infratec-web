import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {UsuariosContainerComponent} from "./usuarios-container.component";
import {UsuariosPresenterComponent} from "./usuarios-presenter.component";
import {UrlRouterUtils} from "../../../shared/utils/url-router.utils";
import {SharedModule} from "../../../shared/shared.module";
import {DxTextBoxModule} from "devextreme-angular";
import {CadastroBaseModule} from "../../../layout/cadastro-base-layout/cadastro/cadastro-base.module";
import {
    InputSearchDialogDepartamentoModule
} from "../../../shared/component/input-search-dialog/input-search-dialog-departamento/input-search-dialog-departamento.module";

@NgModule({
  declarations: [
    UsuariosContainerComponent,
    UsuariosPresenterComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(UrlRouterUtils.router(UsuariosPresenterComponent)),
        CadastroBaseModule,
        DxTextBoxModule,
        SharedModule,
        InputSearchDialogDepartamentoModule,
    ],
})
export class UsuariosModule {
}
