import {HttpParams} from '@angular/common/http';
import {Filterable} from './filterable.model';
import {Sortable} from './sortable.model';

export class Pageable {

  pageSize;
  pageIndex;
  filter: Filterable;
  sort: Sortable;
  queryParam: HttpParams;

  removeLimitOffset = false;

  constructor() {
    this.filter = new Filterable();
    this.sort = new Sortable();
    this.pageSize = 20;
    this.pageIndex = 0;
  }

  createUrl(url: string, report = false) {
    let pageUrl;
    if (url.includes('api/sia')) {
      const offset = this.pageSize * this.pageIndex;
      pageUrl = this.removeLimitOffset ? url : `${url}${this.delimiter(url)}limit=${this.pageSize}&offset=${offset}`;
      if (!!this.sort.query?.length) {
        pageUrl = this.sort.createUrl(pageUrl, !pageUrl.includes('?') && this.removeLimitOffset);
      }
      if (!!this.filter.query?.length || !!this.filter.queryParam?.toString()) {
        pageUrl = this.filter.createUrl(pageUrl, !pageUrl.includes('?') && this.removeLimitOffset);
      }
    } else {
      pageUrl = report ? url : `${url}${this.delimiter(url)}pageSize=${this.pageSize}&pageIndex=${this.pageIndex}`;

      if (this.queryParam?.toString()) {
        pageUrl += `${this.delimiter(pageUrl)}${this.queryParam.toString()}`;
      }
      if (this.sort.query.length > 0) {
        pageUrl = this.sort.createUrl(pageUrl, !pageUrl.includes('?') && report);
      }
    }
    if (this.filter.query.length > 0) {
      pageUrl = this.filter.createUrl(pageUrl, !pageUrl.includes('?') && report);
    }
    return pageUrl;
  }

  private delimiter = (url): string => {
    return url.includes('?') ? '&' : '?';
  };
}
