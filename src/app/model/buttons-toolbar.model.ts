import {ButtonAction} from '../enum/button-action.enum';

import {ButtonActionPipe} from '../shared/pipes/button-action.pipe';

import {ICustomButtonOption} from '../shared/component/data-grid/data-grid.interface';


export class ButtonsToolbar {

  private _buttons: ICustomButtonOption[] = [];

  add(buttonToolbar: IButtonToolbar, buttonType?: ButtonAction): ButtonsToolbar {
    const action = new ButtonActionPipe().transform(buttonType);
    this._buttons.push({
      widget: buttonToolbar.widget ?? 'dxButton',
      location: buttonToolbar.location ?? 'before',
      locateInMenu: buttonToolbar.locateInMenu ?? 'auto',
      // @ts-ignore
      disabled: buttonToolbar.disabled,
      visible: buttonToolbar.visible,
      options: {
        elementAttr: {'class': `btn-base-${action?.property ?? 'default'}`, ...buttonToolbar?.elementAttr},
        visible: buttonToolbar.visible === undefined || buttonToolbar.visible,
        disabled: buttonToolbar.disabled !== undefined && buttonToolbar.disabled,
        stylingMode: buttonToolbar.stylingMode ?? 'contained',
        type: this.buttonType(buttonToolbar.type, action?.style),
        icon: buttonToolbar.icon ?? action?.icon,
        text: buttonToolbar.text ?? action?.text,
        hint: (buttonToolbar.hint ?? action?.hint) ?? buttonToolbar.text,
        buttonAction: buttonToolbar.buttonAction,
        orientation: 'vertical',
        dropDownOptions: {
          minWidth: '120px',
          width: 'auto'
        },
        items: buttonToolbar.items,
        onClick: buttonToolbar.onClick,
        onItemClick: buttonToolbar.onClick,
      }
    });
    return this;
  }

  get buttons(): ICustomButtonOption[] {
    return this._buttons;
  }

  private buttonType(toolbarType: string, buttonActionType: string): string {
    let _type: string = 'normal';
    if (toolbarType) {
      _type = toolbarType;
    } else if (buttonActionType) {
      _type = buttonActionType;
    }
    return _type;
  }
}

export interface IButtonToolbar {
  onClick?: Function;
  text?: string;
  visible?: boolean | Function;
  disabled?: boolean | Function;
  type?: string;
  buttonAction?: ButtonAction;
  stylingMode?: string;
  icon?: string;
  hint?: string;
  elementAttr?: {};
  items?: unknown[];
  location?: 'after' | 'before';
  widget?: 'dxAutocomplete' | 'dxButton' | 'dxCheckBox' | 'dxDateBox' | 'dxMenu' | 'dxSelectBox' | 'dxTabs' | 'dxTextBox' | 'dxButtonGroup' | 'dxDropDownButton';
  locateInMenu?: 'never' | 'always' | 'auto';
}
