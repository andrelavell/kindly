'use client';

import { useEffect, useState } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import { authStore } from '@/stores/authStore';
import type { User } from '@/services/auth';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authStore.subscribe((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {!user ? (
          <>
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Kindly</h1>
              <p className="text-gray-600">Welcome to your member portal</p>
            </div>
            <AuthForm />
          </>
        ) : (
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome, {user.name}!</h1>
            <p className="text-gray-600 mb-8">You're successfully logged in.</p>
            <button
              onClick={() => authStore.logout()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
