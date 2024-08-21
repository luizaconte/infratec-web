import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DxSpeedDialActionModule, DxTabsModule} from 'devextreme-angular';

import {ResponsiveTabComponent} from './responsive-tab.component';

@NgModule({
  declarations: [
    ResponsiveTabComponent
  ],
  imports: [
    CommonModule,
    DxSpeedDialActionModule,
    DxTabsModule
  ],
  exports: [
    ResponsiveTabComponent
  ]
})
export class ResponsiveTabModule {
}
