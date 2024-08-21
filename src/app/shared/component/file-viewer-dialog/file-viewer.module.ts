import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {DxButtonModule} from 'devextreme-angular';
import {DxPopupModule} from 'devextreme-angular/ui/popup';
import {DxScrollViewModule} from 'devextreme-angular/ui/scroll-view';

import {FileViewerComponent} from './file-viewer.component';
import {PdfViewerModule} from '../pdf-viewer/pdf-viewer.module';
import {PipeModule} from '../../pipes/pipe.module';

@NgModule({
  declarations: [FileViewerComponent],
  exports: [FileViewerComponent],
  imports: [
    CommonModule,
    DxPopupModule,
    DxButtonModule,
    DxScrollViewModule,

    PdfViewerModule
  ]
})

export class FileViewerModule {
}
