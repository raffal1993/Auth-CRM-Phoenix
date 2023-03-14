export interface LeadQueryModel {
  readonly name: string;
  readonly linkedinLink: string;
  readonly websiteLink: string;
  readonly scope: string[];
  readonly hiring: Hiring;
  readonly industry: string;
  readonly location: string;
  readonly companySize: CompanySize;
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
