// Listen for auth state changes from chrome.storage
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.userData) {
    const user = changes.userData.newValue;
    console.log('Auth state changed:', user ? 'User signed in' : 'User signed out');
    
    // Notify all extension components about auth state change
    chrome.runtime.sendMessage({ 
      type: 'AUTH_STATE_CHANGE',
      payload: { user }
    });
  }
});

// Handle extension startup
chrome.runtime.onStartup.addListener(async () => {
  try {
    // Check for stored user data
    const { userData } = await chrome.storage.local.get('userData');
    if (userData) {
      console.log('Session restored successfully');
      chrome.runtime.sendMessage({ 
        type: 'AUTH_STATE_CHANGE',
        payload: { user: userData }
      });
    }
  } catch (error) {
    console.error('Error restoring session:', error);
  }
});
