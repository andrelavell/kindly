import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore, initializeFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0o0T1l9OQNja_FT-0XS6-23n1N5B2y3Q",
  authDomain: "kindly-99f17.firebaseapp.com",
  projectId: "kindly-99f17",
  storageBucket: "kindly-99f17.firebasestorage.app",
  messagingSenderId: "585600986589",
  appId: "1:585600986589:web:08586e34c1d39f76469a34",
  measurementId: "G-RT68GRMX3W"
};

// Initialize Firebase with auth domain override for Chrome extension
const app = initializeApp({
  ...firebaseConfig,
  // Add the extension URL as an additional auth domain
  authDomain: `chrome-extension://mneggcbpbookmedadddejjnhdodafjkd`
});

// Initialize Auth with persistence
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error("Auth persistence error:", error);
  });

// Initialize Firestore with persistence
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  cacheSizeBytes: 50000000 // 50 MB cache size
});

export { app, auth, db };
