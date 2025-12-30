import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number; // Percentage of element visible before triggering (0-1)
  rootMargin?: string; // Margin around root (e.g., '0px' or '-100px')
  triggerOnce?: boolean; // If true, animation only triggers once
  delay?: number; // Delay in milliseconds before animation starts
}

export const useScrollAnimation = ({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
  delay = 0,
}: UseScrollAnimationOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (triggerOnce && hasAnimatedRef.current) return;
            
            if (delay > 0) {
              setTimeout(() => {
                setIsVisible(true);
                hasAnimatedRef.current = true;
              }, delay);
            } else {
              setIsVisible(true);
              hasAnimatedRef.current = true;
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, delay]);

  return {
    elementRef,
    isVisible,
  };
};











