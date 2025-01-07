import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth } from '../components/Auth';
import { Welcome } from '../components/Welcome';
import { CauseSelection } from '../components/CauseSelection';
import { Account } from '../components/Account';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import './popup.css';

function App() {
  const { user } = useAuth();
  const [currentRoute, setCurrentRoute] = useState(window.location.hash || '#');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (!user) {
    return <Auth />;
  }

  switch (currentRoute) {
    case '#welcome':
      return <Welcome />;
    case '#cause-selection':
      return <CauseSelection />;
    case '#account':
      return <Account />;
    default:
      return <CauseSelection />;
  }
}

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);