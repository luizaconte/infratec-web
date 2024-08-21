import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dataGrid'
})
export class DataViewPipe implements PipeTransform {

  transform(): unknown {
    return null;
  }

  compositeEnum(foundItem, item, customColumn, typeToDescription): void {
    if (Array.isArray(foundItem.description)) {
      const descriptionAux = foundItem.description.find(itemDes => itemDes.type === item[customColumn.customDataField])?.description;
      if (item[customColumn.dataField] === (typeToDescription ? foundItem.type : descriptionAux)) {
        const foundAux = foundItem.description.find(itemDes => itemDes.type === item[customColumn.customDataField]);
        if (foundAux) {
          item[customColumn.dataField] = typeToDescription ? foundAux.description : foundItem.type;
        } else {
          item[customColumn.dataField] = '-1';
        }
      }
    }
  }

}
