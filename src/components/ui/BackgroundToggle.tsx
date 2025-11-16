import { useState, useRef, useEffect } from 'react';
import { useBackground, BackgroundType } from '../../context/BackgroundContext';
import './BackgroundToggle.css';

interface BackgroundOption {
  id: BackgroundType;
  name: string;
}

const backgroundOptions: BackgroundOption[] = [
  { id: 'none', name: 'Sin fondo' },
  { id: 'gentle-waves', name: 'Gentle Waves' },
  { id: 'canyon-flows', name: 'Canyon Flows' },
  { id: 'flow-pattern', name: 'Flow Pattern' },
];

export const BackgroundToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { background, setBackground } = useBackground();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleBackgroundSelect = (backgroundId: BackgroundType) => {
    setBackground(backgroundId);
    setIsOpen(false);
  };

  return (
    <div className="background-toggle-wrapper" ref={dropdownRef}>
      <button
        className="background-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Cambiar fondo de pantalla"
        aria-expanded={isOpen}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 3v18" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="background-dropdown">
          {backgroundOptions.map((option) => (
            <button
              key={option.id}
              className={`background-option ${background === option.id ? 'active' : ''}`}
              onClick={() => handleBackgroundSelect(option.id)}
            >
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

