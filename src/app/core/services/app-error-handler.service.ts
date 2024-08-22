import {ErrorHandler, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppErrorHandlerService implements ErrorHandler {

  handleError(error: any) {
    console.error(`%c[InfraTec] - Sistema de Chamados`, 'font-weight: bold;', error);
  }
}
