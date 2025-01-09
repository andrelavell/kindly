const Typesense = require('typesense');
const admin = require('firebase-admin');
const serviceAccount = require('./service-account-key.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

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

// Initialize Typesense Client
const typesense = new Typesense.Client({
  nodes: [{
    host: 'localhost',
    port: '8108',
    protocol: 'http'
  }],
  apiKey: 'xyz123',
  connectionTimeoutSeconds: 2
});

async function createCharitiesSchema() {
  try {
    await typesense.collections('charities').delete();
  } catch (err) {
    // Collection might not exist, ignore error
  }

  return await typesense.collections().create({
    name: 'charities',
    fields: [
      { name: 'name', type: 'string' },
      { name: 'ein', type: 'string' },
      { name: 'state', type: 'string', facet: true },
      { name: 'city', type: 'string', optional: true },
      { name: 'revenue', type: 'int32', facet: true },
      { name: 'category', type: 'string', facet: true }
    ],
    default_sorting_field: 'revenue'
  });
}

async function importCharities() {
  console.log('Creating schema...');
  await createCharitiesSchema();

  console.log('Fetching charities from Firestore...');
  const charitiesRef = db.collection('charities');
  const snapshot = await charitiesRef.get();

  console.log(`Found ${snapshot.size} charities. Starting import...`);
  let batch = [];
  let totalProcessed = 0;

  for (const doc of snapshot.docs) {
    const data = doc.data();
    
    // Prepare document for Typesense
    const charity = {
      name: data.name || '',
      ein: data.ein || '',
      state: data.state || '',
      city: data.city || '',
      revenue: data.revenue || 0,
      category: data.nteeCode ? (CATEGORIES[data.nteeCode.charAt(0)] || 'Other') : ''
    };

    batch.push(charity);
    
    // Import in batches of 1000
    if (batch.length === 1000) {
      await typesense.collections('charities').documents().import(batch);
      console.log(`Imported ${totalProcessed + batch.length} charities...`);
      totalProcessed += batch.length;
      batch = [];
    }
  }

  // Import remaining documents
  if (batch.length > 0) {
    await typesense.collections('charities').documents().import(batch);
    totalProcessed += batch.length;
  }

  console.log(`Import complete! Imported ${totalProcessed} charities.`);
  process.exit(0);
}

// Start import
console.log('Starting Typesense import...');
importCharities().catch(error => {
  console.error('Import failed:', error);
  process.exit(1);
});
