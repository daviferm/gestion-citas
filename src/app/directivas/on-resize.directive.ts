import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnResize]'
})
export class OnResizeDirective {

  constructor() { }

  @HostListener('click') onClick( event: any ) {
    console.log( event );
  }

  @HostListener('window:resize') onResize( event: any ) {

    console.log(event);

  }


}
