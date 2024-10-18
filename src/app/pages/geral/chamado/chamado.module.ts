import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';


import {UrlRouterUtils} from "../../../shared/utils/url-router.utils";
import {SharedModule} from "../../../shared/shared.module";
import {DxTextBoxModule} from "devextreme-angular";
import {CadastroBaseModule} from "../../../layout/cadastro-base-layout/cadastro/cadastro-base.module";
import {ChamadoContainerComponent} from "./chamado-container.component";
import {ChamadoPresenterComponent} from "./chamado-presenter.component";
import {
    InputSearchDialogUsuariosModule
} from "../../../shared/component/input-search-dialog/input-search-dialog-usuarios/input-search-dialog-usuarios.module";
import {ComentariosComponent} from "./comentarios/comentarios.component";

@NgModule({
  declarations: [
    ChamadoContainerComponent,
    ChamadoPresenterComponent,
    ComentariosComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(UrlRouterUtils.router(ChamadoPresenterComponent)),
        CadastroBaseModule,
        DxTextBoxModule,
        SharedModule,
        InputSearchDialogUsuariosModule,
    ],
})
export class ChamadoModule {
}
