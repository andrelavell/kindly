import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { storeBrands } from '../utils/storeBrands';
import { faker } from '@faker-js/faker';

interface Impact {
  id: number;
  user: string;
  store: string;
  amount: string;
  donation: string;
  impact: string;
}

const MAX_IMPACTS = 3;

const generateAmount = (store: string): number => {
  // Base amounts for different stores
  const baseAmounts: { [key: string]: number } = {
    'Amazon': 35,
    'Target': 45,
    'Walmart': 40,
    'Best Buy': 85,
    'Apple': 120,
    'Nike': 65,
    'Starbucks': 8,
    'Barnes & Noble': 25,
    'Home Depot': 55,
    'Whole Foods': 50
  };

  const base = baseAmounts[store] || 30;
  // Generate a random multiplier between 0.5 and 1.5
  const multiplier = 0.5 + Math.random();
  // Generate random cents between 0 and 99
  const cents = Math.floor(Math.random() * 100);
  
  return Number((base * multiplier + cents / 100).toFixed(2));
};

// Impact messages grouped by donation range
const impactsByRange = {
  small: [ // $0-5
    'supported local food banks',
    'helped fund youth education',
    'supported clean water initiatives',
    'contributed to mental health services',
    'supported environmental conservation',
    'helped provide medical care',
    'supported literacy programs',
    'helped fund homeless shelters',
    'supported animal welfare',
    'contributed to disaster relief',
    'helped fight hunger',
    'supported children\'s education',
    'helped provide healthcare access',
    'supported housing initiatives',
    'helped protect the environment',
    'supported veterans services',
    'helped fund cancer research',
    'supported refugee assistance',
    'helped provide emergency relief',
    'supported community development',
    'helped fund medical research',
    'supported wildlife conservation',
    'helped provide elderly care',
    'supported youth programs',
    'helped fund education technology'
  ],
  medium: [ // $5-15
    'supported families in need',
    'funded job training programs',
    'supported education initiatives',
    'helped provide healthcare services',
    'supported conservation efforts',
    'helped fund emergency shelters',
    'supported community programs',
    'helped provide medical supplies',
    'supported youth development',
    'helped protect endangered species',
    'supported disaster response',
    'helped fund medical care',
    'supported housing programs',
    'helped provide emergency services',
    'supported environmental protection',
    'helped fund community centers'
  ],
  large: [ // $15+
    'supported global health initiatives',
    'helped fund education programs',
    'supported humanitarian aid',
    'helped provide emergency relief',
    'supported conservation projects',
    'helped fund medical research',
    'supported community development',
    'helped provide disaster relief',
    'supported environmental protection',
    'helped fund healthcare access',
    'supported education technology',
    'helped provide emergency services',
    'supported wildlife conservation',
    'helped fund youth programs',
    'supported medical initiatives',
    'helped provide community resources'
  ]
};

const getImpactForAmount = (amount: number): string => {
  const donationAmount = amount;
  if (donationAmount >= 15) {
    return impactsByRange.large[Math.floor(Math.random() * impactsByRange.large.length)];
  } else if (donationAmount >= 5) {
    return impactsByRange.medium[Math.floor(Math.random() * impactsByRange.medium.length)];
  } else {
    return impactsByRange.small[Math.floor(Math.random() * impactsByRange.small.length)];
  }
};

