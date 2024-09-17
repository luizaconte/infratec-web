import {IPage} from '../../interface/page.interface';
import {CurrentCrumbUtils} from './current-crumb.utils';
import {RouteUtils} from './route.utils';
import {EndpointUtils} from './endpoint.utils';
import {FilterUsuariosComponent} from "../component/filter/filter-usuarios.component";

export class PageUtils {
  get page(): Array<IPage> {
    return [
      {
        currentCrumb: CurrentCrumbUtils.USUARIOS,
        endpoint: new EndpointUtils().ApiBaseUrl.USUARIOS,
        filterBase: FilterUsuariosComponent,
        route: RouteUtils.USUARIOS,
      },
    ];
  }
}
