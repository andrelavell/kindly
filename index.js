const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Initialize Firebase Admin with service account using absolute path
const serviceAccountPath = path.join(__dirname, 'firebase-admin.json');
const serviceAccount = require(serviceAccountPath);

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log('Firebase Admin initialized successfully');
} catch (error) {
  console.error('Initialization error:', error);
  process.exit(1);
}

const app = express();

// Configure CORS to accept requests from chrome extension
app.use(cors({
  origin: /^chrome-extension:\/\/.*/,
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type', 'Origin']
}));

app.use(express.json());

app.post('/auth/custom-token', async (req, res) => {
  try {
    const { idToken } = req.body;
    
    // Verify the incoming token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    // Create a custom token with persistence claims
    const customToken = await admin.auth().createCustomToken(decodedToken.uid, {
      claims: {
        persistentAuth: true,
        timestamp: Date.now()
      }
    });
    
    // Store session info in Firestore
    await admin.firestore().collection('sessions').doc(decodedToken.uid).set({
      lastActive: admin.firestore.FieldValue.serverTimestamp(),
      customToken,
      persistentAuth: true,
      refreshCount: admin.firestore.FieldValue.increment(1),
      lastRefresh: Date.now()
    }, { merge: true });
    
    // Set headers for better security
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    res.send(customToken);
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({
      error: 'Invalid token',
      message: error.message
    });
  }
});

// Add a health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    message: 'Auth service is running',
    version: '1.0.1'
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Auth service running on port ${port}`);
});