import {FormBuilder, FormGroup} from '@angular/forms';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import {ExpressionLanguage} from '../../../enum/expression-language.enum';

import {Filterable, FilterField} from '../../../model/filterable.model';

import {DialogUtils} from '../../../shared/utils/dialog.utils';
import {FilterUtils} from '../../../shared/utils/filter.utils';

import {DataGridComponent} from '../../../shared/component/data-grid/data-grid.component';
import {FilterAbstractComponent} from '../../../shared/component/filter/filter.abstract.component';
import {
  ExpansionPanelComponent,
  IExpansionButtonOption,
  IExpansionMenuOption,
  IExpansionPanel
} from '../../../shared/component/expansion-panel/expansion-panel.component';
import {CadastroBaseNavigationService} from '../cadastro/cadastro-base-navigation.service';

@Component({
  selector: 'infratec-filter-base',
  templateUrl: 'filter-base.component.html'
})
export class FilterBaseComponent implements OnInit, AfterViewInit {
  @ViewChild('componentHost', {read: ViewContainerRef, static: false})
  private componentHost: ViewContainerRef;

  @ViewChild('expansion')
  protected expansion: ExpansionPanelComponent;

  @Input()
  dataGrid: DataGridComponent;

  @Input()
  protected filterBase: Array<IFilterBase> | Type<any> | any;

  @Input()
  protected currentCrumb: string;

  @Input()
  autoSearch: boolean = true;

  @Input()
  useParentFilter = true;

  @Input()
  disableFieldsFilter: Array<string>;

  @Input()
  filterBaseMode: 'filterable' | 'printable' = 'filterable';

  @Input()
  protected showPesquisarButton: boolean = true;

  @Output()
  afterSearchOrPrint: EventEmitter<Filterable> = new EventEmitter<Filterable>();

  @Output()
  clearFilter: EventEmitter<boolean> = new EventEmitter<boolean>();

  protected menuOptions: IExpansionMenuOption[];
  protected buttonsOptions: IExpansionButtonOption[];

  form: FormGroup;

  formData: Object;

  filterable: Filterable;

  icon = 'fas fa-chevron-down';

  customComponent: any;

  protected itemsExpansion: IExpansionPanel[] = [{id: 0, title: 'Filtros', showDivider: true, expanded: true}];
  private parentFilter: Filterable;

  constructor(private formBuilder: FormBuilder, private changeDetectorRef: ChangeDetectorRef, private cadastroBaseNavigationService: CadastroBaseNavigationService) {
  }

  get isComponentFilter(): boolean {
    return typeof this.filterBase === 'function';
  }

  private get fieldsForm(): any {
    const fields: { [k: string]: any } = {};
    const filterBase = this.filterBase as Array<IFilterBase>;
    if (Array.isArray(filterBase)) {
      filterBase?.forEach((item) => (fields[item.fieldName] = null));
    }
    return fields;
  }

  ngOnInit(): void {
    if (!this.isComponentFilter) {
      this.formData = this.fieldsForm;
      this.form = this.formBuilder.group(this.fieldsForm);
    }
  }

  ngAfterViewInit(): void {
    this.parentFilter = new Filterable();
    this.parentFilter = this.dataGrid?.filterable;

    if (this.componentHost) {
      this.componentHost.clear();
    }

    if (this.isComponentFilter) {
      this.customComponent = this.componentHost.createComponent(this.filterBase);
    }

    this.disableFields();

    this.changeDetectorRef.detectChanges();
    setTimeout(() => this.loadFiltersValue(), 100);
  }

  onFieldDataChanged(event: any): void {
    this.form.controls[event.dataField]?.setValue(event.value);
  }

  searchOrPrint(): void {
    this.applySearch();
    if (!this.customComponent?.instance.stopAutoSearch && this.filterBaseMode === 'filterable') {
      if (!this.dataGrid.filterable?._query.length && !this.dataGrid.filterable?.queryParam.toString()) {
        DialogUtils.info('Filtro de Pesquisa', `Insira um <strong>filtro</strong> para realizar a pesquisa e tente novamente.`, true);
      }
    }
  }

