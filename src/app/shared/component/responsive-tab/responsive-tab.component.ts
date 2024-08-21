import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import config from 'devextreme/core/config';

import {ResponsiveTabService} from './responsive-tab.service';

config({
  floatingActionButtonConfig: {
    icon: 'menu',
    maxSpeedDialActionCount: 15,
    shading: true,
    direction: 'up',
    position: {
      my: 'right bottom',
      at: 'right bottom',
      offset: '-16 -16',
    },
  }
});

@Component({
  selector: 'infratec-responsive-tab',
  template: `
    <ng-container *ngIf="isMobile else desktopTemplate">
      <ng-container *ngIf="showMobile">
        <ng-container *ngFor="let tab of tabs">
          <dx-speed-dial-action *ngIf="tab.id" [icon]="tab.icon" [label]="tab.text" (onClick)="onSelectTab(tab)">
          </dx-speed-dial-action>
        </ng-container>
        <h5>{{ tabSelected.text }}</h5>
      </ng-container>
    </ng-container>
    <ng-template #desktopTemplate>
      <div class="row">
        <div class="col" [ngClass]="mb ? mb : ''">
          <dx-tabs [items]="tabs" [selectedIndex]="verifySelectedIndex()" (onItemClick)="onSelectTabDesktop($event)" [scrollByContent]="true"
                   [showNavButtons]="true" [disabled]="disabled">
          </dx-tabs>
        </div>
      </div>
    </ng-template>
  `
})
export class ResponsiveTabComponent implements OnInit {

  @Input()
  tabs: Array<IResponsiveTab>;

  @Input()
  tabSelected: IResponsiveTab;

  @Input()
  mb = 'mb-4';

  @Input()
  disabled: boolean;

  @Input()
  showMobile: boolean;

  @Output()
  tabSelectedChange: EventEmitter<IResponsiveTab> = new EventEmitter<IResponsiveTab>();

  isMobile: boolean;

  constructor(private responsiveTabService: ResponsiveTabService) {
    this.showMobile = true;
  }

  ngOnInit(): void {
    this.isMobile = this.responsiveTabService.isSmallScreen;
    this.responsiveTabService.changed.subscribe(() => this.isMobile = this.responsiveTabService.isSmallScreen);
  }

  onSelectTab(event): void {
    this.tabSelected = event;
    this.tabSelectedChange.emit(this.tabSelected);
  }

  onSelectTabDesktop(event): void {
    this.tabSelected = event.itemData;
    this.tabSelectedChange.emit(this.tabSelected);
  }

  verifySelectedIndex(): number {
    return this.tabs.findIndex((item) => item.id === this.tabSelected.id);
  }
}

export interface IResponsiveTab {
  id: any;
  text: string;
  icon?: string;
  disabled?: boolean;
  badge?: string;
  html?: string;
  template?: any;
  visible?: boolean;
  dynamicTab?: boolean;
}
