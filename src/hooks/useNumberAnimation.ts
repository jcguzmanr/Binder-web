import { useState, useEffect, useRef } from 'react';

interface UseNumberAnimationOptions {
  targetValue: number;
  duration?: number;
  startValue?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export const useNumberAnimation = ({
  targetValue,
  duration = 2000,
  startValue = 0,
  suffix = '',
  prefix = '',
  decimals = 0,
}: UseNumberAnimationOptions) => {
  const [displayValue, setDisplayValue] = useState(startValue);
  const [isAnimating, setIsAnimating] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasAnimatedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            setIsAnimating(true);
            
            const startTime = Date.now();
            const startVal = startValue;
            const endVal = targetValue;
            const range = endVal - startVal;

            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              
              // Easing function (ease-out)
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const currentValue = startVal + range * easeOut;
              
              setDisplayValue(currentValue);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setIsAnimating(false);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of element is visible
        rootMargin: '0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [targetValue, duration, startValue]);

  const formattedValue = displayValue.toFixed(decimals);
  const displayText = `${prefix}${formattedValue}${suffix}`;

  return {
    displayText,
    displayValue,
    isAnimating,
    elementRef,
  };
};

