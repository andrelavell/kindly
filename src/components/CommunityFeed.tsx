import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import type { Impact } from '../utils/impactGenerator';
import { storeBrands } from '../utils/storeBrands';
import { Heart as HeartIcon } from 'lucide-react';

const MAX_IMPACTS = 3;

// Dynamically import the ImpactCard component
const ImpactCard = dynamic(() => import('./ImpactCard'), {
  ssr: false,
  loading: () => (
    <div className="bg-gray-100 rounded-lg p-4 animate-pulse h-24" />
  ),
});

interface CommunityFeedProps {
  inHero?: boolean;
  showVideo?: boolean;
}

export function CommunityFeed({ inHero = false, showVideo = false }: CommunityFeedProps) {
  const [currentImpacts, setCurrentImpacts] = useState<Impact[]>([]);
  const [impactGenerator, setImpactGenerator] = useState<typeof import('../utils/impactGenerator')>();

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
    };

    generateNewImpact();
    const interval = setInterval(generateNewImpact, 3000);

    return () => clearInterval(interval);
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
      <div className={`absolute inset-0 rounded-2xl ${
        isHeroWithVideo 
          ? 'bg-black/30 backdrop-blur-sm border border-white/20'
          : 'bg-white border border-gray-200'
      } overflow-hidden`}>
        <div className={`p-4 border-b ${
          isHeroWithVideo ? 'border-white/20' : 'border-gray-200'
        }`}>
          <h3 className={`text-lg font-medium ${
            isHeroWithVideo ? 'text-white' : 'text-gray-900'
          }`}>
            Live Impact Feed
          </h3>
          <p className={`text-sm ${
            isHeroWithVideo ? 'text-white/90' : 'text-gray-600'
          }`}>
            Watch our community make a difference in real-time
          </p>
        </div>

        <div className="p-4">
          <AnimatePresence mode="popLayout">
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
                className={`p-4 rounded-xl relative ${
                  isHeroWithVideo 
                    ? 'bg-sky-100/40 backdrop-blur-md border border-white/30'
                    : 'bg-gray-50 border border-gray-100'
                }`}
              >
                <div className="absolute top-4 right-4">
                  <div className="relative">
                    <HeartIcon className="w-5 h-5 text-brand fill-current" />
                    <div className="absolute inset-0">
                      <HeartIcon className="w-5 h-5 text-brand fill-current animate-ping opacity-75" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${
                    isHeroWithVideo 
                      ? 'bg-white/20' 
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
                        isHeroWithVideo ? 'text-white' : 'text-gray-900'
                      }`}>
                        {impact.user} <span className="font-normal text-white/90">shopped at</span> {impact.store}
                      </p>
                    </div>
                    <div className={`mt-1 ${
                      isHeroWithVideo ? 'text-white' : 'text-gray-600'
                    }`}>
                      <span className="text-lg font-semibold text-rose-400">${impact.donation}</span>
                      <span className="text-white/90"> donated from </span>
                      <span className="text-white/90">${impact.amount} purchase</span>
                    </div>
                    <p className={`text-sm mt-1 ${
                      isHeroWithVideo ? 'text-white/90' : 'text-gray-600'
                    }`}>
                      {impact.impact}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
