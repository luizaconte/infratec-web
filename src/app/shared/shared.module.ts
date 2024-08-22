import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ErrorHandler, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppErrorHandlerService} from '../core/services/app-error-handler.service';
import {DevExpressModule} from '../../@dev-express/dev-express.module';

import {AuthInterceptor} from '../core/interceptor/auth.interceptor';
import {ErrorInterceptor} from '../core/interceptor/error.interceptor';
import {ObjectStateInterceptor} from '../core/interceptor/object-state.interceptor';

import {NotFoundComponent} from './component/page-not-found/not-found.component';
import {FilterModule} from './component/filter/filter.module';

@NgModule({
  imports: [
    FormsModule,
    FilterModule,
    RouterModule,

    HttpClientModule,
    ReactiveFormsModule,
    DevExpressModule,

    CommonModule
  ],
  declarations: [
    NotFoundComponent,
  ],
  providers: [
    {provide: ErrorHandler, useClass: AppErrorHandlerService},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ObjectStateInterceptor, multi: true}
  ],
  exports: [
    CommonModule,
    FormsModule,
    DevExpressModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {
}
