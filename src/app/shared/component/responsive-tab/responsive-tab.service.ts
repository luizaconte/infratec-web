import {Output, Injectable, EventEmitter} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveTabService {

  @Output()
  changed = new EventEmitter<any>();

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large])
      .subscribe(() => this.changed.emit());
  }

  get isLargeScreen(): boolean {
    const isLarge = this.breakpointObserver.isMatched(Breakpoints.Large);
    const isXLarge = this.breakpointObserver.isMatched(Breakpoints.XLarge);

    return isLarge || isXLarge;
  }

  get isSmallScreen(): boolean {
    const isSmall = this.breakpointObserver.isMatched(Breakpoints.Small);
    const isXSmall = this.breakpointObserver.isMatched(Breakpoints.XSmall);

    return isSmall || isXSmall;
  }

  get sizes(): any {
    return {
      'screen-x-small': this.breakpointObserver.isMatched(Breakpoints.XSmall),
      'screen-small': this.breakpointObserver.isMatched(Breakpoints.Small),
      'screen-medium': this.breakpointObserver.isMatched(Breakpoints.Medium),
      'screen-large': this.isLargeScreen,
    };
  }
}
