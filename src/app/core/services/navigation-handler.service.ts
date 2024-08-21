import {Injectable} from '@angular/core';

import {cloneDeep} from 'lodash';

import {FuseNavigationItem} from '../../../@fuse/components/navigation';

import {Navigation} from '../../layout/fuse-template-layout/core/navigation/navigation.types';
import {MenuUtils} from '../../shared/utils/menu.utils';

@Injectable({
  providedIn: 'root'
})
export class NavigationHandlerService {

  private _navigation: Navigation;
  private _defaultNavigation: FuseNavigationItem[] = [];
  private readonly _compactNavigation: FuseNavigationItem[] = [];
  private readonly _futuristicNavigation: FuseNavigationItem[] = [];
  private readonly _horizontalNavigation: FuseNavigationItem[] = [];

  constructor() {
    this.registerHandlers();
  }

  registerHandlers(): void {
    this._defaultNavigation = MenuUtils.menu;

    this._compactNavigation.forEach((compactNavItem) => {
      this._defaultNavigation.forEach((defaultNavItem) => {
        if (defaultNavItem.id === compactNavItem.id) {
          compactNavItem.children = cloneDeep(defaultNavItem.children);
        }
      });
    });
    this._futuristicNavigation.forEach((futuristicNavItem) => {
      this._defaultNavigation.forEach((defaultNavItem) => {
        if (defaultNavItem.id === futuristicNavItem.id) {
          futuristicNavItem.children = cloneDeep(defaultNavItem.children);
        }
      });
    });
    this._horizontalNavigation.forEach((horizontalNavItem) => {
      this._defaultNavigation.forEach((defaultNavItem) => {
        if (defaultNavItem.id === horizontalNavItem.id) {
          horizontalNavItem.children = cloneDeep(defaultNavItem.children);
        }
      });
    });
    this._navigation = {
      compact: cloneDeep(this._compactNavigation),
      default: cloneDeep(this._defaultNavigation),
      futuristic: cloneDeep(this._futuristicNavigation),
      horizontal: cloneDeep(this._horizontalNavigation)
    }
  }

  get navigation(): Navigation {
    this._navigation.default = MenuUtils.menu;
    return this._navigation;
  }
}
