import {Router} from '@angular/router';
import {Component} from '@angular/core';

import {RouteUtils} from '../../utils/route.utils';

@Component({
  selector: 'infratec-not-found',
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
  constructor(private router: Router) {
  }

  backHome(): void {
    this.router.navigate([RouteUtils.INICIO]);
  }
}
