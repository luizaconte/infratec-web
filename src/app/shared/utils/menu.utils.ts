import {Injectable} from '@angular/core';

import {MenuAdmImpl} from './menu/menu-adm.utils';
import {FuseNavigationItem} from '../../../@fuse/components/navigation';
import {MenuGeralImpl} from "./menu/menu-geral.utils";
import {ConstantUtils} from "./constant.utils";
import {SharedUtils} from "./shared.utils";

@Injectable({
  providedIn: 'root'
})
export class MenuUtils {

  constructor() {
  }

  static get menu(): FuseNavigationItem[] {
    const token = SharedUtils.valueStorage(ConstantUtils.STORAGE.TOKEN, 'sessionStorage');
    let payload;
    if (token && token?.accessToken) {
      const jwtParts: string[] = token.accessToken.split('.');
      payload = JSON.parse(window.atob(decodeURIComponent(jwtParts[1])));
    }

    const isUserAdmin: boolean = payload?.type === "Administrador";

    if (isUserAdmin === false) {
      return MenuGeralImpl.menu;
    } else {
      return MenuAdmImpl.menu.concat(MenuGeralImpl.menu);
    }
  }

}
