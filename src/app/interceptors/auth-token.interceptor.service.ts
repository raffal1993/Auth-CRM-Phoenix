import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthStorageService } from '../storage/auth-storage.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private _authStorageService: AuthStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const blackListUrls = [
      `${environment.BASE_URL}/auth/login`,
      `${environment.BASE_URL}/auth/register2`,
      `${environment.BASE_URL}/auth/refresh`,
      `${environment.BASE_URL}/leads/activities`,
    ];

    return blackListUrls.includes(req.url) ? next.handle(req) : next.handle(this._setAccessToken(req));
  }

  private _setAccessToken(request: HttpRequest<any>): HttpRequest<any> {
    const token = this._authStorageService.accessToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return request;
  }
}
