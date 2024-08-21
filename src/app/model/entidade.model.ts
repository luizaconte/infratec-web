import {VersaoSia} from '../enum/versao-sia.enum';

export class Entidade {
  id: number;
  nome: string;
  cnpj: string;
  versaoSIA: VersaoSia;
  mascaras: Mascaras;

  constructor() {
    this.mascaras = new Mascaras()

  }

}

export class Mascaras {
  mascIptuEmp: string;
  mascMobiEmp: string;
  mascAguaEmp: string;
  mascContribEmp: string;
  mascRuralEmp: string;
  mascMatriculaEmp: string;
  mascReceitaEmp: string;
}
