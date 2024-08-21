export class Sortable {

  _query: Array<SortField>;

  constructor() {
    this._query = [];
  }

  add(sortField: SortField): Sortable {
    this.query.push(sortField);
    return this;
  }

  createUrl(url, firstParam = true) {
    let queryParam = '';
    if (this._query) {
      if (url.includes('api/sia')) {
        queryParam += this._query.map(value => `${value.selector},${value.desc ? 'desc' : 'asc'}`).join(';');
      } else {
        queryParam += this._query.map(value => `${value.desc ? '$' : '@'}${value.selector}`).join(';');
      }
    }
    return url.concat(firstParam ? '?' : '&', 'sort=', queryParam);
  }

  get query(): Array<SortField> {
    return this._query;
  }

  set query(value: Array<SortField>) {
    this._query = value;
  }
}

export interface SortField {
  selector: string;
  desc?: boolean;
}
