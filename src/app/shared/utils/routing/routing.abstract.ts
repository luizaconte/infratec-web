import {LoadChildren} from '@angular/router';

export abstract class RoutingAbstract {
  abstract get route(): Array<IRoutingAbstract>;
}

export interface IRoutingAbstract {
  path: string;
  data: any;
  loadChildren: LoadChildren;
  canActivate: Array<any>;
}
