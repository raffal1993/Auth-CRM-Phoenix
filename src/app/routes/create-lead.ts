import { Route } from '@angular/router';
import { CreateLeadComponent } from '../components/create-lead/create-lead.component';
import { IsAdminGuard } from '../guards/is-admin.guard';
import { routes } from './routes';

export const CreateLeadRoute: Route = {
  path: `${routes['CREATE-LEAD']}`,
  component: CreateLeadComponent,
  canActivate: [IsAdminGuard],
  data: {
    redirectToLeads: '/leads',
  },
};
