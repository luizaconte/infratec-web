import {ErrorHandler, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppErrorHandlerService implements ErrorHandler {

  handleError(error: any) {
    console.error(`%c[Fiorilli SIA - Sistema Integrado de Arrecadação] - Integrador`, 'font-weight: bold;', error);
  }
}
