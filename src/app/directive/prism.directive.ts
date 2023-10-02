import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import * as Prism from 'prismjs';

@Directive({
  selector: '[prismHighlight]',
})
export class PrismHighlightDirective implements AfterViewInit {
  constructor(private readonly el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    Prism.highlightElement(this.el.nativeElement);
  }
}
