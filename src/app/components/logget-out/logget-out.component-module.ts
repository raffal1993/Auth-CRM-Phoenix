import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoggetOutComponent } from './logget-out.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [LoggetOutComponent],
  providers: [],
  exports: [LoggetOutComponent],
})
export class LoggetOutComponentModule {}
