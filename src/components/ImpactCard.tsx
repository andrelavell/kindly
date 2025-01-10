import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { storeBrands } from '../utils/storeBrands';
import type { Impact } from '../utils/impactGenerator';

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

function ImpactCardComponent({ impact }: { impact: Impact }, ref: React.ForwardedRef<HTMLDivElement>) {
  const [timeAgo, setTimeAgo] = useState("Just now");

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(formatTimeAgo(impact.timestamp));
    }, 1000);

    return () => clearInterval(interval);
  }, [impact.timestamp]);

  return (
    <div 
      ref={ref}
      className="relative bg-white rounded-lg p-4 border border-gray-200/50 shadow-sm"
    >
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
              loading="lazy"
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
            <div className="text-base md:text-lg font-semibold brand text-transparent">
              ${impact.donation}
            </div>
            <div className="text-brand font-medium text-sm md:text-base">donated</div>
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
}

const ImpactCard = motion(React.forwardRef(ImpactCardComponent));

export default ImpactCard;
