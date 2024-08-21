import {FormGroup} from '@angular/forms';

import moment from 'moment';

import {ConstantUtils} from './constant.utils';

import {Filterable, FilterField} from '../../model/filterable.model';

import {IFilterValue} from '../../layout/cadastro-base-layout/cadastro/cadastro-base.interface';

export class FilterUtils {

  static applyFilter(filterable: Filterable, current: string) {
    let filtersValue: Array<IFilterValue> = JSON.parse(
      localStorage.getItem(ConstantUtils.STORAGE.FILTER_VALUE)
    ) as Array<IFilterValue>;
    if (!filtersValue) {
      filtersValue = new Array<IFilterValue>();
    }
    if (filtersValue.find(filterValue => filterValue.filterComponent === current)) {
      filtersValue.forEach((filterValue, index) => {
        if (filterValue.filterComponent === current) {
          filtersValue[index].filterField = filterable.query;
          filtersValue[index].filterParam = filterable.queryParam;
        }
      });
    } else {
      filtersValue.push({filterField: filterable.query, filterParam: filterable.queryParam, filterComponent: current});
    }
    localStorage.setItem(ConstantUtils.STORAGE.FILTER_VALUE, JSON.stringify(filtersValue));
  }

  loadCustomValues(form: FormGroup, loadCustomValues: Array<ILoadCustomValues>, callback?: Function) {
    setTimeout(() => {
      loadCustomValues.forEach(value => {
        if (value.param) {
          form.controls.id_pes.patchValue(value.param);
        }
        if (form.controls[value.field].value) {
          value.customComponent.value = form.controls[value.field].value;
        }
      });
      if (callback) {
        callback();
      }
    }, 400);
  }

  loadValues(loadValues: ILoadValues): boolean {
    const filtersValue: Array<IFilterValue> = JSON.parse(localStorage.getItem(ConstantUtils.STORAGE.FILTER_VALUE)) as Array<IFilterValue>;
    const existFilter: boolean = !!filtersValue && !!filtersValue.length;
    this.loadFilterField(loadValues?.parentFilter?.query, loadValues);

    if (existFilter) {
      const filter: IFilterValue = filtersValue.find(filterValue => filterValue.filterComponent === loadValues.currentCrumb);
      if (filter) {
        if (loadValues.isComponentFilter) {
          if (!loadValues?.parentFilter) {
            this.loadFilterField(filter.filterField, loadValues);
          }
          filter.filterParam?.updates?.forEach(field => {
            if (moment(field.value, 'DD/MM/YYYY', true).isValid()) {
              field.value = moment(field.value, 'DD-MM-YYYY').format('YYYY-MM-DD');
            }
            loadValues.customComponent.instance.form.controls[field.param]?.patchValue(field.value);
          });
        } else {
          filter.filterField?.forEach((field: any) => {
            loadValues.form.controls[field._name]?.patchValue(this.recursiveArrayFromValue(field._value));
            if (loadValues.formData) {
              loadValues.formData[field._name] = this.recursiveArrayFromValue(field._value);
            }
          });
          filter.filterParam?.updates?.forEach(field => loadValues.form.controls[field.param]?.patchValue(field.value));
        }
      }
    }
    return existFilter;
  }

  private loadFilterField(filter: Array<FilterField>, loadValues: ILoadValues): void {
    filter?.forEach((field: any) => {
      const fieldName = this.filterFieldName(field._name);
      if (loadValues.customComponent?.instance.form.controls[fieldName] === undefined) {
        loadValues.customComponent?.instance.form.controls[field._filterName]?.patchValue(this.recursiveArrayFromValue(field._value));
      } else {
        loadValues.customComponent?.instance.form.controls[fieldName]?.patchValue(this.recursiveArrayFromValue(field._value));
      }
    });
  }

  private filterFieldName = (field: string): string => {
    return (field.includes('.')) ? field.split('.')[1] : field;
  };

  static filters(current: string): IFilterValue {
    let filtersValue: Array<IFilterValue> = JSON.parse(localStorage.getItem(ConstantUtils.STORAGE.FILTER_VALUE)) ?? [] as IFilterValue[];
    return filtersValue.find((filterValue: IFilterValue) => filterValue.filterComponent === current);
  }

  static filterable(current: string): Filterable {
    const filterable: Filterable = new Filterable();
    const filtersField: FilterField[] = this.filters(current)?.filterField;
    filtersField?.forEach((filter: any) => filterable.add(new FilterField(filter._name, filter._expression, filter._filterName, filter._value)));
    return filterable;
  }

  private recursiveArrayFromValue(value: any): any {
    if (!Array.isArray(value) || (Array.isArray(value)) && value.length > 1) {
      if (value) {
        const splitValue = String(value).split('/');
        if (splitValue?.length === 3) {
          value = new Date(`${splitValue[2]}/${splitValue[1]}/${splitValue[0]}`);
        } else if (value.includes("'")) {
          value = value.replaceAll("'", "")
        }
      }
      return value;
    } else {
      return this.recursiveArrayFromValue(value?.length > 1 ? value : value[0]);
    }
  }
}

interface ILoadValues {
  currentCrumb: string;
  form: FormGroup;
  parentFilter?: Filterable;
  formData?: Object;
  isComponentFilter?: boolean;
  customComponent?: any;
}

interface ILoadCustomValues {
  customComponent: any;
  field: string;
  param?: string;
}
