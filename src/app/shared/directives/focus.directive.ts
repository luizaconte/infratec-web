import { Directive, AfterViewInit, ElementRef } from '@angular/core';

import dxTextBox from 'devextreme/ui/text_box';
import dxDateBox from 'devextreme/ui/date_box';
import dxTextArea from 'devextreme/ui/text_area';
import dxSelectBox from 'devextreme/ui/select_box';
import dxNumberBox from 'devextreme/ui/number_box';

@Directive({
  selector: '[focus]'
})
export class FocusDirective implements AfterViewInit {
  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    const textBox = dxTextBox.getInstance(this.element.nativeElement) as dxTextBox;
    setTimeout(() => textBox?.focus(), 500);

    const numberBox = dxNumberBox.getInstance(this.element.nativeElement) as dxNumberBox;
    setTimeout(() => numberBox?.focus(), 500);

    const dateBox = dxDateBox.getInstance(this.element.nativeElement) as dxDateBox;
    setTimeout(() => dateBox?.focus(), 500);

    const selectBox = dxSelectBox.getInstance(this.element.nativeElement) as dxSelectBox;
    setTimeout(() => selectBox?.focus(), 500);

    const textArea = dxTextArea.getInstance(this.element.nativeElement) as dxTextArea;
    setTimeout(() => textArea?.focus(), 500);
  }
}
