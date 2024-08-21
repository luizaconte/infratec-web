import {MenuAbstract} from './menu.abstract';

import {FuseNavigationItem} from '../../../../@fuse/components/navigation';
import {TransformPagePipe} from '../../pipes/transform-page.pipe';
import {CurrentCrumbUtils} from '../current-crumb.utils';

class MenuViaUtils implements MenuAbstract {

  get menu(): FuseNavigationItem {
    return {
      id: 'via',
      title: 'Via Rápida',
      icon: 'heroicons_outline:adjustments',
      type: 'collapsable',
      children: [
        {
          id: 'via.licenciamento',
          title: 'Licenciamento',
          type: 'basic',
          link: `/${new TransformPagePipe().transform(CurrentCrumbUtils.LICENCIAMENTO).route}`,
        },
        {
          id: 'via.viabilidade',
          title: 'Viabilidade',
          type: 'basic',
          link: `/${new TransformPagePipe().transform(CurrentCrumbUtils.VIABILIDADE).route}`,
        },
        {
          id: 'via.inscricao-municipal',
          title: 'Inscrição Municipal',
          type: 'basic',
          link: `/${new TransformPagePipe().transform(CurrentCrumbUtils.INSCRICAO_MUNICIPAL).route}`,
        },
      ]
    }
  }
}

export class MenuViaImpl extends MenuViaUtils {

  static get menu(): FuseNavigationItem {
    return new MenuViaUtils().menu;
  }
}
