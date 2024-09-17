import {Departamento} from "./departamento.model";
import {UsuarioType} from "../enum/type/usuario-type.enum";

export class Usuarios {
  id: number;
  nome: string;
  login: string;
  senha: string;
  email: string;
  dataInclusao: Date;
  loginInclusao: string;
  dataAlteracao: Date;
  loginAlteracao: string;
  accessKey: string;
  departamento: Departamento;
  tipo: UsuarioType;

  constructor() {
    this.departamento = new Departamento();
    this.tipo = UsuarioType.SIMPLES;
  }
}
