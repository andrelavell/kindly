import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getBrowserInfo } from '../utils/browserDetection';

export function HowItWorks() {
  const browserInfo = getBrowserInfo();
  const [animationState, setAnimationState] = useState('initial');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 60 }); // Start below button
  const [isClicking, setIsClicking] = useState(false);

  // Animation sequence
  useEffect(() => {
    const sequence = async () => {
      // Reset state
      setAnimationState('initial');
      setCursorPosition({ x: 0, y: 60 }); // Start below
      await new Promise(r => setTimeout(r, 1000));

      // Move to button
      setCursorPosition({ x: 0, y: 0 }); // Move up to button
      await new Promise(r => setTimeout(r, 800));

      // Click animation
      setIsClicking(true);
      await new Promise(r => setTimeout(r, 200));
      setIsClicking(false);
      setAnimationState('activated');
      await new Promise(r => setTimeout(r, 3000));

      // Restart sequence
      sequence();
    };

    sequence();
  }, []);

  const steps = [
    {
      number: "01",
      title: browserInfo.actionText,
      description: "Install our extension in one click - it's free and takes seconds"
    },
    {
      number: "02",
      title: "Shop as Usual",
      description: "Keep shopping at your favorite stores. If it's one of our supported stores, you will be notified with an alert in your browser"
    },
    {
      number: "03",
      title: "Donate Automatically",
      description: "We pass our commissions from the merchant to your cause of choice"
    }
  ];

  return (
    <section className="py-24 bg-[#F2F3F9]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-lg font-medium text-rose-500 mb-4">How Kindly Works</h2>
            <h3 className="text-5xl font-bold text-gray-900">
              Making Impact Simple
            </h3>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto items-center">
          {/* Browser Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl shadow-2xl bg-white relative"
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
                  amazon.com
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
                  <div className="bg-white rounded flex items-center px-3 py-1">
                    <input type="text" placeholder="Search" className="bg-transparent flex-1 outline-none text-gray-900" />
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
              <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg">
                <AnimatePresence mode="wait">
                  {animationState === 'initial' ? (
                    <motion.div
                      key="initial"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="w-[320px]"
                    >
                      <div className="bg-rose-500 text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="text-sm font-semibold text-white">KINDLY</span>
                        </div>
                        <button className="text-white hover:text-rose-100">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="p-6">
                        <div className="mb-6">
                          <img 
                            src="https://scontent-sjc3-1.xx.fbcdn.net/v/t39.30808-6/356833589_807648994255497_2911508593876776268_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=IO6pMkseHOcQ7kNvgGcRjtH&_nc_zt=23&_nc_ht=scontent-sjc3-1.xx&_nc_gid=AEfvJqy0iQY-laGTZCvxIXf&oh=00_AYD4NOT9p5jjuvLYApsmxOVSWYpWZVLqEAx3hkqHJjHh0w&oe=677B625A" 
                            alt="Michael J Fox Foundation" 
                            className="w-[60px] h-[60px] mx-auto mb-4 rounded-lg"
                          />
                          <h3 className="text-[#2D3648] text-xl font-semibold text-center leading-tight mb-2">
                            Get up to 2.6% donated to
                          </h3>
                          <h4 className="text-[#2D3648] text-lg font-medium text-center leading-tight">
                            Michael J Fox Foundation
                          </h4>
                          <p className="text-[#2D3648] text-center mt-1">
                            For Parkinsons Research
                          </p>
                        </div>
                        
                        <div className="relative">
                          {/* Cursor */}
                          <div className="absolute right-4 z-20 pointer-events-none" style={{ top: '50%' }}>
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
                            className="w-full bg-[rgb(16,185,129)] hover:bg-[rgb(13,148,103)] text-white font-medium py-3 px-4 rounded-lg transition-colors"
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
                      <div className="bg-rose-500 text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="text-sm font-semibold text-white">KINDLY</span>
                        </div>
                        <button className="text-white hover:text-rose-100">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="p-6">
                        <div className="mb-6">
                          <img 
                            src="https://scontent-sjc3-1.xx.fbcdn.net/v/t39.30808-6/356833589_807648994255497_2911508593876776268_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=IO6pMkseHOcQ7kNvgGcRjtH&_nc_zt=23&_nc_ht=scontent-sjc3-1.xx&_nc_gid=AEfvJqy0iQY-laGTZCvxIXf&oh=00_AYD4NOT9p5jjuvLYApsmxOVSWYpWZVLqEAx3hkqHJjHh0w&oe=677B625A" 
                            alt="Michael J Fox Foundation" 
                            className="w-[60px] h-[60px] mx-auto mb-4 rounded-lg"
                          />
                          <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="text-center"
                          >
                            <h3 className="text-[#2D3648] text-xl font-semibold mb-4">
                              Offer Activated!
                            </h3>
                            <p className="text-[#2D3648] text-base">
                              Purchases will now generate up to a 2.6% donation to Michael J Fox Foundation For Parkinsons Research.
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

          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-3xl shadow-lg p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-white font-medium">
                      {step.number}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h4>
                    <p className="text-gray-600 text-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-4">
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}