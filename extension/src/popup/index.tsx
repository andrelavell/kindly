import React, { useEffect, useState, useRef, Component } from 'react';
import { createRoot } from 'react-dom/client';
import './popup.css';
import { Auth } from '../components/Auth';
import { authStore } from '../stores/authStore';
import { User } from '../services/auth';

function Popup() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Popup mounted');
    console.log('Initial auth state:', { loading: authStore.loading, user: authStore.user });
    
    const unsubscribe = authStore.subscribe((newUser) => {
      console.log('Auth state changed:', { user: newUser });
      setUser(newUser);
    });
    
    setLoading(authStore.loading);
    setUser(authStore.user);
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div style={{ width: '320px', height: '360px', padding: '24px', textAlign: 'center' }}>
        <div style={{ color: '#6B7280', fontSize: '14px' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ width: '320px', height: '360px' }}>
      {/* Header */}
      <div style={{
        background: '#e11d48',
        color: 'white',
        padding: '12px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <span style={{
            fontWeight: 600,
            fontSize: '15px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>KINDLY</span>
        </div>
        {user && (
          <button
            onClick={() => authStore.logout()}
            style={{
              color: 'white',
              padding: '4px 8px',
              border: '1px solid white',
              background: 'none',
              cursor: 'pointer',
              borderRadius: '4px',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Logout
          </button>
        )}
      </div>



      {/* Content */}
      {user ? (
        <div style={{ padding: '24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ width: '80px', height: '80px', margin: '0 auto 24px' }}>
              <img 
                src="https://joinkindly.org/_next/image?url=%2Fimages%2Fcauses%2Fsusan-g-komen-logo.png&w=128&q=75"
                alt="Susan G Komen"
                style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px', background: 'white' }}
              />
            </div>
            <h3 style={{
              color: '#2D3648',
              fontSize: '20px',
              fontWeight: 600,
              marginBottom: '8px',
              lineHeight: 1.2,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              Your donations are making a difference
            </h3>
            <p style={{
              color: 'rgba(45, 54, 72, 0.7)',
              fontSize: '14px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              Visit our website to see your impact
            </p>
          </div>
          <button
            onClick={() => window.open('https://joinkindly.org', '_blank')}
            style={{
              width: '100%',
              background: '#e11d48',
              color: 'white',
              padding: '12px',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '14px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}
          >
            View Impact
          </button>
        </div>
      ) : (
        <Auth />
      )}
    </div>
  );
}

class ErrorBoundary extends Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('Popup Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}

console.log('Popup script starting');

const container = document.getElementById('root');
if (!container) {
  console.error('Root element not found');
} else {
  console.log('Root element found, creating React root');
  const root = createRoot(container);
  console.log('Rendering Popup component');
  root.render(
    <ErrorBoundary>
      <Popup />
    </ErrorBoundary>
  );
}