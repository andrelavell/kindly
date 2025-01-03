import React from 'react';
import { getBrowserInfo } from '../utils/browserDetection';

export function Banner() {
  const browserInfo = getBrowserInfo();
  const BrowserIcon = browserInfo.icon;

  return (
    <div className="bg-[#1E40AF] text-white py-2">
      <div className="container mx-auto px-4 text-center text-sm font-medium flex items-center justify-center gap-2">
        <BrowserIcon className="w-4 h-4" />
        <span>
          {browserInfo.actionText} to start giving back with 50,000+ stores including Amazon, Walmart, and Target
        </span>
      </div>
    </div>
  );
}
