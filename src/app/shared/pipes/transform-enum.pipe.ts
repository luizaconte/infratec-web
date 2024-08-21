import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'transformEnum'
})
export class TransformEnumPipe implements PipeTransform {

  transform(value: any, items: Array<any>, display?: string): any {
    const type = items.find(item => String(item.type) === (String(value)));
    if (type) {
      return display ? type[display] : type.description;
    }
    return null;
  }
}
