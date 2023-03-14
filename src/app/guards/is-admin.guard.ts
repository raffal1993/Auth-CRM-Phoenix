import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class IsAdminGuard implements CanActivate {
  constructor(private _router: Router, private _authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this._authService
      .isAdmin()
      .pipe(map((isAdmin) => (isAdmin ? true : this._router.parseUrl(route.data['redirectToLeads']))));
  }
}
