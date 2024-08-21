import {Component, Input, TemplateRef} from '@angular/core';

import {IBasicPageBase} from './basic-page-base.component';

@Component({
  selector: 'infratec-basic-layout-base',
  templateUrl: 'basic-page-base-layout.component.html'
})
export class BasicPageBaseLayoutComponent {

  @Input()
  basicPageBase: IBasicPageBase;

  @Input()
  isDialog = false;

  @Input()
  customButton: TemplateRef<unknown>;

  @Input()
  rowButtons: boolean = true;
}
