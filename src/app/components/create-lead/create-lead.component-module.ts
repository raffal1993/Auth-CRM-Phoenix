import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { FooterLeadsComponentModule } from 'src/app/template-UI/footer-leads/footer-leads.component-module';
import { NavbarLeadsComponentModule } from '../../template-UI/navbar-leads/navbar-leads.component-module';
import { CreateLeadComponent } from './create-lead.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NavbarLeadsComponentModule,
    FooterLeadsComponentModule,
  ],
  declarations: [CreateLeadComponent],
  providers: [],
  exports: [CreateLeadComponent],
})
export class CreateLeadComponentModule {}
