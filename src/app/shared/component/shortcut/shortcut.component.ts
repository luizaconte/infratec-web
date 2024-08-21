import {Component, Input} from '@angular/core';

import {ICustomButtonOption} from '../data-grid/data-grid.interface';

@Component({
  selector: 'infratec-shortcut',
  template: `
      <dx-toolbar>
          <ng-container *ngIf="shortcutOption?.length">
              <ng-container *ngFor="let button of shortcutOption">
                  <ng-container *ngIf="button.options.visible || button.options.visible === undefined">
                      <dxi-item [options]="button.options" [widget]="button.widget" [location]="button.location"
                                [locateInMenu]="button?.locateInMenu ?? 'auto'" [disabled]="disabledAll">
                      </dxi-item>
                  </ng-container>
              </ng-container>
          </ng-container>
      </dx-toolbar>
  `
})
export class ShortcutComponent {

  @Input()
  disabledAll: boolean;

  @Input()
  shortcutOption: Array<ICustomButtonOption>;
  protected readonly Boolean = Boolean;
}
