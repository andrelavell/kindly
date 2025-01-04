// Analytics events
export const trackPageView = (url: string) => {
  // Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
    });
  }
};

export const trackEvent = (action: string, category: string, label: string, value?: number) => {
  // Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackConversion = (buttonId: string) => {
  // Track button clicks
  trackEvent('click', 'conversion', buttonId);
  
  // Track specific conversion goals
  switch (buttonId) {
    case 'install_extension':
      trackEvent('conversion', 'extension', 'install');
      break;
    case 'ambassador_signup':
      trackEvent('conversion', 'ambassador', 'signup');
      break;
    case 'newsletter_signup':
      trackEvent('conversion', 'newsletter', 'signup');
      break;
  }
};
