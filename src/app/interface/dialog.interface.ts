import {Type} from '@angular/core';

import {IFilterBase} from '../layout/cadastro-base-layout/filter-base/filter-base.component';
import {IOptionsRequest} from './options-request.interface';

export interface IDialog {
  url?: string;
  options?: IOptionsRequest;
  columns: any[];
  childColumns?: any[];
  childTitle?: string;
  accessDataKey?: string;
  filterBase?: IFilterBase[] | Type<unknown>;
}
