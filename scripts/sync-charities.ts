import { db } from './firebase-admin.js';
import { WriteBatch } from 'firebase-admin/firestore';

interface CharityBasicInfo {
  ein: string;
  name: string;
  nteeCode: string;
  category: string;
  city: string;
  state: string;
}

const BATCH_SIZE = 500; // Firestore batch limit
const CATEGORIES = {
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

async function fetchCharitiesPage(page: number): Promise<any> {
  const response = await fetch(
    `https://projects.propublica.org/nonprofits/api/v2/search.json?page=${page}`
  );
  return response.json();
}

async function saveCharitiesToFirestore(charities: CharityBasicInfo[]) {
  const charitiesRef = db.collection('charities');
  const batches: Promise<void>[] = [];
  let currentBatch = db.batch();
  let operationCount = 0;

  for (const charity of charities) {
    const charityRef = charitiesRef.doc(charity.ein);
    // Use set with merge option to update existing documents without overwriting other fields
    currentBatch.set(charityRef, charity, { merge: true });
    operationCount++;

    if (operationCount === BATCH_SIZE) {
      batches.push(currentBatch.commit());
      currentBatch = db.batch();
      operationCount = 0;
    }
  }

  if (operationCount > 0) {
    batches.push(currentBatch.commit());
  }

  await Promise.all(batches);
}

async function syncCharities() {
  try {
    console.log('Starting charity sync...');
    let page = 1;
    let hasMore = true;
    let totalProcessed = 0;

    while (hasMore) {
      console.log(`Fetching page ${page}...`);
      const data = await fetchCharitiesPage(page);
      
      if (!data.organizations || data.organizations.length === 0) {
        hasMore = false;
        continue;
      }

      const charities: CharityBasicInfo[] = data.organizations
        .filter(org => org.ntee_code) // Only include orgs with NTEE codes
        .map(org => ({
          ein: org.ein.toString(),
          name: org.name,
          nteeCode: org.ntee_code,
          category: CATEGORIES[org.ntee_code.charAt(0)] || 'Other',
          city: org.city?.trim(),
          state: org.state?.trim().toUpperCase() // Ensure state is uppercase
        }))
        .filter(charity => charity.state && charity.state.length === 2); // Only include valid state codes

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
    console.error('Error syncing charities:', error);
  }
}

// Run the sync
syncCharities();
