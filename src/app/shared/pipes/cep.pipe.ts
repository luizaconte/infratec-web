import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'cep'
})
export class CepPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (!value) {
      return;
    }
    return value.replace(new RegExp('([0-9]{2})([0-9]{3})([0-9]{3})', 'g'), '$1.$2-$3');
  }

}