  applySearch(clearFilters = false): void {
    this.filterable = new Filterable();

    if (this.customComponent && this.customComponent.instance instanceof FilterAbstractComponent) {
      this.customComponent.instance.search();
      this.customComponent.instance.params?.forEach((params: {
        name: string;
        value: any;
      }) => this.filterable.addParam(params.name, params.value));
      this.customComponent.instance.filters?.forEach((filter: FilterField) => this.filterable.add(filter));
    } else {
      const filterBase = this.filterBase as Array<IFilterBase>;
      filterBase?.forEach(filter => this.filterAdd(filter.fieldName, filter.expression, this.form.controls[filter.fieldName].value));
    }
    if (this.dataGrid) {
      this.dataGrid.filterable = this.filterable;
      if (this.parentFilter && this.parentFilter.query.length && this.useParentFilter) {
        this.parentFilter.query.forEach(filter => this.dataGrid.filterable.query.push(filter));
      }
      if (!this.filterable?._query.length && !this.dataGrid.filterable?.queryParam.toString() && !this.dataGrid.isFistRequest) {
        this.dataGrid.emptyDataSource();
      } else if (clearFilters) {
        this.dataGrid.loadDataSource();
      } else if (this.filterable?._query.length) {
        this.dataGrid.loadDataSource();
      } else if (this.dataGrid.filterable?.queryParam.toString()) {
        this.dataGrid.loadDataSource();
      }
      this.afterSearchOrPrint.emit(this.dataGrid.filterable);
    } else if (!clearFilters) {
      this.afterSearchOrPrint.emit(this.filterable);
    }
  }

  clear(change: boolean): void {
    this.cadastroBaseNavigationService.refreshStorageNavigation(this.currentCrumb, 'filterable', new Filterable());
    this.cadastroBaseNavigationService.refreshStorageNavigation(this.currentCrumb, 'pageIndex', 0);
    this.clearFilter.emit(change);
    this.resetFields(this.isComponentFilter);
    this.applySearch(true);

    this.disableFieldsFilter?.length ?
      this.disableFieldsFilter.forEach(field => Object.keys(this.formData).map(item => this.formData[item] = item === field ? this.formData[item] : null)) :
      this.formData = this.fieldsForm;
  }

  onSearchOrPrint(): void {
    setTimeout(() => this.searchOrPrint(), 200);
  }

  private filterAdd(name: string, operator: ExpressionLanguage, value: any): void {
    if (!this.filterable) {
      this.filterable = new Filterable();
    }
    if (value !== undefined && value !== null && value !== '') {
      this.filterable.add(new FilterField(name, operator, null, value));
    }
  }

  private loadFiltersValue(): void {
    if (new FilterUtils().loadValues({
      isComponentFilter: this.isComponentFilter,
      parentFilter: this.parentFilter,
      customComponent: this.customComponent,
      form: this.form,
      formData: this.formData,
      currentCrumb: this.currentCrumb
    })) {
      if (this.autoSearch !== false) {
        this.applySearch();
      }
    }
  }

  private disableFields(): void {
    if (this.disableFieldsFilter?.length) {
      setTimeout(() => {
        this.disableFieldsFilter.forEach(
          field => this.isComponentFilter ? this.customComponent.instance.form.controls[field].disable() : this.form.controls[field].disable()
        );
      }, 0);
    }
  }

  private resetFields(isComponentFilter: boolean) {
    if (isComponentFilter) {
      this.customComponent.instance.reset();
    } else {
      Object.keys(this.form.controls).forEach(field => {
        if (this.form.controls[field].enabled) {
          this.form.controls[field].reset();
        }
      });
    }
  }
}

export interface IFilterBase {
  text: string;
  fieldName: string;
  expression: ExpressionLanguage;
  editorType: 'dxTextBox' | 'dxNumberBox' | 'dxDateBox' | 'dxSelectBox';
  colSpan: number;
  items?: Array<any>;
  displayExpr?: string;
}
