const admin = require('firebase-admin');
const { readFileSync, writeFileSync, mkdirSync } = require('fs');
const { join } = require('path');

// Load service account
const serviceAccountPath = join(__dirname, 'service-account-key.json');
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function backupCollection(collectionName) {
  console.log(`Backing up collection: ${collectionName}`);
  const snapshot = await db.collection(collectionName).get();
  const data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return data;
}

async function backupFirebase() {
  try {
    // Create backups directory if it doesn't exist
    const backupDir = join(__dirname, '../backups');
    mkdirSync(backupDir, { recursive: true });

    // Backup each collection
    const collections = ['charities', 'profiles', 'causes'];
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    for (const collection of collections) {
      const data = await backupCollection(collection);
      const backupPath = join(backupDir, `${collection}_${timestamp}.json`);
      writeFileSync(backupPath, JSON.stringify(data, null, 2));
      console.log(`Backed up ${data.length} documents from ${collection} to ${backupPath}`);
    }

    console.log('Backup completed successfully!');
  } catch (error) {
    console.error('Error during backup:', error);
    process.exit(1);
  }
}

// Run backup if this file is run directly
if (require.main === module) {
  backupFirebase()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}
