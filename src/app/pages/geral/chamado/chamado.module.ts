import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';


import {UrlRouterUtils} from "../../../shared/utils/url-router.utils";
import {SharedModule} from "../../../shared/shared.module";
import {DxTextBoxModule} from "devextreme-angular";
import {CadastroBaseModule} from "../../../layout/cadastro-base-layout/cadastro/cadastro-base.module";
import {ChamadoContainerComponent} from "./chamado-container.component";
import {ChamadoPresenterComponent} from "./chamado-presenter.component";

@NgModule({
  declarations: [
    ChamadoContainerComponent,
    ChamadoPresenterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UrlRouterUtils.router(ChamadoPresenterComponent)),
    CadastroBaseModule,
    DxTextBoxModule,
    SharedModule,
  ],
})
export class ChamadoModule {
}
