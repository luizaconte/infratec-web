import {Component, Input} from '@angular/core';

@Component({
  selector: 'infratec-breadcrumbs',
  template: `
    <ng-container *ngIf="showCrumbs">
      <div class="flex">
        <div class="flex items-center ml-1 whitespace-nowrap">
          <mat-icon class="icon-size-5 text-on-primary cursor-pointer" routerLink="/"
                    [svgIcon]="'heroicons_solid:home'"></mat-icon>
        </div>
        <div class="flex items-center ml-1 whitespace-nowrap" *ngFor="let crumb of crumbs">
          <mat-icon class="icon-size-5 text-on-primary"
                    [svgIcon]="'heroicons_solid:chevron-right'"></mat-icon>
          <span class="ml-1">{{ crumb }}</span>
        </div>
        <div class="flex items-center ml-1 whitespace-nowrap">
          <mat-icon class="icon-size-5 text-on-primary"
                    [svgIcon]="'heroicons_solid:chevron-right'"></mat-icon>
          <span class="ml-1">{{ current }}</span>
        </div>
      </div>
    </ng-container>
`
})
export class BreadcrumbsComponent {
  @Input()
  current: string;

  @Input()
  showCrumbs = true;

  @Input()
  crumbs: any[] = [];
}
