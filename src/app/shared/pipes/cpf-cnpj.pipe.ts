import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'cpfCnpj'
})
export class CpfCnpjPipe implements PipeTransform {
  transform(value: any, hideNumbers = false): any {
    if (!value) {
      return;
    }
    if (value.length === 11) {
      return hideNumbers ? value.replace(new RegExp('([0-9]{3})([0-9]{5})([0-9]{3})', 'g'), '$1.*****.$3') :
        value.replace(new RegExp('([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})', 'g'), '$1.$2.$3-$4');
    }
    if (value.length === 14) {
      return value.replace(new RegExp('([0-9]{2})([0-9]{3})([0-9]{3})([0-9]{4})([0-9]{2})', 'g'), '$1.$2.$3/$4-$5');
    }
    return value;
  }
}
