import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[intDoubleClick]'
})
export class DoubleClickDirective {
  lastClick = 0;

  @HostListener('click', ['$event'])
  clickEvent(event) {
    const currentTime = new Date().getTime();
    const currentClick = currentTime - this.lastClick;
    if (currentClick < 800) {
      event.stopImmediatePropagation();
    }
    this.lastClick = currentTime;
  }
}

