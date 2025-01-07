import { Cause } from './types';

export const causes: Cause[] = [
  {
    id: "climate-action",
    name: "Climate Action",
    category: "Environment",
    mission: "Working to combat climate change and its impacts through conservation, education, and sustainable practices.",
    icon: "/images/causes/climate-action-logo.png",
    size: "large",
    state: "CA",
    financialRating: 4,
    accountabilityRating: 4,
    overallRating: 4,
    relevance: 1,
    financialMetrics: {
      totalRevenue: 25000000,
      totalExpenses: 23000000,
      programExpenses: 20000000,
      adminExpenses: 2000000,
      fundraisingExpenses: 1000000,
      workingCapital: 5000000,
      programExpenseRatio: 87
    },
    impact: {
      metrics: [
        {
          label: "Trees Planted",
          value: "1.2M",
          changePercent: 15
        },
        {
          label: "CO2 Reduced",
          value: "500K tons",
          changePercent: 12
        }
      ],
      stories: [
        {
          title: "Reforestation Success",
          content: "Our reforestation efforts have successfully planted over 1.2 million trees, creating new habitats and reducing CO2.",
          date: "2024-12-15"
        }
      ]
    },
    organization: {
      founded: "1985",
      headquarters: "San Francisco, CA",
      employees: 150,
      volunteers: 5000,
      leadershipTeam: [
        {
          name: "Dr. Sarah Chen",
          title: "Executive Director",
          bio: "20+ years in environmental conservation"
        }
      ],
      contact: {
        email: "contact@climateaction.org",
        phone: "(555) 123-4567",
        address: "123 Green Street, San Francisco, CA 94111"
      }
    },
    accountability: {
      boardMembers: 12,
      meetingsPerYear: 6,
      hasWhistleblowerPolicy: true,
      hasConflictPolicy: true,
      diversityScore: 85
    }
  }
];
