import {Pipe, PipeTransform} from '@angular/core';

import {filesize} from 'filesize';

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {
  transform(value: number, options?: any) {
    return filesize(value, options);
  }
}
