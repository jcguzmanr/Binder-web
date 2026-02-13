import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type BackgroundType = 'none' | 'video';

interface BackgroundContextType {
  background: BackgroundType;
  setBackground: (background: BackgroundType) => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export const BackgroundProvider = ({ children }: { children: ReactNode }) => {
  const [background, setBackground] = useState<BackgroundType>(() => {
    // New default background: video.
    const stored = localStorage.getItem('binder-background');

    if (!stored) {
      return 'video';
    }

    if (stored === 'none' || stored === 'video') {
      return stored;
    }

    // Migrate legacy animated backgrounds to video.
    if (stored === 'gentle-waves' || stored === 'canyon-flows' || stored === 'flow-pattern' || stored === 'antigravity') {
      return 'video';
    }

    return 'video';
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
