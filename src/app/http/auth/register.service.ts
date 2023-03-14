import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiDataModel } from 'src/app/models/api-data.model';
import { RegisterModel } from 'src/app/models/register.model';
import { UserCredentialsModel } from 'src/app/models/user-credentials.model';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  constructor(private _httpClient: HttpClient) {}

  register({ email, password }: UserCredentialsModel): Observable<RegisterModel> {
    return this._httpClient
      .post<ApiDataModel<RegisterModel>>(`${environment.BASE_URL}/auth/register2`, {
        data: {
          email,
          password,
        },
      })
      .pipe(map((r) => r.data));
  }
}
