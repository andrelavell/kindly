import React from 'react';
import Head from 'next/head';
import { Heart, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CharitiesPage() {
  return (
    <>
      <Head>
        <title>Charity Directory - Kindly</title>
        <meta name="description" content="Explore our directory of verified charitable organizations and find causes you care about." />
      </Head>

      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Icon Animation */}
            <motion.div 
              className="inline-block mb-8"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
            >
              <Heart className="w-16 h-16 text-rose-500" />
            </motion.div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Charity Directory
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 mb-12">
              We're building a comprehensive directory of verified charitable organizations 
              to help you find and support causes you care about.
            </p>

            {/* Coming Soon Box */}
            <div className="bg-rose-50 border border-rose-100 rounded-2xl p-8 mb-12">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Calendar className="w-6 h-6 text-rose-500" />
                <span className="text-lg font-semibold text-rose-700">Coming Soon</span>
              </div>
              <p className="text-rose-600">
                Our team is working hard to bring you a curated list of charitable organizations. 
                Stay tuned for updates!
              </p>
            </div>

            {/* Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">Verified Organizations</h3>
                <p className="text-gray-600">Browse through carefully vetted charitable organizations.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">Detailed Profiles</h3>
                <p className="text-gray-600">Learn about each organization's mission, impact, and financials.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">Direct Support</h3>
                <p className="text-gray-600">Connect directly with organizations you want to support.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
