import { Route } from '@angular/router';
import { CompleteProfileComponent } from '../components/complete-profile/complete-profile.component';
import { routes } from './routes';

export const CompleteProfileRoute: Route = {
  path: `${routes['COMPLETE-PROFILE']}`,
  component: CompleteProfileComponent,
};
