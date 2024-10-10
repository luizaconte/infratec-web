import {Component} from '@angular/core';

@Component({
  selector: 'infratec-chamado-presenter',
  template: `
    <infratec-cadastro-base-layout #presenter [crumbs]="['Geral']" [(model)]="container.chamado" [cadastroBase]="container.cadastroBase"
                              [dadosBase]="container.dadosBase" [enableHandler]="container.enableHandler" [current]="container.cadastroBase.page.currentCrumb"
                              [beforeAction]="container.beforeAction" [autoSearch]="true" >
      <infratec-chamado-container #container [listMode]="presenter.listMode" [enableHandler]="presenter.enableHandler" [beforeAction]="presenter.beforeAction">
      </infratec-chamado-container>
    </infratec-cadastro-base-layout>`
})
export class ChamadoPresenterComponent {

}

