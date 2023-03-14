import { Route } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { UserLoggedInGuard } from '../guards/user-logged-in.guard';
import { routes } from './routes';

export const AuthRoute: Route = {
  path: routes.AUTH,
  canActivateChild: [UserLoggedInGuard],
  data: {
    redirectToLeads: `/${routes.LEADS}`,
  },
  children: [
    {
      path: routes.LOGIN,
      component: LoginComponent,
    },
    {
      path: routes.REGISTER,
      component: RegisterComponent,
    },
  ],
};
