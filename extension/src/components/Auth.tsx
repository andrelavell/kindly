import React, { useState } from 'react';
import { authStore } from '../stores/authStore';

interface AuthProps {
  onSuccess?: () => void;
}

export function Auth({ onSuccess }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await authStore.login(form.email, form.password);
      } else {
        await authStore.register(form.email, form.password, form.name);
      }
      onSuccess?.();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
        width: '100%',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <button 
          type="button" 
          onClick={() => setIsLogin(true)}
          style={{
            flex: 1,
            padding: '0.75rem',
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: isLogin ? '2px solid #E91E63' : '2px solid #E5E7EB',
            color: isLogin ? '#E91E63' : '#6B7280',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer'
          }}
        >
          Sign In
        </button>
        <button 
          type="button" 
          onClick={() => setIsLogin(false)}
          style={{
            flex: 1,
            padding: '0.75rem',
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: !isLogin ? '2px solid #E91E63' : '2px solid #E5E7EB',
            color: !isLogin ? '#E91E63' : '#6B7280',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer'
          }}
        >
          Create Account
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required={!isLogin}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              border: '1px solid #D1D5DB',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              outline: 'none'
            }}
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            border: '1px solid #D1D5DB',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            outline: 'none'
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            border: '1px solid #D1D5DB',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            outline: 'none'
          }}
        />

        {error && (
          <div style={{
            color: '#EF4444',
            fontSize: '0.875rem',
            marginTop: '0.5rem'
          }}>{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.75rem 1.5rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            borderRadius: '0.375rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            border: 'none',
            backgroundColor: '#E91E63',
            color: 'white',
            width: '100%',
            marginTop: '0.5rem',
            opacity: loading ? 0.5 : 1
          }}
        >
          {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
        </button>
      </form>
    </div>
  );
}
