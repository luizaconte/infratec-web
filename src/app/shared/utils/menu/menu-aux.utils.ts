import {MenuAbstract} from './menu.abstract';

import {FuseNavigationItem} from '../../../../@fuse/components/navigation';
import {TransformPagePipe} from '../../pipes/transform-page.pipe';
import {CurrentCrumbUtils} from '../current-crumb.utils';

class MenuAuxUtils implements MenuAbstract {

  get menu(): FuseNavigationItem[] {
    return [
      {
        id: 'aux',
        title: 'Cadastros Auxiliares',
        subtitle: 'Gerenciar informações auxiliares',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
          {
            id: 'aux.cnae',
            title: 'CNAE',
            type: 'basic',
            icon: 'heroicons_outline:color-swatch',
            link: `/${new TransformPagePipe().transform(CurrentCrumbUtils.CNAE).route}`,
          },
          {
            id: 'aux.cnae',
            title: 'CBO',
            type: 'basic',
            icon: 'heroicons_outline:view-grid',
            link: `/${new TransformPagePipe().transform(CurrentCrumbUtils.CBO).route}`
          },
          {
            id: 'aux.enquadramento',
            title: 'Enquadramento',
            type: 'basic',
            icon: 'heroicons_outline:identification',
            link: `/${new TransformPagePipe().transform(CurrentCrumbUtils.ENQUADRAMENTO).route}`,
          },
          {
            id: 'aux.evento-redesim',
            title: 'Evento REDESIM',
            type: 'basic',
            icon: 'heroicons_outline:clipboard-list',
            link: `/${new TransformPagePipe().transform(CurrentCrumbUtils.EVENTO_REDESIM).route}`,
          },
          {
            id: 'aux.forma-atuacao',
            title: 'Forma de Atuação',
            type: 'basic',
            icon: 'heroicons_outline:office-building',
            link: `/${new TransformPagePipe().transform(CurrentCrumbUtils.FORMA_ATUACAO).route}`,
          },
          {
            id: 'aux.motivos-indeferimento',
            title: 'Motivos de Indeferimento',
            type: 'basic',
            icon: 'heroicons_outline:annotation',
            link: `/${new TransformPagePipe().transform(CurrentCrumbUtils.MOTIVOS_INDEFERIMENTO).route}`,
          },
          {
            id: 'aux.natureza-juridica',
            title: 'Natureza Jurídica',
            type: 'basic',
            icon: 'heroicons_outline:scale',
            link: `/${new TransformPagePipe().transform(CurrentCrumbUtils.NATUREZA_JURIDICA).route}`,
          },
          {
            id: 'aux.orgao',
            title: 'Órgãos',
            type: 'basic',
            icon: 'heroicons_outline:library',
            link: `/${new TransformPagePipe().transform(CurrentCrumbUtils.ORGAO).route}`,
          },
          {
            id: 'aux.restricao',
            title: 'Restrição',
            type: 'basic',
            icon: 'heroicons_outline:ban',
            link: `/${new TransformPagePipe().transform(CurrentCrumbUtils.RESTRICAO).route}`,
          },
          {
            id: 'aux.risco-associado',
            title: 'Risco Associado',
            type: 'basic',
            icon: 'heroicons_outline:link',
            link: `/${new TransformPagePipe().transform(CurrentCrumbUtils.RISCO_ASSOCIADO).route}`,
          },
          {
            id: 'aux.situacao',
            title: 'Situação',
            type: 'basic',
            icon: 'heroicons_outline:table',
            link: `/${new TransformPagePipe().transform(CurrentCrumbUtils.SITUACAO).route}`,
          },
          {
            id: 'aux.tipo-redesim',
            title: 'Tipo Inscrição',
            type: 'basic',
            icon: 'heroicons_outline:clipboard-list',
            link: `/${new TransformPagePipe().transform(CurrentCrumbUtils.TIPO_INSCRICAO).route}`,
          },
          {
            id: 'aux.tipo-logradouro',
            title: 'Tipo Logradouro',
            type: 'basic',
            icon: 'heroicons_outline:location-marker',
            link: `/${new TransformPagePipe().transform(CurrentCrumbUtils.TIPO_LOGRADOURO).route}`,
          },
          {
            id: 'aux.tipo-unidade',
            title: 'Tipo Unidade',
            type: 'basic',
            icon: 'heroicons_outline:template',
            link: `/${new TransformPagePipe().transform(CurrentCrumbUtils.TIPO_UNIDADE).route}`,
          },
        ]
      },
    ];
  }
}

export class MenuAuxImpl extends MenuAuxUtils {
  static get menu(): FuseNavigationItem[] {
    return new MenuAuxUtils().menu;
  }
}
