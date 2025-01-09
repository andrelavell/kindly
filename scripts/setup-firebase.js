const admin = require('firebase-admin');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore } = require('firebase-admin/firestore');

// Initialize Firebase Admin with service account
const serviceAccount = require('./service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});

async function setupFirebase() {
  try {
    console.log('🔧 Setting up Firebase...');
    
    // 1. Enable Email/Password Authentication
    console.log('\n1️⃣  Authentication Setup:');
    console.log('   ⚠️  Please manually enable Email/Password authentication in Firebase Console:');
    console.log('   📝 Steps:');
    console.log('      1. Go to: https://console.firebase.google.com/project/kindly-99f17/authentication');
    console.log('      2. Click "Sign-in method"');
    console.log('      3. Enable "Email/Password"');

    // 2. Set up Firestore Security Rules
    console.log('\n2️⃣  Firestore Security Rules:');
    console.log('   ⚠️  Please set these security rules in Firebase Console:');
    console.log(`   📝 Rules:
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /users/{userId} {
          allow read, write: if request.auth != null && request.auth.uid == userId;
        }
        match /donations/{donationId} {
          allow read, write: if request.auth != null;
        }
      }
    }`);

    // 3. Initialize Firestore collections
    console.log('\n3️⃣  Initializing Firestore collections...');
    const db = getFirestore();
    
    // Enable Firestore
    try {
      await db.collection('users').doc('test').set({
        test: true
      });
      await db.collection('users').doc('test').delete();
      console.log('   ✅ Firestore is enabled and working');
    } catch (error) {
      console.log('   ⚠️  Please enable Firestore in Firebase Console:');
      console.log('      1. Go to: https://console.firebase.google.com/project/kindly-99f17/firestore');
      console.log('      2. Click "Create database"');
      console.log('      3. Choose "Start in production mode"');
      console.log('      4. Choose a location (us-west1 recommended)');
      return;
    }

    console.log('\n✅ Firebase setup completed!');
    console.log('\n📋 Next steps:');
    console.log('1. Enable Email/Password authentication (if not done)');
    console.log('2. Set the security rules (if not done)');
    console.log('3. Test signing up a new user');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.code === 5) {
      console.log('\n⚠️  Please enable Firestore first:');
      console.log('1. Go to: https://console.firebase.google.com/project/kindly-99f17/firestore');
      console.log('2. Click "Create database"');
      console.log('3. Choose "Start in production mode"');
      console.log('4. Choose a location (us-west1 recommended)');
    }
  }
}

setupFirebase();
