import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {NavigationService} from 'app/layout/fuse-template-layout/core/navigation/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class InitialDataResolver {
  /**
   * Constructor
   */
  constructor(private _navigationService: NavigationService) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  resolve(): Observable<any> {
    return this._navigationService.get();
  }
}
