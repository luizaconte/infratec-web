import {Pipe, PipeTransform} from '@angular/core';

import {IEnum} from '../../interface/enum.interface';

@Pipe({
  name: 'transformTemplate'
})
export class TransformTemplatePipe implements PipeTransform {
  transform(element: any, info: any, items: Array<IEnum>): any {
    const div = document.createElement('div');
    items.forEach(item => {
      if (info.value === item.type) {
        const text = document.createTextNode(item.description);
        if (item.color) {
          div.style.setProperty('color', item.color);
          div.style.setProperty('font-weight', 'bold');
        } else if (item.textColor) {
          div.className = `inline-flex items-center font-bold text-xs px-2.5 py-0.5 rounded-full tracking-wide ${item.textColor}`;
        }
        div.appendChild(text);
      }
      return element.append(div);
    });
  }

}
