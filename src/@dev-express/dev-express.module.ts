import {NgModule} from '@angular/core';

import {DxListModule} from 'devextreme-angular';
import {DxSwitchModule} from 'devextreme-angular';
import {DxTagBoxModule} from 'devextreme-angular';
import {DxButtonModule} from 'devextreme-angular';
import {DxDateBoxModule} from 'devextreme-angular';
import {DxTextBoxModule} from 'devextreme-angular';
import {DxCheckBoxModule} from 'devextreme-angular';
import {DxTextAreaModule} from 'devextreme-angular';
import {DxNumberBoxModule} from 'devextreme-angular';
import {DxLoadPanelModule} from 'devextreme-angular';
import {DxSelectBoxModule} from 'devextreme-angular';
import {DxDropDownBoxModule} from 'devextreme-angular';

@NgModule({
  imports: [
    DxListModule,
    DxSwitchModule,
    DxTagBoxModule,
    DxButtonModule,
    DxTextBoxModule,
    DxDateBoxModule,
    DxTextAreaModule,
    DxCheckBoxModule,
    DxNumberBoxModule,
    DxLoadPanelModule,
    DxSelectBoxModule,
    DxDropDownBoxModule
  ],
  exports: [
    DxListModule,
    DxSwitchModule,
    DxTagBoxModule,
    DxButtonModule,
    DxTextBoxModule,
    DxDateBoxModule,
    DxTextAreaModule,
    DxCheckBoxModule,
    DxNumberBoxModule,
    DxLoadPanelModule,
    DxSelectBoxModule,
    DxDropDownBoxModule
  ]
})
export class DevExpressModule {
}
