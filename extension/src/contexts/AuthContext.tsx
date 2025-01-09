import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updatePassword as firebaseUpdatePassword
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

type UserProfile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  tracking_id: string;
  created_at: string;
  selectedCause?: string;
  donations?: any[];
};

type AuthContextType = {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const generateTrackingId = () => {
    // Generate a random string of 8 characters (numbers and uppercase letters)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `KND${result}`; // Prefix with KND for Kindly
  };

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log('Fetching user profile for:', userId);
      const userDocRef = doc(db, 'profiles', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        console.log('Profile data:', userDoc.data());
        setUserProfile(userDoc.data() as UserProfile);
      } else {
        console.log('No profile found');
      }
    } catch (err) {
      console.error('Error in fetchUserProfile:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch user profile');
    }
  };

  useEffect(() => {
    console.log('AuthProvider mounted');
    
    let retryCount = 0;
    const maxRetries = 3;
    
    const setupAuthListener = () => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        console.log('Auth state changed:', user);
        
        if (!user && retryCount < maxRetries) {
          // If we're not authenticated, try to restore the session from IndexedDB
          retryCount++;
          console.log(`Attempting to restore auth session (attempt ${retryCount}/${maxRetries})`);
          
          // Wait a bit before retrying to allow IndexedDB to initialize
          setTimeout(setupAuthListener, 1000);
          return;
        }
        
        setUser(user);
        
        if (user) {
          await fetchUserProfile(user.uid);
        } else {
          setUserProfile(null);
        }
        setLoading(false);
      });

      return unsubscribe;
    };

    const unsubscribe = setupAuthListener();
    
    return () => {
      console.log('Cleaning up auth subscription');
      unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Signing in:', email);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error('Sign in error:', err);
      throw err;
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      console.log('Starting signup process in AuthContext...');
      console.log('Signup data:', { email, firstName, lastName });

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('User created successfully:', user);

      // Create user profile in Firestore with tracking ID
      const profileData: UserProfile = {
        id: user.uid,
        first_name: firstName,
        last_name: lastName,
        email: email,
        tracking_id: generateTrackingId(),
        created_at: new Date().toISOString(),
      };

      console.log('Profile data:', profileData);
      const userDocRef = doc(db, 'profiles', user.uid);
      await setDoc(userDocRef, profileData);
      console.log('Profile created successfully');

    } catch (err) {
      console.error('Sign up error:', err);
      console.error('Error details:', {
        code: err instanceof Error ? (err as any).code : 'unknown',
        message: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : undefined
      });
      throw err;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (err) {
      console.error('Sign out error:', err);
      throw err;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      console.error('Reset password error:', err);
      throw err;
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      if (!user) throw new Error('No user found');
      await firebaseUpdatePassword(user, newPassword);
    } catch (err) {
      console.error('Update password error:', err);
      throw err;
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
