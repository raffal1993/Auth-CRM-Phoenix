import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthApiService } from '../http/auth/auth-api.service';

@Injectable({ providedIn: 'root' })
export class UserBioGuard implements CanActivate {
  constructor(private _router: Router, private _authApiService: AuthApiService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this._authApiService
      .getUserBio()
      .pipe(
        map((bio) =>
          bio.hasOwnProperty('status')
            ? (bio as HttpErrorResponse).status === 404
              ? this._router.parseUrl(route.data['redirectToBio'])
              : true
            : true
        )
      );
  }
}
