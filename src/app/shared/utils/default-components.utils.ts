import dxTextBox from 'devextreme/ui/text_box';
import dxDateBox from 'devextreme/ui/date_box';
import dxDataGrid from 'devextreme/ui/data_grid';
import dxSelectBox from 'devextreme/ui/select_box';
import dxNumberBox from 'devextreme/ui/number_box';

export class DefaultComponentsUtils {
  static configure(): void {
    dxDataGrid.defaultOptions({
      options: {
        allowColumnResizing: true,
        columnResizingMode: 'nextColumn'
      }
    });

    dxSelectBox.defaultOptions({
      options: {
        searchEnabled: true,
        labelMode: 'floating'
      }
    });

    dxTextBox.defaultOptions({
      options: {
        labelMode: 'floating'
      }
    });

    dxNumberBox.defaultOptions({
      options: {
        labelMode: 'floating'
      }
    });

    dxDateBox.defaultOptions({
      options: {
        labelMode: 'floating',
        openOnFieldClick: 'true'
      }
    });
  }
}
