export interface CharityAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface CharityClassification {
  activityCodes: string[];
  deductibility: string;
  foundationStatus: string;
  nteeCode: string;
  organization: string;
  rulingDate: string;
  status: string;
  subsection: string;
}

export interface CharityFinancials {
  assets: number;
  income: number;
  latestTaxPeriod: string;
  revenue: number;
}

export interface CharityFiling {
  tax_prd: number;
  tax_prd_yr: number;
  totassetsend: number;
  totcntrbs: number;
  totrevenue: number;
  totexpns: number;
  pdf_url: string | null;
  updated: string;
}

export interface Charity {
  ein: string;
  name: string;
  slug: string;
  address: CharityAddress;
  classification: CharityClassification;
  financials: CharityFinancials;
  filings: CharityFiling[];
  metadata: {
    lastUpdated: string;
  };
  sources: {
    hasBMF: boolean;
    hasProPublica: boolean;
  };
}
