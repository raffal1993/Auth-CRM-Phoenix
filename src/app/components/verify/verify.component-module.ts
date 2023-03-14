import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BgWrapperComponentModule } from 'src/app/template-UI/bg-wrapper/bg-wrapper.component-module';
import { VerifyComponent } from './verify.component';

@NgModule({
  imports: [CommonModule, RouterModule, BgWrapperComponentModule],
  declarations: [VerifyComponent],
  providers: [],
  exports: [VerifyComponent],
})
export class VerifyComponentModule {}
