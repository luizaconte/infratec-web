import {MenuAbstract} from './menu.abstract';

import {FuseNavigationItem} from '../../../../@fuse/components/navigation';
import {TransformPagePipe} from '../../pipes/transform-page.pipe';
import {CurrentCrumbUtils} from '../current-crumb.utils';

class MenuAdmUtils implements MenuAbstract {

  get menu(): FuseNavigationItem[] {
    return [
      {
        id: 'adm',
        title: 'Administração',
        subtitle: 'Informações sensíveis do sistema',
        type: 'group',
        children: [
          {
            id: 'adm.config',
            title: 'Configurações',
            type: 'basic',
            icon: 'heroicons_outline:cog',
            link: `/${new TransformPagePipe().transform(CurrentCrumbUtils.CONFIGURACOES).route}`,
          },
          {
            id: 'adm.logs',
            title: 'Logs Sincronização',
            type: 'basic',
            icon: 'heroicons_outline:collection',
            link: `/${new TransformPagePipe().transform(CurrentCrumbUtils.LOG_SINCRONIZACAO).route}`,
          },
        ]
      }

    ];
  }
}

export class MenuAdmImpl extends MenuAdmUtils {
  static get menu(): FuseNavigationItem[] {
    return new MenuAdmUtils().menu;
  }
}
