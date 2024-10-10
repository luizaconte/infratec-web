import {HttpParams} from '@angular/common/http';

import {ExpressionLanguage} from '../enum/expression-language.enum';

export class Filterable {

  constructor() {
    this._query = [];
    this._queryParam = new HttpParams();
  }

  _query: Array<FilterField>;

  get query(): Array<FilterField> {
    return this._query;
  }

  set query(value: Array<FilterField>) {
    this._query = value;
  }

  private _queryParam: HttpParams;

  get queryParam(): HttpParams {
    return this._queryParam;
  }

  set queryParam(value: HttpParams) {
    this._queryParam = value;
  }

  add(filterField: FilterField): Filterable {
    this.query.push(filterField);
    return this;
  }

  addCustomFilter(paramName: string, filterFields: Array<FilterField>): Filterable {
    if (paramName && filterFields?.length) {
      let value = '';
      filterFields.forEach((item, index) => value += `${index === 0 ? '' : ';'}${item.name},${item.filterType},${item.value}`);
      this.queryParam = this.queryParam.append(paramName, value);
    }
    return this;
  }

  addParam(param: string, value: any): Filterable {
    if (String(value) !== 'undefined' && String(value) !== 'null' && value !== '') {
      this.queryParam = this.queryParam.append(param, value);
    }
    return this;
  }

  createUrl(url: string, firstParam = true) {
    const query = [];
    const queryControl = [];
    const commands = [];

    this._query.forEach((field: any) => {
      if (field._type) {
        if (field._type.description.includes('Não Nulo')) {
          const condition = `${field.name}!=null`;
          field.isCmd ? commands.push(condition) : query.push(condition);
        } else if (field._type.description.includes('Nulo')) {
          const condition = `${field.name}==null`;
          field.isCmd ? commands.push(condition) : query.push(condition);
        } else {
          const value = field._type.filter === 'in' || field._type.filter === 'bt' ? `=(${field.value})` : `=${field.value}`;
          const condition = `${field.name}=${field._type.filter}${value.length > 1 ? value : ''}`;
          field.isCmd ? commands.push(condition) : query.push(condition);
        }
      }
    });

    let queryParam = '';
    if (query.length > 0) {

      queryParam += 'query='.concat(query.join(';'));

      if (this.queryParam?.toString()) {
        queryParam += `&${this.queryParam.toString()}`;
      }
    } else {
      queryParam += `${this.queryParam.toString()}`;
    }
    if (commands.length > 0) {
      queryParam += (query.length > 0 ? '&' : '').concat('commands=', commands.join(';'));
    }
    return `${(this._query.length > 0) || this.queryParam?.toString() ? url.concat(firstParam ? '?' : '&', queryParam) : url}`;
  }
}

export class FilterField {

  readonly _name: string;
  readonly _filterName: string;
  readonly _type: ExpressionLanguage;
  readonly _value: any;

  constructor(name: string, type: ExpressionLanguage, filterName: string = null, ...value: any) {
    this._name = name;
    this._type = type;
    this._filterName = filterName;
    this._value = value;
    this._isCmd = false;
  }

  private _isCmd: boolean;

  get isCmd(): boolean {
    return this._isCmd;
  }

  set isCmd(value: boolean) {
    this._isCmd = value;
  }

  get name(): string {
    return this._name;
  }

  get type(): ExpressionLanguage {
    return this._type;
  }

  get filterName(): string {
    return this._filterName;
  }

  get filterType(): ExpressionLanguage {
    // @ts-ignore
    return this._type.filter;
  }

  get value(): any {
    return this._value;
  }
}
