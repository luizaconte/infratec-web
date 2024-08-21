import {Injectable} from '@angular/core';

import {FuseNavigationItem} from '../../../@fuse/components/navigation';

@Injectable({
  providedIn: 'root'
})
export class MenuUtils {

  constructor() {
  }

  static get menu(): FuseNavigationItem[] {

    return [];
  }

}
