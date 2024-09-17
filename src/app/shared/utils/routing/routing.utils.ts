import {TransformPagePipe} from '../../pipes/transform-page.pipe';
import {CurrentCrumbUtils} from '../current-crumb.utils';
import {AuthGuard} from '../../../core/guard/auth.guard';

export class RoutingUtils {
  static appRouting(): Array<any> {
    return [
      {
        path: new TransformPagePipe().transform(CurrentCrumbUtils.USUARIOS).route,
        data: {preload: false},
        loadChildren: () => import('../../../pages/admin/usuarios/usuarios.module').then(module => module.UsuariosModule),
        canActivate: [AuthGuard]
      }
    ];
  }
}


