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
            id: 'usuarios',
            title: 'Usuários',
            type: 'basic',
            icon: 'heroicons_outline:user-circle',
            link: `/${new TransformPagePipe().transform(CurrentCrumbUtils.USUARIOS).route}`,
          },
          {
            id: 'departamento',
            title: 'Departamento',
            type: 'basic',
            icon: 'heroicons_outline:user-group',
            link: `/${new TransformPagePipe().transform(CurrentCrumbUtils.DEPARTAMENTO).route}`,
          },
        ]
      }]
  }
}

export class MenuAdmImpl extends MenuAdmUtils {

  static get menu(): FuseNavigationItem[] {
    return new MenuAdmUtils().menu;
  }
}
