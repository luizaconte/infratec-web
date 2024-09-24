import {FormBuilder} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {ExpressionLanguage} from '../../../enum/expression-language.enum';

import {FilterField} from '../../../model/filterable.model';

import {FilterAbstractComponent} from './filter.abstract.component';

@Component({
  selector: 'infratec-filter-departamento',
  template: `
    <div [formGroup]="form">
      <div class="row">
        <div class="col-md-2 mb-3">
          <dx-number-box label="Id" formControlName="id" showClearButton="true"></dx-number-box>
        </div>
        <div class="col-md-6 mb-3">
          <dx-text-box label="Nome" formControlName="nome" showClearButton="true"></dx-text-box>
        </div>
      </div>
    </div>
  `
})
export class FilterDepartamentoComponent extends FilterAbstractComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [null],
      nome: [null],
    });
  }

  search(): void {
    this.filters = new Array<FilterField>();
    this.addFilter('id', this.form.controls.id.value, ExpressionLanguage.IGUAL);
    this.addFilter('nome', this.form.controls.nome.value, ExpressionLanguage.CONTENHA);

  }
}
