import {Component, Input} from '@angular/core';

import {Comentario} from "../../../../model/comentario.model";
import {
  CadastroFilhoBaseComponent
} from "../../../../layout/cadastro-base-layout/cadastro/cadastro-filho-base/cadastro-filho-base.component";
import {IIHandlerActionFilho} from "../../../../interface/handler-actions.interface";

@Component({
  selector: 'infratec-comentarios',
  template: `
    <infratec-cadastro-filho-base-layout #cadastroFilho [(objects)]="comentarios" [(object)]="comentario"
                                         [dadosBase]="dadosBase"
                                         (toggleAction)="onToggleAction($event)"
                                         (enableHandler)="onEnableHandler($event)" [callback]="callback">
      <ng-container *ngIf="cadastroFilho.editingMode">
        <div class="col-md-12 mb-3">
          <dx-text-area label="Descrição" [(value)]="comentario.descricao"></dx-text-area>
        </div>
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
        {caption: 'Descrição', dataField: 'descricao', dataType: 'string'},
        {caption: 'Data Inclusão', dataField: 'dataInclusao', dataType: 'datetime'},
      ],
      columnId: 'id',
      buttons: {
        delete: false
      }
    };
  }


  onToggleAction(event: IIHandlerActionFilho): void {
    if (event.editingMode && !event.isEdit) {
      this.comentario = new Comentario();
    }
  }

}

