import {ButtonAction} from '../enum/button-action.enum';

export interface IButtonColumnGrid {
  index?: number;
  width?: number;
  caption?: string;
  buttonsGrid: IButtonGrid[];
}

export interface IButtonGrid {
  icon?: string;
  hint?: string;
  caption?: string;
  onClick: Function;
  action?: ButtonAction;
  visible?: boolean | Function;
}

export interface IButtonsActionUtils {
  type: ButtonAction;
  icon: string;
  text: string;
  hint: string;
  property?: string;
  widget: 'dxAutocomplete' | 'dxButton' | 'dxCheckBox' | 'dxDateBox' | 'dxMenu' | 'dxSelectBox' | 'dxTabs' | 'dxTextBox' | 'dxButtonGroup' | 'dxDropDownButton';
  style?: string;
}




