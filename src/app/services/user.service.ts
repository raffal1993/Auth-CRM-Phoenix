import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthStorageService } from '../storage/auth-storage.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private _authStorageService: AuthStorageService) {}

  userEmail(): Observable<string> {
    return this._authStorageService.getUserEmail().pipe(map((email) => email || 'User'));
  }
}
