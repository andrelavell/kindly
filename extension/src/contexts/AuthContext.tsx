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
  stats: {
    totalContribution: number;
    monthlyContribution: number;
    shoppingSessions: number;
    storesVisited: number;
    lastUpdated: string;
  };
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
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `KND${result}`;
  };

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log('Fetching user profile for:', userId);
      console.log('Current auth user:', auth.currentUser?.uid);
      
      const userDocRef = doc(db, 'users', userId);
      console.log('Attempting to fetch document:', userDocRef.path);
      
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        console.log('Document exists with data:', data);
        setUserProfile(data as UserProfile);
      } else {
        console.log('No document exists for ID:', userId);
        // If document doesn't exist, try to create it
        if (auth.currentUser) {
          const newProfile: UserProfile = {
            id: userId,
            first_name: '',
            last_name: '',
            email: auth.currentUser.email || '',
            tracking_id: generateTrackingId(),
            created_at: new Date().toISOString(),
            stats: {
              totalContribution: 0,
              monthlyContribution: 0,
              shoppingSessions: 0,
              storesVisited: 0,
              lastUpdated: new Date().toISOString()
            }
          };
          
          await setDoc(userDocRef, newProfile);
          console.log('Created new profile for user');
          setUserProfile(newProfile);
        }
      }
    } catch (err) {
      console.error('Error in fetchUserProfile:', err);
      if (err instanceof Error) {
        console.error('Error details:', {
          message: err.message,
          stack: err.stack,
          name: err.name
        });
      }
      // Don't throw the error, just log it
      setError('Error fetching profile');
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      setLoading(true);
      console.log('Creating new user:', email);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created with ID:', result.user.uid);

      const newProfile: UserProfile = {
        id: result.user.uid,
        first_name: firstName,
        last_name: lastName,
        email: result.user.email!,
        tracking_id: generateTrackingId(),
        created_at: new Date().toISOString(),
        stats: {
          totalContribution: 0,
          monthlyContribution: 0,
          shoppingSessions: 0,
          storesVisited: 0,
          lastUpdated: new Date().toISOString()
        }
      };

      console.log('Creating user document with ID:', result.user.uid);
      const userDocRef = doc(db, 'users', result.user.uid);
      await setDoc(userDocRef, newProfile);
      console.log('User document created successfully');
      
    } catch (error) {
      console.error('Error in signUp:', error);
      if (error instanceof Error) {
        setError(error.message);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('AuthProvider mounted');
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed.');
      console.log('User:', user ? { email: user.email, uid: user.uid } : 'null');
      setUser(user);
      
      if (user) {
        try {
          await fetchUserProfile(user.uid);
        } catch (err) {
          console.error('Error fetching profile:', err);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log('Signing in with:', email);
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('Sign in successful:', result.user.email);
      return result;
    } catch (err) {
      console.error('Sign in error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await firebaseSignOut(auth);
      setUserProfile(null);
      setUser(null);
    } catch (err) {
      console.error('Sign out error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      setLoading(true);
      if (!auth.currentUser) throw new Error('No user logged in');
      await firebaseUpdatePassword(auth.currentUser, newPassword);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
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
    updatePassword,
  };

  if (loading && !user) {
    return (
      <div className="min-h-[600px] bg-gradient-to-br from-blue-500 to-purple-600 p-6 flex flex-col items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading...</h2>
        </div>
      </div>
    );
  }

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
