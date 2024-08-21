import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DxButtonModule, DxPopupModule, DxScrollViewModule, DxTagBoxModule} from 'devextreme-angular';

import {MatButtonModule} from '@angular/material/button';

import {DialogComponent} from './dialog.component';

import {DataGridModule} from '../data-grid/data-grid.module';
import {FilterBaseModule} from '../../../layout/cadastro-base-layout/filter-base/filter-base.module';
import {CadastroBaseModule} from '../../../layout/cadastro-base-layout/cadastro/cadastro-base.module';
import {DirectiveModule} from '../../directives/directive.module';

@NgModule({
  declarations: [
    DialogComponent
  ],
    imports: [
        CommonModule,
        DxPopupModule,
        DxButtonModule,
        DataGridModule,
        DxTagBoxModule,
        DirectiveModule,
        MatButtonModule,
        FilterBaseModule,
        CadastroBaseModule,
        DxScrollViewModule,
    ],
  exports: [
    DialogComponent
  ]
})
export class DialogModule {
}
