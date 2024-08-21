import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

import {SimNao} from '../../enum/sim-nao.enum';

import {ToastUtils} from '../../shared/utils/toast.utils';
import {DialogUtils} from '../../shared/utils/dialog.utils';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (!(req.headers.get('x-skip-interceptor') === SimNao.SIM) && error instanceof HttpErrorResponse && error.status === 400) {
          DialogUtils.customError(error, 'Error');
          return throwError(() => error);
        } else if (error instanceof HttpErrorResponse && error.status === 403) {
          const errorMessage = error.error.error?.toLowerCase();
          if (!['token expired', 'unauthorized'].includes(errorMessage) && errorMessage) {
            ToastUtils.error(error.error.error);
          }
        } else if (!(req.headers.get('x-skip-interceptor') === SimNao.SIM) && error instanceof HttpErrorResponse && error.status === 404) {
          DialogUtils.error(error.message);
        } else if (error instanceof HttpErrorResponse && error.status === 500 && error.error.error) {
          DialogUtils.customError(error, 'Error');
        } else if (error instanceof HttpErrorResponse && error.status === 500 && error.error instanceof Blob) {
          const leitor: FileReader = new FileReader();
          leitor.onload = (event: ProgressEvent<FileReader>): void => {
            const result = JSON.parse(event.target.result as string);
            DialogUtils.custom('Erro', result.error, 'error');
          };
          leitor.readAsText(error.error, 'UTF-8');
        }
        return throwError(() => error);
      })
    );
  }
}
