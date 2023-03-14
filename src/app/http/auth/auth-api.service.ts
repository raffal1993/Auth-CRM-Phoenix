import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { BioService } from './bio.service';
import { RegisterService } from './register.service';
import { RefreshTokenService } from './refresh-token.service';
import { UserAuthService } from './user-auth.service';
import { CompleteProfileModel } from 'src/app/models/complete-profile.model';
import { Observable, switchMap } from 'rxjs';
import { UserCredentialsModel } from 'src/app/models/user-credentials.model';
import { RefreshTokenModel } from 'src/app/models/refreshToken.model';
import { UserAuthDataModel } from 'src/app/models/user-auth-data.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  constructor(
    private _loginService: LoginService,
    private _bioService: BioService,
    private _registerService: RegisterService,
    private _refreshTokenService: RefreshTokenService,
    private _userAuthService: UserAuthService
  ) {}

  getUserBio(): Observable<CompleteProfileModel | HttpErrorResponse> {
    return this._bioService.getUserBio();
  }

  addUserBio(content: string): Observable<Object> {
    return this._bioService.addUserBio(content);
  }

  login({ email, password }: UserCredentialsModel): Observable<UserAuthDataModel> {
    return this._loginService.login({ email, password }).pipe(switchMap((_) => this._userAuthService.userAuth()));
  }

  getNewToken(): Observable<RefreshTokenModel> {
    return this._refreshTokenService.getNewToken();
  }

  register({ email, password }: UserCredentialsModel): Observable<UserAuthDataModel> {
    return this._registerService.register({ email, password }).pipe(
      switchMap((_) => this._loginService.login({ email, password })),
      switchMap((_) => this._userAuthService.userAuth())
    );
  }

  userAuth(): Observable<UserAuthDataModel> {
    return this._userAuthService.userAuth();
  }
}
