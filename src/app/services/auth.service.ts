import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthStorageService } from '../storage/auth-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private _authStorageService: AuthStorageService) {}

  isUserLoggedIn(): Observable<boolean> {
    const accessToken = this._authStorageService.accessToken();
    return this._authStorageService.getUserEmail().pipe(map((email) => !!(email && accessToken)));
  }

  isEmailVerified(): Observable<boolean> {
    return this._authStorageService.getIsUserEmailVerified();
  }

  isAdmin(): Observable<boolean> {
    return this._authStorageService.getUserRole().pipe(map((role) => role === 'admin'));
  }

  logout(): void {
    this._authStorageService.removeAccessToken();
    this._authStorageService.removeRefreshToken();
  }
}
