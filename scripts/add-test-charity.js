require('dotenv').config();
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function generateSearchTokens(text) {
  if (!text) return [];
  const words = text.toUpperCase().split(' ');
  const tokens = new Set();
  words.forEach(word => {
    if (word.length > 2) tokens.add(word);
  });
  tokens.add(words.join(' '));
  return Array.from(tokens);
}

async function addTestCharity() {
  try {
    const charity = {
      name: "Test Charity Organization",
      description: "This is a test charity for search functionality",
      ein: "123456789",
      searchTokens: generateSearchTokens("Test Charity Organization This is a test charity for search functionality")
    };

    await setDoc(doc(db, 'charities', charity.ein), charity);
    console.log('Added test charity with search tokens:', charity.searchTokens);
    
    // Wait for operation to complete
    await new Promise(resolve => setTimeout(resolve, 2000));
    process.exit(0);
  } catch (error) {
    console.error('Error adding test charity:', error);
    process.exit(1);
  }
}

addTestCharity();
