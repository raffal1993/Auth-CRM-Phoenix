import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarLeadsComponent } from './navbar-leads.component';

@NgModule({
  imports: [RouterModule, CommonModule],
  declarations: [NavbarLeadsComponent],
  providers: [],
  exports: [NavbarLeadsComponent],
})
export class NavbarLeadsComponentModule {}
