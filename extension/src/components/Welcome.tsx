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
      <div className="bg-rose-600 text-white px-4 py-6">
        <h2 className="text-xl font-bold mb-2">
          Welcome to Kindly, {firstName}! 🎉
        </h2>
        <p className="text-sm opacity-90">
          Let's make every purchase count
        </p>
      </div>

      <div className="p-4 space-y-6">
        {/* Main Content */}
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-3">
              How Kindly Works
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center">
                  <span className="text-rose-600 font-semibold">1</span>
                </div>
                <div>
                  <p className="text-sm text-gray-700">Shop on Amazon as you normally would</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center">
                  <span className="text-rose-600 font-semibold">2</span>
                </div>
                <div>
                  <p className="text-sm text-gray-700">Choose from our curated ethical alternatives</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center">
                  <span className="text-rose-600 font-semibold">3</span>
                </div>
                <div>
                  <p className="text-sm text-gray-700">A portion of your purchase supports your chosen cause</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-base font-semibold text-gray-900 mb-3">
              Getting Started
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
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
          className="w-full bg-rose-600 text-white py-2 px-4 rounded-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50 mt-4"
        >
          {loading ? 'Loading...' : 'Continue to Select Your Cause'}
        </button>
      </div>
    </div>
  );
}
