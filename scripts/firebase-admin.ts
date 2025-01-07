import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const serviceAccount = join(__dirname, 'service-account-key.json');

// Initialize Firebase Admin with service account
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();

export { db };
