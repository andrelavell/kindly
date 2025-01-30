import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Shield, TrendingUp, Users, ArrowRight, CheckCircle, XCircle, Lock, ShieldCheck, ChevronDown } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';

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
  const [cursorPosition, setCursorPosition] = React.useState({ x: 0, y: 60 }); // Start below button
  const [isClicking, setIsClicking] = React.useState(false);
  const [animationState, setAnimationState] = React.useState('initial');

  // Animation sequence with cleanup
  React.useEffect(() => {
    let isSubscribed = true;

    const sequence = async () => {
      if (!isSubscribed) return;

      // Reset state
      setAnimationState('initial');
      setCursorPosition({ x: 0, y: 60 }); // Start below
      await new Promise(r => setTimeout(r, 2500));
      if (!isSubscribed) return;

      // Move to button
      setCursorPosition({ x: 0, y: 0 }); // Move up to button
      await new Promise(r => setTimeout(r, 1000));
      if (!isSubscribed) return;

      // Click animation
      setIsClicking(true);
      await new Promise(r => setTimeout(r, 200));
      if (!isSubscribed) return;
      
      setIsClicking(false);
      setAnimationState('activated');
      await new Promise(r => setTimeout(r, 3000));
      if (!isSubscribed) return;

      // Restart sequence
      sequence();
    };

    sequence();

    // Cleanup function
    return () => {
      isSubscribed = false;
    };
  }, []);

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
              className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
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

      {/* How It Works Section */}
      <section className="relative py-24 bg-[#F5F8FA]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-[60fr_40fr] gap-12 max-w-7xl mx-auto items-center">
            <motion.div 
              className="space-y-8 max-w-[650px]"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <motion.div 
                  className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-2 rounded-full text-sm font-medium"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <span>Launching February 2024</span>
                </motion.div>
                <motion.h2 
                  className="text-2xl leading-[1.1] font-bold text-[#0B2742]"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  How Kindly Works
                </motion.h2>
                <motion.p 
                  className="text-xl text-[#536B7D]"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Our browser extension enables your customers to automatically donate to their chosen nonprofits when they shop with you, at no additional cost to them.
                </motion.p>
              </div>

              <div className="grid gap-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-rose-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#0B2742] mb-2">Automatic Charitable Giving</h3>
                    <p className="text-[#536B7D]">Our browser extension enables your customers to automatically donate to their chosen nonprofits when they shop with you, at no additional cost to them.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#0B2742] mb-2">Protected Partnerships</h3>
                    <p className="text-[#536B7D]">We respect your existing affiliate relationships. Unlike other extensions, we never override existing cookies and don't offer coupon incentives.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#0B2742] mb-2">Drive Meaningful Traffic</h3>
                    <p className="text-[#536B7D]">Join us at launch to connect with purpose-driven shoppers and align your brand with charitable giving, driving both sales and social impact.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right side - Browser Mockup */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl">
                {/* Browser Chrome */}
                <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="flex-1 bg-white rounded-md px-4 py-1 text-sm text-gray-600">
                      <span className="select-none">amazon.com</span>
                    </div>
                  </div>
                </div>

                {/* Browser Content */}
                <div className="aspect-[4/3] bg-white relative overflow-hidden">
                  {/* Amazon-like Header */}
                  <div className="bg-[#232f3e] text-white px-4 py-2 flex items-center space-x-6">
                    <img 
                      src="/images/amazon-logo-white.png" 
                      alt="Amazon" 
                      className="h-6 object-contain"
                    />
                    <div className="flex-1">
                      <div className="relative flex items-center bg-gray-100 rounded-lg px-4 py-2">
                        <input type="text" placeholder="Search" className="bg-transparent flex-1 outline-none text-gray-900" />
                        <span className="text-gray-500 font-mono">amazon.com</span>
                      </div>
                    </div>
                  </div>

                  {/* Product Grid */}
                  <div className="p-4 grid grid-cols-2 gap-4">
                    {/* Product Card */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="bg-gray-100 aspect-square rounded-lg mb-3 flex items-center justify-center">
                        <div className="w-2/3 h-2/3 bg-gray-200 rounded-lg"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      </div>
                    </div>

                    {/* Product Card */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="bg-gray-100 aspect-square rounded-lg mb-3 flex items-center justify-center">
                        <div className="w-2/3 h-2/3 bg-gray-200 rounded-lg"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      </div>
                    </div>
                  </div>

                  {/* Extension Popup */}
                  <div className="absolute top-0 right-4 bg-white rounded-lg shadow-lg">
                    <AnimatePresence mode="wait">
                      {animationState === 'initial' ? (
                        <motion.div
                          key="initial"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="w-[320px]"
                        >
                          <div className="bg-brand text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
                            <div className="flex items-center gap-1.5">
                              <Heart className="w-4 h-4" fill="white" />
                              <span className="text-sm font-semibold text-white">KINDLY</span>
                            </div>
                            <button className="text-white hover:text-brand">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          
                          <div className="p-6">
                            <div className="mb-6">
                              <div className="relative w-[80px] h-[80px] mx-auto mb-6">
                                <Image 
                                  src="/images/causes/susan-g-komen-logo.png"
                                  alt="Susan G Komen"
                                  fill
                                  className="rounded-lg object-contain bg-white"
                                  sizes="80px"
                                  priority
                                />
                              </div>
                              <h3 className="text-2xl font-semibold text-[#2D3648] mb-2">
                                Get up to 2.6% donated to Susan G Komen
                              </h3>
                              <p className="text-[#2D3648]/70 text-sm">
                                For Breast Cancer Research
                              </p>
                              <button className="text-brand hover:text-brand text-sm font-medium mt-2 mx-auto flex items-center justify-center gap-1 transition-colors">
                                Change cause
                                <ChevronDown className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <div className="relative">
                              {/* Cursor */}
                              <div className="absolute right-4 z-20 pointer-events-none hidden md:block" style={{ top: '50%' }}>
                                <motion.div
                                  animate={{ 
                                    x: cursorPosition.x,
                                    y: cursorPosition.y,
                                    scale: isClicking ? 0.9 : 1
                                  }}
                                  transition={{ 
                                    type: "spring",
                                    damping: 20,
                                    stiffness: 100
                                  }}
                                >
                                  <motion.div
                                    animate={{ 
                                      x: [0, -1, 1, -1, 0],
                                      y: [0, -1, 1, -1, 0]
                                    }}
                                    transition={{ 
                                      duration: 4,
                                      repeat: Infinity,
                                      ease: "linear"
                                    }}
                                  >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg">
                                      <path d="M2.4 2L12 21L15.5 13.5L23 10L2.4 2Z" fill="white" stroke="black" strokeWidth="2"/>
                                    </svg>
                                  </motion.div>
                                </motion.div>
                              </div>

                              {/* Button */}
                              <motion.button
                                animate={{ scale: isClicking ? 0.98 : 1 }}
                                transition={{ duration: 0.1 }}
                                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                              >
                                Activate & Close
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="activated"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="w-[320px]"
                        >
                          <div className="bg-brand text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
                            <div className="flex items-center gap-1.5">
                              <Heart className="w-4 h-4" fill="white" />
                              <span className="text-sm font-semibold text-white">KINDLY</span>
                            </div>
                            <button className="text-white hover:text-brand">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          
                          <div className="p-6">
                            <div className="text-center">
                              <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-8 h-8 text-emerald-500" />
                              </div>
                              <h3 className="text-2xl font-semibold text-[#2D3648] mb-2">
                                Donation Activated!
                              </h3>
                              <p className="text-[#2D3648]/70 text-sm">
                                Purchases will now generate up to a 2.6% donation to Susan G Komen for Breast Cancer Research.
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-6xl mx-auto">
            <h2 className="text-2xl leading-[1.1] font-bold text-[#0B2742] mb-4">
              Benefits of Partnering with Kindly
            </h2>
            <p className="text-xl text-[#536B7D] max-w-2xl mx-auto">
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
                We respect existing affiliate relationships and never override existing cookies without explicit user consent. 
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
              <h2 className="text-2xl leading-[1.1] font-bold mb-8">Our Pro-Creator Commitment</h2>
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
                    <h4 className="text-2xl font-semibold text-red-400 mb-4">Automatic Override</h4>
                    <p className="text-gray-300">Automatically replace all affiliate links without user knowledge or consent</p>
                  </div>
                  <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                    <h4 className="text-2xl font-semibold text-red-400 mb-4">Hidden Process</h4>
                    <p className="text-gray-300">No transparency about how affiliate links are handled</p>
                  </div>
                  <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                    <h4 className="text-2xl font-semibold text-red-400 mb-4">Lost Revenue</h4>
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
                    <h4 className="text-2xl font-semibold text-emerald-700 mb-4">Respect First</h4>
                    <p className="text-gray-600">We never override creator affiliate links without explicit user consent</p>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                    <h4 className="text-2xl font-semibold text-emerald-700 mb-4">Full Transparency</h4>
                    <p className="text-gray-600">Clear communication about how and when affiliate links are processed</p>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                    <h4 className="text-2xl font-semibold text-emerald-700 mb-4">Fair Attribution</h4>
                    <p className="text-gray-600">Proper credit given to content creators who drive traffic to your store</p>
                  </div>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div>
              <div className="bg-gray-800 rounded-2xl p-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h4 className="text-2xl font-semibold mb-6">Transparent User Experience</h4>
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

      {/* Technical Integration Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-2xl leading-[1.1] font-bold text-gray-900 mb-4">
                Simple Technical Integration
              </h2>
              <p className="text-xl text-gray-600">
                Our platform is designed to work seamlessly with your existing systems
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Supported Affiliate Networks</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    Commission Junction (CJ Affiliate)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    AWIN
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    Rakuten Advertising
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    Impact
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Integration Process</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    No code changes required
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    Standard affiliate program approval process
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    Transparent tracking and reporting
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    Quick setup within existing networks
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-2xl leading-[1.1] font-bold text-gray-900 mb-4">
                Security & Compliance
              </h2>
              <p className="text-xl text-gray-600">
                We take security and data protection seriously
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                <Shield className="w-12 h-12 text-rose-500 mb-4" />
                <h4 className="text-2xl font-semibold text-gray-900 mb-4">Data Protection</h4>
                <p className="text-gray-600">
                  Industry-standard encryption and security measures to protect all data
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                <Lock className="w-12 h-12 text-rose-500 mb-4" />
                <h4 className="text-2xl font-semibold text-gray-900 mb-4">Privacy First</h4>
                <p className="text-gray-600">
                  Strict privacy policies and GDPR compliance for user data handling
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                <ShieldCheck className="w-12 h-12 text-rose-500 mb-4" />
                <h4 className="text-2xl font-semibold text-gray-900 mb-4">Secure Tracking</h4>
                <p className="text-gray-600">
                  Reliable and secure affiliate tracking system
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl leading-[1.1] font-bold mb-8">Ready to Partner?</h2>
            <p className="text-xl text-gray-300 mb-12">
              Join us in revolutionizing purpose-driven shopping. Our team is ready to assist with your integration.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="p-6 bg-gray-800 rounded-xl">
                <h4 className="text-2xl font-semibold text-rose-300 mb-4">1. Get in Touch</h4>
                <p className="text-gray-300">
                  Fill out our contact form or email us at hello@joinkindly.org
                </p>
              </div>
              <div className="p-6 bg-gray-800 rounded-xl">
                <h4 className="text-2xl font-semibold text-rose-300 mb-4">2. Quick Review</h4>
                <p className="text-gray-300">
                  We'll review your application within 1-2 business days
                </p>
              </div>
              <div className="p-6 bg-gray-800 rounded-xl">
                <h4 className="text-2xl font-semibold text-rose-300 mb-4">3. Start Growing</h4>
                <p className="text-gray-300">
                  Begin reaching purpose-driven shoppers immediately
                </p>
              </div>
            </div>

            <Link href="/contact">
              <div className="inline-flex items-center gap-2 bg-rose-500 text-white px-8 py-4 rounded-lg font-medium cursor-pointer">
                Contact Our Team
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          </div>
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
            <h2 className="text-2xl leading-[1.1] font-bold text-gray-900 mb-6">Be Part of the Change</h2>
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
