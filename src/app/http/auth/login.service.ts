import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiDataModel } from 'src/app/models/api-data.model';
import { LoginModel } from 'src/app/models/login.model';
import { UserCredentialsModel } from 'src/app/models/user-credentials.model';
import { AuthStorageService } from 'src/app/storage/auth-storage.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private _httpClient: HttpClient, private _authStorage: AuthStorageService) {}

  login({ email, password }: UserCredentialsModel): Observable<LoginModel> {
    return this._httpClient
      .post<ApiDataModel<LoginModel>>(`${environment.BASE_URL}/auth/login`, {
        data: {
          email,
          password,
        },
      })
      .pipe(
        map((r) => r.data),
        tap((data) => {
          this._authStorage.setTokens(data);
        })
      );
  }
}
