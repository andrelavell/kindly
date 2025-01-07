import { Cause } from '../../shared/types';

export const causes: Cause[] = [
  {
    id: "ocean-conservation",
    name: "Ocean Conservation",
    category: "Environment",
    mission: "Protecting marine ecosystems and wildlife through science-based conservation efforts",
    icon: "/images/causes/ocean-conservation-logo.png",
    size: "large",
    state: "CA",
    financialRating: 95,
    accountabilityRating: 95,
    overallRating: 95,
    relevance: 0,
    ein: "94-3213100",
    financialMetrics: {
      totalRevenue: 25000000,
      totalExpenses: 22000000,
      programExpenses: 18000000,
      adminExpenses: 2000000,
      fundraisingExpenses: 2500000,
      workingCapital: 5000000,
      programExpenseRatio: 82,
      programExpenseGrowth: 10,
      liabilitiesAssetRatio: 0.5
    },
    impact: {
      metrics: [
        {
          label: "Marine Areas Protected",
          value: "2.4M km²",
          description: "Area of ocean under active conservation management",
          changePercent: 15
        },
        {
          label: "Species Protected",
          value: "1,200+",
          description: "Marine species directly benefiting from our conservation efforts",
          changePercent: 10
        }
      ],
      stories: [
        {
          title: "Coral Reef Restoration",
          content: "Successfully restored 500 acres of coral reef in the Pacific Ocean, providing habitat for thousands of marine species.",
          date: "2024-12-01",
          image: "/images/stories/coral-reef.jpg"
        }
      ]
    },
    organization: {
      founded: "1985",
      headquarters: "San Francisco, CA",
      employees: 250,
      volunteers: 10000,
      leadershipTeam: [
        {
          name: "Dr. Sarah Chen",
          title: "Executive Director",
          bio: "20+ years in marine biology and conservation",
          compensation: 150000,
          image: "/images/leadership/sarah-chen.jpg"
        }
      ],
      contact: {
        email: "info@oceanconservation.org",
        phone: "(415) 123-4567",
        address: "123 Main St, San Francisco, CA 94105"
      }
    },
    accountability: {
      boardMembers: 15,
      meetingsPerYear: 6,
      hasWhistleblowerPolicy: true,
      hasConflictPolicy: true,
      diversityScore: 9,
      boardIndependence: 0.9
    },
    programs: [
      {
        name: "Marine Protected Areas",
        description: "Establishing and maintaining protected ocean zones",
        impact: "Created 12 new marine protected areas in 2024"
      },
      {
        name: "Plastic Pollution",
        description: "Reducing plastic waste in oceans",
        impact: "Removed over 500,000 pounds of plastic from oceans"
      },
      {
        name: "Coral Restoration",
        description: "Restoring damaged coral reefs",
        impact: "Successfully restored 15 acres of coral reef"
      }
    ]
  },
  {
    id: "climate-action",
    name: "Climate Action",
    category: "Environment",
    mission: "Accelerating the transition to a sustainable, low-carbon future through technological innovation, policy advocacy, and community engagement",
    icon: "/images/causes/climate-action-logo.png",
    size: "large",
    state: "CA",
    financialRating: 92,
    accountabilityRating: 90,
    overallRating: 91,
    relevance: 0,
    ein: "47-2198130",
    financialMetrics: {
      totalRevenue: 35000000,
      totalExpenses: 32000000,
      programExpenses: 26000000,
      adminExpenses: 3000000,
      fundraisingExpenses: 3000000,
      workingCapital: 8000000,
      programExpenseRatio: 81,
      programExpenseGrowth: 12,
      liabilitiesAssetRatio: 0.4
    },
    impact: {
      metrics: [
        {
          label: "Carbon Reduction",
          value: "2.5M tons",
          description: "Annual reduction in carbon emissions through our programs",
          changePercent: 20
        },
        {
          label: "Clean Energy Projects",
          value: "500+",
          description: "Clean energy projects implemented",
          changePercent: 25
        }
      ],
      stories: [
        {
          title: "Community Solar Success",
          content: "Launched 50 community solar projects providing clean energy to 10,000 households",
          date: "2024-11-15",
          image: "/images/stories/community-solar.jpg"
        }
      ]
    },
    organization: {
      founded: "2014",
      headquarters: "San Francisco, CA",
      employees: 180,
      volunteers: 5000,
      leadershipTeam: [
        {
          name: "Michael Green",
          title: "CEO",
          bio: "15+ years in renewable energy and climate policy",
          compensation: 200000,
          image: "/images/leadership/michael-green.jpg"
        }
      ],
      contact: {
        email: "info@climateaction.org",
        phone: "(415) 555-0123",
        address: "456 Green St, San Francisco, CA 94111"
      }
    },
    accountability: {
      boardMembers: 12,
      meetingsPerYear: 4,
      hasWhistleblowerPolicy: true,
      hasConflictPolicy: true,
      diversityScore: 8,
      boardIndependence: 0.85
    },
    programs: [
      {
        name: "Clean Energy Transition",
        description: "Supporting communities and businesses in transitioning to renewable energy sources",
        impact: "Facilitated installation of 500MW of renewable energy capacity"
      },
      {
        name: "Climate Resilience",
        description: "Helping communities adapt to climate change impacts",
        impact: "Protected 250,000 people from climate-related disasters"
      },
      {
        name: "Policy & Advocacy",
        description: "Advocating for strong climate policies at local and national levels",
        impact: "Contributed to passage of 15 major climate policies"
      }
    ]
  },
  {
    id: "climate-resilience",
    name: "Climate Resilience",
    category: "Environment",
    mission: "Building resilient communities through climate adaptation and mitigation strategies",
    icon: "/images/causes/climate-resilience-logo.png",
    size: "mid-sized",
    state: "NY",
    financialRating: 88,
    accountabilityRating: 85,
    overallRating: 87,
    relevance: 2,
    ein: "45-6789012",
    financialMetrics: {
      totalRevenue: 15000000,
      totalExpenses: 14000000,
      programExpenses: 11200000,
      adminExpenses: 1400000,
      fundraisingExpenses: 1400000,
      workingCapital: 3000000,
      programExpenseRatio: 80,
      programExpenseGrowth: 10,
      liabilitiesAssetRatio: 0.3
    },
    impact: {
      metrics: [
        {
          label: "Communities Protected",
          value: "250+",
          description: "Number of communities with improved climate resilience",
          changePercent: 25
        },
        {
          label: "Infrastructure Projects",
          value: "50+",
          description: "Climate-resilient infrastructure projects completed",
          changePercent: 20
        }
      ],
      stories: [
        {
          title: "Coastal Protection Success",
          content: "Successfully implemented coastal protection measures that helped a community withstand a major storm surge",
          date: "2024-11-30",
          image: "/images/stories/coastal-protection.jpg"
        }
      ]
    },
    organization: {
      founded: "2000",
      headquarters: "New York, NY",
      employees: 75,
      volunteers: 1000,
      leadershipTeam: [
        {
          name: "Sarah Chen",
          title: "Executive Director",
          bio: "15+ years in climate resilience and community development",
          compensation: 180000,
          image: "/images/leadership/sarah-chen.jpg"
        }
      ],
      contact: {
        email: "info@climateresilience.org",
        phone: "(212) 555-0125",
        address: "456 Climate St, New York, NY 10013"
      }
    },
    accountability: {
      boardMembers: 9,
      meetingsPerYear: 6,
      hasWhistleblowerPolicy: true,
      hasConflictPolicy: true,
      diversityScore: 8,
      boardIndependence: 0.8
    },
    programs: [
      {
        name: "Community Resilience",
        description: "Helping communities prepare for and adapt to climate change",
        impact: "250 communities better prepared for climate impacts"
      }
    ]
  }
];
