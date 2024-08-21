import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShortcutComponent} from './shortcut.component';
import {DxToolbarModule} from 'devextreme-angular';

@NgModule({
  declarations: [
    ShortcutComponent
  ],
  exports: [
    ShortcutComponent
  ],
  imports: [
    CommonModule,
    DxToolbarModule
  ]
})

export class ShortcutModule {
}
