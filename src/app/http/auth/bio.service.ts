import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiDataModel } from 'src/app/models/api-data.model';
import { CompleteProfileModel } from 'src/app/models/complete-profile.model';

@Injectable({ providedIn: 'root' })
export class BioService {
  constructor(private _httpClient: HttpClient) {}

  getUserBio(): Observable<CompleteProfileModel | HttpErrorResponse> {
    return this._httpClient
      .get<ApiDataModel<CompleteProfileModel>>(`${'https://us-central1-courses-auth.cloudfunctions.net'}/auth/my-bio`)
      .pipe(
        map((r) => r.data),
        catchError((e) => {
          console.warn(e);
          return of(e);
        })
      );
  }

  addUserBio(content: string): Observable<Object> {
    return this._httpClient.post(`${'https://us-central1-courses-auth.cloudfunctions.net'}/auth/add-bio`, {
      data: {
        content,
      },
    });
  }
}
