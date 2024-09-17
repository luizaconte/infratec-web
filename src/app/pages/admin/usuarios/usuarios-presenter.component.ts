import {Component} from '@angular/core';

@Component({
  selector: 'sales-usuarios-presenter',
  template: `
    <sales-cadastro-base-layout #presenter [crumbs]="['Administração']" [(model)]="container.usuario" [cadastroBase]="container.cadastroBase"
                              [dadosBase]="container.dadosBase" [enableHandler]="container.enableHandler" [current]="container.cadastroBase.page.currentCrumb"
                              [beforeAction]="container.beforeAction" [autoSearch]="true" >
      <sales-usuarios-container #container [listMode]="presenter.listMode" [enableHandler]="presenter.enableHandler" [beforeAction]="presenter.beforeAction">
      </sales-usuarios-container>
    </sales-cadastro-base-layout>`
})
export class UsuariosPresenterComponent {
}

