import {Directive, EventEmitter, Host, Input, OnInit, Output} from '@angular/core';

import {DxTextBoxComponent} from 'devextreme-angular/ui/text-box';

export class MaskModel {
  mask?: string;
  len?: number;
  person?: boolean;
  phone?: boolean;
  phoneNotDDD?: boolean;
  money?: boolean;
  percent?: boolean;
  type?: 'alfa' | 'num' | 'all' = 'alfa';
  decimal = 2;
  decimalCaracter = `,`;
  thousand?: string;
  userCharacters = false;
  numberAndThousand = false;
  moneyInitHasInt = true;
}

@Directive({
  selector: '[intInputMask]'
})
export class InputMaskDirective implements OnInit {

  @Input()
  maskModel: MaskModel | any = new MaskModel();

  @Input()
  formControlName: string;

  @Output()
  valueChange = new EventEmitter<string>();

  constructor(@Host() private dxTextBox: DxTextBoxComponent) {
  }

  ngOnInit() {
    if (!this.dxTextBox) {
      console.warn('Directive only works in the DxTextBoxComponent');
      return;
    } else {
      this.dxTextBox.instance.on('keyUp', this.inputKeyUp);
      this.dxTextBox.instance.on('change', this.inputKeyUp);
      setTimeout(() => {
        if (this.dxTextBox.value && this.maskModel) {
          this.setValue(this.returnValue(this.dxTextBox.value));
        }
      }, 1000);
    }
  }

  inputKeyUp = (event) => {
    const value =  event.event.target.value;
    if (this.maskModel) {
      this.setValue(this.returnValue(value));
    }
  }

  setValue(value: string) {
    this.dxTextBox.writeValue(value);
    if (value) {
      this.valueChange.emit(value);
    }
  }

  returnValue(value: string): string {
    if (!value || !this.maskModel) {
      return '';
    }
    let formValue = value;
    if (this.maskModel.type === 'alfa') {
      formValue = formValue.replace(/\d/gi, '');
    }
    if (this.maskModel.type === 'num') {
      formValue = formValue.replace(/\d/gi, '');
    }
    if (this.maskModel.money) {
      return this.moneyMask(this.onInput(formValue), this.maskModel);
    }
    if (this.maskModel.phone) {
      return this.phoneMask(formValue);
    }
    if (this.maskModel.phoneNotDDD) {
      return this.phoneNotDDDMask(formValue);
    }
    if (this.maskModel.person) {
      return this.personMask(formValue);
    }
    if (this.maskModel.percent) {
      return this.percentMask(formValue);
    }
    if (this.maskModel.numberAndThousand) {
      return this.thousand(formValue);
    }
    if (this.maskModel.userCharacters) {
      return this.usingSpecialCharacters(formValue, this.maskModel.mask, this.maskModel.len);
    }
    this.dxTextBox.maxLength = this.maskModel.mask.length;
    return this.onInput(formValue);
  }

  applyCpfMask(formValue: string) {
    if (formValue) {
      formValue = formValue.replace(/\D/gi, '');
      formValue = formValue.replace(/(\d{3})(\d)/gi, '$1.$2');
      formValue = formValue.replace(/(\d{3})(\d)/gi, '$1.$2');
      formValue = formValue.replace(/(\d{3})(\d{1,2})$/gi, '$1-$2');
      return formValue;
    }
  }

  applyCnpjMask(formValue: string) {
    if (formValue) {
      formValue = formValue.replace(/\D/gi, '');
      formValue = formValue.replace(/(\d{2})(\d)/gi, '$1.$2');
      formValue = formValue.replace(/(\d{3})(\d)/gi, '$1.$2');
      formValue = formValue.replace(/(\d{3})(\d)/gi, '$1/$2');
      formValue = formValue.replace(/(\d{4})(\d{1,4})$/gi, '$1-$2');
      formValue = formValue.replace(/(\d{2})(\d{1,2})$/gi, '$1$2');
      return formValue;
    }
  }

  private percentMask = (value): string => {
    let tmp = value;
    tmp = tmp.replace(/\D/gi, '');
    tmp = tmp.replace(/%/gi, '');
    tmp = tmp.replace(/(\d{0})$/gi, '%$1');
    return tmp;
  }

  private phoneMask(value): string {
    let formValue = value;
    this.dxTextBox.maxLength = 15;
    if (formValue.length > 14 || formValue.length === 11) {
      this.maskModel.len = 15;
      this.maskModel.mask = '(99) 99999-9999';
      formValue = formValue.replace(/\D/gi, '');
      formValue = formValue.replace(/(\d{2})(\d)/gi, '$1 $2');
      formValue = formValue.replace(/(\d{5})(\d)/gi, '$1-$2');
      formValue = formValue.replace(/(\d{4})(\d)/gi, '$1$2');
    } else {
      this.maskModel.len = 14;
      this.maskModel.mask = '(99) 9999-9999';
      formValue = formValue.replace(/\D/gi, '');
      formValue = formValue.replace(/(\d{2})(\d)/gi, '$1 $2');
      formValue = formValue.replace(/(\d{4})(\d)/gi, '$1-$2');
      formValue = formValue.replace(/(\d{4})(\d)/gi, '$1$2');
    }
    return this.onInput(formValue);
  }

