import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CauseSelection } from '../components/CauseSelection';
import { AccountDetails } from '../components/AccountDetails';
import { AuthProvider } from '../contexts/AuthContext';
import './popup.css';

function Popup() {
  const [currentView, setCurrentView] = useState<'cause' | 'account'>('cause');

  const toggleView = () => {
    setCurrentView(currentView === 'cause' ? 'account' : 'cause');
  };

  return (
    <AuthProvider>
      <div className="w-[400px]">
        {currentView === 'cause' ? (
          <div className="relative">
            <CauseSelection />
            <button
              onClick={toggleView}
              className="absolute top-3 right-3 text-white hover:text-gray-100 transition-colors"
              aria-label="Account"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="relative">
            <AccountDetails />
            <button
              onClick={toggleView}
              className="absolute top-3 right-12 text-white hover:text-gray-100 transition-colors"
              aria-label="Back to Cause"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </AuthProvider>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<Popup />);