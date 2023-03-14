import { FormCreateLeadQueryModel } from '../query-models/form-create-lead.query-model';

export const INITIAL_FORM_CREATE_LEAD_VALUES: FormCreateLeadQueryModel = {
  leadInformation: {
    websiteLink: '',
    name: '',
    industry: '',
    linkedinLink: '',
    location: '',
    annualRevenue: null,
  },
  activities: {},
  companySize: {
    total: null,
    dev: null,
    fe: null,
  },
  hiringInformation: {
    active: false,
    junior: false,
    talentProgram: false,
  },
  notes: '',
};
