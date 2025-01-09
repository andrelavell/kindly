import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  updateProfile: (data: { displayName?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check chrome.storage for user data
    chrome.storage.local.get(['userData'], (result) => {
      if (result.userData) {
        setCurrentUser(result.userData);
      }
      setIsLoading(false);
    });
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      // TODO: Implement actual auth when ready
      const mockUser = {
        uid: '123',
        email,
        displayName: email.split('@')[0]
      };
      setCurrentUser(mockUser);
      await chrome.storage.local.set({ userData: mockUser });
    } catch (err) {
      setError('Failed to sign in');
      throw err;
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      setCurrentUser(null);
      await chrome.storage.local.remove(['userData']);
    } catch (err) {
      setError('Failed to sign out');
      throw err;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setError(null);
      // TODO: Implement actual auth when ready
      const mockUser = {
        uid: '123',
        email,
        displayName: email.split('@')[0]
      };
      setCurrentUser(mockUser);
      await chrome.storage.local.set({ userData: mockUser });
    } catch (err) {
      setError('Failed to create account');
      throw err;
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      setError(null);
      // TODO: Implement password update when ready
      console.log('Password update not implemented');
    } catch (err) {
      setError('Failed to update password');
      throw err;
    }
  };

  const updateProfile = async (data: { displayName?: string }) => {
    try {
      setError(null);
      if (!currentUser) throw new Error('No user logged in');
      
      const updatedUser = {
        ...currentUser,
        displayName: data.displayName || currentUser.displayName
      };
      
      setCurrentUser(updatedUser);
      await chrome.storage.local.set({ userData: updatedUser });
    } catch (err) {
      setError('Failed to update profile');
      throw err;
    }
  };

  const value = {
    currentUser,
    isLoading,
    error,
    signIn,
    signOut,
    signUp,
    updatePassword,
    updateProfile
  };

  if (isLoading && !currentUser) {
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
