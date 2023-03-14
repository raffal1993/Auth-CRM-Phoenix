import { Route } from '@angular/router';
import { VerifyComponent } from '../components/verify/verify.component';
import { routes } from './routes';

export const VerifyRoute: Route = { path: `${routes.VERIFY}`, component: VerifyComponent };
