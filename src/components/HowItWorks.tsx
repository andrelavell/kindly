import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { getBrowserInfo } from '../utils/browserDetection';
import { ChevronDown, Heart, ExternalLink } from 'lucide-react';

export function HowItWorks() {
  const browserInfo = getBrowserInfo();
  const [animationState, setAnimationState] = useState('initial');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 60 }); // Start below button
  const [isClicking, setIsClicking] = useState(false);

  // Animation sequence with cleanup
  useEffect(() => {
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

  const steps = [
    {
      number: "01",
      title: browserInfo.actionText,
      description: "Install the Kindly extension in just one click. It’s free, quick, and easy!"
    },
    {
      number: "02",
      title: "Shop at Partner Stores",
      description: "Shop as usual, and we’ll notify you when you can support your chosen charity at no extra cost to you."
    },
    {
      number: "03",
      title: "Automatic Donations",
      description: "Make a purchase, and we’ll handle the rest. A percentage of what you spend goes directly to your chosen cause—effortlessly and automatically."
    }
  ];

  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Left side - Content */}
        <div className="grid md:grid-cols-[60fr_40fr] gap-12 max-w-7xl mx-auto items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-[640px]"
            >
              <h2 className="brand font-medium mb-4">How It Works</h2>
              <h3 className="text-3xl md:text-[2.75rem] leading-[1.2] font-bold text-[#0B2742] mb-12">
                Three Simple Steps to<br />Make a Difference
              </h3>
              
              <div className="space-y-8">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="brand text-xl font-bold">{step.number}</div>
                    <div>
                      <h4 className="text-[#0B2742] text-xl font-bold mb-2">{step.title}</h4>
                      <p className="text-[#536B7D] text-lg">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right side - Browser Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl shadow-2xl bg-white relative"
            style={{ willChange: 'transform' }}
          >
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
            <div className="aspect-[4/3] bg-white relative">
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

              {/* Product Section */}
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
                          <h3 className="text-[#2D3648] text-xl font-semibold text-center leading-tight mb-2">
                            Get up to 2.6% donated to Susan G Komen
                          </h3>
                          <p className="text-[#2D3648]/70 text-sm text-center">
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
                          <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="text-center"
                          >
                            <h3 className="text-[#2D3648] text-xl font-semibold mb-4">
                            Donation Activated!
                            </h3>
                            <p className="text-[#2D3648] text-base">
                              Purchases will now generate up to a 2.6% donation to Susan G Komen for Breast Cancer Research.
                            </p>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}