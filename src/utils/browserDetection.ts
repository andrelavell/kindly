import React, { useState, useEffect } from 'react';
import { Chrome, Globe, Compass } from 'lucide-react';

const defaultBrowserInfo = {
  name: 'Chrome',
  actionText: 'Add to Chrome',
  icon: Chrome,
  isChrome: true,
  isSupported: true
};

export function getBrowserInfo() {
  // Always return default during SSR to ensure consistent server rendering
  if (typeof window === 'undefined') {
    return defaultBrowserInfo;
  }

  // Only run browser detection on client side
  const userAgent = window.navigator.userAgent.toLowerCase();
  
  if (userAgent.includes('firefox')) {
    return {
      name: 'Firefox',
      actionText: 'Add to Firefox',
      icon: Globe,
      isChrome: false,
      isSupported: true
    };
  } else if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
    return {
      name: 'Safari',
      actionText: 'Add to Safari',
      icon: Compass,
      isChrome: false,
      isSupported: true
    };
  } else {
    return defaultBrowserInfo;
  }
}

// Hook to handle browser detection with hydration
export function useBrowserInfo() {
  const [browserInfo, setBrowserInfo] = useState(defaultBrowserInfo);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setBrowserInfo(getBrowserInfo());
  }, []);

  return {
    ...browserInfo,
    mounted
  };
}
