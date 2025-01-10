import React, { useState, useRef, useEffect } from 'react';
import { Chrome } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { RoughNotation } from "react-rough-notation";
import { Button } from './Button';
import { CommunityFeed } from './CommunityFeed';
import { getBrowserInfo } from '../utils/browserDetection';
import { heroConfig } from '../config/heroConfig';

export function Hero() {
  const browserInfo = getBrowserInfo();
  const { showVideo = false } = heroConfig;
  const roughRef = useRef(null);
  const isInView = useInView(roughRef, { once: true });

  return (
    <section className={`relative ${showVideo ? 'md:bg-transparent' : ''} bg-white`}>
      {/* Video Background - Hidden on mobile, shown from md up */}
      {showVideo && (
        <div className="hidden md:block absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute inset-0 bg-black/10" /> {/* Subtle dark overlay */}
          <div className="absolute inset-0 bg-black/65 z-[1]" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="https://res.cloudinary.com/dvgf0xsjq/video/upload/v1736475895/6740283-uhd_3840_2160_30fps_1_cxjgs4.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      <div className="container mx-auto px-4 py-12 md:py-24 relative z-[2]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[55fr_45fr] gap-8 md:gap-12 items-start">
            {/* Content */}
            <motion.div 
              className="relative z-20 max-w-xl mx-auto md:mx-0 text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >            
              <h2 className={`text-base md:text-lg font-medium mb-4 ${
                showVideo 
                  ? 'text-gray-900 md:text-white md:drop-shadow-xl md:[text-shadow:0_2px_4px_rgba(0,0,0,0.5),0_4px_8px_rgba(0,0,0,0.3)]' 
                  : 'text-gray-900'
              }`}>Make Every Purchase Matter</h2>
              
              <h1 className={`text-4xl md:text-5xl font-bold mb-6 leading-tight ${
                showVideo 
                  ? 'text-gray-900 md:text-white md:drop-shadow-2xl md:[text-shadow:0_4px_12px_rgba(0,0,0,0.6),0_8px_24px_rgba(0,0,0,0.4)]'
                  : 'text-gray-900'
              }`}>
                <span className={showVideo ? 'text-gray-900 md:text-white' : 'text-gray-900'}>
                  Turn Everyday Shopping Into
                </span>{' '}
                {showVideo ? (
                  <>
                    <span className="md:hidden">Life-Changing</span>
                    <span className="hidden md:inline">
                      <RoughNotation 
                        type="underline" 
                        show={isInView}
                        color="var(--brand-color)"
                        strokeWidth={2}
                        padding={2}
                        iterations={2}
                        animationDuration={800}
                      >
                        <span ref={roughRef}>Life-Changing</span>
                      </RoughNotation>
                    </span>
                  </>
                ) : (
                  "Life-Changing"
                )}{' '}
                Acts of Kindness
              </h1>
              
              <p className={`text-base md:text-lg mb-8 leading-relaxed ${
                showVideo 
                  ? 'text-gray-600 md:text-white md:drop-shadow-2xl md:[text-shadow:0_2px_4px_rgba(0,0,0,0.6),0_4px_8px_rgba(0,0,0,0.4)]'
                  : 'text-gray-600'
              }`}>
                Every time you shop online, you could be helping a child get education, 
                saving endangered species, or providing medical care to those in need — 
                <span className={`font-medium ${
                  showVideo ? 'text-gray-900 md:text-white' : 'text-gray-900'
                }`}>all without spending an extra penny</span>.
              </p>

              <div className="flex items-center justify-center md:justify-start space-x-6">
                <Button size="lg" variant="primary" icon={browserInfo.icon}>
                  {browserInfo.actionText} – It's Free
                </Button>
              </div>
            </motion.div>
            
            <div className="hidden md:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full"
              >
                <CommunityFeed isHeroWithVideo={showVideo} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}