import {IEnum} from '../../interface/enum.interface';
import {UsuarioType} from "../../enum/type/usuario-type.enum";

export class EnumUtils {

  static get tiposPessoa(): Array<IEnum> {
    return [
      {type: UsuarioType.ADMIN, description: 'Administrador'},
      {type: UsuarioType.SIMPLES, description: 'Simples'},
      {type: UsuarioType.SUPORTE, description: 'Suporte'},
    ];
  }

}
