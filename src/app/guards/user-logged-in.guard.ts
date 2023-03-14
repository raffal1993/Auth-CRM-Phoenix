import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class UserLoggedInGuard implements CanActivateChild {
  constructor(private _router: Router, private _authService: AuthService) {}

  canActivateChild(childRoute: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this._authService
      .isUserLoggedIn()
      .pipe(
        map((isUserLoggedIn) =>
          isUserLoggedIn ? this._router.parseUrl(childRoute.data['redirectToLeads']) : true
        )
      );
  }
}
