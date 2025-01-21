import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Shield, TrendingUp, Users, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
} as const;

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
} as const;

export default function MerchantsPage() {
  return (
    <div className="min-h-screen">
      <Head>
        <title>For Merchants - Kindly</title>
        <meta name="description" content="Partner with Kindly to enable purpose-driven shopping while boosting conversion rates" />
      </Head>

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 relative">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 text-rose-300 text-sm font-medium">
                <Heart className="w-4 h-4" fill="currentColor" />
                For Merchants
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeIn}
              className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
            >
              Turn Every Purchase Into Purpose
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
            >
              Partner with Kindly to transform your customer transactions into meaningful impact while boosting conversion rates through our innovative platform.
            </motion.p>
            
            <motion.div 
              variants={fadeIn}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link href="/contact">
                <div 
                  className="inline-flex items-center gap-2 bg-rose-500 text-white px-8 py-4 rounded-lg font-medium cursor-pointer"
                >
                  Partner With Us
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Benefits of Partnering with Kindly
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join us in revolutionizing the shopping experience while growing your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div 
              className="p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <TrendingUp className="w-12 h-12 text-rose-500 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Drive Higher Conversion Rates</h3>
              <p className="text-gray-600">
                When shoppers know their purchase will benefit a cause they care about, they're more motivated to complete their transaction. 
                This emotional connection can drive higher conversion rates and larger average order values.
              </p>
            </motion.div>

            <motion.div 
              className="p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Users className="w-12 h-12 text-rose-500 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Enhanced Brand Perception</h3>
              <p className="text-gray-600">
                Associate your brand with social impact without changing your existing operations. 
                Enable shoppers to make a difference through their everyday purchases with your brand.
              </p>
            </motion.div>

            <motion.div 
              className="p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Shield className="w-12 h-12 text-rose-500 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Ethical Affiliate Practices</h3>
              <p className="text-gray-600">
                We respect existing affiliate relationships and never override cookies without explicit user consent. 
                This ensures fair attribution and maintains trust with your affiliate partners.
              </p>
            </motion.div>

            <motion.div 
              className="p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <CheckCircle className="w-12 h-12 text-rose-500 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Zero Integration Required</h3>
              <p className="text-gray-600">
                Benefit from our platform without any technical integration or changes to your existing systems. 
                We work seamlessly with your current affiliate programs.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pro-Creator Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-8">Our Pro-Creator Commitment</h2>
              <p className="text-xl text-gray-300">
                We've built a platform that supports both charitable causes and content creators. Unlike other platforms that automatically override affiliate links,
                we've designed our system with creator protection as a foundation.
              </p>
            </div>

            {/* The Problem */}
            <div className="mb-16">
              <div className="bg-gray-800 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
                  <XCircle className="w-8 h-8 text-red-500" />
                  The Problem with Traditional Extensions
                </h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                    <h4 className="text-xl font-semibold text-red-400 mb-4">Automatic Override</h4>
                    <p className="text-gray-300">Automatically replace all affiliate links without user knowledge or consent</p>
                  </div>
                  <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                    <h4 className="text-xl font-semibold text-red-400 mb-4">Hidden Process</h4>
                    <p className="text-gray-300">No transparency about how affiliate links are handled</p>
                  </div>
                  <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                    <h4 className="text-xl font-semibold text-red-400 mb-4">Lost Revenue</h4>
                    <p className="text-gray-300">Creators lose attribution and commission without knowing</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Solution */}
            <div className="mb-16">
              <div className="bg-white rounded-2xl p-8">
                <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3 text-gray-900">
                  <CheckCircle className="w-8 h-8 text-emerald-500" />
                  The Kindly Solution
                </h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                    <h4 className="text-xl font-semibold text-emerald-700 mb-4">Respect First</h4>
                    <p className="text-gray-600">Your affiliate links remain active by default. We never override without explicit user choice.</p>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                    <h4 className="text-xl font-semibold text-emerald-700 mb-4">Clear Choice</h4>
                    <p className="text-gray-600">Users see a transparent prompt explaining their options: support you or donate to charity.</p>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                    <h4 className="text-xl font-semibold text-emerald-700 mb-4">Protected Revenue</h4>
                    <p className="text-gray-600">Your affiliate tracking remains intact unless users actively choose otherwise.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div>
              <div className="bg-gray-800 rounded-2xl p-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h4 className="text-xl font-semibold mb-6">Transparent User Experience</h4>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="p-1 bg-emerald-500/10 rounded-full mt-1">
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                        </div>
                        <span className="text-gray-300">Users are clearly informed when their purchase has an affiliate connection</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="p-1 bg-emerald-500/10 rounded-full mt-1">
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                        </div>
                        <span className="text-gray-300">The creator's identity is always displayed, fostering a direct connection</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="p-1 bg-emerald-500/10 rounded-full mt-1">
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                        </div>
                        <span className="text-gray-300">Clear options let users make an informed choice about their impact</span>
                      </li>
                    </ul>
                  </div>
                  <div className="relative">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <div className="text-center">
                        <div className="mb-4">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto text-rose-500">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">We've detected another affiliate</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          We've detected another affiliate connected to your purchase, <strong>AnnasRecipes</strong>. This might support a website or creator you recently visited.
                        </p>
                        <div className="flex gap-3 justify-center mb-4">
                          <div 
                            className="px-4 py-2 bg-white text-gray-600 border border-rose-500 rounded-lg font-medium"
                          >
                            Support Creator
                          </div>
                          <div 
                            className="px-4 py-2 bg-rose-500 text-white border-none rounded-lg font-medium"
                          >
                            Donate to Charity
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                          If you choose to donate to charity, the affiliate commission from your purchase will be received by Kindly and donated to your selected cause.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Be Part of the Change</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join Kindly early to shape the future of purpose-driven shopping
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/contact">
                <div 
                  className="inline-flex items-center gap-2 bg-rose-500 text-white px-8 py-4 rounded-lg font-medium cursor-pointer"
                >
                  Partner With Us
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
