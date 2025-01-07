import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Heart, TrendingUp, Users, Calendar, Target, Gift, ArrowUpRight, History } from 'lucide-react';
import './popup.css';

const causeMetrics = [
  {
    label: 'Total Donated',
    value: '$123.45',
    change: 'Last 30 days',
    icon: Gift,
    color: 'text-emerald-500'
  },
  {
    label: 'Impact Score',
    value: '89',
    change: '+12 this month',
    icon: Target,
    color: 'text-blue-500'
  },
  {
    label: 'People Helped',
    value: '1,234',
    change: 'Through your support',
    icon: Users,
    color: 'text-purple-500'
  },
  {
    label: 'Days Active',
    value: '45',
    change: 'Since joining',
    icon: Calendar,
    color: 'text-amber-500'
  }
];

const donationHistory = [
  {
    cause: 'Save the Children',
    logo: 'https://joinkindly.org/_next/image?url=%2Fimages%2Fcauses%2Fsave-the-children-logo.png&w=128&q=75',
    amount: '$45.20',
    dateRange: 'Jan 1 - Present'
  },
  {
    cause: 'World Wildlife Fund',
    logo: 'https://joinkindly.org/_next/image?url=%2Fimages%2Fcauses%2Fwwf-logo.png&w=128&q=75',
    amount: '$78.25',
    dateRange: 'Dec 1 - Dec 31'
  }
];

function App() {
  const [selectedCause, setSelectedCause] = useState({
    name: 'Susan G. Komen',
    logo: 'https://joinkindly.org/_next/image?url=%2Fimages%2Fcauses%2Fsusan-g-komen-logo.png&w=128&q=75'
  });

  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-rose-500 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2" className="text-white">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <span className="text-white font-semibold">KINDLY</span>
        </div>
      </div>

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
              <img
                src={selectedCause.logo}
                alt={selectedCause.name}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div>
              <h3 className="font-bold text-lg">{selectedCause.name}</h3>
              <div className="flex items-center gap-2">
                <p className="text-gray-500 text-sm">Your selected cause</p>
                <button 
                  className="text-sm text-rose-500 flex items-center gap-1 hover:text-rose-600 transition-colors"
                  onClick={() => {
                    chrome.runtime.sendMessage({ type: 'OPEN_CAUSE_SELECTOR' });
                  }}
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

        <div className="grid grid-cols-2 gap-3">
          {causeMetrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-gray-50 rounded-lg p-3"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-gray-500 text-sm">{metric.label}</span>
                <metric.icon className={`w-4 h-4 ${metric.color}`} />
              </div>
              <div className="font-bold text-lg mb-0.5">{metric.value}</div>
              <div className="text-gray-500 text-sm">{metric.change}</div>
            </div>
          ))}
        </div>

        {/* Donation History Section */}
        <div className="mt-4">
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-gray-500" />
              <span className="font-medium text-gray-900">Donation History</span>
            </div>
            <svg 
              className={`w-5 h-5 text-gray-400 transform transition-transform ${showHistory ? 'rotate-180' : ''}`}
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          {showHistory && (
            <div className="mt-2 space-y-2">
              {/* Total Impact */}
              <div className="bg-rose-50 rounded-lg p-3">
                <div className="text-xs text-gray-600">Total Impact</div>
                <div className="text-lg font-semibold text-rose-600">$123.45</div>
              </div>

              {/* Donation List */}
              {donationHistory.map((donation, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-1 border border-gray-100">
                      <img 
                        src={donation.logo} 
                        alt={donation.cause}
                        className="w-full h-full object-contain rounded-full"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{donation.cause}</div>
                      <div className="text-xs text-gray-500">{donation.dateRange}</div>
                    </div>
                    <div className="text-sm font-medium text-rose-600">{donation.amount}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2 text-blue-600 mb-1.5">
            <TrendingUp className="w-4 h-4" />
            <span className="font-medium text-sm">Recent Impact</span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Your contributions help fund breast cancer research, education, and support services. 
            Keep shopping to increase your impact!
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-gray-50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Updated 2m ago</span>
          <button 
            className="text-rose-500 font-medium flex items-center space-x-1 hover:text-rose-600 transition-colors"
            onClick={() => {
              chrome.tabs.create({ url: 'https://joinkindly.org/dashboard' });
            }}
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Add Tailwind CSS
const style = document.createElement('style');
style.textContent = `
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
`;
document.head.appendChild(style);

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
