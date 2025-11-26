import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top instantly when route changes (no smooth scroll to avoid visible scroll animation)
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
};







