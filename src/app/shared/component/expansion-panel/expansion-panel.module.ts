import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {FuseCardModule} from '../../../../@fuse/components/card';

import {ExpansionPanelComponent} from './expansion-panel.component';

@NgModule({
  declarations: [
    ExpansionPanelComponent
  ],
  exports: [
    ExpansionPanelComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    FuseCardModule,
    MatButtonModule,
    MatExpansionModule
  ]
})
export class ExpansionPanelModule {
}
