import { NgModule } from '@angular/core';
import { PrismHighlightDirective } from './prism.directive';

@NgModule({
  declarations: [PrismHighlightDirective],
  exports: [PrismHighlightDirective],
})
export class PrismModule {}
