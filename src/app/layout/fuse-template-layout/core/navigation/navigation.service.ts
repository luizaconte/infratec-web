import {Injectable} from '@angular/core';

import {tap} from 'rxjs/operators';
import {Observable, of, ReplaySubject} from 'rxjs';

import {Navigation} from 'app/layout/fuse-template-layout/core/navigation/navigation.types';

import {NavigationHandlerService} from '../../../../core/services/navigation-handler.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private _navigation: ReplaySubject<Navigation> = new ReplaySubject<Navigation>(1);

  /**
   * Constructor
   */
  constructor(private navigationHanlderService: NavigationHandlerService) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for navigation
   */
  get navigation$(): Observable<Navigation> {
    return this._navigation.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get all navigation data
   */
  get(): Observable<Navigation> {
    return of(this.navigationHanlderService.navigation).pipe(
      tap((navigation) => this._navigation.next(navigation))
    );
  }
}
