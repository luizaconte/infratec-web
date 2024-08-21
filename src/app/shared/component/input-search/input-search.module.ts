import {NgModule} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';

import {DxTextBoxModule} from 'devextreme-angular';

import {InputSearchComponent} from './input-search.component';
import {InputSearchReadonlyPipe} from './input-search-readonly.pipe';

@NgModule({
  declarations: [
    InputSearchComponent
  ],
  exports: [
    InputSearchComponent
  ],
  imports: [
    CommonModule,
    DxTextBoxModule,
    NgIf,
    InputSearchReadonlyPipe
  ]
})
export class InputSearchModule {
}
