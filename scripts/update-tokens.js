require('dotenv').config();
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, updateDoc, connectFirestoreEmulator } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Connect to emulator if running locally
if (process.env.NODE_ENV === 'development') {
  connectFirestoreEmulator(db, 'localhost', 8080);
}

function generateSearchTokens(text) {
  if (!text) return [];
  
  // Convert to uppercase for consistent searching
  const words = text.toUpperCase().split(' ');
  const tokens = new Set();

  // Add full words
  words.forEach(word => {
    if (word.length > 2) tokens.add(word);
  });

  // Add complete name
  tokens.add(words.join(' '));

  return Array.from(tokens);
}

async function updateCharitySearchTokens() {
  try {
    // Wait for connection
    await new Promise(resolve => setTimeout(resolve, 2000));

    const charitiesRef = collection(db, 'charities');
    const snapshot = await getDocs(charitiesRef);

    console.log(`Found ${snapshot.size} charities to update`);

    for (const doc of snapshot.docs) {
      const data = doc.data();
      const searchTokens = generateSearchTokens(data.name);
      
      if (data.description) {
        searchTokens.push(...generateSearchTokens(data.description));
      }

      console.log(`Updating ${data.name} with ${searchTokens.length} tokens`);
      
      await updateDoc(doc.ref, {
        searchTokens: Array.from(new Set(searchTokens))
      });

      // Add delay between updates to avoid quota issues
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('Successfully updated all charities with search tokens');
    
    // Wait for final updates to complete
    await new Promise(resolve => setTimeout(resolve, 2000));
    process.exit(0);
  } catch (error) {
    console.error('Error updating charity search tokens:', error);
    process.exit(1);
  }
}

// Run the update
updateCharitySearchTokens();
