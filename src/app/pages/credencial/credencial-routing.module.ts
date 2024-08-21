import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';

import {RouteUtils} from '../../shared/utils/route.utils';

import {CredencialComponent} from './credencial.component';
import {CredencialLoginComponent} from './credencial-login/credencial-login.component';

const routes: Routes = [
  {
    path: '',
    component: CredencialComponent,
    children: [
      {
        path: RouteUtils.CREDENCIAMENTO.LOGIN,
        component: CredencialLoginComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CredencialRoutingModule {
}
