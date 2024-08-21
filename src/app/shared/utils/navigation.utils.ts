import {StorageUtils} from './storage.utils';
import {ConstantUtils} from './constant.utils';

import {INavigation} from '../../interface/navigation.interface';

export class NavigationUtils {

  static get navigations(): INavigation[] {
    return JSON.parse(localStorage.getItem(ConstantUtils.STORAGE.NAVIGATION)) ?? [];
  }

  static navigation(componentName: string): INavigation {
    return NavigationUtils.navigations?.find((_navigation: INavigation) => _navigation.componentName === componentName);
  }

  static get current(): string {
    return StorageUtils.valueSession<string>(ConstantUtils.STORAGE.CURRENT_NAVIGATION);
  }
}
