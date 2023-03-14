import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, shareReplay, take } from 'rxjs';
import { LeadActivityModel, LeadModel } from 'src/app/models/lead.model';
import { INITIAL_FORM_CREATE_LEAD_VALUES as INIT_VALUE } from 'src/app/static/create-lead-form-values';
import { linkedinRegex, urlRegex } from 'src/app/static/regex';
import { LeadsService } from '../../http/leads.service';

const customActivitiestValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const isActivitySelected = Object.values((control as FormGroup).controls).some((formControl) => formControl.value);

  return isActivitySelected ? null : { customActivitiestValidator: true };
};

@Component({
  selector: 'app-create-lead',
  templateUrl: './create-lead.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateLeadComponent implements OnInit {
  readonly activities$: Observable<LeadActivityModel[]> = this._leadsService.getLeadsActivities().pipe(shareReplay(1));

  readonly createLeadForm: FormGroup = new FormGroup({
    leadInformation: new FormGroup({
      websiteLink: new FormControl(INIT_VALUE.leadInformation.websiteLink, [
        Validators.required,
        Validators.pattern(urlRegex),
      ]),
      name: new FormControl(INIT_VALUE.leadInformation.name, [Validators.required]),
      industry: new FormControl(INIT_VALUE.leadInformation.industry, [Validators.required]),
      linkedinLink: new FormControl(INIT_VALUE.leadInformation.linkedinLink, [
        Validators.required,
        Validators.pattern(linkedinRegex),
      ]),
      location: new FormControl(INIT_VALUE.leadInformation.location, [Validators.required]),
      annualRevenue: new FormControl(INIT_VALUE.leadInformation.annualRevenue, [Validators.required]),
    }),
    activities: new FormGroup({}, { validators: customActivitiestValidator }),
    companySize: new FormGroup({
      total: new FormControl(INIT_VALUE.companySize.total, [Validators.required, Validators.min(1)]),
      dev: new FormControl(INIT_VALUE.companySize.dev, [Validators.required, Validators.min(1)]),
      fe: new FormControl(INIT_VALUE.companySize.fe, [Validators.required, Validators.min(1)]),
    }),
    hiringInformation: new FormGroup({
      active: new FormControl(INIT_VALUE.hiringInformation.active, [Validators.required]),
      junior: new FormControl(INIT_VALUE.hiringInformation.junior, [Validators.required]),
      talentProgram: new FormControl(INIT_VALUE.hiringInformation.talentProgram, [Validators.required]),
    }),
    notes: new FormControl(INIT_VALUE.notes),
  });

  constructor(private _leadsService: LeadsService, private _router: Router, private _cdr: ChangeDetectorRef) {}

  onCreateLeadFormSubmit(form: FormGroup): void {
    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }

    const leadInformation = form.get('leadInformation');
    const companySize = form.get('companySize');
    const hiringInfo = form.get('hiringInformation');
    const activities = form.get('activities');

    const newLead: LeadModel = {
      websiteLink: leadInformation?.get('websiteLink')?.value || '',
      name: leadInformation?.get('name')?.value || '',
      industry: leadInformation?.get('industry')?.value || '',
      linkedinLink: leadInformation?.get('linkedinLink')?.value || '',
      location: leadInformation?.get('location')?.value || '',
      annualRevenue: leadInformation?.get('annualRevenue')?.value || 0,
      hiring: {
        junior: hiringInfo?.get('junior')?.value || false,
        talentProgram: hiringInfo?.get('talentProgram')?.value || false,
        active: hiringInfo?.get('active')?.value || false,
      },
      companySize: {
        fe: companySize?.get('fe')?.value || 1,
        total: companySize?.get('total')?.value || 1,
        dev: companySize?.get('dev')?.value || 1,
      },
      activityIds: Object.entries((activities as FormGroup).controls)
        .map(([key, v]) => (v.value ? key : false))
        .filter(Boolean) as string[],
    };

    this._leadsService.createLead(newLead).subscribe({
      next: () => {
        this._router.navigate(['/leads']);
      },
      error: (e) => {
        this.createLeadForm.setErrors({
          HTTPResponseError: e.error && e.error.message ? e.error.message : 'Oops something went wrong :/',
        });
        this._cdr.detectChanges();
      },
    });
  }

  resetForm(): void {
    this.createLeadForm.reset(INIT_VALUE);
  }

  ngOnInit(): void {
    this.activities$.pipe(take(1)).subscribe((activities) => {
      activities.forEach((act) => {
        const activitiesForm = this.createLeadForm.get('activities') as FormGroup;
        activitiesForm.addControl(act.id, new FormControl(false));
      });
    });
  }
}
