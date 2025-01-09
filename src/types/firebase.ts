export interface UserProfile {
  uid: string;
  email: string;
  firstName?: string;
  lastName?: string;
  selectedCause?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserStats {
  uid: string;
  totalDonations: number;
  totalImpact: number;
  lastDonation?: Date;
  causes: {
    [id: string]: {
      amount: number;
      lastDonation: Date;
    };
  };
}
