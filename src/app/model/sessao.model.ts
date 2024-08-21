import {SimNaoSia} from '../enum/sim-nao-sia.enum';
import {Empresa} from './sia8/empresa.model'

export class Sessao {
  empresa: SessaoEmpresa;
  usuario: SessaoUsuario;
  juridico: SessaoJuridico;

  constructor(empresa: Empresa, ufm: string) {
    this.empresa = new SessaoEmpresa(empresa, ufm);
  }
}

class SessaoEmpresa {
  codigo: number;
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  contribuinte: string;
  logo: string;
  codigoTom: string;
  logradouro;
  numero: string;
  complemento: string;
  cep: string;
  idCidade: number;
  idCidadeIBGE: number;
  cidade: string;
  cidadeIBGE: string;
  uf: string;
  idPais: number;
  nomePais: string;
  cidadeProtesto: string;
  valorUFM: number;
  certificadoId: number;
  certificadoDescricao: string;
  certificadoSenha: string;

  constructor(empresa: Empresa, ufm: string) {
    this.valorUFM = parseFloat(ufm.replace(',', '.'));
    this.codigo = empresa.cod_emp;
    this.cnpj = empresa.cnpj_emp;
    this.razaoSocial = empresa.nome_emp;
    this.nomeFantasia = empresa.dept_emp;
    this.contribuinte = empresa.cod_cnt_emp;
    this.logo = empresa.logo_emp;
    this.codigoTom = empresa.codigotom_emp;
    this.logradouro = empresa.logra_end;
    this.numero = empresa.numero_end;
    this.complemento = empresa.comple_end;
    this.cep = empresa.cep_end;
    this.idCidade = empresa.cod_cid_end;
    this.idCidadeIBGE = empresa.cd_municipio_emp;
    this.cidade = empresa.cidade_emp;
    this.cidadeIBGE = empresa.municipio;
    this.uf = empresa.uf_emp;
    this.idPais = empresa.cod_bce_cid;
    this.nomePais = empresa.nomepais_bce;
    this.cidadeProtesto = empresa.cd_municipio_protesto_emp;
    this.certificadoId = empresa.cod_crt_emp;
    this.certificadoDescricao = empresa.descricao_crt;
    this.certificadoSenha = empresa.senha_crt;
  }

}

class SessaoUsuario {
  idAdvogado: number;
  nomeAdvogado: string;
  numeroOAB: string;
  idCertificadoAdvogado: number;
  senhaCertificadoAdvogado: string;
  descricaoCertificadoAdvogado: string;
  permiteAnexarArquivoAnalise: SimNaoSia;
  localidadePadrao: string;
  codOrgao: number;
  codCidade: number;
  usuarioESAJ: string;
  senhaESAJ: string;

  constructor(usuario: any) {
    this.idAdvogado = usuario.cod_advogado_cnf;
    this.nomeAdvogado = usuario.nome_cnt;
    this.numeroOAB = usuario.oab_age;
    this.idCertificadoAdvogado = usuario.cod_crt_age;
    this.senhaCertificadoAdvogado = usuario.senha_crt;
    this.descricaoCertificadoAdvogado = usuario.descricao_crt;
    this.permiteAnexarArquivoAnalise = usuario.permite_anexo_analise_cnf;
    this.localidadePadrao = usuario.localidade_padrao_cnf;
    this.codOrgao = usuario.cod_orgaotj_cnf;
    this.codCidade = usuario.cod_cidadetj_cnf;
    this.usuarioESAJ = usuario.usuario_esaj_cnf;
    this.senhaESAJ = usuario.senha_esaj_cnf;
  }
}

class SessaoJuridico {
  permiteAjuizar: boolean;
  permiteQualificar: boolean;
  permiteIntimacao: boolean;
  permiteCitacao: boolean;
  idAnalistaJuridico: number;
  idProcuradorJuridico: number;
  idProcuradores: Array<number>;
  loginTJRJ: string;
  senhaTJRJ: string;

  constructor(usuario, analista) {
    this.idAnalistaJuridico = usuario.id_analista;
    this.idProcuradorJuridico = usuario.id_procurador;
    this.idProcuradores = usuario.procuradores;
    this.permiteAjuizar = true;
    this.permiteQualificar = true;
    this.permiteIntimacao = true;
    this.permiteCitacao = true;

    if (analista) {
      this.loginTJRJ = analista.login_tjrj_age;
      this.senhaTJRJ = analista.senha_tjrj_age;
      if (usuario.id_analista > 0) {
        this.permiteAjuizar = analista.permite_ajuizar_age === SimNaoSia.SIM;
        this.permiteQualificar = analista.permite_qualificar_age === SimNaoSia.SIM;
        this.permiteIntimacao = analista.permite_intimacao_age === SimNaoSia.SIM;
        this.permiteCitacao = analista.permite_citacao_age === SimNaoSia.SIM;
      }
    }
  }

}
