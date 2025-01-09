import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence, indexedDBLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB28flW9W4tiyWzquksHbNS5up6bIzyl8g",
  authDomain: "kindly-81b3b.firebaseapp.com",
  projectId: "kindly-81b3b",
  storageBucket: "kindly-81b3b.firebasestorage.app",
  messagingSenderId: "226420039983",
  appId: "1:226420039983:web:27554dd0ece3a51db301da",
  measurementId: "G-0CG211ET49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Set persistence to IndexedDB for Chrome extension
(async () => {
  try {
    // Try IndexedDB first as it's more reliable for extensions
    await setPersistence(auth, indexedDBLocalPersistence);
  } catch (error) {
    console.warn('IndexedDB persistence failed, falling back to local storage:', error);
    // Fall back to localStorage if IndexedDB is not available
    await setPersistence(auth, browserLocalPersistence);
  }
})();

// Initialize Firestore
const db = getFirestore(app);

export type UserProfile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  tracking_id: string;
  created_at: string;
  selectedCause?: string;
  stats: {
    totalContribution: number;
    monthlyContribution: number;
    shoppingSessions: number;
    storesVisited: number;
    lastUpdated: string;
  };
};

export { app, auth, db };
