import Swal from 'sweetalert2/dist/sweetalert2.js';

import {InputMessageType} from '../../enum/type/input-message-type.enum';
import {SharedUtils} from './shared.utils';

export class DialogUtils {

  static custom(title: string, text: unknown, icon: 'warning' | 'error' | 'success' | 'question' | 'info', args?: any): Promise<any> {
    let options = {title, text: text ?? 'Ocorreu um erro inesperado', icon};
    if (args) {
      options = Object.assign(options, args);
    }
    return Swal.fire(args ? options : title, text ?? 'Ocorreu um erro inesperado', icon);
  }

  static customMessage(res: any): void {
    const isHtml: boolean = res.error?.length > 1;
    let message: string = res['message'] ?? 'Ocorreu um erro inesperado';
    const type: IMessageType = this.messageType(res);
    if (isHtml) {
      message = '';
      res.error?.forEach((error: unknown) => message += `<li>${error[type.action]}</li>`);
    } else if (res.error?.length === 1) {
      message = res.error[0][type.action];
    } else if (res.error[type.action]) {
      message = res.error[type.action];
    }
    DialogUtils[type.action](type.title, message, isHtml);
  }

  static customError(resp, title: string): void {
    let isHtml = false;
    let errorMessage = 'Ocorreu um erro inesperado';
    if (SharedUtils.isJson(resp?.error?.error)) {
      isHtml = true;
      errorMessage = '';
      JSON.parse(resp.error.error).forEach(err => errorMessage += `<li>${err?.error}</li>`);
    } else if (resp.error?.length > 1) {
      isHtml = true;
      errorMessage = '';
      resp.error.forEach(err => errorMessage += `<li>${err?.error}</li>`);
    } else if (resp.error?.length === 1) {
      errorMessage = resp.error[0].error;
    } else if (resp.error?.error) {
      errorMessage = resp.error.error;
    } else if (resp.error?.message) {
      errorMessage = resp.error.error;
    }
    DialogUtils.error(title, errorMessage, isHtml);
  }

  static inputMessage(input: IInputMessage): Promise<IDialogUtils> {
    return Swal.fire({
      title: input.title,
      text: input.text,
      icon: input.icon ?? 'warning',
      input: input.inputType,
      inputOptions: input.inputOptions,
      inputValue: input.value ? input.value : '',
      inputPlaceholder: input.inputPlaceholder,
      inputAttributes: {
        maxlength: 80,
        autocapitalize: 'off',
        autocorrect: 'off'
      },
      didRender: (element): void => {
        if (!!input.onRender) {
          input.onRender(element);
        }
      },
      showCancelButton: true,
      confirmButtonColor: input.confirmButtonColor ?? '#d33',
      confirmButtonText: input.buttonConfirmText,
      cancelButtonText: 'Cancelar'
    });
  }

  static delete(config?: { title?: string, text?: string }): Promise<IDialogUtils> {
    return Swal.fire({
      title: config?.title ?? 'Excluir registro',
      text: config?.text ?? 'Deseja realmente excluir esse registro definitivamente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sim, desejo excluir!',
      cancelButtonText: 'Cancelar'
    });
  }

  static confirmation(title: string, text?: any, isHtml: boolean = false): Promise<IDialogUtils> {
    return Swal.fire({
      title: title,
      html: isHtml ? text : undefined,
      text: text,
      icon: 'question',
      confirmButtonColor: '#006060',
      confirmButtonText: 'Sim, desejo',
      cancelButtonText: 'Agora não',
      showCancelButton: true
    });
  }

  static confirmationWithList(body): Promise<IDialogUtils> {
    return Swal.fire({
      html: body,
      icon: 'question',
      confirmButtonColor: '#006060',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    });
  }

  static inputPassword(): Promise<IDialogUtils> {
    return Swal.fire({
      title: 'Confirmar senha de acesso',
      input: 'password',
      inputPlaceholder: 'Informe sua senha atual',
      confirmButtonColor: '#006060',
      confirmButtonText: 'Confirmar',
      inputAttributes: {
        maxlength: 200,
        autocapitalize: 'off',
        autocorrect: 'off'
      }
    });
  }

  static success(title: string, text: any, isHtml: boolean = false): void {
    Swal.fire({title: title, html: isHtml ? text : undefined, text: text, icon: 'success'});
  }

  static error(title?: string, text?: any, isHtml: boolean = false): void {
    Swal.fire({title: title ?? 'Error', html: isHtml ? text : undefined, text: text ?? 'Ocorreu um erro inesperado', icon: 'error'});
  }

  static info(title?: string, text?: any, isHtml: boolean = false): void {
    Swal.fire({title: title, html: isHtml ? text : undefined, text: text, icon: 'info'});
  }

  static warning(title?: string, text?: any, isHtml: boolean = false): void {
    Swal.fire({title: title, html: isHtml ? text : undefined, text: text, icon: 'warning'});
  }

  private static messageType(res: any): IMessageType {
    let type: IMessageType = {action: 'error', title: 'Error'}
    if (res?.error?.warning || res?.error[0]?.warning) {
      type = {action: 'warning', title: 'Atenção'}
    } else if (res?.error?.info || res?.error[0]?.info) {
      type = {action: 'info', title: 'Informação'}
    }
    return type;
  }
}

interface IMessageType {
  action: string,
  title: string
}

export interface IDialogUtils {
  value: string;
  dismiss: string;
  isDenied: boolean;
  isConfirmed: boolean;
  isDismissed: boolean;
}

export interface IInputMessage {
  text: string;
  title: string;
  icon?: string;
  value?: string;
  callback?: any;
  onRender?: Function;
  inputOptions?: any[];
  fieldInputName: string;
  inputPlaceholder: string;
  buttonConfirmText: string;
  confirmButtonColor?: string;
  inputType: InputMessageType;
}
