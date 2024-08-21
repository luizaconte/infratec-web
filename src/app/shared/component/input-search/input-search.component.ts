import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

import {of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

import {Filterable, FilterField} from '../../../model/filterable.model';

import {RequestService} from '../../../core/services/request.service';

import {ExpressionLanguage} from '../../../enum/expression-language.enum';
import {SharedUtils} from '../../utils/shared.utils';
import {DxTextBoxComponent} from "devextreme-angular/ui/text-box";
import {Sortable} from "../../../model/sortable.model";

@Component({
  selector: 'infratec-input-search',
  template: `
    <div class="d-flex">
      <ng-container *ngIf="!onlyDescription">
        <div [ngClass]="!enableDescription ? 'flex-fill' : ''">
          <dx-text-box #focus [ngClass]="!enableDescription ? 'flex-fill' : ''" [(value)]="value" [readOnly]="readOnly"
                       [focusStateEnabled]="!readOnly" [label]="codeLabel"
                       [width]="enableDescription ? codeWidth : null"
                       showClearButton="true" maskChar=" " showMaskMode="onFocus" useMaskedValue="true"
                       (onValueChanged)="applyValueChanged($event)" (onKeyDown)="onKeyDown($event)">
            <dxi-button name="search" location="after" [options]="searchButton"></dxi-button>
          </dx-text-box>
        </div>
      </ng-container>
      <ng-container *ngIf="enableDescription">
        <dx-text-box class="flex-fill" [(value)]="description" [label]="descriptionLabel"
                     [focusStateEnabled]="!(readOnly | inputSearchReadonly : {readOnlyDescription, onlyDescription})"
                     [readOnly]="readOnly | inputSearchReadonly : {readOnlyDescription, onlyDescription}"
                     (onValueChanged)="applyDescriptionChanged($event)">
          <ng-container *ngIf="onlyDescription">
            <dxi-button name="search" location="after" [options]="searchButton"></dxi-button>
          </ng-container>
        </dx-text-box>
      </ng-container>
    </div>
    <ng-content></ng-content>
  `
})
export class InputSearchComponent implements OnInit, AfterViewInit {

  @ViewChild('focus')
  focusField: DxTextBoxComponent;

  @Input()
  protected url: string;

  @Input()
  protected value: string;

  @Input()
  protected maskName: string;

  @Input()
  protected valueExpr: string;

  @Input()
  protected codeLabel: string;

  @Input()
  protected description: string;

  @Input()
  protected sortable: Sortable;

  @Input()
  protected focus: boolean = false;

  @Input()
  protected filterable: Filterable;

  @Input()
  protected filterValueExp: string;

  @Input()
  protected descriptionExpr: string;

  @Input()
  protected codeWidth: number = 150;

  @Input()
  protected descriptionLabel: string;

  @Input()
  protected readOnly: boolean = false;

  @Input()
  protected allowString: boolean = false;

  @Input()
  protected onlyDescription: boolean = false;

  @Input()
  protected enableDescription: boolean = true;

  @Input()
  protected readOnlyDescription: boolean = true;

  @Input()
  protected codeFormControlName: string = 'codigo';

  @Input()
  protected descriptionFormControlName: string = 'descricao';

  @Input()
  protected change: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  protected dispose: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  protected dataSelected: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  protected valueChange: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  protected buttonClick: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  protected descriptionChange: EventEmitter<any> = new EventEmitter<any>();

  protected searchButton: any;

  protected onlyCharacterRegex = new RegExp(/^\D?$/);

  constructor(private requestService: RequestService) {

    this.searchButton = {
      tabIndex: -1,
      icon: 'fas fa-search',
      onClick: () => this.buttonClick.emit()
    };
  }

  ngOnInit(): void {
    this.dataSelected.subscribe(value => {
      if (value) {
        this.value = value[this.valueExpr];
        this.description = value[this.descriptionExpr];
      }
    });
  }

  ngAfterViewInit() {
    if (this.focus) {
      setTimeout(() => this.focusField.instance.focus(), 0);
    }
  }

  applyValueChanged(event) {
    if (event.event || (!event.event && SharedUtils.isValueEmpty(event.value))) {
      this.clear();
    }
    if (event.event || (!event.event && !SharedUtils.isValueEmpty(event.value))) {
      this.applyRequest(event.value);
    }
  }

  applyDescriptionChanged(event) {
    if (this.onlyDescription) {
      if (event.event || (!event.event && !SharedUtils.isValueEmpty(event.value))) {
        this.descriptionChange.emit(event.value);
      }
    }
  }

  private clear() {
    this.value = null;
    this.description = null;
    this.valueChange.emit(null);
  }

  private applyRequest(value: any) {
    if (SharedUtils.isValueEmpty(value)) {
      return;
    }
    const filterable: Filterable = new Filterable();
    if (this.filterable) {
      this.filterable.query.forEach(filterField => filterable.add(filterField));
    }

    const url = filterable.add(new FilterField(this.filterValueExp ?? this.valueExpr, ExpressionLanguage.IGUAL, null, value)).createUrl(this.url);
    this.requestService.get$(url).pipe(
      mergeMap((items) => {
        if (items.result && Array.isArray(items.result)) {
          return of(items.result[0]);
        }
        if (items.data && Array.isArray(items.data)) {
          return of(items.data[0]);
        }
        if (Array.isArray(items)) {
          return of(items[0]);
        }
        return of(items);
      })
    ).subscribe({
      next: data => {
        if (data) {
          this.valueChange.emit(data[this.valueExpr]);
          this.descriptionChange.emit(data[this.descriptionExpr]);
          if (!this.description) {
            this.dispose.emit(data);
          }
          this.description = data[this.descriptionExpr];
        } else {
          this.clear();
        }
      },
      error: () => this.clear()
    });
  }

  onKeyDown(event: any) {
    if (!this.allowString) {
      if (!event.event.altKey && !event.event.ctrlKey) {
        if (this.onlyCharacterRegex.test(event.event.key)) {
          event.event.preventDefault();
        }
      }
    }
  }
}
