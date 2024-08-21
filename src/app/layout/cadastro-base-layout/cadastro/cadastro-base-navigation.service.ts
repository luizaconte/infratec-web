import {Injectable} from '@angular/core';

import {map, tap} from 'rxjs/operators';
import {Observable, of, switchMap} from 'rxjs';

import {ConstantUtils} from '../../../shared/utils/constant.utils';
import {NavigationUtils} from '../../../shared/utils/navigation.utils';

import {RequestService} from '../../../core/services/request.service';

import {NavigationType} from '../../../enum/type/navigation-type.enum';

import {ButtonsToolbar} from '../../../model/buttons-toolbar.model';
import {Filterable, FilterField} from '../../../model/filterable.model';

import {INavigation} from '../../../interface/navigation.interface';
import {ICustomButtonOption} from '../../../shared/component/data-grid/data-grid.interface';

@Injectable()
export class CadastroBaseNavigationService {

  private _navigation: INavigation;

  constructor(private requestService: RequestService) {
  }

  buttonsNavigation(viewMode: boolean, onClick?: Function): ICustomButtonOption[] {
    return new ButtonsToolbar()
      .add({
        icon: 'fa-solid fa-backward-fast',
        stylingMode: 'text',
        disabled: this.disableBackward(viewMode),
        onClick: () => onClick(NavigationType.PRIMEIRO),
        elementAttr: {'class': 'navigation'}
      })
      .add({
        icon: 'fa-solid fa-backward-step',
        stylingMode: 'text',
        disabled: this.disableBackward(viewMode),
        onClick: () => onClick(NavigationType.ANTERIOR),
        elementAttr: {'class': 'navigation'}
      })
      .add({
        icon: 'fa-solid fa-forward-step',
        stylingMode: 'text',
        disabled: this.disableForward(viewMode),
        onClick: () => onClick(NavigationType.PROXIMO),
        elementAttr: {'class': 'navigation'}
      })
      .add({
        icon: 'fa-solid fa-forward-fast',
        stylingMode: 'text',
        disabled: this.disableForward(viewMode),
        onClick: () => onClick(NavigationType.ULTIMO),
        elementAttr: {'class': 'navigation'}
      })
      .buttons;
  }

  handlerNavigation(columnId: string, componentName: string, navigationType: NavigationType): Observable<number> {
    return of(true).pipe(
      switchMap(() => {
        switch (navigationType) {
          case NavigationType.PRIMEIRO:
            return this.firstOrLast(componentName, columnId, navigationType);
          case NavigationType.PROXIMO:
            return this.backOrNext(componentName, columnId, navigationType);
          case NavigationType.ANTERIOR:
            return this.backOrNext(componentName, columnId, navigationType);
          case NavigationType.ULTIMO:
            return this.firstOrLast(componentName, columnId, navigationType);
        }
      }),
      tap((value: number) => this.refreshStorageNavigation(componentName, 'currentNavigation', value))
    );
  }

  refreshStorageNavigation(componentName: string, attribute: string, value: unknown) {
    const navigations: INavigation[] = NavigationUtils.navigations;
    const foundNavigation: number = this.foundNavigationStorage(componentName);
    if (foundNavigation >= 0) {
      navigations[foundNavigation][attribute] = value;
      localStorage.setItem(ConstantUtils.STORAGE.NAVIGATION, JSON.stringify(navigations));
      this._navigation = navigations[foundNavigation];
    }
  }

  configNavigation(navigation: INavigation): void {
    const navigations: INavigation[] = NavigationUtils.navigations;
    const foundNavigation: number = this.foundNavigationStorage(navigation.componentName);
    foundNavigation >= 0 ? navigations[foundNavigation] = navigation : navigations.push(navigation);
    localStorage.setItem(ConstantUtils.STORAGE.NAVIGATION, JSON.stringify(navigations));
    this._navigation = navigation;
  }

  get navigation(): INavigation {
    return this._navigation;
  }

  set navigation(navigation: INavigation) {
    this._navigation = navigation;
  }

  private backOrNext(componentName: string, columnId: string, navigationType: NavigationType): Observable<unknown> {
    return of(true).pipe(
      switchMap(() => {
        let index: number = this.indexOfItemNavigation();
        const step: string = this.navigation.items[navigationType === NavigationType.PROXIMO ? index + 1 : index - 1];
        if (!!step) {
          return of(step);
        }
        const pageIndex: number = navigationType === NavigationType.PROXIMO ? this.navigation.pageIndex + 1 : this.navigation.pageIndex - 1;
        const url: string = `${this.navigation.url}?limit=${this.navigation.pageSize}&offset=${pageIndex * this.navigation.pageSize}`;
        return this.requestService
          .pageResult$(this.url(url)).pipe(
            map(value => {
              this.refreshStorageNavigation(componentName, 'pageIndex', pageIndex);
              this.refreshStorageNavigation(componentName, 'items', value.data?.map((value: unknown) => String(value[columnId as string])));
              return value.data[navigationType === NavigationType.PROXIMO ? 0 : this.navigation.items?.length - 1][columnId];
            })
          );
      })
    );
  }

  private firstOrLast(componentName: string, columnId: string, navigationType: NavigationType): Observable<unknown> {
    const url: string = navigationType === NavigationType.ULTIMO ?
      `${this.navigation.url}?limit=${this.navigation.pageSize}&offset=${this.navigation.totalNavigationCount - this.navigation.pageSize}` :
      `${this.navigation.url}?limit=${this.navigation.pageSize}`;
    const pageIndex: number = navigationType === NavigationType.ULTIMO ? this.navigation.totalPageCount - 1 : 0;
    return this.requestService.pageResult$(this.url(url)).pipe(
      map(value => {
        this.refreshStorageNavigation(componentName, 'pageIndex', pageIndex);
        this.refreshStorageNavigation(componentName, 'items', value.data?.map((value: unknown) => String(value[columnId as string])));
        return value.data[navigationType === NavigationType.PRIMEIRO ? 0 : this.navigation.items?.length - 1][columnId];
      })
    );
  }

  private foundNavigationStorage(componentName: string): number {
    return NavigationUtils.navigations?.findIndex((_navigation: INavigation) => _navigation.componentName === componentName);
  }

  private disableBackward(viewMode: boolean): boolean {
    return this.defaultDisable(viewMode) || (this.navigation.pageIndex === 0 && this.navigation.items[0] === NavigationUtils.current);
  }

  private disableForward(viewMode: boolean): boolean {
    return this.defaultDisable(viewMode) || (this.navigation.pageIndex === (this.navigation.totalPageCount - 1) && this.navigation.items[this.navigation.items?.length - 1] === NavigationUtils.current);
  }

  private defaultDisable(viewMode: boolean): boolean {
    let disabled: boolean = !this.navigation;
    if (!disabled) {
      disabled = !viewMode || !this.navigation.items.find((value: string) => value === NavigationUtils.current);
    }
    return disabled;
  }

  private url(url: string): string {
    const filterable: Filterable = new Filterable();
    if (!this.navigation.filterable) {
      this.navigation.filterable = new Filterable();
    }
    this.navigation.filterable._query.forEach((item: any) => filterable.add(new FilterField(item._name, item._expression, null, item._value)));
    let _url: string = filterable.createUrl(url, false);
    if (this.navigation.sortable) {
      _url += `&sort${this.navigation.sortable}`
    }
    return _url;
  }


  private indexOfItemNavigation(): number {
    return this.navigation?.items.findIndex((value: string) => value === NavigationUtils.current);
  }
}
