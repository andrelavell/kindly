import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA9TSXwDMczr6A_7DoIqyHR7F-I_Zp-_BY",
  authDomain: "kindly-users.firebaseapp.com",
  projectId: "kindly-users",
  storageBucket: "kindly-users.appspot.com",
  messagingSenderId: "85259780860",
  appId: "1:85259780860:web:90fbd49d661c4396610d79",
  measurementId: "G-64ZK7XQ6M2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
