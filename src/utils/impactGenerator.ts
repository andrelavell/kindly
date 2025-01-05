import { faker } from '@faker-js/faker';
import { storeBrands } from './storeBrands';

export interface Impact {
  id: number;
  user: string;
  store: string;
  amount: string;
  donation: string;
  impact: string;
  timestamp: number;
}

const generateAmount = (store: string): number => {
  // Base amounts for different stores
  const baseAmounts: { [key: string]: number } = {
    'Amazon': 35,
    'Target': 45,
    'Walmart': 40,
    'Best Buy': 85,
    'Apple': 120,
    'Nike': 65,
    'Starbucks': 8,
    'Barnes & Noble': 25,
    'Home Depot': 55,
    'Whole Foods': 50
  };

  const baseAmount = baseAmounts[store] || 30;
  const variation = baseAmount * 0.4; // 40% variation
  return baseAmount + (Math.random() * variation * 2 - variation);
};

// Impact messages grouped by donation range
const impactsByRange = {
  small: [ // $0-5
    'supported local food banks',
    'provided meals to families',
    'funded education supplies',
    'supported animal shelters',
    'helped plant trees'
  ],
  medium: [ // $5-15
    'funded medical supplies',
    'provided job training',
    'supported clean water projects',
    'funded literacy programs',
    'supported mental health services'
  ],
  large: [ // $15+
    'funded emergency relief',
    'supported housing initiatives',
    'funded healthcare access',
    'supported environmental conservation',
    'funded community development'
  ]
};

const getImpactForAmount = (amount: number): string => {
  const category = amount <= 5 ? 'small' : amount <= 15 ? 'medium' : 'large';
  const impacts = impactsByRange[category];
  return impacts[Math.floor(Math.random() * impacts.length)];
};

export const generateImpact = (timestamp = Date.now()): Impact => {
  const stores = Object.keys(storeBrands);
  const store = stores[Math.floor(Math.random() * stores.length)];
  const amount = generateAmount(store);
  // Generate random percentage between 2-5%
  const donationPercent = (2 + Math.random() * 3) / 100;
  const donation = (amount * donationPercent).toFixed(2);
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  
  return {
    id: Math.floor(Math.random() * 1000000),
    user: `${firstName} ${lastName[0]}.`,
    store,
    amount: amount.toFixed(2),
    donation,
    impact: getImpactForAmount(parseFloat(donation)),
    timestamp
  };
};
