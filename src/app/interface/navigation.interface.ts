import {Filterable} from '../model/filterable.model';

export interface INavigation {
  componentName: string
  url: string;
  items: string[];
  pageSize: number;
  pageIndex: number;
  totalPageCount: number;
  totalNavigationCount: number;
  filterable: Filterable;
  sortable: string;
}
