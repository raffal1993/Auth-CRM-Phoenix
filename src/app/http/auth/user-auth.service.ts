import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, shareReplay, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiDataModel } from 'src/app/models/api-data.model';
import { UserAuthDataModel } from 'src/app/models/user-auth-data.model';
import { AuthStorageService } from 'src/app/storage/auth-storage.service';

@Injectable({ providedIn: 'root' })
export class UserAuthService {
  constructor(private _httpClient: HttpClient, private _authStorage: AuthStorageService) {}

  userAuth(): Observable<UserAuthDataModel> {
    return this._me();
  }

  private _me(): Observable<UserAuthDataModel> {
    return this._httpClient.get<ApiDataModel<UserAuthDataModel>>(`${environment.BASE_URL}/auth/me`).pipe(
      shareReplay(1),
      map((r) => r.data),
      tap((data) => this._authStorage.setUserData(data)),
      catchError((e) => {
        console.warn(e);
        return of(e);
      })
    );
  }
}
