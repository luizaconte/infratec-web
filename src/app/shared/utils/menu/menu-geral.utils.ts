import {MenuAbstract} from './menu.abstract';

import {FuseNavigationItem} from '../../../../@fuse/components/navigation';
import {TransformPagePipe} from '../../pipes/transform-page.pipe';
import {CurrentCrumbUtils} from '../current-crumb.utils';

class MenuGeralUtils implements MenuAbstract {

  get menu(): FuseNavigationItem[] {
    return [
      {
        id: 'adm',
        title: 'Geral',
        subtitle: 'Cadastros gerais do sistema',
        type: 'group',
        children: [
          {
            id: 'chamados',
            title: 'Chamados',
            type: 'basic',
            icon: 'heroicons_outline:clipboard-check',
            link: `/${new TransformPagePipe().transform(CurrentCrumbUtils.CHAMADO).route}`,
          },
        ]
      }]
  }
}

export class MenuGeralImpl extends MenuGeralUtils {

  static get menu(): FuseNavigationItem[] {
    return new MenuGeralUtils().menu;
  }
}
