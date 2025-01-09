import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { StatsContainer } from '../components/Stats';
import { CauseSection } from '../components/CauseSection';
import { useRouter } from 'next/router';
import { Auth } from '../components/Auth';

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('cause');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for auth to initialize
    if (!authLoading) {
      if (!user) {
        router.replace('/signin');
      } else {
        setLoading(false);
      }
    }
  }, [user, authLoading, router]);

  // Show loading state while checking auth
  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
      </div>
    );
  }

  // Show auth component if not logged in
  if (!user) {
    return <Auth mode="signin" />;
  }

  return (
    <div className="min-h-screen">
      {activeTab === 'cause' ? (
        <CauseSection activeTab={activeTab} onTabChange={setActiveTab} />
      ) : (
        <div>
          <div className="bg-gradient-to-r from-rose-500 to-rose-600">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center pt-16 pb-20">
                <h1 className="text-4xl font-bold mb-4 text-white">
                  Your Impact Statistics
                </h1>
                <p className="text-xl text-white/90 mb-12">
                  Track the difference you're making through your donations
                </p>
                <div className="inline-flex rounded-lg bg-white/10 p-1">
                  <button
                    onClick={() => setActiveTab('cause')}
                    className={`${
                      activeTab === 'cause'
                        ? 'bg-white text-rose-600'
                        : 'text-white hover:bg-white/10'
                    } px-6 py-2 rounded-md text-sm font-medium transition-colors`}
                  >
                    Select Cause
                  </button>
                  <button
                    onClick={() => setActiveTab('stats')}
                    className={`${
                      activeTab === 'stats'
                        ? 'bg-white text-rose-600'
                        : 'text-white hover:bg-white/10'
                    } px-6 py-2 rounded-md text-sm font-medium transition-colors`}
                  >
                    View Stats
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 py-8">
            <StatsContainer />
          </div>
        </div>
      )}
    </div>
  );
}
