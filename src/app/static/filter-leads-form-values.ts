import { FilterLeadsConverterQueryModel } from '../query-models/filter-leads.query-model';
import { FormLeadsFilterQueryModel } from '../query-models/form-leads-filter.query-model';

export const INITIAL_FORM_FILTER_LEADS_VALUES: FormLeadsFilterQueryModel = {
  scope: {
    internalProject: false,
    externalProject: false,
    recruitmentAgency: false,
  },
  size: {
    '0-50': false,
    '51-100': false,
    '101-500': false,
    '501-1000': false,
    '1001+': false,
  },
  hiring: {
    isHiring: 'any',
    juniors: 'any',
    talentProgram: 'any',
  },
};

export const filterConverter: FilterLeadsConverterQueryModel = {
  scope: {
    internalProject: 'Internal Projects',
    externalProject: 'External Projects',
    recruitmentAgency: 'Recruitment Agency',
  },
  size: {
    '0-50': {
      min: 0,
      max: 50,
    },
    '51-100': {
      min: 51,
      max: 100,
    },
    '101-500': {
      min: 101,
      max: 500,
    },
    '501-1000': {
      min: 501,
      max: 100,
    },
    '1001+': {
      min: 1001,
      max: Infinity,
    },
  },
  hiring: {
    any: null,
    yes: true,
    no: false,
  },
};
