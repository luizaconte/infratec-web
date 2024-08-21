import {NgModule} from '@angular/core';

import {FocusDirective} from './focus.directive';
import {DoubleClickDirective} from './double-click.directive';
import {InputMaskDirective} from './input-mask.directive';

@NgModule({
  declarations: [
    FocusDirective,
    DoubleClickDirective,
    InputMaskDirective
  ],
  exports: [
    FocusDirective,
    DoubleClickDirective,
    InputMaskDirective
  ]
})
export class DirectiveModule {
}
