import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';

import {AuthService} from '../services/auth.service';

import {RouteUtils} from '../../shared/utils/route.utils';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private router: Router,
              private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn: boolean = this.authService.isLoggedIn;
    const isCredential: boolean = route.routeConfig.path === RouteUtils.CREDENCIAMENTO.CREDENCIAL;

    if (isLoggedIn && isCredential) {
      this.router.navigate([RouteUtils.INICIO]);
      return false;
    }

    if (!isLoggedIn && !isCredential) {
      this.router.navigate([RouteUtils.CREDENCIAMENTO.CREDENCIAL, RouteUtils.CREDENCIAMENTO.LOGIN]);
    }

    return isLoggedIn || isCredential;
  }
}
