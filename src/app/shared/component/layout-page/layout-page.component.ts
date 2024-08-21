import {Component, Input} from '@angular/core';

@Component({
  selector: 'infratec-layout-page',
  template: `
      <div class="inset-0 flex flex-col min-w-0 overflow-hidden" [ngClass]="{'absolute': !isDialog}" [style]="hideButtonBar ? '' : 'margin-bottom: 45px'">
          <div *ngIf="!isDialog" class="flex flex-row p-3 border-b bg-primary text-on-primary dark:bg-transparent">
              <div class="flex-1 min-w-0 align-self-center">
                  <infratec-breadcrumbs [crumbs]="crumbs" [current]="current"></infratec-breadcrumbs>
              </div>
          </div>
          <ng-container *ngIf="!isDialog && current && crumbs?.length > 0 else template">
              <fuse-card class="inset-0 flex flex-col min-w-0 overflow-hidden h-full m-2">
                  <div class="flex shrink-0 items-center mt-6 sm:mt-0 sm:ml-4"></div>
                  <div class="flex-auto p-4 shadow overflow-y-auto bg-card">
                      <ng-container *ngTemplateOutlet="content"></ng-container>
                  </div>
              </fuse-card>
          </ng-container>
          <ng-template #template>
              <div class="p-2">
                  <ng-container *ngTemplateOutlet="content"></ng-container>
              </div>
          </ng-template>
      </div>
      <ng-template #content>
          <ng-content></ng-content>
      </ng-template>
  `
})
export class LayoutPageComponent {

  @Input()
  current: string;

  @Input()
  crumbs: any[] = [];

  @Input()
  isDialog = false;

  @Input()
  hideButtonBar = false;
}
