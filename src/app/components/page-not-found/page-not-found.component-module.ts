import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BgWrapperComponentModule } from 'src/app/template-UI/bg-wrapper/bg-wrapper.component-module';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
  imports: [BgWrapperComponentModule, RouterModule],
  declarations: [PageNotFoundComponent],
  providers: [],
  exports: [PageNotFoundComponent],
})
export class PageNotFoundComponentModule {}
