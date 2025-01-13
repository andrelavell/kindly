import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Impact } from '../utils/impactGenerator';
import { storeBrands } from '../utils/storeBrands';

const formatTimeAgo = (timestamp: number): string => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) {
    return "Just now";
  } else if (seconds < 3600) {
    return `${Math.floor(seconds / 60)}m ago`;
  } else if (seconds < 86400) {
    return `${Math.floor(seconds / 3600)}h ago`;
  } else {
    return `${Math.floor(seconds / 86400)}d ago`;
  }
};

const MAX_IMPACTS = 3;

interface CommunityFeedProps {
  inHero?: boolean;
  showVideo?: boolean;
}

export function CommunityFeed({ inHero = false, showVideo = false }: CommunityFeedProps) {
  const [currentImpacts, setCurrentImpacts] = useState<Impact[]>([]);
  const [impactGenerator, setImpactGenerator] = useState<typeof import('../utils/impactGenerator')>();
  const [, forceUpdate] = useState({});
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Update timestamps every second
    const interval = setInterval(() => {
      forceUpdate({});
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Dynamically import the impact generator
    import('../utils/impactGenerator').then(setImpactGenerator);
  }, []);

  useEffect(() => {
    if (!impactGenerator) return;

    const generateNewImpact = () => {
      const newImpact = impactGenerator.generateImpact();
      setCurrentImpacts(prev => {
        // If in hero with video, only show 1 impact
        if (inHero && showVideo) {
          return [newImpact];
        }
        // Otherwise show up to 3 impacts
        const newImpacts = [newImpact, ...prev].slice(0, 3);
        return newImpacts;
      });

      // Schedule next impact with random delay between 1-5 seconds
      const nextDelay = Math.floor(Math.random() * 4000) + 1000; // Random between 1000-5000ms
      timeoutRef.current = setTimeout(generateNewImpact, nextDelay);
    };

    // Add initial delay before first impact (random between 1-5 seconds)
    const initialDelay = Math.floor(Math.random() * 4000) + 1000;
    const initialTimeout = setTimeout(generateNewImpact, initialDelay);

    return () => {
      clearTimeout(initialTimeout);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [impactGenerator, inHero, showVideo]);

  const isHeroWithVideo = inHero && showVideo;

  return (
    <div className={`relative ${
      inHero 
        ? showVideo 
          ? 'h-[200px] md:h-[250px] mb-8'  
          : 'h-[600px] md:h-[700px]'   
        : 'h-[500px]'                  
    }`}>
      <div className={`absolute inset-0 backdrop-blur-md rounded-2xl overflow-hidden ${
        isHeroWithVideo ? 'bg-white/10' : 'bg-white/95'
      }`}>
        <div className={`p-4 border-b ${
          isHeroWithVideo ? 'border-white/20' : 'border-gray-200'
        }`}>
          <div className="flex items-center gap-2">
            <h3 className={`font-semibold ${
              isHeroWithVideo ? 'text-white' : 'text-gray-900'
            }`}>
              Live Impact Feed
            </h3>
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </div>
          </div>
          <p className={`text-base ${
            isHeroWithVideo ? 'text-white/90' : 'text-gray-600'
          }`}>
            Watch our community make a difference in real-time
          </p>
        </div>

        <div className="p-4">
          <AnimatePresence mode="popLayout">
            <div className="space-y-3">
              {currentImpacts.map((impact, index) => (
                <motion.div
                  key={impact.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ 
                    duration: 0.4,
                    ease: "easeOut",
                    layout: { duration: 0.3 }
                  }}
                  className={`p-4 rounded-xl relative shadow-[0_2px_8px_rgba(0,0,0,0.06)] ${
                    isHeroWithVideo 
                      ? 'bg-gray-50 md:bg-sky-100/40 md:backdrop-blur-md border-[1.5px] border-gray-200/80 md:border-white/40'
                      : 'bg-gray-50 border-[1.5px] border-gray-200/80'
                  }`}
                >
                  <div className="absolute top-4 right-4 flex items-center gap-1.5">
                    <div className="w-[6px] h-[6px] rounded-full bg-green-400" />
                    <span className={`text-xs font-medium ${
                      isHeroWithVideo ? 'text-gray-600 md:text-white/90' : 'text-gray-600'
                    }`}>{formatTimeAgo(impact.timestamp)}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${
                      isHeroWithVideo 
                        ? 'bg-white/20 md:bg-white/20' 
                        : 'bg-white'
                    }`}>
                      <img 
                        src={storeBrands[impact.store]?.logo}
                        alt={impact.store}
                        className="w-8 h-8 object-cover rounded-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className={`font-medium truncate ${
                          isHeroWithVideo ? 'text-gray-900 md:text-white' : 'text-gray-900'
                        }`}>
                          {impact.user} <span className={`font-normal ${
                            isHeroWithVideo ? 'text-gray-600 md:text-white/90' : 'text-gray-600'
                          }`}>shopped at</span> {impact.store}
                        </p>
                      </div>
                      <div className={`mt-1 ${
                        isHeroWithVideo ? 'text-gray-900 md:text-white' : 'text-gray-600'
                      }`}>
                        <span className={`text-lg font-semibold ${
                          isHeroWithVideo ? 'text-rose-500 md:text-rose-400' : 'text-rose-500'
                        }`}>${impact.donation}</span>
                        <span className={
                          isHeroWithVideo ? 'text-gray-600 md:text-white/90' : 'text-gray-600'
                        }> donated from </span>
                        <span className={
                          isHeroWithVideo ? 'text-gray-600 md:text-white/90' : 'text-gray-600'
                        }>${impact.amount} purchase</span>
                      </div>
                      <p className={`text-sm mt-1 ${
                        isHeroWithVideo ? 'text-gray-600 md:text-white/90 md:font-bold' : 'text-gray-600'
                      }`}>
                        {impact.impact}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
