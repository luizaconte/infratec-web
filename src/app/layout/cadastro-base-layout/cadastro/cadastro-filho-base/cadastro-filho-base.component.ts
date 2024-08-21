import {Component, EventEmitter, Output, ViewChild} from '@angular/core';

import {IBase} from '../cadastro-base.interface';

import {IInputMessage} from '../../../../shared/utils/dialog.utils';

import {CallbackType} from '../../../../enum/type/callback-type.enum';

import {CadastroFilhoBaseLayoutComponent} from './cadastro-filho-base-layout.component';

@Component({
  selector: 'infratec-base-cadastro-filho',
  template: ''
})
export class CadastroFilhoBaseComponent {

  @ViewChild('cadastroFilho', {static: false})
  cadastroFilho: CadastroFilhoBaseLayoutComponent;

  @Output()
  enableHandlerChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  dadosBase: IBase;

  callback: CallbackType;

  inputMessageDelete: IInputMessage;

  showButtons: boolean = true;

  onEnableHandler(handler): void {
    this.enableHandlerChange.emit(!handler);
  }
}

