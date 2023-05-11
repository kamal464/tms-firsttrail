import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[lettersOnly]'
})
export class LettersOnlyDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initialValue = this.el.nativeElement.value;
    const lettersOnly = initialValue.replace(/[^a-zA-Z ]/g, '');
    if (initialValue !== lettersOnly) {
      event.target.value = lettersOnly;
      event.stopPropagation();
    }
  }

}
