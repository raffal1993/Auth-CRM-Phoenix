import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthApiService } from '../http/auth/auth-api.service';

@Injectable({ providedIn: 'root' })
export class RefreshTokenInterceptor implements HttpInterceptor {
  constructor(private _authApiService: AuthApiService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((e) => {
        if (e.error.message === 'Token is invalid') {
          return this._authApiService.getNewToken().pipe(switchMap((_) => next.handle(req)));
        }
        return of(e);
      })
    );
  }
}
