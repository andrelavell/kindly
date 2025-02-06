import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function Welcome() {
  const { userProfile } = useAuth();
  const firstName = userProfile?.first_name || 'there';
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    setLoading(true);
    // Navigate to the cause selection page
    window.location.hash = '#cause-selection';
    setLoading(false);
  };

  return (
    <div>
      {/* Header Block */}
      <div style={{ backgroundColor: '#E91E63', color: 'white', padding: '1.5rem 1rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Welcome to Kindly, {firstName}! 🎉
        </h2>
        <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
          Let's make every purchase count
        </p>
      </div>

      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem' }}>
              How Kindly Works
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div style={{ flexShrink: 0, width: '2rem', height: '2rem', backgroundColor: '#FCE7F3', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#E91E63', fontWeight: 600 }}>1</span>
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#374151' }}>Shop on Amazon as you normally would</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div style={{ flexShrink: 0, width: '2rem', height: '2rem', backgroundColor: '#FCE7F3', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#E91E63', fontWeight: 600 }}>2</span>
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#374151' }}>Choose from our curated ethical alternatives</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div style={{ flexShrink: 0, width: '2rem', height: '2rem', backgroundColor: '#FCE7F3', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#E91E63', fontWeight: 600 }}>3</span>
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#374151' }}>A portion of your purchase supports your chosen cause</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem' }}>
              Getting Started
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: '#374151' }}>
              <p>• Visit any product on Amazon.com</p>
              <p>• Click the Kindly icon in your browser</p>
              <p>• Choose from ethical alternatives</p>
              <p>• Track your impact over time</p>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={loading}
          style={{
            width: '100%',
            backgroundColor: '#E91E63',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.5 : 1,
            marginTop: '1rem'
          }}
        >
          {loading ? 'Loading...' : 'Continue to Select Your Cause'}
        </button>
      </div>
    </div>
  );
}
