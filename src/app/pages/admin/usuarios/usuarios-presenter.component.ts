import {Component} from '@angular/core';

@Component({
  selector: 'infratec-usuarios-presenter',
  template: `
    <infratec-cadastro-base-layout #presenter [crumbs]="['Administração']" [(model)]="container.usuario" [cadastroBase]="container.cadastroBase"
                              [dadosBase]="container.dadosBase" [enableHandler]="container.enableHandler" [current]="container.cadastroBase.page.currentCrumb"
                              [beforeAction]="container.beforeAction" [autoSearch]="true" >
      <infratec-usuarios-container #container [listMode]="presenter.listMode" [enableHandler]="presenter.enableHandler" [beforeAction]="presenter.beforeAction">
      </infratec-usuarios-container>
    </infratec-cadastro-base-layout>`
})
export class UsuariosPresenterComponent {
}

