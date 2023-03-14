import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar-leads',
  templateUrl: './navbar-leads.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarLeadsComponent {
  readonly email$: Observable<string> = this._userService.userEmail();
  constructor(private _authService: AuthService, private _router: Router, private _userService: UserService) {}

  logout(): void {
    this._authService.logout();
    this._router.navigate(['/logged-out']);
  }
}
