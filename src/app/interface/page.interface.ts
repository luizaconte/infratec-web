import {IOptionsRequest} from "./options-request.interface";

export interface IPage {
  currentCrumb: string;
  endpoint?: string;
  filterBase?: any;
  route: string;
  options?: IOptionsRequest;
}
