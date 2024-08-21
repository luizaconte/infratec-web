import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {ExpressionLanguage} from '../../../enum/expression-language.enum';

import {FilterField} from '../../../model/filterable.model';

@Component({
  selector: 'infratec-filter',
  template: ''
})

export abstract class FilterAbstractComponent {

  form: FormGroup;

  filters: Array<FilterField>;
  params: Array<any>;

  stopAutoSearch: boolean;

  abstract search(): void;

  protected reset(inputs?: Array<any>): void {
    if (inputs?.length) {
      inputs.forEach(input => {
        if (input) {
          input.value = null;
          input.description = null;
        }
      });
    }
    this.form.reset();
  }

  protected addFilter(name: string, value: any, operator: ExpressionLanguage): void {
    if (value !== undefined && value !== null && value !== '') {
      this.filters.push(new FilterField(name, operator, null, value));
    }
  }

  protected addFilterDifName(name: string, value: any, operator: ExpressionLanguage, filter: string): void {
    if (value !== undefined && value !== null && value !== '') {
      this.filters.push(new FilterField(name, operator, filter, value));
    }
  }

  protected addCustomFilter(paramName: string, name: string, value: any, operator: ExpressionLanguage | any): void {
    if (paramName && value !== undefined && value !== null && value !== '') {
      const index = this.params.findIndex(param => param.name === paramName);
      if (index > -1) {
        this.params[index].value += `;${name},${operator.filter},${value}`;
      } else {
        this.params.push({name: `${paramName}`, value: `${name},${operator.filter},${value}`});
      }
    }
  }

  protected addParam(name: string, value: any): void {
    if (value !== undefined && value !== null && value !== '') {
      this.params.push({name: name, value: value});
    }
  }
}
