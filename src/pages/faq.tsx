import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Heart } from 'lucide-react';
import { FAQ } from '../components/FAQ';
import Link from 'next/link';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function FAQPage() {
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
              {...fadeIn}
            >
              <MessageCircle className="w-5 h-5" />
              <span>Frequently Asked Questions</span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Got questions? We've got answers.
            </motion.h1>

            <motion.p 
              className="text-xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Find answers to common questions about shopping with Kindly and making an impact
            </motion.p>
          </div>
        </div>
      </section>

      {/* FAQ Component */}
      <FAQ />

      {/* Creator Link Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Are you a content creator?
              </h2>
              <p className="text-gray-600 mb-8">
                Learn how Kindly protects your affiliate revenue while enabling your audience to make an impact.
              </p>
              <Link
                href="/creators"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-rose-500 text-white font-medium hover:bg-rose-600 transition-colors"
              >
                <Heart className="w-5 h-5 mr-2" />
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
