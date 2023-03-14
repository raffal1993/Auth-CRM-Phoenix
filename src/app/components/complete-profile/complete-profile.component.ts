import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthApiService } from '../../http/auth/auth-api.service';
import { UserService } from '../../services/user.service';

const customBioValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;

  if (!value) return null;
  const hasTwoSentences = /\.\s*\w+/.test(value);
  const hasMinimumWords = /(\w+\W+){9}\w+/.test(value);

  const isBioValid = hasMinimumWords && hasTwoSentences;

  return isBioValid ? null : { customBioValidator: true };
};

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompleteProfileComponent {
  readonly bioForm: FormGroup = new FormGroup({
    bio: new FormControl('', [Validators.required, customBioValidator]),
  });

  readonly email$: Observable<string> = this._userService.userEmail();

  constructor(
    private _router: Router,
    private _cdr: ChangeDetectorRef,
    private _authApi: AuthApiService,
    private _userService: UserService
  ) {}

  onBioFormSubmitted(bioForm: FormGroup): void {
    const bio = bioForm.get('bio')?.value;

    if (!bioForm.valid) {
      bioForm.markAllAsTouched();
      return;
    }

    this._authApi.addUserBio(bio).subscribe({
      next: () => {
        this._router.navigate(['/leads']);
      },
      error: (e) => {
        this.bioForm.setErrors({
          HTTPResponseError: e.error && e.error.message ? e.error.message : 'Oops something went wrong :/',
        });
        this._cdr.detectChanges();
      },
    });
  }
}
