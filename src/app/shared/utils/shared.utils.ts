import {DatePipe} from '@angular/common';
import {ToastUtils} from './toast.utils';
import moment from 'moment';
import ScrollView from 'devextreme/ui/scroll_view';

export class SharedUtils {

  static storage(name, value, type: 'sessionStorage' | 'localStorage' = 'sessionStorage') {
    type === 'sessionStorage' ? sessionStorage.setItem(name, btoa(JSON.stringify(value))) : localStorage.setItem(name, btoa(JSON.stringify(value)));
  }

  static valueStorage(name, type: 'sessionStorage' | 'localStorage' = 'sessionStorage'): any {
    let sessionValue = type === 'sessionStorage' ? sessionStorage.getItem(name) : localStorage.getItem(name);
    try {
      sessionValue = JSON.parse(atob(sessionValue));
    } catch {
      sessionValue = null;
    }
    return sessionValue;
  }

  static toLocaleDate(date, locate: 'pt-BR' | 'en' = 'pt-BR'): string {
    const format = locate === 'pt-BR' ? 'dd/MM/yyyy' : 'yyyy-MM-dd';
    if (date) {
      return new DatePipe(locate).transform(date, format, 'UTC');
    }
  }

  static toLocaleDateTime(date, locate: 'pt-BR' | 'en' = 'pt-BR'): string {
    const format = locate === 'pt-BR' ? 'dd/MM/yyyyTHH:mm:ss' : 'yyyy-MM-ddTHH:mm:ss';
    if (date) {
      return new DatePipe(locate).transform(date, format, 'UTC');
    }
  }

  static addScrollSubMenu(event, height: string = '460px', size: number = 13): void {
    const el = event.itemElement.closest('.dx-submenu');
    if (el) {
      const parentElement = el.closest('.dx-menu-item-has-submenu');
      if (parentElement) {
        el.style.position = 'fixed';
      }
      if (ScrollView.getInstance(el) as ScrollView === undefined && event.itemIndex >= size) {
        el.style.height = height;
        new ScrollView(el, {showScrollbar: 'always'});
      }
    }
  }

  static isJson(str) {
    let value = !!str;
    if (value) {
      try {
        JSON.parse(str);
      } catch (e) {
        value = false;
      }
    }
    return value;
  }

  static isValueEmpty(value): boolean {
    return value === null || value === undefined || value === '';
  }

  static downloadBlob(blob: Blob, fileName: string = 'file'): void {
    const url: string = window.URL.createObjectURL(blob);
    const anchor: HTMLAnchorElement = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName || 'download';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(url);
  }

  static imprimirRelatorio(event, empresa): any {
    if (event) {
      return {
        data: {
          id: event.id,
          solicitacao: event,
          entidade: empresa,
          date: moment(new Date()).format('DD/MM/yyyy HH:mm'),
          template: event.template
        },
        convertTo: 'pdf',
        variableStr: '{#def = d.id}',
        reportName: `protocolo_${event.protocoloRedesim}.odt`
      }
    } else {
      ToastUtils.error('Ocorreu um erro ao buscar a solicitação!');
      return null;
    }
  }
}
