export interface FilterLeadsConverterQueryModel {
  scope: {
    internalProject: string;
    externalProject: string;
    recruitmentAgency: string;
  };
  size: {
    [x: string]: {
      min: number;
      max: number;
    };
  };
  hiring: {
    any: null;
    yes: boolean;
    no: boolean;
  };
}

export interface FilterLeadsQueryModel {
  scopeFilter: string[];
  sizeFilter: {
    min: number;
    max: number;
  }[];
  hiringFilter: {
    isHiring: null | boolean;
    juniors: null | boolean;
    talentProgram: null | boolean;
  };
}
