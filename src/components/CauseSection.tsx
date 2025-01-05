import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Heart, TrendingUp, Users, Calendar, Target, Gift, X, Minus, ArrowUpRight } from 'lucide-react';
import { causeMetrics, causes } from '../utils/metrics';

// Dynamically import CauseSelector to reduce initial bundle size
const CauseSelector = dynamic(() => import('./CauseSelector').then(mod => mod.CauseSelector), {
  ssr: true,
  loading: () => (
    <div className="bg-white rounded-2xl p-8 shadow-xl animate-pulse">
      <div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-xl"></div>
        ))}
      </div>
    </div>
  ),
});

export function CauseSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-gray-50">
      {/* Diagonal background with hardware acceleration */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tr from-white via-gray-50 to-rose-50/30 -skew-y-6 origin-top-left"
        style={{ 
          willChange: 'transform',
          transform: 'translateZ(0)'
        }} 
      />
      
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] bg-repeat"
        style={{ 
          backgroundImage: "url('/patterns/plus.svg')",
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
      />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left side - Impact Summary */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-base font-medium text-rose-500 mb-3">Make a Difference Today</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Choose Your Cause
              </h3>
              <p className="text-gray-600 mb-8 text-lg">
                Whether it's supporting education, protecting the environment, or helping those in need,
                your everyday shopping can make a real difference. Choose a cause close to your heart
                and we'll ensure a portion of every purchase goes towards making a positive impact.
              </p>
              <div className="flex items-center space-x-2 text-rose-500">
                <Heart className="w-5 h-5" />
                <span className="font-medium">Over 1000+ verified charities to choose from</span>
              </div>
            </motion.div>

            {/* Right side - Chrome Extension Popup Style */}
            <motion.div 
              className="relative max-w-[400px] mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Extension Header */}
              <div className="bg-[#f1f3f4] rounded-t-lg border border-gray-200 shadow-xl">
                <div className="flex items-center px-4 py-3 space-x-2">
                  <Heart className="text-gray-600" style={{ width: '18px', height: '18px' }} />
                  <div className="text-base text-gray-600 font-medium">Kindly</div>
                  <div className="flex-1"></div>
                  <div className="text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Extension Content */}
              <div className="bg-white rounded-b-lg border-x border-b border-gray-200 shadow-xl">
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
                          <span className="text-sm text-rose-500 flex items-center gap-1">
                            <span>Change</span>
                            <svg className="w-2.5 h-2.5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </span>
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

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2 text-blue-600 mb-1.5">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-medium text-sm">Recent Impact</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Your contributions have helped provide emergency food supplies and education materials
                      to children in crisis regions. Keep shopping to increase your impact!
                    </p>
                  </div>
                </div>

                {/* Extension Footer */}
                <div className="px-4 py-3 bg-gray-50 rounded-b-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Updated 2m ago</span>
                    <span className="text-rose-500 font-medium flex items-center space-x-1 cursor-default">
                      <span>View Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
