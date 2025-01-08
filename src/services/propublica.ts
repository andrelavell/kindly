const BASE_URL = 'https://projects.propublica.org/nonprofits/api/v2';

export interface NonprofitSearchResult {
  organizations: Nonprofit[];
  total_results: number;
  current_page: number;
  per_page: number;
  total_pages: number;
}

export interface Nonprofit {
  ein: string;
  name: string;
  city: string;
  state: string;
  ntee_code: string;
  raw_ntee_code?: string;
  subsection?: string;
  total_revenue?: number;
  total_expenses?: number;
  total_assets?: number;
}

export const searchNonprofits = async (
  query: string,
  page: number = 1,
  state?: string,
  ntee_code?: string
): Promise<NonprofitSearchResult> => {
  const params = new URLSearchParams({
    q: query,
    page: page.toString(),
    ...(state && { state }),
    ...(ntee_code && { ntee_code })
  });

  try {
    const response = await fetch(`${BASE_URL}/search.json?${params}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching nonprofits:', error);
    throw error;
  }
};

export const getNonprofitDetails = async (ein: string) => {
  try {
    const response = await fetch(`/api/nonprofits/${ein}`);
    if (!response.ok) {
      throw new Error('Failed to fetch nonprofit details');
    }
    const data = await response.json();
    console.log('Nonprofit Details Response:', JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Error fetching nonprofit details:', error);
    throw error;
  }
};

// Map NTEE codes to our categories
export const nteeToCategory = (nteeCode: string): string => {
  const prefix = nteeCode.charAt(0);
  switch (prefix) {
    case 'A':
      return 'Arts, Culture, Humanities';
    case 'B':
      return 'Education';
    case 'C':
      return 'Environment';
    case 'D':
      return 'Animals';
    case 'E':
    case 'F':
    case 'G':
    case 'H':
      return 'Health';
    case 'I':
    case 'J':
    case 'K':
    case 'L':
    case 'M':
    case 'N':
    case 'O':
    case 'P':
      return 'Human Services';
    case 'Q':
      return 'International';
    case 'R':
    case 'S':
    case 'T':
    case 'U':
    case 'V':
    case 'W':
      return 'Research & Public Policy';
    case 'X':
      return 'Religion';
    default:
      return 'Other';
  }
};

// Calculate size category based on revenue
export const calculateSizeCategory = (revenue?: number): string => {
  if (!revenue) return 'unknown';
  if (revenue >= 13500000) return 'large';
  if (revenue >= 3500000) return 'mid-to-large';
  if (revenue >= 1000000) return 'mid-sized';
  if (revenue >= 500000) return 'small';
  return 'very-small';
};

// Simple financial health score (0-100)
export const calculateFinancialScore = (
  revenue?: number,
  expenses?: number,
  assets?: number
): number => {
  if (!revenue || !expenses || !assets) return 0;
  
  // Basic financial health indicators
  const operatingRatio = revenue / expenses;
  const assetUtilization = revenue / assets;
  
  // Score calculation (simplified)
  let score = 0;
  
  // Operating ratio score (40 points)
  if (operatingRatio >= 1.1) score += 40;
  else if (operatingRatio >= 1) score += 35;
  else if (operatingRatio >= 0.9) score += 25;
  else score += 15;
  
  // Asset utilization score (40 points)
  if (assetUtilization >= 0.5) score += 40;
  else if (assetUtilization >= 0.3) score += 35;
  else if (assetUtilization >= 0.1) score += 25;
  else score += 15;
  
  // Size bonus (20 points)
  const sizeCategory = calculateSizeCategory(revenue);
  switch (sizeCategory) {
    case 'large':
      score += 20;
      break;
    case 'mid-to-large':
      score += 18;
      break;
    case 'mid-sized':
      score += 16;
      break;
    case 'small':
      score += 14;
      break;
    default:
      score += 12;
  }
  
  return Math.min(100, score);
};
