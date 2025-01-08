const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('/Users/deandremoore/Downloads/kindly-81b3b-firebase-adminsdk-a2o5p-42fb5f538f.json');

// Initialize Firebase Admin with ignoreUndefinedProperties
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = getFirestore();
db.settings({ ignoreUndefinedProperties: true });

module.exports = { db, admin };
