import {Type} from '@angular/core';

export class UrlRouterUtils {

  static router(component: Type<any>, data?: any): Array<any> {
    return [
      {
        path: '',
        component: component,
        pathMatch: 'full',
        data: data
      },
      {
        path: 'form/:id',
        component: component,
        data: data
      },
      {
        path: 'view/:id',
        component: component,
        data: data
      },
      {
        path: 'form',
        component: component,
        data: data
      }
    ];
  }
}
