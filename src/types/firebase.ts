export interface UserProfile {
  uid: string;
  email: string;
  firstName?: string;
  lastName?: string;
  selectedCause?: string; // This will store the EIN
  createdAt: Date;
  updatedAt: Date;
}

export interface Charity {
  ein: string;
  name: string;
  nteeCode: string;
  category: string;
  city: string;
  state: string;
}

export interface UserStats {
  uid: string;
  totalDonations: number;
  totalImpact: number;
  lastDonation?: Date;
  causes: {
    [ein: string]: {
      amount: number;
      lastDonation: Date;
    };
  };
}
