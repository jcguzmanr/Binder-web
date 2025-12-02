import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type BackgroundType = 'none' | 'gentle-waves' | 'canyon-flows' | 'flow-pattern' | 'antigravity';

interface BackgroundContextType {
  background: BackgroundType;
  setBackground: (background: BackgroundType) => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export const BackgroundProvider = ({ children }: { children: ReactNode }) => {
  const [background, setBackground] = useState<BackgroundType>(() => {
    // Always default to 'antigravity'
    const stored = localStorage.getItem('binder-background');
    const validBackgrounds: BackgroundType[] = ['none', 'gentle-waves', 'canyon-flows', 'flow-pattern', 'antigravity'];
    
    // If no stored value or stored value is 'none', default to 'antigravity'
    if (!stored || stored === 'none' || !validBackgrounds.includes(stored as BackgroundType)) {
      return 'antigravity';
    }
    
    // Use stored value if it's valid and not 'none'
    return stored as BackgroundType;
  });

  useEffect(() => {
    // Save current background to localStorage
    localStorage.setItem('binder-background', background);
    
    // Add/remove class to body based on background
    if (background !== 'none') {
      document.body.classList.add('has-animated-background');
    } else {
      document.body.classList.remove('has-animated-background');
    }
  }, [background]);

  return (
    <BackgroundContext.Provider value={{ background, setBackground }}>
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
};

