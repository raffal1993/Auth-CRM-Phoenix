import { Route } from '@angular/router';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { routes } from './routes';

export const PageNotFoundRoute: Route = {
  path: `${routes['PAGE-NOT-FOUND']}`,
  component: PageNotFoundComponent,
};
