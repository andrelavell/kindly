import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
  console.log('Auth state changed:', user ? 'User signed in' : 'User signed out');
  chrome.runtime.sendMessage({ 
    type: 'AUTH_STATE_CHANGE',
    payload: { user }
  });
});

// Handle email verification
chrome.webNavigation.onCompleted.addListener(async (details) => {
  const url = new URL(details.url);
  
  // Only handle navigation to our extension pages
  if (!url.href.startsWith(chrome.runtime.getURL(''))) return;
  
  // Check for Firebase auth action mode
  const mode = url.searchParams.get('mode');
  const oobCode = url.searchParams.get('oobCode');
  
  if (mode === 'verifyEmail' && oobCode) {
    try {
      // Handle email verification if needed
      chrome.runtime.sendMessage({ type: 'EMAIL_VERIFIED' });
    } catch (error) {
      console.error('Email verification error:', error);
    }
  }
});
