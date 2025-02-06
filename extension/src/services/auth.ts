import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  User as FirebaseUser,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../utils/firebase';

// Set persistence to LOCAL and initialize auth state
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    // Check for existing auth state on startup
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData = await authService.getCurrentUser(firebaseUser.uid);
        if (userData) {
          await chrome.storage.local.set({
            kindlyUserId: firebaseUser.uid,
            kindlyUserData: userData
          });
        }
      }
    });
  })
  .catch(error => {
    console.error('Error setting persistence:', error);
  });

export interface User {
  id: string;
  email: string;
  kindly_id: string; // 7-character alphanumeric ID
  name: string;
  emailVerified: boolean;
}

export const authService = {
  // Register with email/password
  async register(email: string, password: string, name: string): Promise<User> {
    console.log('Starting registration...');
    
    try {
      // Create Firebase auth user
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Firebase user created:', firebaseUser);

      if (!firebaseUser) {
        throw new Error('Failed to create Firebase user');
      }

      // Send verification email
      await sendEmailVerification(firebaseUser);

      // Generate 7-character alphanumeric ID
      const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
      let kindly_id = '';
      for (let i = 0; i < 7; i++) {
        kindly_id += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      console.log('Generated kindly_id:', kindly_id);

      // Create user profile in Firestore
      const userData: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        kindly_id,
        name,
        emailVerified: false
      };

      console.log('Creating user profile in Firestore...');
      await setDoc(doc(db, 'users', firebaseUser.uid), userData);
      
      return userData;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }

    return userData;
  },

  // Login with email/password
  async login(email: string, password: string): Promise<User> {
    try {
      console.log('Attempting login for:', email);
      const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);
      
      if (!firebaseUser) {
        throw new Error('Failed to authenticate user');
      }

      console.log('Firebase user authenticated:', firebaseUser.uid);
      let userData = await this.getCurrentUser(firebaseUser.uid);
      
      if (!userData) {
        console.log('Creating new user profile for:', firebaseUser.uid);
        // Create a basic profile if one doesn't exist
        userData = {
          id: firebaseUser.uid,
          email: firebaseUser.email!,
          kindly_id: Math.random().toString(36).substring(2, 9), // Generate a random ID
          name: firebaseUser.email!.split('@')[0], // Use email prefix as name
          emailVerified: firebaseUser.emailVerified
        };
        await setDoc(doc(db, 'users', firebaseUser.uid), userData);
      }
      
      // Update email verification status
      if (firebaseUser.emailVerified && !userData.emailVerified) {
        console.log('Updating email verification status');
        await setDoc(doc(db, 'users', firebaseUser.uid), { ...userData, emailVerified: true });
        userData.emailVerified = true;
      }

      // Store user data and auth state in chrome.storage.local
      const authState = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        emailVerified: firebaseUser.emailVerified
      };
      
      // First store the auth state
      await chrome.storage.local.set({ kindlyAuthState: authState });
      
      // Then store user data
      await chrome.storage.local.set({
        kindlyUserId: firebaseUser.uid,
        kindlyUserData: userData
      });
      
      // Verify storage completed successfully
      const stored = await chrome.storage.local.get(['kindlyAuthState']);
      if (!stored.kindlyAuthState) {
        throw new Error('Failed to persist auth state');
      }
      
      // Now broadcast the auth state
      await new Promise<void>((resolve) => {
        chrome.runtime.sendMessage({ 
          type: 'AUTH_STATE_CHANGED',
          user: authState
        }, () => resolve());
      });
      
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Login with Google
  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    
    // Check if user profile exists
    const userProfile = await this.getCurrentUser(user.uid);
    if (!userProfile) {
      // Create profile if it doesn't exist
      const userData: User = {
        id: user.uid,
        email: user.email!,
        user_id: Math.floor(10000 + Math.random() * 90000).toString(),
        name: user.displayName || user.email!.split('@')[0]
      };
      await setDoc(doc(db, 'users', user.uid), userData);
      return userData;
    }
    return userProfile;
  },

  // Get current user with local storage fallback
  async getCurrentUser(userId?: string): Promise<User | null> {
    try {
      // First check chrome.storage.local for cached user data
      const storage = await chrome.storage.local.get(['kindlyUserId', 'kindlyUserData']);
      
      // If we have cached data and a valid Firebase user, return the cached data
      if (storage.kindlyUserId && storage.kindlyUserData && auth.currentUser) {
        console.log('Using cached user data');
        return storage.kindlyUserData as User;
      }

      console.log('Getting current user for ID:', userId);
      if (!userId) {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          console.log('No current Firebase user');
          return null;
        }
        userId = currentUser.uid;
      }

      const userDoc = await getDoc(doc(db, 'users', userId));
      if (!userDoc.exists()) {
        console.log('No Firestore document found for user:', userId);
        return null;
      }
      
      const userData = userDoc.data() as User;
      console.log('Found user data:', userData);

      // Cache the user data
      await chrome.storage.local.set({
        kindlyUserId: userId,
        kindlyUserData: userData
      });

      return userData;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  // Logout
  async logout() {
    await signOut(auth);
    // Clear stored user data
    await chrome.storage.local.remove(['kindlyUserId', 'kindlyUserData']);
  },

  // Subscribe to auth state changes with persistence
  onAuthStateChanged(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        await chrome.storage.local.remove(['kindlyUserId', 'kindlyUserData']);
        callback(null);
        return;
      }
      
      try {
        const user = await this.getCurrentUser(firebaseUser.uid);
        if (user) {
          await chrome.storage.local.set({
            kindlyUserId: firebaseUser.uid,
            kindlyUserData: user
          });
        }
        callback(user);
      } catch (error) {
        console.error('Error in auth state change:', error);
        // Don't clear storage on error to maintain persistence
        callback(null);
      }
    });
  }
};
