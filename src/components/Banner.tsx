import React, { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Banner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 50 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 z-50 max-w-[320px] bg-[#E7F3EF] bg-opacity-95 backdrop-blur-[2px] rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-start">
              <div className="flex-1 mr-3">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-brand animate-pulse" />
                  <span className="font-semibold text-brand">Coming Soon!</span>
                </div>
                <p className="text-sm text-[#0B2742] leading-relaxed">
                  This is a preview of Kindly. All statistics and impact data shown are simulated examples of how our platform will work after launch.
                </p>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close notification"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
