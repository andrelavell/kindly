import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence, indexedDBLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0o0T1l9OQNja_FT-0XS6-23n1N5B2y3Q",
  authDomain: "kindly-99f17.firebaseapp.com",
  projectId: "kindly-99f17",
  storageBucket: "kindly-99f17.firebasestorage.app",
  messagingSenderId: "585600986589",
  appId: "1:585600986589:web:08586e34c1d39f76469a34",
  measurementId: "G-RT68GRMX3W"
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
