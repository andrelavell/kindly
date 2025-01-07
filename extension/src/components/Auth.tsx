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
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

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
        window.location.hash = '#welcome';
      } else {
        console.log('Starting signin process...');
        await signIn(email, password);
        console.log('Signin successful');
      }
    } catch (err) {
      console.error('Auth error details:', {
        error: err,
        code: err instanceof Error ? (err as any).code : 'unknown',
        message: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : undefined
      });

      if (err instanceof Error) {
        const code = (err as any).code;
        const message = err.message;
        console.log('Processing error:', { code, message });
        
        switch (code) {
          case 'auth/email-already-in-use':
            setError('An account with this email already exists. Please sign in instead.');
            break;
          case 'auth/invalid-email':
            setError('Please enter a valid email address.');
            break;
          case 'auth/operation-not-allowed':
            setError('Email/password accounts are not enabled. Please contact support.');
            break;
          case 'auth/weak-password':
            setError('Password is too weak. Please choose a stronger password.');
            break;
          case 'auth/invalid-credential':
            setError('Invalid email or password. Please check your credentials.');
            break;
          case 'auth/user-disabled':
            setError('This account has been disabled. Please contact support.');
            break;
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            setError('Invalid email or password');
            break;
          case 'auth/too-many-requests':
            setError('Too many attempts. Please try again later.');
            break;
          case 'auth/network-request-failed':
            setError('Network error. Please check your internet connection.');
            break;
          default:
            setError(message);
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {isSignUp ? 'Create an Account' : 'Welcome Back'}
        </h2>
        <p className="text-sm text-gray-600">
          {isSignUp
            ? 'Sign up to track your donations and impact'
            : 'Sign in to continue making a difference'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500"
                required={isSignUp}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500"
                required={isSignUp}
              />
            </div>
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500"
            required
          />
        </div>

        {error && (
          <div className={`text-sm p-3 rounded ${
            error.includes('check your email') 
              ? 'bg-green-50 text-green-700' 
              : 'bg-red-50 text-red-600'
          }`}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-rose-600 text-white py-2 px-4 rounded-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50"
        >
          {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
        </button>

        <div className="flex flex-col space-y-2">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="w-full text-sm text-gray-600 hover:text-gray-900"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>

          {!isSignUp && (
            <button
              type="button"
              onClick={() => setIsResetPassword(true)}
              className="w-full text-sm text-gray-600 hover:text-gray-900"
            >
              Forgot your password?
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
