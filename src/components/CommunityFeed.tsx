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
  const donationAmount = parseFloat(amount);
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
      className="bg-gradient-to-b from-white to-gray-50/30 rounded-xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-200/60 hover:shadow-[0_20px_40px_rgba(0,0,0,0.16)] hover:border-gray-300/80 hover:scale-[1.02] transition-all duration-200"
    >
      <div className="flex gap-4">
        <div 
          className="w-8 h-8 shrink-0"
        >
          {storeBrands[impact.store]?.logo && (
            <img 
              src={storeBrands[impact.store].logo} 
              alt={impact.store}
              className="w-full h-full object-cover rounded-full"
            />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          {/* Top row: User, Store, and Time */}
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium truncate">{impact.user}</span>
            <span className="text-gray-400 shrink-0">shopped at</span>
            <span className="font-medium truncate">
              {impact.store}
            </span>
            <span className="text-gray-400 text-sm ml-auto shrink-0">{timeAgo}</span>
          </div>

          {/* Middle row: Donation Amount and Impact */}
          <div className="flex items-baseline gap-2 mb-1.5">
            <div className="text-lg font-semibold text-rose-500">
              ${impact.donation}
            </div>
            <div className="text-rose-500 font-medium">donated</div>
          </div>
          
          {/* Bottom row: Purchase and Impact */}
          <div className="flex items-center text-sm">
            <div className="flex items-baseline gap-1 text-gray-500">
              <span>from ${impact.amount} purchase</span>
              <span className="mx-2">•</span>
              <span className="text-rose-400 font-medium">{impact.impact}</span>
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
      impact: getImpactForAmount(donation)
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
    <div className="w-full relative">
      <div className="flex items-center justify-between pb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium text-[#222] flex items-center gap-2">
            Live Community Impact
          </h2>
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-green-500 absolute"
              style={{ boxShadow: '0 0 10px rgba(34, 197, 94, 0.5)' }}
            />
            <div className="w-2 h-2 rounded-full bg-green-500/30" />
          </div>
        </div>
      </div>

      <motion.div layout className="space-y-4 relative">
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
          className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none"
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
