import { Inject, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompleteProfileComponentModule } from './components/complete-profile/complete-profile.component-module';
import { CreateLeadComponentModule } from './components/create-lead/create-lead.component-module';
import { LeadsComponentModule } from './components/leads/leads.component-module';
import { LoggetOutComponentModule } from './components/logget-out/logget-out.component-module';
import { LoginComponentModule } from './components/login/login.component-module';
import { PageNotFoundComponentModule } from './components/page-not-found/page-not-found.component-module';
import { RegisterComponentModule } from './components/register/register.component-module';
import { VerifyComponentModule } from './components/verify/verify.component-module';
import { AuthRoute } from './routes/auth';
import { CompleteProfileRoute } from './routes/complete-profile';
import { CreateLeadRoute } from './routes/create-lead';
import { LeadsRoute } from './routes/leads';
import { LoggedOutRoute } from './routes/logged-out';
import { PageNotFoundRoute } from './routes/page-not-found';
import { VerifyRoute } from './routes/verify';

@NgModule({
  imports: [
    RouterModule.forRoot([
      AuthRoute,
      CompleteProfileRoute,
      CreateLeadRoute,
      LeadsRoute,
      LoggedOutRoute,
      VerifyRoute,
      PageNotFoundRoute,
    ]),
    LoginComponentModule,
    RegisterComponentModule,
    CompleteProfileComponentModule,
    CreateLeadComponentModule,
    LeadsComponentModule,
    LoggetOutComponentModule,
    VerifyComponentModule,
    PageNotFoundComponentModule,
  ],

  exports: [RouterModule],
})
export class AppRoutingModule {}
