export enum ExpressionLanguage {
  // @ts-ignore
  INTERVALO = {filter: 'bt', filterSia: 'gap', description: 'Entre'},
  // @ts-ignore
  CONTENHA = {filter: 'eic', filterSia: 'c', description: 'Contém', sia7: ''},
  // @ts-ignore
  IGUAL = {filter: '', filterSia: 'eq', description: 'Igual', sia7: '=='},
  // @ts-ignore
  MAIOR = {filter: 'gt', filterSia: 'gt', description: 'Maior que'},
  // @ts-ignore
  MAIOR_IGUAL = {filter: 'ge', filterSia: 'ge', description: 'Maior ou igual a'},
  // @ts-ignore
  MENOR = {filter: 'lt', filterSia: 'lt', description: 'Menor que'},
  // @ts-ignore
  MENOR_IGUAL = {filter: 'le', filterSia: 'le', description: 'Menor ou igual a'},
  // @ts-ignore
  CONTENHA_NAO = {filter: 'inotlike', filterSia: 'nc', description: 'Não contém'},
  // @ts-ignore
  DIFERENTE = {filter: '!', filterSia: 'ne', description: 'Diferente'},
  // @ts-ignore
  NULO = {filter: '=null', filterSia: 'null', description: 'Nulo'},
  // @ts-ignore
  NAO_NULO = {filter: 'nn', filterSia: 'nnull', description: 'Não Nulo'},
  // @ts-ignore
  SEQUENCIA = {filter: 'in', filterSia: 'seq', description: 'Conjunto'},
  // @ts-ignore
  SEQUENCIA_NAO = {filter: 'out', filterSia: 'nseq', description: 'Fora do Conjunto'}
}

export interface FilterOperatorSpec {
  filter: string;
  filterSia: string;
  description: string;
}
