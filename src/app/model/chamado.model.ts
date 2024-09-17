import {Usuarios} from "./usuarios.model";
import {Comentario} from "./comentario.model";
import {Prioridade} from "../enum/prioridade.enum";

export class Chamado {
  id: number;
  nome: string;
  descricao: string;
  telefone: string;
  prioridade: Prioridade;
  usuarioCriacao: Usuarios;
  usuarioResponsavel: Usuarios;
  comentarios: Array<Comentario>;
  dataInclusao: Date;
  dataAlteracao: Date;

  constructor() {
    this.prioridade = Prioridade.BAIXA;
    this.comentarios = new Array<Comentario>();
    this.usuarioCriacao = new Usuarios();
    this.usuarioResponsavel = new Usuarios();
  }
}
