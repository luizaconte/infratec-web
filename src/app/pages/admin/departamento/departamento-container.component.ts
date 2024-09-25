import {Component, OnInit} from '@angular/core';
import {
  CadastroBaseComponent
} from "../../../layout/cadastro-base-layout/cadastro/cadastro-base/cadastro-base.component";
import {Departamento} from "../../../model/departamento.model";
import {TransformPagePipe} from "../../../shared/pipes/transform-page.pipe";
import {CurrentCrumbUtils} from "../../../shared/utils/current-crumb.utils";
import {ButtonAction} from "../../../enum/button-action.enum";

@Component({
  selector: 'infratec-departamento-container',
  template: `
    <ng-container *ngIf="!listMode">
      <div class="row">
        <div class="col-md-8 mb-3">
          <dx-text-box label="Nome" [(value)]="departamento.nome"></dx-text-box>
        </div>

      </div>

    </ng-container>`
})
export class DepartamentoContainerComponent extends CadastroBaseComponent implements OnInit {
  departamento: Departamento = new Departamento();
  readOnly = false;

  constructor() {
    super();

    this.dadosBase = {
      columns: [
        {caption: 'Id', dataField: 'id', dataType: 'number', width: '90'},
        {caption: 'Nome', dataField: 'nome', dataType: 'string'},
      ],
      columnId: 'id',
    }

    this.cadastroBase = {
      page: new TransformPagePipe().transform(CurrentCrumbUtils.DEPARTAMENTO),
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

