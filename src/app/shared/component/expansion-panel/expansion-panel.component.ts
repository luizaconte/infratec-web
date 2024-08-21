import {
  AfterViewInit,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output, QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren
} from '@angular/core';

import {FuseCardComponent} from '../../../../@fuse/components/card';

import {FuseMediaWatcherService} from '../../../../@fuse/services/media-watcher';
import {SharedUtils} from '../../utils/shared.utils';

@Component({
  selector: 'infratec-expansion-panel',
  templateUrl: 'expansion-panel.component.html'
})
export class ExpansionPanelComponent implements AfterViewInit {

  @ViewChild(FuseCardComponent, {static: false})
  fuseCard: FuseCardComponent;

  @ViewChildren(FuseCardComponent)
  fuseCards: QueryList<FuseCardComponent>;

  @Output()
  fuseCardExpandChange: EventEmitter<{ templateIndex: number, expanded: boolean }> = new EventEmitter<{ templateIndex: number; expanded: boolean }>();

  @ContentChild('0') _0TemplateRef: TemplateRef<unknown>;
  @ContentChild('1') _1TemplateRef: TemplateRef<unknown>;
  @ContentChild('2') _2TemplateRef: TemplateRef<unknown>;
  @ContentChild('3') _3TemplateRef: TemplateRef<unknown>;
  @ContentChild('4') _4TemplateRef: TemplateRef<unknown>;
  @ContentChild('5') _5TemplateRef: TemplateRef<unknown>;
  @ContentChild('6') _6TemplateRef: TemplateRef<unknown>;
  @ContentChild('7') _7TemplateRef: TemplateRef<unknown>;
  @ContentChild('8') _8TemplateRef: TemplateRef<unknown>;
  @ContentChild('9') _9TemplateRef: TemplateRef<unknown>;

  @Input()
  items: IExpansionPanel[];

  @Input()
  adaptability: boolean = true;

  @Input()
  menuOptions: IExpansionMenuOption[];

  @Input()
  buttonsOptions: IExpansionButtonOption[];

  isSmallScreen: boolean;

  constructor(private fuseMediaWatcherService: FuseMediaWatcherService) {
  }

  ngOnInit(): void {
    this.fuseMediaWatcherService.onMediaChange$.subscribe(({matchingAliases}) => this.isSmallScreen = !matchingAliases.length);
  }

  ngAfterViewInit(): void {
    this.items.forEach((item: IExpansionPanel, index: number): void => {
      setTimeout((): void => {
        if (!SharedUtils.isValueEmpty(this.fuseCards.get(index))) {
          this.fuseCards.get(index).expanded = item.expanded;
        }
      }, 10);
    });
  }

  protected template(index: number): TemplateRef<unknown> {
    return this[`_${index}TemplateRef`];
  }

  protected visible(item: IExpansionPanel): boolean {
    return item.visible || item.visible === undefined;
  }

  protected changeExpand(fuseCard: FuseCardComponent, index: number): void {
    fuseCard.expanded = !fuseCard.expanded;
    this.fuseCardExpandChange.emit({templateIndex: index, expanded: fuseCard.expanded});
  }
}

export interface IExpansionPanel {
  id: number;
  title: string;
  disabled?: boolean;
  description?: string;
  icon?: string;
  showDivider?: boolean;
  visible?: boolean;
  expanded?: boolean;
}

export interface IExpansionButtonOption {
  description?: string;
  hint?: string;
  icon?: string;
  onClick: Function;
  visible?: boolean;
  disabled?: boolean;
}

export interface IExpansionMenuOption extends IExpansionButtonOption {
  divider?: boolean;
}
