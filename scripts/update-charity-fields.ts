const { db } = require('../src/utils/firebase');
const { collection, getDocs, updateDoc, doc } = require('firebase/firestore');

async function updateCharityFields() {
  try {
    const charitiesRef = collection(db, 'charities');
    const snapshot = await getDocs(charitiesRef);

    console.log(`Found ${snapshot.docs.length} charities to update`);

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();
      await updateDoc(doc(db, 'charities', docSnap.id), {
        state: data.address?.state || '',
        category: data.classification?.nteeCode || '',
      });
      console.log(`Updated charity ${docSnap.id}`);
    }

    console.log('Successfully updated all charities');
  } catch (error) {
    console.error('Error updating charities:', error);
  }
}

updateCharityFields();
