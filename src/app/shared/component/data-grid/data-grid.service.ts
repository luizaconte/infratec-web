import {Injectable} from '@angular/core';

import {jsPDF} from 'jspdf';
import ExcelJS from 'exceljs';

import {IExportDataGrid} from './data-grid.interface';

import {RequestService} from '../../../core/services/request.service';

import {exportDataGrid as exportDataGridToPdf} from 'devextreme/pdf_exporter';
import {exportDataGrid as exportDataGridToExcel} from 'devextreme/excel_exporter';
import {SharedUtils} from '../../utils/shared.utils';

@Injectable()
export class DataGridService extends RequestService {

  private _rowSelected: Object;

  export(type: ExportType, exportDataGrid: IExportDataGrid): void {
    if (exportDataGrid?.url) {
      let url = exportDataGrid.url;
      let firstParam = true;
      if (exportDataGrid.sortable) {
        url = exportDataGrid.sortable.createUrl(url);
        firstParam = false;
      }
      if (exportDataGrid.filterable) {
        url = exportDataGrid.filterable.createUrl(url, firstParam);
      }
      super.get$(url).subscribe(result => {
        exportDataGrid.dataGrid.dataSource = result.data ? result.data : result;
        this.exportDataType(type, exportDataGrid);
      });
    } else {
      this.exportDataType(type, exportDataGrid);
    }
  }

  get rowSelected(): Object {
    return this._rowSelected;
  }

  set rowSelected(value: Object) {
    this._rowSelected = value;
  }

  private exportDataType(type: ExportType, exportDataGrid: IExportDataGrid): void {
    switch (type) {
      case ExportType.EXCEL: {
        const workbook = new ExcelJS.Workbook();
        const fileName = exportDataGrid.fileExportName.replace(/[^a-zA-Z0-9 ]/g, '_');
        const worksheet = workbook.addWorksheet(fileName);

        setTimeout(() => {
          exportDataGridToExcel({
            component: exportDataGrid.dataGrid.instance,
            worksheet: worksheet
          }).then(() => {
            workbook.xlsx.writeBuffer().then((buffer) => {
              SharedUtils.downloadBlob(new Blob([buffer], {type: 'application/octet-stream'}), `${exportDataGrid.fileExportName}.xlsx`)
            });
          });
        }, 500);
        break;
      }
      case ExportType.PDF: {
        const doc = new jsPDF();
        setTimeout(() => {
          exportDataGridToPdf({jsPDFDocument: doc,component: exportDataGrid.dataGrid.instance}).then(() => window.open(URL.createObjectURL(doc.output('blob'))));
        }, 500);
        break;
      }
    }
  }
}

enum ExportType {
  EXCEL = 'Excel',
  PDF = 'Pdf'
}
