import { Route } from '@angular/router';
import { LoggetOutComponent } from '../components/logget-out/logget-out.component';
import { routes } from './routes';

export const LoggedOutRoute: Route = {
  path: `${routes['LOGGED-OUT']}`,
  component: LoggetOutComponent,
};
