import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import type { Impact } from '../utils/impactGenerator';

const MAX_IMPACTS = 3;

// Dynamically import the ImpactCard component
const ImpactCard = dynamic(() => import('./ImpactCard'), {
  ssr: false,
  loading: () => (
    <div className="bg-gray-100 rounded-lg p-4 animate-pulse h-24" />
  ),
});

export function CommunityFeed({ inHero = false }: { inHero?: boolean }) {
  const [currentImpacts, setCurrentImpacts] = useState<Impact[]>([]);
  const [impactGenerator, setImpactGenerator] = useState<typeof import('../utils/impactGenerator')>();

  useEffect(() => {
    // Dynamically import the impact generator
    import('../utils/impactGenerator').then(setImpactGenerator);
  }, []);

  const generateNewImpact = useCallback((timestamp = Date.now()) => {
    return impactGenerator?.generateImpact(timestamp);
  }, [impactGenerator]);

  useEffect(() => {
    if (!impactGenerator) return;

    // Initialize with 3 impacts with different timestamps
    const now = Date.now();
    const initialImpacts = [
      generateNewImpact(now),
      generateNewImpact(now - 1000), // 1 second ago
      generateNewImpact(now - 2000), // 2 seconds ago
    ].filter(Boolean) as Impact[];
    
    setCurrentImpacts(initialImpacts);

    const interval = setInterval(() => {
      const newImpact = generateNewImpact();
      if (newImpact) {
        setCurrentImpacts(prev => [newImpact, prev[0], prev[1]]);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [impactGenerator, generateNewImpact]);

  return (
    <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
      <div className="space-y-4">
        {/* Title */}
        <div className="relative mb-4 md:mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping opacity-75"></div>
            </div>
            <h3 className="font-semibold text-gray-900">Live Impact Feed</h3>
          </div>
        </div>

        {/* Feed Items */}
        <motion.div 
          layout 
          className="space-y-3 md:space-y-4 relative"
          style={{ willChange: 'transform' }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {currentImpacts.map((impact) => (
              <motion.div
                key={impact.id}
                layout="position"
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  layout: { duration: 0.3, type: "spring", bounce: 0.2 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 },
                  y: { duration: 0.2 }
                }}
                style={{ willChange: 'transform' }}
              >
                <ImpactCard impact={impact} />
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Gradient overlay suggesting more content */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-16 md:h-20 bg-gradient-to-t from-white to-transparent pointer-events-none"
            animate={{ 
              opacity: [1, 0.8, 1],
              y: [0, 2, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ willChange: 'transform, opacity' }}
          />
        </motion.div>
      </div>
    </div>
  );
}
