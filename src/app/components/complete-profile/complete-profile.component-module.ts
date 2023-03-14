import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { BgWrapperComponentModule } from 'src/app/template-UI/bg-wrapper/bg-wrapper.component-module';
import { CompleteProfileComponent } from './complete-profile.component';

@NgModule({
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
    BgWrapperComponentModule,
  ],
  declarations: [CompleteProfileComponent],
  providers: [],
  exports: [CompleteProfileComponent],
})
export class CompleteProfileComponentModule {}
