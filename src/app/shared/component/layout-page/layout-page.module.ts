import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DxButtonModule} from 'devextreme-angular';

import {FuseCardModule} from '@fuse/components/card';
import {FuseNavigationModule} from '@fuse/components/navigation/navigation.module';

import {LayoutPageComponent} from './layout-page.component';
import {BreadcrumbsModule} from '../breadcrumbs/breadcrumbs.module';

@NgModule({
  declarations: [
    LayoutPageComponent
  ],
  exports: [
    LayoutPageComponent
  ],
  imports: [
    CommonModule,
    DxButtonModule,
    FuseCardModule,
    FuseNavigationModule,
    BreadcrumbsModule
  ]
})
export class LayoutPageModule {
}
