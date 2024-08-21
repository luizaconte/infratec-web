import {EventEmitter, Injectable, Output} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  @Output()
  changed = new EventEmitter<any>();

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large])
      .subscribe(value => this.changed.emit(value));
  }

  get sizes(): Observable<any> {
    return this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large,
      Breakpoints.XLarge, Breakpoints.Handset, Breakpoints.Tablet, Breakpoints.Web]).pipe(
      map(_breakpoints => {
        const value = {
          'screen-x-small': this.breakpointObserver.isMatched(Breakpoints.XSmall),
          'screen-small': this.breakpointObserver.isMatched(Breakpoints.Small),
          'screen-medium': this.breakpointObserver.isMatched(Breakpoints.Medium),
          'screen-large': this.breakpointObserver.isMatched(Breakpoints.Large),
          'screen-x-large': this.breakpointObserver.isMatched(Breakpoints.XLarge),
          'screen-handset': this.breakpointObserver.isMatched(Breakpoints.Handset),
          'screen-tablet': this.breakpointObserver.isMatched(Breakpoints.Tablet),
          'screen-web': this.breakpointObserver.isMatched(Breakpoints.Web)
        };
        return Object.keys(value)
          .filter(key => !!value[key])
          .reduce((obj, key) => {
            obj[key] = value[key];
            return obj;
          }, {});
      })
    );
  }

  get isSmallScreen() {
    const isSmall = this.breakpointObserver.isMatched(Breakpoints.Small);
    const isXSmall = this.breakpointObserver.isMatched(Breakpoints.XSmall);
    return isSmall || isXSmall;
  }
}
