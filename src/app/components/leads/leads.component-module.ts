import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterLeadsComponentModule } from 'src/app/template-UI/footer-leads/footer-leads.component-module';
import { NavbarLeadsComponentModule } from '../../template-UI/navbar-leads/navbar-leads.component-module';
import { LeadsComponent } from './leads.component';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NavbarLeadsComponentModule, FooterLeadsComponentModule],
  declarations: [LeadsComponent],
  providers: [],
  exports: [LeadsComponent],
})
export class LeadsComponentModule {}
