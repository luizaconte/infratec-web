import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LayoutComponent} from 'app/layout/fuse-template-layout/layout.component';
import {NotFoundComponent} from './shared/component/page-not-found/not-found.component';

import {RouteUtils} from './shared/utils/route.utils';
import {CustomPreloaderUtils} from './shared/utils/custom-preloader.utils';

import {AuthGuard} from './core/guard/auth.guard';
import {InitialDataResolver} from './app.resolvers';
import {RoutingUtils} from './shared/utils/routing/routing.utils';

const routes: Routes = [
  {
    path: RouteUtils.CREDENCIAMENTO.CREDENCIAL,
    component: LayoutComponent,
    data: {
      preload: false,
      layout: 'empty'
    },
    loadChildren: () => import('./pages/credencial/credencial.module').then(module => module.CredencialModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver,
    },
    canActivate: [AuthGuard],
    children: RoutingUtils.appRouting()
  },
  {
    path: '**',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    preloadingStrategy: CustomPreloaderUtils
  })],
  exports: [RouterModule],
  providers: [CustomPreloaderUtils]
})
export class AppRoutingModule {
}
