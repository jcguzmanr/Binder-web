import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export const GoogleAnalytics = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Track page view when route changes
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-YR3V5CRVQE', {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
};

