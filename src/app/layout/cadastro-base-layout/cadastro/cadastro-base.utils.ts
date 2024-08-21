import {IBase} from './cadastro-base.interface';

import {ButtonAction} from '../../../enum/button-action.enum';

import {ButtonActionPipe} from '../../../shared/pipes/button-action.pipe';

import {IButtonsActionUtils} from 'app/interface/button-action.interface';
import {ICustomButtonOption} from '../../../shared/component/data-grid/data-grid.interface';
import {DataGridComponent} from '../../../shared/component/data-grid/data-grid.component';
import {SharedUtils} from '../../../shared/utils/shared.utils';

export class CadastroBaseUtils {
  static buttonsToolbar(dadosBase: IBase, functions: IFunctionButtons[], dataView: DataGridComponent): ICustomButtonOption[] {
    let buttons: ICustomButtonOption[] = [];
    let defaultButtons: ButtonAction[] = [ButtonAction.ADICIONAR, ButtonAction.EDITAR, ButtonAction.EXCLUIR, ButtonAction.VISUALIZAR];
    defaultButtons.forEach((button: ButtonAction) => {
      const buttonType: IButtonsActionUtils = new ButtonActionPipe().transform(button);
      const buttonFunction: IFunctionButtons = functions.find((button: IFunctionButtons) => button.buttonType === buttonType?.type);
      buttons.push(
        {
          widget: buttonType && buttonType.widget ? buttonType.widget : 'dxButton',
          location: button === ButtonAction.IMPRIMIR ? 'after' : 'before',
          locateInMenu: 'auto',
          options: {
            elementAttr: {'class': 'btn-base-' + buttonType?.property},
            cssClass: button === ButtonAction.FUNCOES ? 'customMenuButton' : null,
            disabled: button === ButtonAction.ADICIONAR || button === ButtonAction.FUNCOES || button === ButtonAction.IMPRIMIR ? false : !dataView?.dataSourceValue?.length,
            visible: new CadastroBaseUtils().showButtons(dadosBase.buttons?.[buttonType.property], button, dataView),
            stylingMode: 'default',
            type: buttonType?.style,
            icon: buttonType?.icon,
            text: buttonType?.text,
            hint: buttonType?.hint,
            orientation: 'vertical',
            onItemRendered: (event: unknown) => SharedUtils.addScrollSubMenu(event, '380px', 10),
            dropDownOptions: {
              minWidth: '120px',
              width: 'auto'
            },
            items: dadosBase?.buttons?.addFunction?.items,
            onClick: buttonFunction?.onClick,
            onItemClick: button === ButtonAction.FUNCOES ? dadosBase?.buttons?.addFunction?.onClick : buttonFunction?.onClick,
          }
        });
    });
    buttons.forEach((button: ICustomButtonOption) => {
      if (button.options.onItemClick && dataView?.selectedRowsData?.length) {
        button.options.onItemClick = new CadastroBaseUtils().cloneFunction(button.options.onItemClick, arguments, true);
      }
    });
    if (dadosBase?.buttons?.addButtons) {
      dadosBase.buttons.addButtons.forEach((button: ICustomButtonOption) => {
        button.options.disabled = new CadastroBaseUtils().disableButtons(button['disabled'], dataView, button.options.buttonAction);
        button.options.visible = new CadastroBaseUtils().showButtons(button['visible'], null, dataView);
        if (button.options.onClick && dataView?.selectedRowsData?.length) {
          button.options.onClick = new CadastroBaseUtils().cloneFunction(button.options.onItemClick, arguments);
        }
        buttons.push(button);
      });
    }
    return buttons;
  }

  private cloneFunction(fn: Function, _arguments: IArguments, showOwnProperty: boolean = false): Function {
    return (...args: any[]) => {
      let newArguments: IButtonActionClick | Object = _arguments[2].selectedRowsData.length > 1 ? _arguments[2].selectedRowsData : _arguments[2].selectedRowsData[0];
      if (showOwnProperty) {
        newArguments = {
          row: _arguments[2].selectedRowsData[0],
          itemId: args[0].itemData?.id ?? args[0].itemData ?? args[0]?.component._props.type,
        };
      }
      return fn.apply(this, [newArguments]);
    };
  }

  private disableButtons = (action: Function, dataView: DataGridComponent, buttonAction?: ButtonAction): boolean => {
    let condition: boolean = (action !== undefined && !!action) || (buttonAction !== ButtonAction.ADICIONAR && !dataView?.dataSourceValue?.length);
    if (typeof action === 'function') {
      condition = dataView?.rowIntercept(action, 'disable');
    }
    return condition;
  };

  private showButtons = (action: boolean | Function, button?: ButtonAction, dataView?: DataGridComponent): boolean => {
    let condition: boolean = action === undefined || !!action;
    if ((action === undefined && button === ButtonAction.DUPLICAR)) {
      condition = false;
    } else if (typeof action === 'function') {
      condition = dataView?.rowIntercept(action, 'visible');
    }
    return condition;
  };
}

interface IFunctionButtons {
  onClick: Function;
  buttonType: ButtonAction;
}

export interface IButtonActionClick {
  row: Object,
  itemId: string | number
}
