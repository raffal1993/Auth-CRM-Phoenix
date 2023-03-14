import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilterLeadsConverterQueryModel, FilterLeadsQueryModel } from '../query-models/filter-leads.query-model';
import { LeadQueryModel } from '../query-models/lead.query-model';

@Injectable({ providedIn: 'root' })
export class FilterLeadsFormService {
  convertFilters = (form: FormGroup, filterConverter: FilterLeadsConverterQueryModel): FilterLeadsQueryModel => {
    const scope = form.get('scope')?.value;
    const size = form.get('size')?.value;
    const hiring = form.get('hiring')?.value;

    const scopeFilter: FilterLeadsQueryModel['scopeFilter'] = Object.keys(scope)
      .map((key) => scope[key] && filterConverter.scope[key as keyof FilterLeadsConverterQueryModel['scope']])
      .filter(Boolean);

    const sizeFilter: FilterLeadsQueryModel['sizeFilter'] = Object.keys(size)
      .map((key) => size[key] && filterConverter.size[key as keyof FilterLeadsConverterQueryModel['size']])
      .filter(Boolean);

    const hiringFilter: FilterLeadsQueryModel['hiringFilter'] = Object.keys(hiring).reduce((acc, curr) => {
      const option = hiring[curr] as keyof FilterLeadsConverterQueryModel['hiring'];
      return { ...acc, [curr]: filterConverter.hiring[option] };
    }, {} as FilterLeadsQueryModel['hiringFilter']);

    return { scopeFilter, sizeFilter, hiringFilter };
  };

  filterLeads = (leads: LeadQueryModel[], filterValues: FilterLeadsQueryModel | null): LeadQueryModel[] => {
    if (!filterValues) return leads;

    const { hiringFilter, scopeFilter, sizeFilter } = filterValues;
    const { isHiring: isHiringFilter, juniors: juniorsFilter, talentProgram: talentProgramFilter } = hiringFilter;

    const isScopeFormEmpty = scopeFilter.length === 0;
    const isSizeFormEmpty = sizeFilter.length === 0;
    const isHiringFormEmpty = Object.values(hiringFilter).every((hiring) => !hiring);

    const isFormEmpty = isScopeFormEmpty && isSizeFormEmpty && isHiringFormEmpty;

    if (isFormEmpty) return leads;

    return leads.filter((lead) => {
      const {
        scope,
        hiring: { active: isHiring, junior, talentProgram },
        companySize: { total },
      } = lead;

      const hasScopeValue = isScopeFormEmpty || scope.some((sc) => scopeFilter.includes(sc));
      const hasCompanySize = isSizeFormEmpty || sizeFilter.some((vRange) => total >= vRange.min && total <= vRange.max);
      const hasHiringFilter =
        (isHiringFilter === null || isHiringFilter === isHiring) &&
        (juniorsFilter === null || juniorsFilter === junior) &&
        (talentProgramFilter === null || talentProgramFilter === talentProgram);

      return hasScopeValue && hasCompanySize && hasHiringFilter;
    });
  };
}
