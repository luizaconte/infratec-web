import {IPage} from '../../interface/page.interface';
import {CurrentCrumbUtils} from './current-crumb.utils';
import {RouteUtils} from './route.utils';
import {EndpointUtils} from './endpoint.utils';
import {FilterUsuariosComponent} from "../component/filter/filter-usuarios.component";
import {FilterDepartamentoComponent} from "../component/filter/filter-departamento.component";
import {FilterChamadoComponent} from "../component/filter/filter-chamado.component";

export class PageUtils {
  get page(): Array<IPage> {
        return [
          {
            currentCrumb: CurrentCrumbUtils.USUARIOS,
            endpoint: new EndpointUtils().ApiBaseUrl.USUARIOS,
            filterBase: FilterUsuariosComponent,
            route: RouteUtils.USUARIOS,
          },
          {
            currentCrumb: CurrentCrumbUtils.DEPARTAMENTO,
            endpoint: new EndpointUtils().ApiBaseUrl.DEPARTAMENTO,
            filterBase: FilterDepartamentoComponent,
            route: RouteUtils.DEPARTAMENTO,
          },
          {
            currentCrumb: CurrentCrumbUtils.CHAMADO,
            endpoint: new EndpointUtils().ApiBaseUrl.CHAMADO,
            filterBase: FilterChamadoComponent,
            route: RouteUtils.CHAMADO,
          },
        ];
      }
}
