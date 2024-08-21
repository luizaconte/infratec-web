import {MenuAbstract} from './menu.abstract';

import {FuseNavigationItem} from '../../../../@fuse/components/navigation';
import {TransformPagePipe} from '../../pipes/transform-page.pipe';
import {CurrentCrumbUtils} from '../current-crumb.utils';

class MenuEmpreendedorUtils implements MenuAbstract {

  get menu(): FuseNavigationItem {
    return {
      id: 'empreendedor',
      title: 'Empreendedor Digital',
      icon: 'heroicons_outline:adjustments',
      type: 'collapsable',
      children: [
        {
          id: 'empreendedor.licenciamento',
          title: 'Licenciamento',
          type: 'basic',
          link: `/${new TransformPagePipe().transform(CurrentCrumbUtils.LICENCIAMENTO_EMPREENDEDOR).route}`,
        },
        {
          id: 'empreendedor.viabilidade',
          title: 'Viabilidade',
          type: 'basic',
          link: `/${new TransformPagePipe().transform(CurrentCrumbUtils.VIABILIDADE_EMPREENDEDOR).route}`,
        },
      ]
    }
  }
}

export class MenuEmpreendedorImpl extends MenuEmpreendedorUtils {

  static get menu(): FuseNavigationItem {
    return new MenuEmpreendedorUtils().menu;
  }
}
