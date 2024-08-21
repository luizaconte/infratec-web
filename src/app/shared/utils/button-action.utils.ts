import {ButtonAction} from '../../enum/button-action.enum';

import {IButtonsActionUtils} from '../../interface/button-action.interface';

export class ButtonActionUtils {
  static get types(): Array<IButtonsActionUtils> {
    return [
      {type: ButtonAction.EDITAR, icon: 'fas fa-edit', text: 'Editar', hint: 'Editar Registro', property: 'edit', widget: 'dxButton'},
      {type: ButtonAction.NAVEGACAO, icon: null, text: null, hint: null, property: 'navigation', widget: 'dxButton'},
      {type: ButtonAction.EXCLUIR, icon: 'fas fa-trash', text: 'Excluir', hint: 'Excluir Registro', property: 'delete', widget: 'dxButton', style: 'danger'},
      {type: ButtonAction.ADICIONAR, icon: 'fas fa-plus', text: 'Novo', hint: 'Novo Registro', property: 'new', widget: 'dxButton', style: 'default'},
      {type: ButtonAction.VISUALIZAR, icon: 'fas fa-eye', text: 'Visualizar', hint: 'Visualizar Registro', property: 'view', widget: 'dxButton'},
      {type: ButtonAction.IMPRIMIR, icon: 'fas fa-print', text: 'Imprimir', hint: 'Imprimir Relatório', property: 'edit', widget: 'dxButton'},
      {type: ButtonAction.FINALIZAR, icon: 'fas fa-circle-check', text: 'Finalizar', hint: 'Finalizar Solicitação', property: 'edit', widget: 'dxButton'},
      {type: ButtonAction.CANCELAR, icon: 'fas fa-times-circle', text: 'Cancelar', hint: 'Cancelar Solicitação', property: 'edit', widget: 'dxButton'},
      {type: ButtonAction.TAXAS, icon: 'fas fa-file-invoice', text: 'Taxa de Abertura/Alteração', hint: 'Taxa de Abertura/Alteração', property: 'edit', widget: 'dxButton'},
      {type: ButtonAction.NOTIFICAR, icon: 'fas fa-exclamation-circle', text: 'Notificar Recebimento', hint: 'Informar Recebimento', property: 'edit', widget: 'dxButton'},
      {type: ButtonAction.ANALISAR, icon: 'fas fa-user-shield', text: 'Analisar', hint: 'Analisar', property: 'edit', widget: 'dxButton'},
      {type: ButtonAction.ENVIAR_INSCRI, icon: 'fas fa-exclamation-circle', text: 'Enviar Inscrição Municipal', hint: 'Informar Inscrição Municipal', property: 'edit', widget: 'dxButton'},
      {type: ButtonAction.RESPONDER, icon: 'fas fa-reply-all', text: 'Responder', hint: 'Enviar resposta da solicitação', property: 'edit', widget: 'dxButton'},
    ];
  }
}
