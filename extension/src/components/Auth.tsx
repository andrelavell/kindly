import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ResetPassword } from './ResetPassword';
import { UpdatePassword } from './UpdatePassword';
import { Welcome } from './Welcome';

export function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { signIn, signUp, loading: authLoading } = useAuth();

  // Check if we're on the update password page
  const isUpdatePassword = window.location.hash === '#update-password';
  if (isUpdatePassword) {
    return <UpdatePassword />;
  }

  if (isResetPassword) {
    return <ResetPassword onBack={() => setIsResetPassword(false)} />;
  }

  if (showWelcome) {
    return <Welcome />;
  }

  if (authLoading) {
    return (
      <div className="min-h-[600px] bg-gradient-to-br from-blue-500 to-purple-600 p-6 flex flex-col items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading...</h2>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (isSignUp) {
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters long');
        }
        
        console.log('Starting signup process...');
        console.log('Form data:', { 
          email, 
          firstName, 
          lastName,
          passwordLength: password.length 
        });

        await signUp(email, password, firstName, lastName);
        console.log('Signup successful');
        setShowWelcome(true);
      } else {
        console.log('Starting signin process...');
        await signIn(email, password);
        console.log('Signin successful');
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="min-h-[600px] bg-gradient-to-br from-blue-500 to-purple-600 p-6 flex flex-col items-center justify-center text-white">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-gray-200">
            {isSignUp
              ? 'Sign up to start making a difference'
              : 'Sign in to continue your impact'}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-white px-4 py-2 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/50"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/50"
                  placeholder="Doe"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/50"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/50"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={authLoading}
            className="w-full bg-white text-purple-600 py-2 px-4 rounded-lg font-medium hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {authLoading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-white/80 hover:text-white"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
          {!isSignUp && (
            <button
              onClick={() => setIsResetPassword(true)}
              className="block mx-auto mt-2 text-white/80 hover:text-white"
            >
              Forgot password?
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
