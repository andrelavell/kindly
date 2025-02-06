import React, { useEffect, useState, useRef, Component } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth } from '../components/Auth';
import { authStore } from '../stores/authStore';
import { User } from '../services/auth';


// Log initialization
console.log('Popup: Initializing at:', new Date().toISOString());

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
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        backgroundColor: 'white'
      }}>
        <div style={{
          fontSize: '0.875rem',
          color: '#6B7280'
        }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column' as const,
        backgroundColor: 'white'
      }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 1.5rem',
        backgroundColor: '#E91E63',
        color: 'white'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: 600,
          fontSize: '1.125rem'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span>Kindly</span>
        </div>
        <button 
          onClick={() => window.close()}
          style={{
            background: 'none',
            border: 'none',
            padding: '0.5rem',
            cursor: 'pointer',
            color: 'white',
            opacity: 0.8,
            transition: 'opacity 150ms ease',
            ':hover': { opacity: 1 }
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column' as const
      }}>
        {user ? (
          <div style={{
            textAlign: 'center' as const,
            padding: '2rem 1rem'
          }}>
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: '48px',
                height: '48px',
                margin: '0 auto 1rem',
                color: '#10B981'
              }}
            >
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              marginBottom: '0.5rem',
              color: '#111827'
            }}>Welcome back!</h3>
            <p style={{
              color: '#6B7280',
              marginBottom: '1.5rem'
            }}>You're all set to start making a difference.</p>

            <div style={{
              display: 'flex',
              flexDirection: 'column' as const,
              gap: '0.5rem'
            }}>
              <a 
                href="https://joinkindly.org" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  backgroundColor: '#F3F4F6',
                  color: '#374151',
                  textDecoration: 'none',
                  border: '1px solid #E5E7EB'
                }}
              >
                View Impact
              </a>
              <button 
                onClick={() => authStore.logout()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  backgroundColor: '#F3F4F6',
                  color: '#374151',
                  border: '1px solid #E5E7EB'
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <Auth />
        )}
      </div>
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

console.log('VERIFY BUILD - Popup script starting - ' + new Date().toISOString());

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