  private phoneNotDDDMask(value): string {
    let formValue = value;
    this.dxTextBox.maxLength = 10;
    if (formValue.length > 9) {
      this.maskModel.len = 10;
      this.maskModel.mask = '99999-9999';
      formValue = formValue.replace(/\D/gi, '');
      formValue = formValue.replace(/(\d{5})(\d)/gi, '$1-$2');
      formValue = formValue.replace(/(\d{4})(\d)/gi, '$1$2');
    } else {
      this.maskModel.len = 9;
      this.maskModel.mask = '9999-9999';
      formValue = formValue.replace(/\D/gi, '');
      formValue = formValue.replace(/(\d{4})(\d)/gi, '$1-$2');
      formValue = formValue.replace(/(\d{4})(\d)/gi, '$1$2');
    }
    return this.onInput(formValue);
  }

  private personMask(value): string {
    let formValue = value;
    this.dxTextBox.maxLength = 18;
    if (formValue.length >= 14) {
      if (formValue.length === 14 && formValue.indexOf('-') > 0) {
        this.maskModel.len = 14;
        this.maskModel.mask = '999.999.999-99';
        formValue = this.applyCpfMask(formValue);
      } else {
        this.maskModel.len = 18;
        this.maskModel.mask = '99.999.999/9999-99';
        formValue = this.applyCnpjMask(formValue);
      }
    } else {
      this.maskModel.len = 14;
      this.maskModel.mask = '999.999.999-99';
      formValue = this.applyCpfMask(formValue);
    }
    return this.onInput(formValue);
  }

  private moneyMask(value, config: MaskModel): string {
    const decimal = config.decimal || this.maskModel.decimal;
    value = value.replace(/\D/gi, '').replace(new RegExp('([0-9]{' + decimal + '})$', 'g'), config.decimalCaracter + '$1');
    if (value.length === 1 && !this.maskModel.moneyInitHasInt) {
      const dec = Array(decimal - 1).fill(0);
      return `0${config.decimalCaracter}${dec.join('')}${value}`;
    }
    if (value.length === decimal + 1) {
      return '0' + value;
    } else if (value.length > decimal + 2 && value.charAt(0) === '0') {
      return value.substr(1);
    }
    if (config.thousand && value.length > (Number(4) + Number(config.decimal))) {
      const valueOne = `([0-9]{3})${config.decimalCaracter}([0-9]{${config.decimal}}$)`;
      value = value.replace(new RegExp(`${valueOne}`, `g`), `${config.thousand}$1${config.decimalCaracter}$2`);
    }
    if (config.thousand && value.length > (Number(8) + Number(config.decimal))) {
      const valueTwo = `([0-9]{3})${config.thousand}([0-9]{3})${config.decimalCaracter}([0-9]{${config.decimal}}$)`;
      value = value.replace(new RegExp(`${valueTwo}`, `g`), `${config.thousand}$1${config.thousand}$2${config.decimalCaracter}$3`);
    }
    return value;
  }

  private onInput(value): string {
    return this.formatField(value, this.maskModel.mask, this.maskModel.len);
  }

  private usingSpecialCharacters = (field: string, mask: string, size: number): string => {
    if (!size) {
      size = 99999999999;
    }
    let booleanMask;
    const exp = /[-., ]/gi;
    const onlyNumbers = field.toString().replace(exp, '');
    let fieldPosition = 0;
    let newValue = '';
    let sizeMask = onlyNumbers.length;
    for (let i = 0; i < sizeMask; i++) {
      if (i < size) {
        booleanMask = ((mask.charAt(i) === '-') || (mask.charAt(i) === '.') || (mask.charAt(i) === ','));
        if (booleanMask) {
          newValue += mask.charAt(i);
          sizeMask++;
        } else {
          newValue += onlyNumbers.charAt(fieldPosition);
          fieldPosition++;
        }
      }
    }
    return newValue;
  }

  private thousand(value: string): string {
    const val = value.replace(/\D/gi, '');
    const reverse = val.toString().split('').reverse().join('');
    const thousands = reverse.match(/\d{1,3}/g);
    if (thousands) {
      return thousands.join(`${this.maskModel.thousand || '.'}`).split('').reverse().join('');
    }
  }

  private formatField = (field: string, mask: string, size: number): any => {
    if (!size) {
      size = 99999999999;
    }
    let booleanMask;
    const exp = /[_\-.\/(),*+@#$&%: ]/gi;
    const onlyNumbers = field.toString().replace(exp, '');
    let fieldPosition = 0;
    let newValue = '';
    let sizeMask = onlyNumbers.length;
    for (let i = 0; i < sizeMask; i++) {
      if (i < size) {
        booleanMask = (mask.charAt(i) === '-') || (mask.charAt(i) === '.') || (mask.charAt(i) === '/');
        booleanMask = booleanMask || mask.charAt(i) === '_';
        booleanMask = booleanMask || ((mask.charAt(i) === '(') || (mask.charAt(i) === ')') || (mask.charAt(i) === ' '));
        booleanMask = booleanMask || ((mask.charAt(i) === ',') || (mask.charAt(i) === '*') || (mask.charAt(i) === '+'));
        booleanMask = booleanMask || ((mask.charAt(i) === '@') || (mask.charAt(i) === '#') || (mask.charAt(i) === ':'));
        booleanMask = booleanMask || ((mask.charAt(i) === '$') || (mask.charAt(i) === '&') || (mask.charAt(i) === '%'));
        if (booleanMask) {
          newValue += mask.charAt(i);
          sizeMask++;
        } else {
          newValue += onlyNumbers.charAt(fieldPosition);
          fieldPosition++;
        }
      }
    }
    return newValue;
  }
}
