import {Router} from '@angular/router';
import {Component} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';

import {RouteUtils} from '../../shared/utils/route.utils';

@Component({
  selector: 'infratec-login',
  templateUrl: './credencial.component.html',
  animations: fuseAnimations
})
export class CredencialComponent {

  constructor(private router: Router) {
    if (window.location.pathname.substring(1) === RouteUtils.CREDENCIAMENTO.CREDENCIAL) {
      this.router.navigate([RouteUtils.CREDENCIAMENTO.CREDENCIAL, RouteUtils.CREDENCIAMENTO.LOGIN]);
    }
  }

}
