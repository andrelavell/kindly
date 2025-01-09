const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');

interface CharityBasicInfo {
  ein: string;
  name: string;
  nteeCode: string;
  category: string;
  city: string | null;
  state: string;
  revenue: number;
}

interface ProPublicaOrganization {
  ein: number | string;
  name: string;
  ntee_code: string | null;
  city: string | null;
  state: string | null;
  revenue_amount: number;
}

interface ProPublicaResponse {
  organizations: ProPublicaOrganization[];
  num_pages: number;
  total_results: number;
  cur_page: number;
}

const BATCH_SIZE = 500; // Firestore batch limit
const CATEGORIES: { [key: string]: string } = {
  'A': 'Arts, Culture & Humanities',
  'B': 'Education',
  'C': 'Environmental Conservation',
  'D': 'Animal Welfare',
  'E': 'Health - General',
  'F': 'Mental Health & Crisis Intervention',
  'G': 'Disease & Disorder Specific',
  'H': 'Medical Research',
  'I': 'Crime & Legal Services',
  'J': 'Employment Services',
  'K': 'Food, Agriculture & Nutrition',
  'L': 'Housing & Shelter',
  'M': 'Public Safety & Disaster Relief',
  'N': 'Recreation & Sports',
  'O': 'Youth Development',
  'P': 'Human Services - Other',
  'Q': 'International Development',
  'R': 'Civil Rights & Advocacy',
  'S': 'Community Development',
  'T': 'Philanthropy & Nonprofit Support',
  'U': 'Science & Technology',
  'V': 'Social Science Research',
  'W': 'Public Policy',
  'X': 'Religious Organizations',
  'Y': 'Mutual Benefit Organizations',
  'Z': 'Unknown'
};

// Initialize Firebase Admin
const path = require('path');
admin.initializeApp({
  credential: admin.credential.cert(path.join(__dirname, 'service-account-key.json'))
});

const db = getFirestore();

async function fetchCharitiesPage(page: number): Promise<ProPublicaResponse> {
  const response = await fetch(
    `https://projects.propublica.org/nonprofits/api/v2/search.json?page=${page}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

async function commitBatches(batches: any[]): Promise<void> {
  // Process batches in chunks to avoid overwhelming Firestore
  const CONCURRENT_BATCHES = 5;
  for (let i = 0; i < batches.length; i += CONCURRENT_BATCHES) {
    const batchChunk = batches.slice(i, i + CONCURRENT_BATCHES);
    await Promise.all(batchChunk.map(batch => batch.commit()));
  }
}

async function saveCharitiesToFirestore(charities: CharityBasicInfo[]): Promise<void> {
  const charitiesRef = db.collection('charities');
  const batches: any[] = [];
  let currentBatch = db.batch();
  let operationCount = 0;

  for (const charity of charities) {
    const charityRef = charitiesRef.doc(charity.ein);
    currentBatch.set(charityRef, charity, { merge: true });
    operationCount++;

    if (operationCount === BATCH_SIZE) {
      batches.push(currentBatch);
      currentBatch = db.batch();
      operationCount = 0;
    }
  }

  if (operationCount > 0) {
    batches.push(currentBatch);
  }

  await commitBatches(batches);
}

async function syncCharities(): Promise<void> {
  try {
    console.log('Starting charity sync from page 399...');
    let page = 399;  // Start from one page before where we hit the error
    let hasMore = true;
    let totalProcessed = 7539;  // Adjust total to match page 399

    while (hasMore) {
      console.log(`Fetching page ${page}...`);
      const data = await fetchCharitiesPage(page);
      
      if (!data.organizations || data.organizations.length === 0) {
        hasMore = false;
        continue;
      }

      const charities: CharityBasicInfo[] = data.organizations
        .filter((org): org is ProPublicaOrganization & { ntee_code: string } => 
          Boolean(org.ntee_code)) // Only include orgs with NTEE codes
        .map(org => ({
          ein: org.ein.toString(),
          name: org.name,
          nteeCode: org.ntee_code,
          category: CATEGORIES[org.ntee_code.charAt(0)] || 'Other',
          city: org.city?.trim() || null,
          state: org.state?.trim()?.toUpperCase() || '', // Ensure state is uppercase
          revenue: org.revenue_amount || 0
        }))
        .filter((charity): charity is CharityBasicInfo => 
          Boolean(charity.state && charity.state.length === 2)); // Only include valid state codes

      await saveCharitiesToFirestore(charities);
      
      totalProcessed += charities.length;
      console.log(`Processed ${totalProcessed} charities so far...`);
      
      // Check if we've reached the last page
      if (page >= data.num_pages) {
        hasMore = false;
      }
      
      page++;
      
      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log(`Finished syncing ${totalProcessed} charities!`);
  } catch (error) {
    console.error('Error syncing charities:', error instanceof Error ? error.message : 'Unknown error');
    throw error; // Re-throw to ensure the script fails if there's an error
  }
}

// Run the sync
syncCharities().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
