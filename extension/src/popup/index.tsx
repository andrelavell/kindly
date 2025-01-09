import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CauseSelection } from '../components/CauseSelection';
import { AccountDetails } from '../components/AccountDetails';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { Auth } from '../components/Auth';
import './popup.css';

function PopupContent() {
  const [currentView, setCurrentView] = useState<'cause' | 'account'>('cause');
  const { user, loading } = useAuth();

  const toggleView = () => {
    setCurrentView(currentView === 'cause' ? 'account' : 'cause');
  };

  if (loading) {
    return (
      <div className="w-[400px] h-[600px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-[400px]">
        <Auth />
      </div>
    );
  }

  return (
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
        <AccountDetails onBack={toggleView} />
      )}
    </div>
  );
}

function Popup() {
  return (
    <AuthProvider>
      <PopupContent />
    </AuthProvider>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<Popup />);