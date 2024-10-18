import {Component, OnInit} from '@angular/core';
import {
  CadastroBaseComponent
} from "../../../layout/cadastro-base-layout/cadastro/cadastro-base/cadastro-base.component";
import {Chamado} from "../../../model/chamado.model";
import {Usuarios} from "../../../model/usuarios.model";
import {TransformPagePipe} from "../../../shared/pipes/transform-page.pipe";
import {CurrentCrumbUtils} from "../../../shared/utils/current-crumb.utils";
import {ButtonAction} from "../../../enum/button-action.enum";
import {EnumUtils} from "../../../shared/utils/enum.utils";

@Component({
  selector: 'infratec-chamado-container',
  template: `
    <ng-container *ngIf="!listMode">
      <div class="row">
        <div class="col-md-2 mb-3">
          <dx-select-box [items]="itensPrioridade" label="Prioridade" valueExpr="type"
                         [(value)]="chamado.prioridade" showClearButton="true" displayExpr="description">
          </dx-select-box>
        </div>
        <div class="col-md-10 mb-3">
          <infratec-input-search-dialog-usuarios [(value)]="chamado.usuarioResponsavel.id"
                                                 placeholder="Usuário Responsável"
                                                 [(description)]="chamado.usuarioResponsavel.nome"
                                                 (dispose)="disposeUsuario($event)">
          </infratec-input-search-dialog-usuarios>
        </div>
        <div class="col-md-9 mb-3">
          <dx-text-box label="Nome" [(value)]="chamado.nome"></dx-text-box>
        </div>
        <div class="col-md-3 mb-3">
          <dx-text-box label="Telefone" [(value)]="chamado.telefone"></dx-text-box>
        </div>
        <div class="col-md-12 mb-3">
          <dx-text-area label="Descrição" [(value)]="chamado.descricao"></dx-text-area>
        </div>

        <ng-container *ngIf="viewEdit">
          <div class="col-md-6 mb-3">
            <dx-text-box label="Abertura" [(value)]="chamado.usuarioResponsavel.nome"
                         [readOnly]="readOnly"></dx-text-box>
          </div>
          <div class="col-md-3 mb-3">
            <dx-date-box label="Data Abertura" [(value)]="chamado.dataInclusao" [readOnly]="readOnly"
                         displayFormat="dd/MM/yyyy"></dx-date-box>
          </div>
          <div class="col-md-3 mb-3">
            <dx-date-box label="Data Alteração" [(value)]="chamado.dataAlteracao" [readOnly]="readOnly"
                         displayFormat="dd/MM/yyyy"></dx-date-box>
          </div>
        </ng-container>

        <infratec-comentarios [comentarios]="chamado.comentarios" title="Andamentos"></infratec-comentarios>
      </div>
    </ng-container>`
})
export class ChamadoContainerComponent extends CadastroBaseComponent implements OnInit {
  chamado: Chamado = new Chamado();
  readOnly = false;

  itensPrioridade = EnumUtils.itensPrioridade;

  viewEdit= false;

  constructor() {
    super();

    this.dadosBase = {
      columns: [
        {caption: 'Id', dataField: 'id', dataType: 'number', width: '90'},
        {caption: 'Nome', dataField: 'nome', dataType: 'string'},
        {
          caption: 'Prioridade', dataField: 'prioridade', dataType: 'string',
          lookup: {dataSource: this.itensPrioridade, displayExpr: 'description', valueExpr: 'type'}
        },
        {caption: 'Abertura', dataField: 'usuarioCriacao.nome', dataType: 'string'},
        {caption: 'Responsável', dataField: 'usuarioResponsavel.nome', dataType: 'string'},
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
        this.viewEdit = true; // TODO- exibir informações criação do chamado
      }
      if (button.action === ButtonAction.ADICIONAR) {
        this.chamado.usuarioResponsavel = new Usuarios();
      }
    });

  }

  disposeUsuario(event): void {
    // TODO infos do usuario
  }
}

