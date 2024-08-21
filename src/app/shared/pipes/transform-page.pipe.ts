import {Pipe, PipeTransform} from '@angular/core';

import {IPage} from '../../interface/page.interface';

import {PageUtils} from '../utils/page.utils';

@Pipe({
  name: 'transformePage'
})
export class TransformPagePipe implements PipeTransform {

  transform(currenteCrumb: string): IPage {
    return new PageUtils().page.find(page => page.currentCrumb === currenteCrumb);
  }
}

