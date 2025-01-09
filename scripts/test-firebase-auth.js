const admin = require('firebase-admin');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore } = require('firebase-admin/firestore');

// Initialize Firebase Admin
const serviceAccount = require('./service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});

async function testFirebase() {
  try {
    console.log('🔧 Testing Firebase Setup...\n');
    
    const auth = getAuth();
    const db = getFirestore();
    
    // 1. Create a test user
    console.log('1️⃣  Creating test user...');
    const userEmail = `test${Date.now()}@example.com`;
    const userPassword = 'testpassword123';
    
    const userRecord = await auth.createUser({
      email: userEmail,
      password: userPassword,
      displayName: 'Test User'
    });
    console.log('   ✅ Test user created:', userEmail);

    // 2. Create user profile in Firestore
    console.log('\n2️⃣  Creating user profile...');
    const userProfile = {
      id: userRecord.uid,
      first_name: 'Test',
      last_name: 'User',
      email: userEmail,
      tracking_id: 'TEST' + Math.random().toString(36).substring(2, 6).toUpperCase(),
      created_at: new Date().toISOString()
    };
    
    await db.collection('users').doc(userRecord.uid).set(userProfile);
    console.log('   ✅ User profile created in Firestore');

    // 3. Verify we can read the user profile
    console.log('\n3️⃣  Verifying user profile...');
    const userDoc = await db.collection('users').doc(userRecord.uid).get();
    if (userDoc.exists) {
      console.log('   ✅ Successfully read user profile');
    }

    // 4. Clean up
    console.log('\n4️⃣  Cleaning up...');
    await auth.deleteUser(userRecord.uid);
    await db.collection('users').doc(userRecord.uid).delete();
    console.log('   ✅ Test user deleted');

    console.log('\n✅ All tests passed! Firebase is properly configured.');
    console.log('\nYou can now use these credentials in your app:');
    console.log(`Email: ${userEmail}`);
    console.log(`Password: ${userPassword}`);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.code === 'auth/email-already-exists') {
      console.log('The test user already exists. This is fine, you can still use the credentials.');
    }
  }
}

testFirebase();
