import {Injectable} from '@angular/core';

import {MenuAdmImpl} from './menu/menu-adm.utils';
import {FuseNavigationItem} from '../../../@fuse/components/navigation';
import {MenuGeralImpl} from "./menu/menu-geral.utils";

@Injectable({
  providedIn: 'root'
})
export class MenuUtils {

  constructor() {
  }

  static get menu(): FuseNavigationItem[] {
    // TODO- validar tipo de usuário
    return MenuAdmImpl.menu.concat(MenuGeralImpl.menu);
  }

}
