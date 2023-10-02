import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiDataModel } from 'src/app/models/api-data.model';
import { RefreshTokenModel } from 'src/app/models/refreshToken.model';
import { AuthStorageService } from 'src/app/storage/auth-storage.service';

@Injectable({ providedIn: 'root' })
export class RefreshTokenService {
  constructor(private _httpClient: HttpClient, private _authStorage: AuthStorageService) {}

  getNewToken(): Observable<RefreshTokenModel> {
    const refreshToken = this._authStorage.refreshToken();

    return this._httpClient
      .post<ApiDataModel<RefreshTokenModel>>(`${'https://us-central1-courses-auth.cloudfunctions.net'}/auth/refresh`, {
        data: {
          refreshToken,
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
