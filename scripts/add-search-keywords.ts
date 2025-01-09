const admin = require('firebase-admin');
const serviceAccount = require('./service-account-key.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function addSearchKeywords() {
  try {
    console.log('Starting to add search keywords...');
    const charitiesRef = db.collection('charities');
    const snapshot = await charitiesRef.get();
    
    let batch = db.batch();
    let batchCount = 0;
    let totalProcessed = 0;
    
    for (const doc of snapshot.docs) {
      const charity = doc.data();
      const name = charity.name;
      
      if (!name) {
        console.log(`Skipping charity ${doc.id} - no name found`);
        continue;
      }
      
      // Generate keywords from the name
      const keywords = new Set();
      
      // Add full name uppercase
      keywords.add(name.toUpperCase());
      
      // Add each word individually
      name.toUpperCase().split(/[\s-]+/).forEach(word => {
        if (word.length > 1) { // Skip single-letter words
          keywords.add(word);
        }
      });
      
      // Update the document with keywords
      batch.update(doc.ref, {
        searchKeywords: Array.from(keywords)
      });
      
      batchCount++;
      totalProcessed++;
      
      // Commit batch every 500 documents
      if (batchCount === 500) {
        await batch.commit();
        console.log(`Processed ${totalProcessed} charities...`);
        batch = db.batch();
        batchCount = 0;
      }
    }
    
    // Commit any remaining documents
    if (batchCount > 0) {
      await batch.commit();
    }
    
    console.log(`Finished processing ${totalProcessed} charities!`);
    process.exit(0);
  } catch (error) {
    console.error('Error adding search keywords:', error);
    process.exit(1);
  }
}

// Run the script
addSearchKeywords();
