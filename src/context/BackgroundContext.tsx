import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type BackgroundType = 'none' | 'gentle-waves' | 'canyon-flows' | 'flow-pattern';

interface BackgroundContextType {
  background: BackgroundType;
  setBackground: (background: BackgroundType) => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export const BackgroundProvider = ({ children }: { children: ReactNode }) => {
  const [background, setBackground] = useState<BackgroundType>(() => {
    const stored = localStorage.getItem('binder-background');
    const validBackgrounds: BackgroundType[] = ['none', 'gentle-waves', 'canyon-flows', 'flow-pattern'];
    if (stored && validBackgrounds.includes(stored as BackgroundType)) {
      return stored as BackgroundType;
    }
    return 'none';
  });

  useEffect(() => {
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

