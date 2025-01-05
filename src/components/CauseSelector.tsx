import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { causes } from '../utils/causes';

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
  selected: {
    scale: 1,
    backgroundColor: 'rgb(243 244 246)',
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 30
    }
  },
  unselected: {
    scale: 1,
    backgroundColor: 'rgb(255 255 255)',
  }
};

export function CauseSelector() {
  const [selectedCause, setSelectedCause] = useState<number | null>(null);
  
  const handleCauseSelect = useCallback((id: number) => {
    setSelectedCause(id);
  }, []);

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl">
      <h3 className="text-2xl font-bold mb-6">Choose Your Cause</h3>
      <div className="space-y-3">
        {causes.map((cause) => (
          <motion.button
            key={cause.id}
            className="w-full p-4 rounded-xl border border-gray-100 flex items-center gap-4 bg-white"
            onClick={() => handleCauseSelect(cause.id)}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            animate={selectedCause === cause.id ? "selected" : "unselected"}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              selectedCause === cause.id ? 'text-teal-500' : 'text-gray-400'
            }`}>
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <div className="font-medium text-left">{cause.name}</div>
              <div className="text-sm text-gray-500">{cause.category}</div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}