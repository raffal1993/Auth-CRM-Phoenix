export interface FormCreateLeadQueryModel {
  leadInformation: {
    readonly websiteLink: string;
    readonly name: string;
    readonly industry: string;
    readonly linkedinLink: string;
    readonly location: string;
    readonly annualRevenue: number | null;
  };
  activities: {
    readonly [x: string]: boolean;
  };
  companySize: {
    readonly total: number | null;
    readonly dev: number | null;
    readonly fe: number | null;
  };
  hiringInformation: {
    readonly active: boolean;
    readonly junior: boolean;
    readonly talentProgram: boolean;
  };
  notes: string;
}
