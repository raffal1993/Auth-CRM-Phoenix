export interface LeadModel {
  readonly websiteLink: string;
  readonly name: string;
  readonly industry: string;
  readonly linkedinLink?: string;
  readonly companySize: CompanySize;
  readonly activityIds: string[];
  readonly hiring: Hiring;
  readonly location: string;
  readonly annualRevenue: number;
}

interface Hiring {
  readonly junior: boolean;
  readonly talentProgram: boolean;
  readonly active: boolean;
}

interface CompanySize {
  readonly fe: number;
  readonly total: number;
  readonly dev: number;
}

export interface LeadActivityModel {
  readonly name: string;
  readonly id: string;
}
