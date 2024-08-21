import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'inputSearchReadonly',
  standalone: true
})
export class InputSearchReadonlyPipe implements PipeTransform {

  transform(readonly: boolean, args: { readOnlyDescription: boolean, onlyDescription: boolean }): boolean {
    let _readonly: boolean = readonly;
    if (!_readonly) {
      _readonly = args.readOnlyDescription;
      if (args.onlyDescription) {
        _readonly = false;
      }
    }
    return _readonly;
  }
}
