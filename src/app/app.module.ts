import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AuthTokenInterceptor } from './interceptors/auth-token.interceptor.service';
import { AuthInitializerService } from './initializers/auth-initializer.service';
import { RefreshTokenInterceptor } from './interceptors/refresh-token.interceptor.service';
import { HighlightService } from './components/login/prismjs.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, RouterOutlet, AppRoutingModule, HttpClientModule],
  providers: [
    HighlightService,
    { provide: Storage, useValue: localStorage },
    { provide: Window, useValue: window },
    { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AuthInitializerService],
      useFactory: (authInitializer: AuthInitializerService) => {
        return () => authInitializer.checkAuth();
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
