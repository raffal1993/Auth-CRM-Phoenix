import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { emailRegex } from 'src/app/static/regex';
import { AuthApiService } from '../../http/auth/auth-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(emailRegex)]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private _router: Router, private _cdr: ChangeDetectorRef, private _authApi: AuthApiService) {}

  onLoginFormSubmitted(loginForm: FormGroup): void {
    const email = loginForm.get('email')?.value;
    const password = loginForm.get('password')?.value;

    if (!loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this._authApi.login({ email, password }).subscribe({
      next: () => {
        this._router.navigate(['/leads']);
      },
      error: (e) => {
        this.loginForm.setErrors({
          HTTPResponseError: e.error && e.error.message ? e.error.message : 'Oops something went wrong :/',
        });
        this._cdr.detectChanges();
      },
    });
  }
}
