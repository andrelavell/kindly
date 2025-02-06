import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

type ResetPasswordProps = {
  onBack: () => void;
};

export function ResetPassword({ onBack }: ResetPasswordProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err) {
      console.error('Reset password error:', err);
      if (err instanceof Error) {
        const message = err.message;
        if (message.includes('user-not-found')) {
          setError('No account found with this email address');
        } else if (message.includes('too-many-requests')) {
          setError('Too many attempts. Please try again later.');
        } else if (message.includes('network-request-failed')) {
          setError('Network error. Please check your internet connection.');
        } else {
          setError(message);
        }
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ padding: '1rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>Check Your Email</h2>
          <p style={{ fontSize: '0.875rem', color: '#4B5563' }}>
            We've sent you a password reset link. Please check your email and follow the instructions.
          </p>
        </div>
        <button
          onClick={onBack}
          style={{
            width: '100%',
            backgroundColor: '#E91E63',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Back to Sign In
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>Reset Password</h2>
        <p style={{ fontSize: '0.875rem', color: '#4B5563' }}>
          Enter your email address and we'll send you instructions to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.25rem' }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              border: '1px solid #D1D5DB',
              borderRadius: '0.375rem',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
            }}
            required
          />
        </div>

        {error && (
          <div style={{ fontSize: '0.875rem', color: '#EF4444', backgroundColor: '#FEF2F2', padding: '0.5rem', borderRadius: '0.375rem' }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            backgroundColor: '#E91E63',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.5 : 1
          }}
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>

        <button
          type="button"
          onClick={onBack}
          style={{
            width: '100%',
            fontSize: '0.875rem',
            color: '#4B5563',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem 1rem',
            ':hover': { color: '#111827' }
          }}
        >
          Back to Sign In
        </button>
      </form>
    </div>
  );
}
