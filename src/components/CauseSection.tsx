import React from 'react';
import { Heart, TrendingUp, Users, Calendar, Target, Gift, X, Minus, ArrowUpRight } from 'lucide-react';

export function CauseSection() {
  const metrics = [
    {
      label: 'Total Contribution',
      value: '$284.50',
      icon: Gift,
      color: 'text-brand',
      change: '+$12.75 this month'
    },
    {
      label: 'Shopping Sessions',
      value: '47',
      icon: Target,
      color: 'text-emerald-500',
      change: '12 stores visited'
    }
  ];

  return (
    <section className="py-12 md:py-24 relative overflow-hidden bg-white">
      {/* Diagonal background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white via-gray-50 to-brand/30 -skew-y-6 origin-top-left" />
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left side - Impact Summary */}
            <div>
              <h2 className="text-lg font-medium text-brand mb-4">Choose Your Cause</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Support What Matters Most to You
              </h3>
              <p className="text-gray-600 mb-8 text-lg">
                You choose exactly where your impact goes. Pick the specific charity or cause that means the most to you, and we'll ensure your purchases support that mission.
              </p>
              <div className="inline-flex items-center gap-2 text-brand">
                <Heart className="w-5 h-5" />
                <span className="font-medium">Over 1000+ verified charities to choose from</span>
              </div>
            </div>

            {/* Right side - Chrome Extension Popup Style */}
            <div className="relative max-w-[400px] mx-auto">
              {/* Extension Header */}
              <div className="bg-brand rounded-t-lg border border-gray-200 shadow-xl">
                <div className="flex items-center px-4 py-3 space-x-2">
                  <Heart className="text-white" style={{ width: '18px', height: '18px' }} />
                  <div className="text-base text-white font-medium">KINDLY</div>
                  <div className="flex-1"></div>
                  <div className="text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="white" viewBox="0 0 24 24">
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
                          <span className="text-sm text-brand flex items-center gap-1">
                            <span>Change</span>
                            <svg className="w-2.5 h-2.5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-brand/10 text-brand px-2 py-0.5 rounded-full text-xs font-medium">
                      Active
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {metrics.map((metric) => (
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
                    <span className="text-gray-500">Updated 2m ago</span>
                    <span className="text-brand font-medium flex items-center space-x-1 cursor-default">
                      <span>View Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Screenshot Effect */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 rounded-lg shadow-[0_0_0_1px_rgba(0,0,0,0.05)]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
