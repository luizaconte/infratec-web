import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {FilterBaseComponent} from './filter-base.component';

import {DxButtonModule, DxFormModule, DxTextBoxModule} from 'devextreme-angular';
import {ExpansionPanelModule} from '../../../shared/component/expansion-panel/expansion-panel.module';
import {DirectiveModule} from "../../../shared/directives/directive.module";

@NgModule({
  declarations: [FilterBaseComponent],
  exports: [
    FilterBaseComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    DxButtonModule,
    DxTextBoxModule,
    ReactiveFormsModule,
    ExpansionPanelModule,
    DxFormModule,
    DirectiveModule
  ]
})
export class FilterBaseModule {
}
