import {Component, Input, ViewChild} from '@angular/core';
import {ICustomButtonOption} from '../../shared/component/data-grid/data-grid.interface';
import {BasicPageBaseLayoutComponent} from './basic-page-base-layout.component';
import {Params} from '@angular/router';

import {ButtonStyle, ButtonType} from 'devextreme/common';

@Component({
  selector: 'infratec-base-cadastro',
  template: ''
})
export class BasicPageBaseComponent {

  @ViewChild(BasicPageBaseLayoutComponent)
  basicPageLayout: BasicPageBaseLayoutComponent;

  @Input()
  params: Params;

  @Input()
  isDialog: boolean = false;

  basicPageBase: IBasicPageBase;

  protected button(button: IBasicPageButtons): IBasicPageButtons {
    return {
      nameAction: button.nameAction,
      icon: button.icon,
      hint: button.hint ?? button.text,
      type: button.type ?? 'default',
      text: button.text,
      cssClass: button.cssClass ?? 'offset-md-9 col-md-3',
      stylingMode: button.stylingMode ?? 'contained',
      onClick: button.onClick,
      visible: button.visible === undefined || button.visible,
      disabled: button.disabled !== undefined && button.disabled,
      buttonType: button.buttonType ?? 'dx-button',
      displayExpr: button.displayExpr ?? 'name',
      keyExpr: button.keyExpr ?? 'value',
      items: button.items,
      width: button.width,
      dropDownOptions: button.dropDownOptions
    };
  }

  protected refreshButtons(buttons: Array<IBasicPageButtons>): void {
    this.basicPageBase.buttons = buttons;
  }

  protected refreshShortcutOption(shortcutOption: Array<ICustomButtonOption>): void {
    this.basicPageBase.shortcutOption = shortcutOption;
  }
}

export interface IBasicPageBase {
  current: string;
  nameDesktop?: string;
  crumbs?: any[];
  urlDoc?: string;
  buttons?: IBasicPageButtons[];
  shortcutOption?: ICustomButtonOption[];
}

export interface IBasicPageButtons {
  nameAction?: string;
  icon?: string;
  hint?: string;
  type?: ButtonType;
  text?: string;
  cssClass?: string;
  stylingMode?: ButtonStyle;
  onClick: Function;
  visible?: boolean;
  disabled?: boolean;
  buttonType?: 'dx-button' | 'dx-dropdown';
  items?: any[];
  displayExpr?: string;
  keyExpr?: string;
  width?: string;
  dropDownOptions?: any;
}
