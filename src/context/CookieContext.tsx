import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type CookieCategory = 'essential' | 'analytics';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
}

interface CookieContextType {
  hasConsent: boolean;
  preferences: CookiePreferences;
  acceptAll: () => void;
  rejectAll: () => void;
  updatePreferences: (preferences: Partial<CookiePreferences>) => void;
  openSettings: () => void;
  closeSettings: () => void;
  isSettingsOpen: boolean;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

const STORAGE_KEY = 'binder-cookie-consent';
const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true, // Always true, cannot be disabled
  analytics: false,
};

export const CookieProvider = ({ children }: { children: ReactNode }) => {
  const [hasConsent, setHasConsent] = useState<boolean>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored !== null;
  });

  const [preferences, setPreferences] = useState<CookiePreferences>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return {
          essential: true, // Always true
          analytics: parsed.analytics ?? false,
        };
      } catch {
        return DEFAULT_PREFERENCES;
      }
    }
    return DEFAULT_PREFERENCES;
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    if (hasConsent) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    }
  }, [hasConsent, preferences]);

  const acceptAll = () => {
    const newPreferences: CookiePreferences = {
      essential: true,
      analytics: true,
    };
    setPreferences(newPreferences);
    setHasConsent(true);
    setIsSettingsOpen(false);
  };

  const rejectAll = () => {
    const newPreferences: CookiePreferences = {
      essential: true,
      analytics: false,
    };
    setPreferences(newPreferences);
    setHasConsent(true);
    setIsSettingsOpen(false);
  };

  const updatePreferences = (newPreferences: Partial<CookiePreferences>) => {
    setPreferences((prev) => ({
      ...prev,
      ...newPreferences,
      essential: true, // Always true
    }));
    setHasConsent(true);
  };

  const openSettings = () => {
    setIsSettingsOpen(true);
  };

  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  return (
    <CookieContext.Provider
      value={{
        hasConsent,
        preferences,
        acceptAll,
        rejectAll,
        updatePreferences,
        openSettings,
        closeSettings,
        isSettingsOpen,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
};

export const useCookie = () => {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error('useCookie must be used within a CookieProvider');
  }
  return context;
};

