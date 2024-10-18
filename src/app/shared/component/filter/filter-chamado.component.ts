import {FormBuilder} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {ExpressionLanguage} from '../../../enum/expression-language.enum';

import {FilterField} from '../../../model/filterable.model';

import {FilterAbstractComponent} from './filter.abstract.component';
import {EnumUtils} from "../../utils/enum.utils";

@Component({
  selector: 'infratec-filter-chamado',
  template: `
    <div [formGroup]="form">
      <div class="row">
        <div class="col-md-2 mb-3">
          <dx-number-box label="Id" formControlName="id" showClearButton="true"></dx-number-box>
        </div>
        <div class="col-md-8 mb-3">
          <dx-text-box label="Nome" formControlName="nome" showClearButton="true"></dx-text-box>
        </div>
        <div class="col-md-2 mb-3">
          <dx-select-box [items]="itensPrioridade" label="Prioridade" valueExpr="type"
                         formControlName="prioridade" showClearButton="true" displayExpr="description">
          </dx-select-box>
        </div>
      </div>
    </div>
  `
})
export class FilterChamadoComponent extends FilterAbstractComponent implements OnInit {

  itensPrioridade = EnumUtils.itensPrioridade;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [null],
      nome: [null],
      prioridade: [null],
    });
  }

  search(): void {
    this.filters = new Array<FilterField>();
    this.addFilter('id', this.form.controls.id.value, ExpressionLanguage.IGUAL);
    this.addFilter('prioridade', this.form.controls.prioridade.value, ExpressionLanguage.IGUAL);
    this.addFilter('nome', this.form.controls.nome.value, ExpressionLanguage.CONTENHA);

  }
}
