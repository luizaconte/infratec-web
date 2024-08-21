import {Status} from '../enum/status.enum';

export class FileServerCadastro {
  cod_cad: number;
  origem_cad: string;
  tabela_cad: string;
  sistema_cad: string;

  cod_pas: number;
  descr_pas: string;

  mainFolder: FileServerPasta;

  login_inc_cad: string;
  dta_inc_cad: string;
  login_alt_cad: string;
  dta_alt_cad: string;

  constructor() {
    this.mainFolder = new FileServerPasta();
    this.mainFolder.raiz_pas = Status.ATIVO;
  }
}

export class FileServerPasta {
  cod_pas: number;
  descr_pas: string;
  cod_cad_pas: number;
  raiz_pas: Status;
  alterar_pas: Status;
  excluir_pas: Status;
  abrir_pas: Status;
  criar_pas: Status;
  upload_pas: Status;
  oculto_pas: Status;
  file_size_pas: number;
  status_pas: FileServerStatusType;

  login_inc_pas: string;
  dta_inc_pas: string;
  login_alt_pas: string;
  dta_alt_pas: string;

  constructor() {
    this.raiz_pas = Status.INATIVO;
    this.alterar_pas = Status.INATIVO;
    this.excluir_pas = Status.INATIVO;
    this.abrir_pas = Status.ATIVO;
    this.criar_pas = Status.INATIVO;
    this.upload_pas = Status.INATIVO;
    this.oculto_pas = Status.INATIVO;
  }
}

export class FileServerArquivo {
  id_fta: number;
  cod_arq: number;
  cod_pas_arq: number;
  content_type_arq: string;
  nome_arq: string;
  descricao_arq: string;
  tamanho_arq: number;
  pagina_final_arq: number;
  pagina_inicial_arq: number;
  alterar_arq: Status;
  download_arq: Status;
  excluir_arq: Status;
  ocerizar_arq: Status;
  assinar_arq: Status;
  oculto_arq: Status;
  status_arq: FileServerStatusType;
  ordem_arq: number;

  possui_assinatura_arq?: Status;
  generated_arq?: Status;

  paginas: Array<number>;

  login_inc_arq: string;
  dta_inc_arq: string;
  login_alt_arq: string;
  dta_alt_arq: string;

  constructor() {
    this.alterar_arq = Status.INATIVO;
    this.download_arq = Status.ATIVO;
    this.excluir_arq = Status.INATIVO;
    this.ocerizar_arq = Status.ATIVO;
    this.assinar_arq = Status.INATIVO;
    this.status_arq = FileServerStatusType.ATIVO;

    this.possui_assinatura_arq = Status.INATIVO;
    this.generated_arq = Status.INATIVO;
  }
}

export enum FileServerStatusType {
  ATIVO,
  TEMPORARIO
}
