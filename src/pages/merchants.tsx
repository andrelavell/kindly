import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Shield, TrendingUp, Users, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import Image from 'next/image';
import Head from 'next/head';
import { Button } from '../components/Button';

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
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/merchants/hero.jpg"
            alt="Shopping with purpose"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 text-rose-300 text-sm font-medium">
                <ShoppingBag className="w-4 h-4" />
                For Merchants
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeIn}
              className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
            >
              Transform Shopping Into Purpose-Driven Impact
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
            >
              Partner with Kindly to enable purpose-driven shopping while boosting conversion rates
            </motion.p>
            
            <motion.div 
              variants={fadeIn}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Button 
                href="mailto:hello@joinkindly.org?subject=Partner%20with%20Kindly" 
                className="inline-flex items-center gap-2 bg-rose-500 text-white px-8 py-4 rounded-lg font-medium hover:bg-rose-600 transition-colors"
              >
                Partner With Us
                <ArrowRight className="w-5 h-5" />
              </Button>
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
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8">Our Pro-Creator Commitment</h2>
            <p className="text-xl text-gray-300 mb-12">
              We're building a platform that supports both charitable causes and content creators. Unlike other platforms that automatically override affiliate links,
              we've designed our system with creator protection as a foundation.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="p-8 rounded-2xl bg-gray-800">
                <h4 className="text-xl font-semibold mb-6">Traditional Extensions</h4>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1"><XCircle className="w-5 h-5" /></span>
                    Automatically override all affiliate links
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1"><XCircle className="w-5 h-5" /></span>
                    No transparency about link handling
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1"><XCircle className="w-5 h-5" /></span>
                    Creators lose attribution without knowing
                  </li>
                </ul>
              </div>

              <div className="p-8 rounded-2xl bg-gray-800">
                <h4 className="text-xl font-semibold mb-6">The Kindly Approach</h4>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 mt-1"><CheckCircle className="w-5 h-5" /></span>
                    Never override without explicit consent
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 mt-1"><CheckCircle className="w-5 h-5" /></span>
                    Clear user choice and transparency
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 mt-1"><CheckCircle className="w-5 h-5" /></span>
                    Protected creator revenue by default
                  </li>
                </ul>
              </div>
            </div>

            {/* Affiliate Detection Preview */}
            <motion.div 
              className="flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative p-6 bg-white rounded-xl shadow-lg w-full max-w-md">
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
                    <a 
                      href="mailto:hello@joinkindly.org?subject=Partner%20with%20Kindly" 
                      className="px-4 py-2 bg-white text-gray-600 border border-rose-500 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Support Creator
                    </a>
                    <a 
                      href="mailto:hello@joinkindly.org?subject=Partner%20with%20Kindly" 
                      className="px-4 py-2 bg-rose-500 text-white border-none rounded-lg font-medium hover:bg-rose-600 transition-colors"
                    >
                      Donate to Charity
                    </a>
                  </div>
                  <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                    If you choose to donate to charity, the affiliate commission from your purchase will be received by Kindly and donated to your selected cause.
                  </p>
                </div>
              </div>
            </motion.div>
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
            <Button 
              href="mailto:hello@joinkindly.org?subject=Partner%20with%20Kindly"
              className="inline-flex items-center gap-2 bg-rose-500 text-white px-8 py-4 rounded-lg font-medium hover:bg-rose-600 transition-colors"
            >
              Partner With Us
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
