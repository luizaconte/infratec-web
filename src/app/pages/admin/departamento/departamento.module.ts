import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';


import {UrlRouterUtils} from "../../../shared/utils/url-router.utils";
import {SharedModule} from "../../../shared/shared.module";
import {DxTextBoxModule} from "devextreme-angular";
import {CadastroBaseModule} from "../../../layout/cadastro-base-layout/cadastro/cadastro-base.module";
import {DepartamentoContainerComponent} from "./departamento-container.component";
import {DepartamentoPresenterComponent} from "./departamento-presenter.component";

@NgModule({
  declarations: [
    DepartamentoContainerComponent,
    DepartamentoPresenterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UrlRouterUtils.router(DepartamentoPresenterComponent)),
    CadastroBaseModule,
    DxTextBoxModule,
    SharedModule,
  ],
})
export class DepartamentoModule {
}
