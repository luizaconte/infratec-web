import {ButtonAction} from '../enum/button-action.enum';

export interface IIHandlerActionFilho {
  editingMode: boolean;
  isEdit: boolean;
}

export interface IIHandlerAction {
  action: ButtonAction;
  value?: any;
}
