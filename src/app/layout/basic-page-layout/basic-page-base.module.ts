import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DxButtonModule, DxDropDownButtonModule, DxLoadPanelModule} from 'devextreme-angular';

import {BasicPageBaseComponent} from './basic-page-base.component';
import {BasicPageBaseLayoutComponent} from './basic-page-base-layout.component';

import {DirectiveModule} from '../../shared/directives/directive.module';
import {ShortcutModule} from '../../shared/component/shortcut/shortcut.module';
import {LayoutPageModule} from '../../shared/component/layout-page/layout-page.module';

@NgModule({
  declarations: [BasicPageBaseLayoutComponent, BasicPageBaseComponent],
  exports: [BasicPageBaseLayoutComponent, BasicPageBaseComponent],
    imports: [
      CommonModule,
      ShortcutModule,
      DirectiveModule,
      LayoutPageModule,

      DxButtonModule,
      DxLoadPanelModule,
      DxDropDownButtonModule,
    ]
})
export class BasicPageBaseModule {}
