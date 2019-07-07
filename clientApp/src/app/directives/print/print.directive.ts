import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPrintHost]'
})
export class PrintDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
