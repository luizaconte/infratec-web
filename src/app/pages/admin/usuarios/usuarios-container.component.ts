import {Component, OnInit} from '@angular/core';
import {
  CadastroBaseComponent
} from "../../../layout/cadastro-base-layout/cadastro/cadastro-base/cadastro-base.component";
import {Usuarios} from "../../../model/usuarios.model";
import {TransformPagePipe} from "../../../shared/pipes/transform-page.pipe";
import {CurrentCrumbUtils} from "../../../shared/utils/current-crumb.utils";
import {ButtonAction} from "../../../enum/button-action.enum";
import {EnumUtils} from "../../../shared/utils/enum.utils";

@Component({
  selector: 'infratec-usuarios-container',
  template: `
    <ng-container *ngIf="!listMode">
      <div class="row">
        <div class="col-md-8 mb-3">
          <dx-text-box label="Nome" [(value)]="usuario.nome"></dx-text-box>
        </div>
        <div class="col-md-4 mb-3">
          <dx-select-box [items]="tiposUsuario" label="Perfil" valueExpr="type"
                         [(value)]="usuario.tipo" showClearButton="true" displayExpr="description">
          </dx-select-box>
        </div>
        <div class="col-md-4 mb-3">
          <dx-text-box label="E-mail" [(value)]="usuario.email"></dx-text-box>
        </div>
        <div class="col-md-4 mb-3">
          <dx-text-box label="Login" [(value)]="usuario.login"></dx-text-box>
        </div>
        <div class="col-md-4 mb-3">
          <dx-text-box [(value)]="usuario.senha" label="Senha" mode="password" [showClearButton]="true"
                       [(mode)]="passwordMode" [readOnly]="readOnly">
            <dxi-button name="visible" location="after" [options]="passwordButton"></dxi-button>
          </dx-text-box>
        </div>
      </div>
    </ng-container>`
})
export class UsuariosContainerComponent extends CadastroBaseComponent implements OnInit {

  usuario: Usuarios = new Usuarios();
  readOnly = false;

  passwordMode: 'text' | 'password' = 'password';

  passwordButton: any;

  tiposUsuario = EnumUtils.tiposPessoa;

  constructor() {
    super();

    this.dadosBase = {
      columns: [
        {caption: 'Id', dataField: 'id', dataType: 'number', width: '90'},
        {caption: 'Nome', dataField: 'nome', dataType: 'string'},
        {caption: 'Login', dataField: 'login', dataType: 'string'},
        {caption: 'E-mail', dataField: 'email', dataType: 'string'},
        {caption: 'Data Inclusão', dataField: 'dataInclusao', dataType: 'date', format: 'dd/MM/yyyy'},
      ],
      columnId: 'id',
    }

    this.cadastroBase = {
      page: new TransformPagePipe().transform(CurrentCrumbUtils.USUARIOS),
    };
  }

  ngOnInit(): void {
    this.passwordButton = {
      icon: 'far fa-eye',
      stylingMode: 'text',
      hint: 'Mostrar/Esconder',
      onClick: (event) => {
        event.component.option('icon', this.passwordMode === 'text' ? 'far fa-eye' : 'far fa-eye-slash');
        this.passwordMode = this.passwordMode === 'text' ? 'password' : 'text';
      }
    };

    this.beforeAction.subscribe(button => {
      if (button.action === ButtonAction.EDITAR || button.action === ButtonAction.VISUALIZAR) {
        this.readOnly = true;
      }
    });

    // TODO - departamento
  }
}

