import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class EmailVerifiedGuard implements CanActivate {
  constructor(private _router: Router, private _authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this._authService
      .isEmailVerified()
      .pipe(
        map((isEmailVerified) =>
          isEmailVerified ? true : this._router.parseUrl(route.data['redirectToVerify'])
        )
      );
  }
}
