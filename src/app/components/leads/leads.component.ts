import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, Observable, shareReplay } from 'rxjs';
import { FilterLeadsFormService } from 'src/app/helpers/filter-leads-form.service';
import { LeadsService } from 'src/app/http/leads.service';
import { LeadActivityModel, LeadModel } from 'src/app/models/lead.model';
import { FilterLeadsQueryModel } from 'src/app/query-models/filter-leads.query-model';
import { LeadQueryModel } from 'src/app/query-models/lead.query-model';
import {
  filterConverter,
  INITIAL_FORM_FILTER_LEADS_VALUES as INIT_VALUE,
} from 'src/app/static/filter-leads-form-values';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['leads.component.style.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeadsComponent {
  readonly isAdmin$: Observable<boolean> = this._authService.isAdmin();

  readonly leads$: Observable<LeadQueryModel[]> = combineLatest([
    this._leadsService.getLeads(),
    this._leadsService.getLeadsActivities(),
  ]).pipe(
    map(([leads, activities]) => this._setLeads(leads, activities)),
    shareReplay(1)
  );

  readonly filterLeadsForm: FormGroup = new FormGroup({
    scope: new FormGroup({
      internalProject: new FormControl(INIT_VALUE.scope.internalProject),
      externalProject: new FormControl(INIT_VALUE.scope.externalProject),
      recruitmentAgency: new FormControl(INIT_VALUE.scope.recruitmentAgency),
    }),
    size: new FormGroup({
      '0-50': new FormControl(INIT_VALUE.size['0-50']),
      '51-100': new FormControl(INIT_VALUE.size['51-100']),
      '101-500': new FormControl(INIT_VALUE.size['101-500']),
      '501-1000': new FormControl(INIT_VALUE.size['501-1000']),
      '1001+': new FormControl(INIT_VALUE.size['1001+']),
    }),
    hiring: new FormGroup({
      isHiring: new FormControl(INIT_VALUE.hiring.isHiring),
      juniors: new FormControl(INIT_VALUE.hiring.juniors),
      talentProgram: new FormControl(INIT_VALUE.hiring.talentProgram),
    }),
  });

  private filterValuesSubject: BehaviorSubject<FilterLeadsQueryModel | null> =
    new BehaviorSubject<FilterLeadsQueryModel | null>(null);

  readonly filteredLeads$: Observable<LeadQueryModel[]> = combineLatest([
    this.leads$,
    this.filterValuesSubject.asObservable(),
  ]).pipe(map(([leads, filterValues]) => this._filterLeadsFormService.filterLeads(leads, filterValues)));

  constructor(
    private _authService: AuthService,
    private _leadsService: LeadsService,
    private _filterLeadsFormService: FilterLeadsFormService
  ) {}

  resetFilters(): void {
    this.filterLeadsForm.reset(INIT_VALUE);
  }

  onFilterLeadsFormSubmit(form: FormGroup): void {
    this.filterValuesSubject.next(this._filterLeadsFormService.convertFilters(form, filterConverter));
  }

  private _setLeads = (leads: LeadModel[], activities: LeadActivityModel[]): LeadQueryModel[] => {
    const mappedActivities = activities.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.name }), {}) as Record<
      string,
      string
    >;

    return leads.map((lead) => ({
      scope: lead.activityIds.map((id) => mappedActivities[id]),
      name: lead.name,
      linkedinLink: lead.linkedinLink || '',
      websiteLink: lead.websiteLink || ``,
      hiring: lead.hiring,
      industry: lead.industry,
      location: lead.location,
      companySize: lead.companySize,
      annualRevenue: lead.annualRevenue,
    }));
  };
}