const ImpactCard = motion(React.forwardRef<HTMLDivElement, { impact: Impact }>(({ impact }, ref) => {
  const [timeAgo, setTimeAgo] = useState("Just now");

  useEffect(() => {
    const interval = setInterval(() => {
      const seconds = Math.floor((Date.now() - impact.id) / 1000);
      if (seconds < 5) {
        setTimeAgo("Just now");
      } else {
        setTimeAgo(`${seconds}s ago`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [impact.id]);

  return (
    <div
      ref={ref}
      className="relative bg-white rounded-xl p-3 md:p-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:border-gray-200 transition-all duration-300 overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-rose-50/30 via-transparent to-transparent animate-gradient" />
      
      {/* Live indicator */}
      <div className="hidden md:flex absolute top-4 right-4 items-center gap-1.5">
        <div className="w-[6px] h-[6px] rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs font-medium text-gray-400">{timeAgo}</span>
      </div>

      <div className="flex gap-3 md:gap-4 relative">
        <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-1.5 border border-gray-100">
          {storeBrands[impact.store]?.logo && (
            <img 
              src={storeBrands[impact.store].logo} 
              alt={impact.store}
              className="w-full h-full object-contain rounded-xl"
            />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          {/* Top row: User and Store */}
          <div className="flex items-center gap-1.5 mb-1.5 md:mb-2">
            <span className="font-medium text-gray-900 text-sm md:text-base">{impact.user}</span>
            <span className="text-gray-400 text-xs md:text-base">shopped at</span>
            <span className="font-medium text-gray-900 text-sm md:text-base">
              {impact.store}
            </span>
          </div>

          {/* Middle row: Donation Amount and Impact */}
          <div className="flex items-baseline gap-2 mb-1.5 md:mb-2">
            <div className="text-base md:text-lg font-semibold bg-gradient-to-r from-rose-500 to-rose-600 bg-clip-text text-transparent">
              ${impact.donation}
            </div>
            <div className="text-rose-500 font-medium text-sm md:text-base">donated</div>
          </div>
          
          {/* Bottom row: Purchase and Impact */}
          <div className="flex items-center">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs md:text-sm text-gray-500">from ${impact.amount} purchase</span>
              <span className="text-gray-300 mx-1 md:mx-1.5">•</span>
              <span className="text-xs md:text-sm text-gray-900 font-medium">{impact.impact}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}));

export function CommunityFeed({ inHero = false }: { inHero?: boolean }) {
  const [currentImpacts, setCurrentImpacts] = useState<Impact[]>([]);
  const stores = Object.keys(storeBrands);

  const generateImpact = (timestamp = Date.now()): Impact => {
    const store = stores[Math.floor(Math.random() * stores.length)];
    const amount = generateAmount(store);
    // Generate random percentage between 2-5%
    const donationPercent = (2 + Math.random() * 3) / 100;
    const donation = (amount * donationPercent).toFixed(2);
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    
    return {
      id: timestamp,
      user: `${firstName} ${lastName[0]}.`,
      store,
      amount: amount.toFixed(2),
      donation,
      impact: getImpactForAmount(parseFloat(donation))
    };
  };

  useEffect(() => {
    // Initialize with 3 impacts with different timestamps
    const now = Date.now();
    const initialImpacts = [
      generateImpact(now),
      generateImpact(now - 1000), // 1 second ago
      generateImpact(now - 2000), // 2 seconds ago
    ];
    setCurrentImpacts(initialImpacts);

    const interval = setInterval(() => {
      setCurrentImpacts(prev => {
        const newImpact = generateImpact();
        return [newImpact, prev[0], prev[1]];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-gray-50/50 to-gray-100/50 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-4 md:p-6 shadow-[0_0_50px_-12px_rgba(0,0,0,0.12)]">
      <div className="absolute inset-0 bg-white/50 rounded-2xl backdrop-blur-sm" style={{ WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)' }} />
      
      {/* Title */}
      <div className="relative mb-4 md:mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <h3 className="font-semibold text-gray-900">Live Impact Feed</h3>
        </div>
      </div>

      {/* Feed Items */}
      <motion.div layout className="space-y-3 md:space-y-4 relative">
        <AnimatePresence mode="popLayout" initial={false}>
          {currentImpacts.map((impact) => (
            <motion.div
              key={impact.id}
              layout
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                layout: { duration: 0.3 },
                opacity: { duration: 0.2 },
                y: { duration: 0.2 }
              }}
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
        />
      </motion.div>
    </div>
  );
}
