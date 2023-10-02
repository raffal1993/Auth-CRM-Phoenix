import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiDataModel } from 'src/app/models/api-data.model';
import { LeadActivityModel, LeadModel } from 'src/app/models/lead.model';

@Injectable({ providedIn: 'root' })
export class LeadsService {
  constructor(private _httpClient: HttpClient) {}

  getLeads(): Observable<LeadModel[]> {
    return this._httpClient
      .get<ApiDataModel<LeadModel[]>>(`${'https://us-central1-courses-auth.cloudfunctions.net'}/leads`)
      .pipe(map((r) => r.data));
  }

  createLead(newLead: LeadModel): Observable<unknown> {
    return this._httpClient.post<unknown>(`${'https://us-central1-courses-auth.cloudfunctions.net'}/leads`, {
      data: newLead,
    });
  }

  getLeadsActivities(): Observable<LeadActivityModel[]> {
    return this._httpClient
      .get<ApiDataModel<LeadActivityModel[]>>(
        `${'https://us-central1-courses-auth.cloudfunctions.net'}/leads/activities`
      )
      .pipe(map((r) => r.data));
  }
}
