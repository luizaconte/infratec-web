import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {FuseCardModule} from '../../../@fuse/components/card';

import {
  DxButtonModule,
  DxDateBoxModule,
  DxLoadPanelModule,
  DxRadioGroupModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxToolbarModule,
  DxValidatorModule
} from 'devextreme-angular';

import {SharedModule} from '../../shared/shared.module';
import {CredencialRoutingModule} from './credencial-routing.module';

import {CredencialComponent} from './credencial.component';
import {CredencialLoginComponent} from './credencial-login/credencial-login.component';

@NgModule({
  declarations: [
    CredencialComponent,
    CredencialLoginComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CredencialRoutingModule,

    DxButtonModule,
    DxTextBoxModule,
    DxToolbarModule,
    DxLoadPanelModule,
    DxValidatorModule,
    DxRadioGroupModule,
    DxSelectBoxModule,
    DxDateBoxModule,

    FuseCardModule
  ],
  exports: [RouterModule]
})

export class CredencialModule {
}
