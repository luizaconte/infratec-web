import {NgModule} from '@angular/core';

import {ButtonActionPipe} from './button-action.pipe';
import {TransformEnumPipe} from './transform-enum.pipe';
import {TransformPagePipe} from './transform-page.pipe';
import {CpfCnpjPipe} from './cpf-cnpj.pipe';
import {CepPipe} from './cep.pipe';
import {TransformTemplatePipe} from './transform-template.pipe';
import {DataViewPipe} from './data-view.pipe';

@NgModule({
  declarations: [
    ButtonActionPipe,
    TransformPagePipe,
    TransformEnumPipe,
    CepPipe,
    CpfCnpjPipe,
    TransformTemplatePipe,
    DataViewPipe
  ],
  exports: [
    TransformEnumPipe, CpfCnpjPipe
  ],
  imports: []
})
export class PipeModule {
}
