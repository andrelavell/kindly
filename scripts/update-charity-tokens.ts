const { db } = require('../src/utils/firebase');
const { collection, getDocs, updateDoc, doc } = require('firebase/firestore');
const { generateSearchTokens } = require('../src/utils/helpers');

async function updateCharitySearchTokens() {
  try {
    const charitiesRef = collection(db, 'charities');
    const snapshot = await getDocs(charitiesRef);

    console.log(`Found ${snapshot.size} charities to update`);

    for (const doc of snapshot.docs) {
      const data = doc.data();
      const searchTokens = generateSearchTokens(data.name);
      
      // Add tokens from other relevant fields if needed
      if (data.description) {
        searchTokens.push(...generateSearchTokens(data.description));
      }

      console.log(`Updating ${data.name} with ${searchTokens.length} tokens`);
      
      await updateDoc(doc.ref, {
        searchTokens: Array.from(new Set(searchTokens)) // Remove duplicates
      });
    }

    console.log('Successfully updated all charities with search tokens');
  } catch (error) {
    console.error('Error updating charity search tokens:', error);
  }
}

// Run the update
updateCharitySearchTokens();
