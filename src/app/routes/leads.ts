import { Route } from '@angular/router';
import { LeadsComponent } from '../components/leads/leads.component';
import { EmailVerifiedGuard } from '../guards/email-verified.guard';
import { UserBioGuard } from '../guards/user-bio.guard';
import { UserNotLoggedInGuard } from '../guards/user-not-logged-in.guard';
import { routes } from './routes';

export const LeadsRoute: Route = {
  path: `${routes.LEADS}`,
  component: LeadsComponent,
  canActivate: [UserNotLoggedInGuard, EmailVerifiedGuard, UserBioGuard],
  data: {
    redirectToLogin: `/${routes.AUTH}/${routes.LOGIN}`,
    redirectToVerify: `/${routes.VERIFY}`,
    redirectToBio: `/${routes['COMPLETE-PROFILE']}`,
  },
};
