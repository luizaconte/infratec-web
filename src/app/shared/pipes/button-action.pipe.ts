import {Pipe, PipeTransform} from '@angular/core';

import {ButtonActionUtils} from '../utils/button-action.utils';
import {IButtonsActionUtils} from '../../interface/button-action.interface';

@Pipe({
  name: 'buttonAction'
})
export class ButtonActionPipe implements PipeTransform {

  transform(value: number): any {
    const type: IButtonsActionUtils = ButtonActionUtils.types.find(item => item.type === value);
    return type ?? null;
  }
}
