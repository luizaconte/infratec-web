import {Component} from '@angular/core';

@Component({
  selector: 'infratec-departamento-presenter',
  template: `
    <infratec-cadastro-base-layout #presenter [crumbs]="['Administração']" [(model)]="container.departamento" [cadastroBase]="container.cadastroBase"
                              [dadosBase]="container.dadosBase" [enableHandler]="container.enableHandler" [current]="container.cadastroBase.page.currentCrumb"
                              [beforeAction]="container.beforeAction" [autoSearch]="true" >
      <infratec-departamento-container #container [listMode]="presenter.listMode" [enableHandler]="presenter.enableHandler" [beforeAction]="presenter.beforeAction">
      </infratec-departamento-container>
    </infratec-cadastro-base-layout>`
})
export class DepartamentoPresenterComponent {

}

