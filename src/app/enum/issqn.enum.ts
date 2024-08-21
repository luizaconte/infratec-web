export enum ExigibilidadeIssqn {
  NAO_INFORMADO,
  EXIGIVEL,
  NAO_INCIDENCIA,
  ISENCAO,
  EXPORTACAO,
  IMUNIDADE,
  SUSPENSA_DECISAO_JUDICIAL,
  SUSPENSA_PROCESSO_ADMINISTRATIVO
}

export enum TipoIssqn {
  NAO_POSSUI_ISSQN,
  ESTIMATIVA,
  SOBRE_FATURAMENTO,
  FIXO
}

export enum RegimeEspecial {
  NAO_POSSUI,
  ME_MUNICIPAL,
  ESTIMATIVA,
  SOCIEDADE,
  COOP,
  MEI,
  ME,
  EPP
}

export enum AplicacaoAliquota {
  AliquotaSimples,
  AliquotaMunicipio
}

export enum DeclaracaoPrestador {
  SIMPLIFICADA,
  COMPLETA,
  NAO_DECLARA
}
