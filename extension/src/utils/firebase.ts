import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA9TSXwDMczr6A_7DoIqyHR7F-I_Zp-_BY",
  authDomain: "kindly-users.firebaseapp.com",
  projectId: "kindly-users",
  storageBucket: "kindly-users.firebasestorage.app",
  messagingSenderId: "85259780860",
  appId: "1:85259780860:web:90fbd49d661c4396610d79",
  measurementId: "G-64ZK7XQ6M2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Set persistence to LOCAL for indefinite login
setPersistence(auth, browserLocalPersistence).catch(error => {
  console.error('Error setting persistence:', error);
});

export const db = getFirestore(app);
