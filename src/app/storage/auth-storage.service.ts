import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';
import { RefreshTokenModel } from '../models/refreshToken.model';
import { UserAuthDataModel } from '../models/user-auth-data.model';

@Injectable({ providedIn: 'root' })
export class AuthStorageService {
  private accessTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(this.accessToken());

  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(this.refreshToken());

  private isUserEmailVerifiedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private userRoleSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  private emailSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private _storage: Storage, private _window: Window) {}

  accessToken(): string | null {
    return this._storage.getItem('accessToken');
  }

  refreshToken(): string | null {
    return this._storage.getItem('refreshToken');
  }

  getIsUserEmailVerified(): Observable<boolean> {
    return this.isUserEmailVerifiedSubject.asObservable();
  }
  getUserRole(): Observable<string | null> {
    return this.userRoleSubject.asObservable();
  }
  getUserEmail(): Observable<string | null> {
    return this.emailSubject.asObservable();
  }

  setTokens(data: LoginModel | RefreshTokenModel): void {
    this._setAccessToken(data);
    this._setRefreshToken(data);
  }

  setUserData(data: UserAuthDataModel): void {
    if (this.accessTokenSubject.value === null) return;

    const roleByAccessToken =
      JSON.parse(this._window.atob(this.accessTokenSubject.value.split('.')[1]))['role'] || 'user';

    this.userRoleSubject.next(roleByAccessToken);
    this.emailSubject.next(data.user.context.email);
    this.isUserEmailVerifiedSubject.next(data.user.context.email_verified);
  }

  removeAccessToken(): void {
    this.accessTokenSubject.next(null);
    this._storage.removeItem('accessToken');
  }

  removeRefreshToken(): void {
    this.refreshTokenSubject.next(null);
    this._storage.removeItem('refreshToken');
  }

  private _setAccessToken(data: LoginModel | RefreshTokenModel): void {
    const token = data.accessToken;
    this.accessTokenSubject.next(token);
    this._storage.setItem('accessToken', token);
  }

  private _setRefreshToken(data: LoginModel | RefreshTokenModel): void {
    const token = data.refreshToken;
    this.refreshTokenSubject.next(token);
    this._storage.setItem('refreshToken', token);
  }
}
