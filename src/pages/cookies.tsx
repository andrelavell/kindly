import React from 'react';
import { motion } from 'framer-motion';
import { Cookie, Shield, Cog, Ban } from 'lucide-react';
import Link from 'next/link';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
} as const;

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,228,230,0.1),_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(240,249,250,0.1),_transparent_50%)]" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-rose-300 mb-6"
              initial="initial"
              animate="animate"
              variants={fadeIn}
            >
              <Cookie className="w-5 h-5" />
              <span>Cookie Policy</span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Understanding Our Cookies
            </motion.h1>

            <motion.p 
              className="text-xl text-gray-300 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Here's exactly how we use cookies and how you can control them
            </motion.p>

            <motion.p
              className="text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Last Updated: January 6, 2025
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div className="space-y-16">
                {/* Quick Summary */}
                <div className="bg-rose-50 p-8 rounded-2xl">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Summary</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-rose-100 rounded-lg">
                        <Cookie className="w-5 h-5 text-rose-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Essential Cookies</h3>
                        <p className="text-gray-600">Required for basic functionality</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-rose-100 rounded-lg">
                        <Shield className="w-5 h-5 text-rose-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Creator Cookies</h3>
                        <p className="text-gray-600">Respect creator affiliate links</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-rose-100 rounded-lg">
                        <Cog className="w-5 h-5 text-rose-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Preferences</h3>
                        <p className="text-gray-600">Remember your settings</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-rose-100 rounded-lg">
                        <Ban className="w-5 h-5 text-rose-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Your Choice</h3>
                        <p className="text-gray-600">Control non-essential cookies</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Essential Cookies */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Essential Cookies</h2>
                  <p className="text-gray-600 mb-4">
                    These cookies are necessary for Kindly to work:
                  </p>
                  <ul className="list-disc pl-6 space-y-3 text-gray-600">
                    <li><strong>Authentication:</strong> Keep you logged in</li>
                    <li><strong>Security:</strong> Protect against fraud</li>
                    <li><strong>Basic Functions:</strong> Enable core features</li>
                    <li>You can't disable these as they're required</li>
                  </ul>
                </div>

                {/* Creator Cookies */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Creator Cookies</h2>
                  <p className="text-gray-600 mb-4">
                    How we handle creator affiliate cookies:
                  </p>
                  <ul className="list-disc pl-6 space-y-3 text-gray-600">
                    <li>We never override existing creator cookies without permission</li>
                    <li>You control whether to support creators or charity</li>
                    <li>Creator cookies are preserved by default</li>
                    <li>All cookie changes are logged for transparency</li>
                  </ul>
                </div>

                {/* Preference Cookies */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Preference Cookies</h2>
                  <p className="text-gray-600 mb-4">
                    These cookies remember your choices:
                  </p>
                  <ul className="list-disc pl-6 space-y-3 text-gray-600">
                    <li>Selected charities and causes</li>
                    <li>Donation preferences</li>
                    <li>Interface settings</li>
                    <li>Language preferences</li>
                  </ul>
                </div>

                {/* Analytics Cookies */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Analytics Cookies (Optional)</h2>
                  <p className="text-gray-600 mb-4">
                    These help us improve Kindly:
                  </p>
                  <ul className="list-disc pl-6 space-y-3 text-gray-600">
                    <li>Track how features are used</li>
                    <li>Identify bugs and issues</li>
                    <li>Measure performance</li>
                    <li>All data is anonymized</li>
                  </ul>
                </div>

                {/* Managing Cookies */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Managing Your Cookies</h2>
                  <p className="text-gray-600 mb-4">
                    You have full control:
                  </p>
                  <ul className="list-disc pl-6 space-y-3 text-gray-600">
                    <li>Change preferences in extension settings</li>
                    <li>Use browser settings to manage cookies</li>
                    <li>Clear cookies at any time</li>
                    <li>Opt-out of non-essential cookies</li>
                  </ul>
                </div>

                {/* Contact Section */}
                <div className="bg-gray-50 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Cookie Questions?</h3>
                  <p className="text-gray-600 mb-6">
                    If you have questions about how we use cookies:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-rose-500 text-white font-medium hover:bg-rose-600 transition-colors"
                    >
                      Contact Us
                    </Link>
                    <Link
                      href="/privacy"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
