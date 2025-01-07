export interface Cause {
  id: string;
  name: string;
  category: string;
  mission: string;
  icon: string;
  size: 'very-small' | 'small' | 'mid-sized' | 'mid-to-large' | 'large';
  state: string;
  financialRating: number;
  accountabilityRating: number;
  overallRating: number;
  relevance: number;
  ein?: string;
  financialMetrics: {
    totalRevenue: number;
    totalExpenses: number;
    programExpenses: number;
    adminExpenses: number;
    fundraisingExpenses: number;
    workingCapital: number;
    programExpenseRatio: number;
    programExpenseGrowth?: number;
    liabilitiesAssetRatio?: number;
  };
  impact: {
    metrics: Array<{
      label: string;
      value: string;
      changePercent?: number;
      description?: string;
    }>;
    stories: Array<{
      title: string;
      content: string;
      date?: string;
      image?: string;
    }>;
  };
  organization: {
    founded: string;
    headquarters: string;
    employees: number;
    volunteers: number;
    leadershipTeam: Array<{
      name: string;
      title: string;
      bio?: string;
      compensation?: number;
      image?: string;
    }>;
    contact: {
      email: string;
      phone: string;
      address: string;
    };
  };
  accountability: {
    boardMembers: number;
    meetingsPerYear: number;
    hasWhistleblowerPolicy: boolean;
    hasConflictPolicy: boolean;
    diversityScore: number;
    boardIndependence?: number;
  };
  programs?: Array<{
    name: string;
    description: string;
    impact: string;
  }>;
}

export interface Transaction {
  id: string;
  userId: string;
  merchantName: string;
  amount: number;
  donationAmount: number;
  date: string;
  status: 'pending' | 'paid';
  causeId: string;
}

export interface UserStats {
  totalContribution: number;
  monthlyContribution: number;
  shoppingSessions: number;
  storesVisited: number;
  lastUpdated: string;
  transactions: Transaction[];
}
