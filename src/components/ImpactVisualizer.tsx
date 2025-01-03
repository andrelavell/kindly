import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Heart, Users, Globe } from 'lucide-react';

export function ImpactVisualizer() {
  const [amount, setAmount] = useState(50);
  
  const calculateMetrics = (amount: number) => {
    const monthlyImpact = amount * 0.05;
    return {
      donation: monthlyImpact.toFixed(2),
      lives: Math.floor(monthlyImpact * 0.1),
      communities: Math.floor(monthlyImpact * 0.02),
      countries: Math.min(Math.floor(monthlyImpact * 0.01), 10)
    };
  };

  const metrics = calculateMetrics(amount);
  
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-rose-50/50 via-white to-teal-50/50">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ 
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E\")"
      }} />

      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.span 
              className="text-rose-500 font-medium block mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Impact Calculator
            </motion.span>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Calculate Your{' '}
              <span className="relative inline-block">
                Monthly Impact
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-rose-500/30"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                />
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white backdrop-blur-sm bg-white/90 rounded-3xl shadow-xl p-8 md:p-12"
          >
            <div className="flex flex-col items-center space-y-12">
              <div className="w-full max-w-2xl">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-lg font-medium text-gray-700">
                    Monthly Shopping
                  </label>
                  <span className="text-2xl font-bold text-rose-500">
                    ${amount}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>$10</span>
                  <span>$1000</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
                <motion.div 
                  className="bg-rose-50 p-6 rounded-xl text-center transform hover:scale-105 transition-transform duration-300"
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <DollarSign className="w-8 h-8 text-rose-500 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-rose-600 mb-1">
                    ${metrics.donation}
                  </div>
                  <div className="text-sm text-rose-700">Monthly Donation</div>
                </motion.div>
                
                <motion.div 
                  className="bg-teal-50 p-6 rounded-xl text-center transform hover:scale-105 transition-transform duration-300"
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Heart className="w-8 h-8 text-teal-500 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-teal-600 mb-1">
                    {metrics.lives}
                  </div>
                  <div className="text-sm text-teal-700">Lives Impacted</div>
                </motion.div>

                <motion.div 
                  className="bg-blue-50 p-6 rounded-xl text-center transform hover:scale-105 transition-transform duration-300"
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Users className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {metrics.communities}
                  </div>
                  <div className="text-sm text-blue-700">Communities Helped</div>
                </motion.div>

                <motion.div 
                  className="bg-purple-50 p-6 rounded-xl text-center transform hover:scale-105 transition-transform duration-300"
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Globe className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    {metrics.countries}
                  </div>
                  <div className="text-sm text-purple-700">Countries Reached</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}