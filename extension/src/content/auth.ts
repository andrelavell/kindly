// Keep track of auth state
let currentUser: { uid: string; email: string | null } | null = null;

// Listen for auth state changes from background script
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'AUTH_STATE_CHANGED') {
    currentUser = message.user;
    console.log('Kindly: Auth state changed:', currentUser ? 'logged in' : 'logged out');
  }
});

export async function isLoggedIn(): Promise<boolean> {
  try {
    console.log('Kindly DEBUG: Checking login state...');
    
    // First check storage directly
    const stored = await chrome.storage.local.get(['kindlyAuthState']);
    if (stored.kindlyAuthState) {
      currentUser = stored.kindlyAuthState;
      console.log('Kindly DEBUG: Found stored auth state:', currentUser);
      // Broadcast auth state to ensure all components are in sync
      chrome.runtime.sendMessage({ 
        type: 'AUTH_STATE_CHANGED',
        user: stored.kindlyAuthState
      });
      return true;
    }
    
    // Then check our cached state
    if (currentUser) {
      console.log('Kindly DEBUG: Found cached user:', currentUser);
      // Broadcast cached state to ensure all components are in sync
      chrome.runtime.sendMessage({ 
        type: 'AUTH_STATE_CHANGED',
        user: currentUser
      });
      return true;
    }

    // Finally ask background script
    return new Promise((resolve) => {
      console.log('Kindly DEBUG: Requesting auth state from background...');
      chrome.runtime.sendMessage({ type: 'GET_AUTH_STATE' }, (response) => {
        console.log('Kindly DEBUG: Got auth state response:', response);
        if (response && response.user) {
          currentUser = response.user;
          console.log('Kindly DEBUG: Updated current user:', currentUser);
          // Broadcast received state to ensure all components are in sync
          chrome.runtime.sendMessage({ 
            type: 'AUTH_STATE_CHANGED',
            user: currentUser
          });
          resolve(true);
        } else {
          console.log('Kindly DEBUG: No user found in response');
          resolve(false);
        }
      });
    });
  } catch (error) {
    console.error('Kindly: Error checking auth state:', error);
    return false;
  }
}
