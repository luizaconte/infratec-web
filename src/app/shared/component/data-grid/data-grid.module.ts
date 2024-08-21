import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DataGridComponent} from './data-grid.component';

import {DataGridService} from './data-grid.service';

import {DxDataGridModule, DxToolbarModule, DxTreeListModule} from 'devextreme-angular';

@NgModule({
  declarations: [
    DataGridComponent
  ],
  imports: [
    CommonModule,

    DxToolbarModule,
    DxDataGridModule,
    DxTreeListModule,
  ],
  exports: [
    DataGridComponent
  ],
  providers: [
    DataGridService
  ]
})
export class DataGridModule {
}
