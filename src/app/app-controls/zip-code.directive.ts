import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appZipCode]'
})
export class ZipCodeDirective {

  constructor(private el: ElementRef) { }
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    let e = <KeyboardEvent>event;

    const allowedKeys = [
      'Backspace', 'Tab', 'Enter', 'Escape', 'Delete', 'Home', 'End', 'ArrowLeft', 'ArrowRight',
      '-', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
    ];
    const allowedCtrlKeys = ['a', 'c', 'v', 'x'];

    if (allowedKeys.indexOf(e.key) !== -1 ||
      (allowedCtrlKeys.indexOf(e.key) !== -1 && e.ctrlKey || e.metaKey)) {
      // let it happen, don't do anything
      return;
    }

    e.preventDefault();
    return;
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    console.log('on paste event', { event });
    this.validateFields(event);
  }

  validateFields(event: UIEvent) {
    console.log('validateFields', { event, value: this.el.nativeElement.value });
    setTimeout(() => {
      let numberRegEx = /^[0-9-]+$/;
      if (!numberRegEx.test(this.el.nativeElement.value)) {
        this.el.nativeElement.value = "";
        event.preventDefault();
      }
    }, 100)
  }
}
