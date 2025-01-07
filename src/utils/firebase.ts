import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Ensure we're only initializing Firebase on the client side
const firebaseConfig = {
  apiKey: "AIzaSyB28flW9W4tiyWzquksHbNS5up6bIzyl8g",
  authDomain: "kindly-81b3b.firebaseapp.com",
  projectId: "kindly-81b3b",
  storageBucket: "kindly-81b3b.firebasestorage.app",
  messagingSenderId: "226420039983",
  appId: "1:226420039983:web:27554dd0ece3a51db301da",
  measurementId: "G-0CG211ET49"
};

// Initialize Firebase only on client side
let app;
let auth;
let db;
let analytics = null;

if (typeof window !== 'undefined') {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);
    analytics = getAnalytics(app);
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    throw error;
  }
}

export { app, auth, db, analytics };
