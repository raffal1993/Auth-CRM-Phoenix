import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { ErrorPasswordPipe } from 'src/app/pipes/error-password.pipe';
import { BgWrapperComponentModule } from 'src/app/template-UI/bg-wrapper/bg-wrapper.component-module';
import { RegisterComponent } from './register.component';

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
  declarations: [RegisterComponent, ErrorPasswordPipe],
  providers: [],
  exports: [RegisterComponent],
})
export class RegisterComponentModule {}
