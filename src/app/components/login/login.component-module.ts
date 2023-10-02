import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login.component';
import { BgWrapperComponentModule } from 'src/app/template-UI/bg-wrapper/bg-wrapper.component-module';
import { PrismModule } from 'src/app/directive/prism.module';

@NgModule({
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
    BgWrapperComponentModule,
    PrismModule,
  ],
  declarations: [LoginComponent],
  providers: [],
  exports: [LoginComponent],
})
export class LoginComponentModule {}
