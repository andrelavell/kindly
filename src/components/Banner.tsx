import React from 'react';
import { getBrowserInfo } from '../utils/browserDetection';
import { ArrowRight, X } from 'lucide-react';

export function Banner() {
  const onClose = () => {
    // Add your close logic here
  };

  // Return null to completely hide the banner
  return (
    <div>
      <button
        onClick={onClose}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500"
        aria-label="Close banner"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
