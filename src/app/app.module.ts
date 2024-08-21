import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {APP_INITIALIZER, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule} from '@angular/core';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig} from '@angular/material/snack-bar';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from '@angular/material/form-field';

import {AppComponent} from './app.component';

import {SharedModule} from './shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {LayoutModule} from 'app/layout/fuse-template-layout/layout.module';
import {appConfig} from 'app/layout/fuse-template-layout/core/config/app.config';
import {FuseModule} from '@fuse';
import {FuseConfigModule} from '@fuse/services/config';

import {AppService} from './app.service';
import {CoreModule} from './layout/fuse-template-layout/core/core.module';
import {DefaultComponentsUtils} from "./shared/utils/default-components.utils";

registerLocaleData(localePt, 'pt');

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    SharedModule,

    // Core module of your application
    CoreModule,

    // Layout Module (Sidenav, Toolbar, Quickpanel, Content)
    LayoutModule,

    // Fuse, FuseConfig & FuseMockAPI
    FuseModule,
    FuseConfigModule.forRoot(appConfig)
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'fill'
      } as MatFormFieldDefaultOptions
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom'
      } as MatSnackBarConfig
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (appInit: AppService) => () => appInit.loadConfiguration$,
      multi: true,
      deps: [AppService]
    },
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'},
  ]
})
export class AppModule {
  constructor() {
    DefaultComponentsUtils.configure();
  }
}
