import {IEnum} from '../../interface/enum.interface';
import {UsuarioType} from "../../enum/type/usuario-type.enum";
import {Prioridade} from "../../enum/prioridade.enum";

export class EnumUtils {

  static get tiposPessoa(): Array<IEnum> {
    return [
      {type: UsuarioType.ADMIN, description: 'Administrador'},
      {type: UsuarioType.SIMPLES, description: 'Simples'},
      {type: UsuarioType.SUPORTE, description: 'Suporte'},
    ];
  }

  static get itensPrioridade(): Array<IEnum> {
    return [
      {type: Prioridade.ALTA, description: 'Alta'},
      {type: Prioridade.MEDIA, description: 'Média'},
      {type: Prioridade.BAIXA, description: 'Baixa'},
    ];
  }

}
