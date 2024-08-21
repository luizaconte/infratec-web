import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {CadastroBaseComponent} from './cadastro-base/cadastro-base.component';
import {CadastroBaseLayoutComponent} from './cadastro-base/cadastro-base-layout.component';
import {CadastroFilhoBaseComponent} from './cadastro-filho-base/cadastro-filho-base.component';
import {CadastroFilhoBaseLayoutComponent} from './cadastro-filho-base/cadastro-filho-base-layout.component';

import {CadastroBaseService} from './cadastro-base.service';

import {MatButtonModule} from '@angular/material/button';

import {DxButtonModule, DxLoadPanelModule, DxPopupModule} from 'devextreme-angular';
import {DirectiveModule} from '../../../shared/directives/directive.module';
import {ShortcutModule} from '../../../shared/component/shortcut/shortcut.module';
import {DataGridModule} from '../../../shared/component/data-grid/data-grid.module';
import {LayoutPageModule} from '../../../shared/component/layout-page/layout-page.module';
import {FilterBaseModule} from '../filter-base/filter-base.module';
import {CadastroBaseNavigationService} from './cadastro-base-navigation.service';

@NgModule({
  declarations: [
    CadastroBaseComponent,
    CadastroFilhoBaseComponent,
    CadastroBaseLayoutComponent,
    CadastroFilhoBaseLayoutComponent
  ],
  exports: [
    CadastroBaseLayoutComponent,
    CadastroFilhoBaseLayoutComponent
  ],
  imports: [
    CommonModule,
    DataGridModule,
    DxButtonModule,
    ShortcutModule,
    MatButtonModule,
    DirectiveModule,
    FilterBaseModule,
    LayoutPageModule,
    DxLoadPanelModule,
    ReactiveFormsModule,
    DxPopupModule,
  ],
  providers: [CadastroBaseService, CadastroBaseNavigationService]
})
export class CadastroBaseModule {
}
