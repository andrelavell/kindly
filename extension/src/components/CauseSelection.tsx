import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Heart, TrendingUp, Gift, Target } from 'lucide-react';
import { causes } from '../../../src/utils/causes';

type Stats = {
  totalContribution: number;
  monthlyContribution: number;
  shoppingSessions: number;
  storesVisited: number;
  lastUpdated: string;
};

export function CauseSelection() {
  const { user } = useAuth();
  const [selectedCause, setSelectedCause] = useState<string | null>(null);
  const [causeData, setCauseData] = useState<any>(null);
  const [stats, setStats] = useState<Stats>({
    totalContribution: 0,
    monthlyContribution: 0,
    shoppingSessions: 0,
    storesVisited: 0,
    lastUpdated: new Date().toISOString()
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    // Set up real-time listener for user profile changes
    const unsubscribe = onSnapshot(doc(db, 'profiles', user.uid), (doc) => {
      const userData = doc.data();
      if (userData) {
        const causeId = userData.selectedCause;
        setSelectedCause(causeId);
        
        if (causeId) {
          const cause = causes.find(c => c.id === causeId);
          console.log('Found cause:', cause); // Debug log
          setCauseData(cause);
        } else {
          setCauseData(null);
        }
        
        setStats(userData.stats || {
          totalContribution: 0,
          monthlyContribution: 0,
          shoppingSessions: 0,
          storesVisited: 0,
          lastUpdated: new Date().toISOString()
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="bg-white">
      {/* Extension Header */}
      <div className="bg-rose-500 rounded-t-lg border border-gray-200 shadow-xl">
        <div className="flex items-center px-4 py-3 space-x-2">
          <Heart className="text-white" style={{ width: '18px', height: '18px' }} />
          <div className="text-base text-white font-medium">Kindly</div>
          <div className="flex-1"></div>
          <div className="text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Extension Content */}
      <div className="bg-white border-x border-b border-gray-200 rounded-b-lg shadow-xl">
        {/* Header with dashboard title */}
        <div className="px-4 pt-4 pb-3 border-b border-gray-100">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-medium text-gray-500">Your Selected Cause</h4>
          </div>
        </div>

        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-1.5 border border-gray-100">
                {selectedCause && causeData ? (
                  <img
                    src={causeData.icon}
                    alt={causeData.name}
                    className="w-full h-full object-contain rounded-lg"
                  />
                ) : (
                  <Heart className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg">
                  {causeData ? causeData.name : 'Select a Cause'}
                </h3>
                <div className="flex items-center gap-2">
                  <p className="text-gray-500 text-sm">
                    {selectedCause ? 'Your selected cause' : 'Choose a cause to support with your purchases'}
                  </p>
                  <a 
                    href={selectedCause ? 
                      "https://joinkindly.org/dashboard" : 
                      "https://joinkindly.org/dashboard#select-cause"}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="text-sm text-rose-500 flex items-center gap-1 hover:text-rose-600"
                  >
                    <span>{selectedCause ? 'Change' : 'Select'}</span>
                    <svg className="w-2.5 h-2.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full text-xs font-medium">
              {selectedCause ? 'Active' : 'Inactive'}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-gray-500 text-sm">Total Contribution</span>
                <Gift className="w-4 h-4 text-rose-500" />
              </div>
              <div className="font-bold text-lg mb-0.5">{formatCurrency(stats.totalContribution)}</div>
              <div className="text-gray-500 text-sm">+{formatCurrency(stats.monthlyContribution)} this month</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-gray-500 text-sm">Shopping Sessions</span>
                <Target className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="font-bold text-lg mb-0.5">{stats.shoppingSessions}</div>
              <div className="text-gray-500 text-sm">{stats.storesVisited} stores visited</div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 text-blue-600 mb-1.5">
              <TrendingUp className="w-4 h-4" />
              <span className="font-medium text-sm">Recent Impact</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your donations have helped provide education to 12 children in need this month.
            </p>
          </div>
        </div>

        {/* Extension Footer */}
        <div className="px-4 py-3 bg-gray-50 rounded-b-lg">
          <div className="flex items-center justify-between text-sm">
            {stats.lastUpdated && (
              <span className="text-gray-500">Updated {new Date(stats.lastUpdated).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            )}
            <span className="text-rose-500 font-medium flex items-center space-x-1 cursor-pointer" onClick={() => window.location.href = 'https://joinkindly.org/dashboard'}>
              <span>View Details</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* Screenshot Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 rounded-lg shadow-[0_0_0_1px_rgba(0,0,0,0.05)]"></div>
        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-rose-100/20 to-rose-200/30 blur-lg rounded-full"></div>
        <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-100/20 to-blue-200/30 blur-lg rounded-full"></div>
      </div>
    </div>
  );
}
