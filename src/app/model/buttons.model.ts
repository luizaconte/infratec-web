import {ButtonAction} from '../enum/button-action.enum';

import {ButtonActionPipe} from '../shared/pipes/button-action.pipe';

export class Buttons {
  type = 'buttons';

  private buttons: Array<any> = [];

  add(buttonAction: IButtonAction): Buttons {
    this.actionDetail(buttonAction);
    this.buttons.push(buttonAction);
    return this;
  }

  get button(): Array<any> {
    return this.buttons;
  }

  set button(value: Array<any>) {
    this.buttons = value;
  }

  private actionDetail = (buttonAction: IButtonAction) => {
    const action = new ButtonActionPipe().transform(buttonAction.action);
    if (!buttonAction.hint) {
      buttonAction.hint = action?.hint;
    }
    if (!buttonAction.icon) {
      buttonAction.icon = action?.icon;
    }
  };
}

export interface IButtonAction {
  action: ButtonAction;
  onClick: Function;
  cssClass?: string;
  text?: string;
  visible?: boolean | any;
  icon?: string;
  hint?: string;
}
