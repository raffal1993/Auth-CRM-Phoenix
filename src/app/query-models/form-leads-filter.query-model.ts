export interface FormLeadsFilterQueryModel {
  scope: Scope;
  size: Size;
  hiring: Hiring;
}

interface Hiring {
  isHiring: string;
  juniors: string;
  talentProgram: string;
}

interface Size {
  '0-50': boolean;
  '51-100': boolean;
  '101-500': boolean;
  '501-1000': boolean;
  '1001+': boolean;
}

interface Scope {
  internalProject: boolean;
  externalProject: boolean;
  recruitmentAgency: boolean;
}
