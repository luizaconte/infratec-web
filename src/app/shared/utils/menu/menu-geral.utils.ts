import {MenuAbstract} from './menu.abstract';

import {FuseNavigationItem} from '../../../../@fuse/components/navigation';
import {TransformPagePipe} from '../../pipes/transform-page.pipe';
import {CurrentCrumbUtils} from '../current-crumb.utils';

class MenuGeralUtils implements MenuAbstract {

  get menu(): FuseNavigationItem[] {
    return [
      {
        id: 'geral',
        title: 'Cadastros Gerais',
        subtitle: 'Gerenciar informações do sistema',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
          {
            id: 'solicitacao',
            title: 'Solicitação',
            type: 'basic',
            icon: 'heroicons_outline:inbox-in',
            link: `/${new TransformPagePipe().transform(CurrentCrumbUtils.SOLICITACAO).route}`,
          }
        ]
      }]
  }
}

export class MenuGeralImpl extends MenuGeralUtils {

  static get menu(): FuseNavigationItem[] {
    return new MenuGeralUtils().menu;
  }
}
