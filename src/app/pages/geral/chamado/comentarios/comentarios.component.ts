import {Component, Input} from '@angular/core';

import {Comentario} from "../../../../model/comentario.model";
import {
  CadastroFilhoBaseComponent
} from "../../../../layout/cadastro-base-layout/cadastro/cadastro-filho-base/cadastro-filho-base.component";

@Component({
  selector: 'infratec-comentarios',
  template: `
    <infratec-cadastro-filho-base-layout #cadastroFilho [(objects)]="comentarios" [(object)]="comentario"
                                         [dadosBase]="dadosBase"
                                         (enableHandler)="onEnableHandler($event)" [callback]="callback">
      <ng-container *ngIf="cadastroFilho.editingMode">
      </ng-container>
      <dx-load-panel [(visible)]="showLoading" shadingColor="rgba(0, 0, 0, 0.4)"
                     [position]="{my: 'center', at: 'center'}"></dx-load-panel>

    </infratec-cadastro-filho-base-layout>
  `,
})
export class ComentariosComponent extends CadastroFilhoBaseComponent {
  @Input()
  comentarios: Array<Comentario> = new Array<Comentario>();

  comentario: Comentario = new Comentario();

  showLoading = false

  constructor() {
    super();

    this.dadosBase = {
      columns: [
        {caption: 'Id', dataField: 'id', dataType: 'number'},
      ],
      columnId: 'id',
    };
  }


}

