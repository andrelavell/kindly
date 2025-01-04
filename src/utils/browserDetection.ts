import { Chrome, Firefox, Safari } from 'lucide-react';

export function getBrowserInfo() {
  if (typeof window === 'undefined') {
    return {
      name: 'Chrome',
      actionText: 'Add to Chrome',
      icon: Chrome,
      isSupported: true
    };
  }

  const userAgent = window.navigator.userAgent.toLowerCase();
  
  if (userAgent.includes('firefox')) {
    return {
      name: 'Firefox',
      actionText: 'Add to Firefox',
      icon: Firefox,
      isSupported: true
    };
  } else if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
    return {
      name: 'Safari',
      actionText: 'Add to Safari',
      icon: Safari,
      isSupported: true
    };
  } else {
    // Default to Chrome/Chromium browsers
    return {
      name: 'Chrome',
      actionText: 'Add to Chrome',
      icon: Chrome,
      isSupported: true
    };
  }
}
