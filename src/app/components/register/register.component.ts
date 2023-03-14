import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { emailRegex } from 'src/app/static/regex';
import { AuthApiService } from '../../http/auth/auth-api.service';

const customCrossFieldValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  const error = password === confirmPassword ? null : { customCrossFieldValidator: true };

  control.get('confirmPassword')?.setErrors(error);
  return error;
};

const customPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;

  if (!value) return null;

  const hasMinimumChars = /[0-9a-zA-Z!@#$%^\*\(\)]{8,}/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSpecialChar = /[!@#$%^\*\(\)]/.test(value);
  const hasCapitalChar = /[A-Z]/.test(value);
  const hasSmallChar = /[a-z]/.test(value);

  const isPasswordValid = hasMinimumChars && hasNumber && hasSpecialChar && hasCapitalChar && hasSmallChar;

  return isPasswordValid
    ? null
    : {
        customPasswordValidator: {
          hasMinimumChars,
          hasNumber,
          hasSpecialChar,
          hasCapitalChar,
          hasSmallChar,
        },
      };
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  readonly registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(emailRegex)]),
      password: new FormControl('', [Validators.required, customPasswordValidator]),
      confirmPassword: new FormControl('', [Validators.required]),
      termsAndConditions: new FormControl(false, [Validators.requiredTrue]),
    },
    { validators: customCrossFieldValidator }
  );

  constructor(private _router: Router, private _cdr: ChangeDetectorRef, private _authApi: AuthApiService) {}

  onRegisterFormSubmitted(registerForm: FormGroup): void {
    const email = registerForm.get('email')?.value;
    const password = registerForm.get('password')?.value;

    if (!registerForm.valid) {
      registerForm.markAllAsTouched();
      return;
    }

    this._authApi.register({ email, password }).subscribe({
      next: () => {
        this._router.navigate(['/leads']);
      },
      error: (e) => {
        this.registerForm.setErrors({
          HTTPResponseError: e.error && e.error.message ? e.error.message : 'Oops something went wrong :/',
        });
        this._cdr.detectChanges();
      },
    });
  }
}
