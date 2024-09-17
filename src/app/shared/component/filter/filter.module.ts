import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {
  DxDateBoxModule,
  DxDropDownBoxModule,
  DxListModule,
  DxNumberBoxModule,
  DxSelectBoxModule,
  DxSwitchModule,
  DxTextBoxModule,
} from 'devextreme-angular';

import {DirectiveModule} from '../../directives/directive.module';
import {FilterUsuariosComponent} from "./filter-usuarios.component";


@NgModule({
  declarations: [FilterUsuariosComponent],
  exports: [],
  imports: [
    CommonModule,
    DxSwitchModule,
    DxTextBoxModule,
    DirectiveModule,
    DxDateBoxModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxDropDownBoxModule,
    DxListModule,

    ReactiveFormsModule,
  ]
})
export class FilterModule {
}
