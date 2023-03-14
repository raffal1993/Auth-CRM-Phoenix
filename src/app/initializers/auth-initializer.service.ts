import { Injectable } from '@angular/core';
import { AuthApiService } from '../http/auth/auth-api.service';

@Injectable({ providedIn: 'root' })
export class AuthInitializerService {
  constructor(private _authApiService: AuthApiService) {}

  checkAuth() {
    return this._authApiService.userAuth();
  }
}
