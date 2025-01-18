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
          <div className="absolute inset-0 w-full h-full">
            <div style={{ position: 'relative', width: '100vw', height: '100%', overflow: 'hidden' }}>
              <iframe
                src="https://iframe.mediadelivery.net/embed/371157/eaf3d327-988e-41e6-a5d4-95fdc4d6b181?autoplay=true&loop=true&muted=true&preload=true"
                style={{ 
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '177.77777778vh', /* 16:9 aspect ratio */
                  minWidth: '100%',
                  minHeight: '56.25vw', /* 16:9 aspect ratio */
                  transform: 'translate(-50%, -50%)',
                  border: 'none'
                }}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                allowFullScreen={true}
              ></iframe>
            </div>
          </div>
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
            
              
              <h1 className={`text-4xl md:text-5xl font-bold mb-6 leading-normal ${
                showVideo 
                  ? 'text-gray-900 md:text-white md:[text-shadow:0_4px_16px_rgba(0,0,0,0.95),0_8px_32px_rgba(0,0,0,0.85),0_16px_48px_rgba(0,0,0,0.75)]'
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
                        show={false}
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
                  ? 'text-gray-600 md:text-white md:[text-shadow:0_2px_8px_rgba(0,0,0,0.9),0_4px_16px_rgba(0,0,0,0.8),0_8px_24px_rgba(0,0,0,0.7)]'
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