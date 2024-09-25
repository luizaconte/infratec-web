import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';

import {InputSearchComponent} from '../input-search/input-search.component';
import {Filterable} from '../../../model/filterable.model';

@Component({
  selector: 'int-input-search-dialog',
  template: ``
})
export class InputSearchDialogBaseComponent {

  @ViewChild('inputSearch', {static: false})
  inputSearch: InputSearchComponent;

  @Input()
  value: any;

  @Input()
  description: any;

  @Input()
  focus = false;

  @Input()
  disable = false;

  @Input()
  readOnly = false;

  @Input()
  autoSearch: boolean;

  @Input()
  useParentFilter = true;

  @Input()
  onlyDescription = false;

  @Input()
  enableDescription = true;

  @Input()
  title: string;

  @Input()
  codeLabel: string;

  @Input()
  placeholder: string;

  @Input()
  disableFieldsFilter?: Array<string>;

  @Input()
  filterable: Filterable;

  @Output()
  dispose: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  valueChange: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  descriptionChange: EventEmitter<any> = new EventEmitter<any>();

  url: string;

  onValueChange(event): void {
    this.valueChange.emit(event);
  }

  onDescriptionChange(event): void {
    this.descriptionChange.emit(event);
  }

  onDispose(event): void {
    this.dispose.emit(event);
  }
}
