import React from 'react';
import { getBrowserInfo } from '../utils/browserDetection';
import { ArrowRight } from 'lucide-react';

export function Banner() {
  const browserInfo = getBrowserInfo();
  const BrowserIcon = browserInfo.icon;

  return (
    <div className="bg-gradient-to-r from-rose-500 to-rose-600 text-white py-2.5">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
          <BrowserIcon className="w-4 h-4 text-rose-200" />
          <span className="text-sm font-medium">
            {browserInfo.actionText} to start giving back with 50,000+ stores
          </span>
          <div className="flex items-center gap-1.5 text-rose-200">
            <span className="text-sm">Amazon</span>
            <ArrowRight className="w-3 h-3" />
            <span className="text-sm">Walmart</span>
            <ArrowRight className="w-3 h-3" />
            <span className="text-sm">Target</span>
          </div>
        </div>
      </div>
    </div>
  );
}
