import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

type Stats = {
  totalContribution: number;
  monthlyContribution: number;
  shoppingSessions: number;
  storesVisited: number;
  lastUpdated: string;
};

export function CauseSelection() {
  const { user, userProfile } = useAuth();
  const [selectedCause, setSelectedCause] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats>({
    totalContribution: 0,
    monthlyContribution: 0,
    shoppingSessions: 0,
    storesVisited: 0,
    lastUpdated: new Date().toISOString()
  });
  const [loading, setLoading] = useState(true);
  const [showCauseSelector, setShowCauseSelector] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'profiles', user.uid));
        const userData = userDoc.data();
        setSelectedCause(userData?.selectedCause || null);
        
        const userStats = userData?.stats || {
          totalContribution: 0,
          monthlyContribution: 0,
          shoppingSessions: 0,
          storesVisited: 0,
          lastUpdated: new Date().toISOString()
        };
        setStats(userStats);
      }
      setLoading(false);
    };

    fetchUserData();
  }, [user]);

  const handleCauseSelect = async (causeId: string) => {
    if (user) {
      setSelectedCause(causeId);
      await updateDoc(doc(db, 'profiles', user.uid), {
        selectedCause: causeId
      });
      setShowCauseSelector(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getTimeAgo = (date: string) => {
    const minutes = Math.floor((new Date().getTime() - new Date(date).getTime()) / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="bg-white">
      {/* Extension Header */}
      <div className="bg-[#f1f3f4] flex items-center px-4 py-3 space-x-2 border-b border-gray-200">
        <svg className="w-[18px] h-[18px] text-gray-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <span className="text-base text-gray-600 font-medium">Kindly</span>
        <div className="flex-1" />
        <button 
          onClick={() => window.location.hash = '#account'}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </div>

      {/* Header with dashboard title */}
      <div className="px-4 pt-4 pb-3 border-b border-gray-100">
        <h4 className="text-sm font-medium text-gray-500">Your Selected Cause</h4>
      </div>

      <div className="p-4 border-b border-gray-100">
        {/* Selected Cause */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-1.5 border border-gray-100">
              <img
                src="/images/causes/save-the-children-logo.png"
                alt="Save the Children"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div>
              <h3 className="font-bold text-lg">Save the Children</h3>
              <div className="flex items-center gap-2">
                <p className="text-gray-500 text-sm">Your selected cause</p>
                <button 
                  onClick={() => setShowCauseSelector(true)}
                  className="text-sm text-rose-500 flex items-center gap-1"
                >
                  <span>Change</span>
                  <svg className="w-2.5 h-2.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full text-xs font-medium">
            Active
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-gray-500 text-sm">Total Contribution</span>
              <svg className="w-4 h-4 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="font-bold text-lg mb-0.5">
              {formatCurrency(stats.totalContribution)}
            </div>
            <div className="text-gray-500 text-sm">
              +{formatCurrency(stats.monthlyContribution)} this month
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-gray-500 text-sm">Shopping Sessions</span>
              <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="font-bold text-lg mb-0.5">
              {stats.shoppingSessions}
            </div>
            <div className="text-gray-500 text-sm">
              {stats.storesVisited} stores visited
            </div>
          </div>
        </div>

        {/* Recent Impact */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2 text-blue-600 mb-1.5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
            <span className="font-medium text-sm">Recent Impact</span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Your contributions have helped provide emergency food supplies and education materials
            to children in crisis regions. Keep shopping to increase your impact!
          </p>
        </div>
      </div>

      {/* Extension Footer */}
      <div className="px-4 py-3 bg-gray-50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Updated {getTimeAgo(stats.lastUpdated)}</span>
          <button 
            onClick={() => window.location.hash = '#details'}
            className="text-rose-500 font-medium flex items-center space-x-1"
          >
            <span>View Details</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
