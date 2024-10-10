import {Component, OnInit} from '@angular/core';
import {
  CadastroBaseComponent
} from "../../../layout/cadastro-base-layout/cadastro/cadastro-base/cadastro-base.component";
import {Chamado} from "../../../model/chamado.model";
import {TransformPagePipe} from "../../../shared/pipes/transform-page.pipe";
import {CurrentCrumbUtils} from "../../../shared/utils/current-crumb.utils";
import {ButtonAction} from "../../../enum/button-action.enum";

@Component({
  selector: 'infratec-chamado-container',
  template: `
    <ng-container *ngIf="!listMode">
      <div class="row">
      </div>

    </ng-container>`
})
export class ChamadoContainerComponent extends CadastroBaseComponent implements OnInit {
  chamado: Chamado = new Chamado();
  readOnly = false;

  constructor() {
    super();

    this.dadosBase = {
      columns: [
        {caption: 'Id', dataField: 'id', dataType: 'number', width: '90'},
      ],
      columnId: 'id',
      buttons: {
        delete: false
      }
    }

    this.cadastroBase = {
      page: new TransformPagePipe().transform(CurrentCrumbUtils.CHAMADO),
    };
  }

  ngOnInit(): void {

    this.beforeAction.subscribe(button => {
      if (button.action === ButtonAction.EDITAR || button.action === ButtonAction.VISUALIZAR) {
        this.readOnly = true;
      }
    });

  }
}

