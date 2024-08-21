import {PreloadingStrategy, Route} from '@angular/router';

import {Observable, of} from 'rxjs';

export class CustomPreloaderUtils implements PreloadingStrategy {
  preload(route: Route, fn: Function): Observable<any> {
    return route.data && route.data.preload ? fn() : of(null);
  }
}
