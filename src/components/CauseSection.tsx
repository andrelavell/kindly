import React from 'react';
import { motion } from 'framer-motion';
import { CharitySelector } from './CharitySelector';
import { Heart, TrendingUp, Users, Calendar, Target, Gift, X, Minus, ArrowUpRight } from 'lucide-react';

export function CauseSection() {
  const causes = [
    {
      name: "Education",
      icon: "🎓",
      description: "Support schools and educational programs worldwide"
    },
    {
      name: "Healthcare",
      icon: "🏥",
      description: "Provide medical care and supplies to those in need"
    },
    {
      name: "Environment",
      icon: "🌱",
      description: "Protect wildlife and preserve natural habitats"
    },
    {
      name: "Hunger",
      icon: "🥘",
      description: "Help feed families and support food banks"
    }
  ];

  const metrics = [
    {
      label: 'Total Contribution',
      value: '$284.50',
      icon: Gift,
      color: 'text-rose-500',
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
    <section className="py-24 relative overflow-hidden bg-gray-50">
      {/* Diagonal background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white via-gray-50 to-rose-50/30 -skew-y-6 origin-top-left transform-gpu" />
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ 
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
      }} />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left side - Impact Summary */}
            <div>
              <h2 className="text-lg font-medium text-rose-500 mb-4">Make a Difference Today</h2>
              <h3 className="text-5xl font-bold text-gray-900 mb-6">
              Support What Matters Most to You
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
            </div>

            {/* Right side - Chrome Extension Style */}
            <div className="relative max-w-[480px] mx-auto">
              {/* Extension Content */}
              <div className="bg-white rounded-lg shadow-lg border border-gray-200">
                {/* Header with dashboard title */}
                <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-gray-500">Your Selected Cause</h4>
                    <div className="text-xs font-medium text-rose-500">Making a Difference Together</div>
                  </div>
                </div>

                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                      <img
                        src="/images/charities/save-the-children-logo.png"
                        alt="Save the Children"
                        className="w-10 h-10 rounded-full object-contain bg-white"
                      />
                      <div>
                        <h3 className="font-bold text-lg">Save the Children</h3>
                        <div className="flex items-center gap-2">
                          <p className="text-gray-500 text-sm">Your selected cause</p>
                          <button className="text-sm text-rose-500 hover:text-rose-600 font-medium flex items-center gap-1">
                            <span>Change</span>
                            <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-sm font-medium">
                      Active
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {metrics.map((metric, index) => (
                      <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-50 rounded p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-500 text-sm">{metric.label}</span>
                          <metric.icon className={`w-5 h-5 ${metric.color}`} />
                        </div>
                        <div className="font-bold text-xl mb-1">{metric.value}</div>
                        <div className="text-gray-500 text-sm">{metric.change}</div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded">
                    <div className="flex items-center space-x-2 text-blue-600 mb-2">
                      <TrendingUp className="w-5 h-5" />
                      <span className="font-medium text-sm">Recent Impact</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Your contributions have helped provide emergency food supplies and education materials
                      to children in crisis regions. Keep shopping to increase your impact!
                    </p>
                  </div>
                </div>

                {/* Extension Footer */}
                <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Updated 2m ago</span>
                    <span className="text-rose-500 font-medium flex items-center space-x-1 cursor-default">
                      <span>View Details</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
