import { useState, useEffect, useRef } from 'react';
import { solucionesContent } from '../../content/soluciones';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './Solutions.css';

export const Solutions = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<Set<number>>(new Set());
  const [mascotPosition, setMascotPosition] = useState('0');
  const tabNavigationRef = useRef<HTMLDivElement>(null);
  const { mainTitle, tabs } = solucionesContent;
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px',
    triggerOnce: true,
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get mascot position based on tab ID
  const getMascotPosition = (tabId: string): string => {
    switch (tabId) {
      case 'centralizacion':
        return '0'; // Bottom right (current)
      case 'automatizacion':
        return '1'; // Upper corner
      case 'gestion':
        return 'image-bottom-left'; // Bottom left of image
      case 'analitica':
        return '0'; // Bottom right (keep current)
      case 'firma':
        return '0'; // Bottom right (keep current)
      default:
        return '0';
    }
  };

  // Initialize mascot position on mount
  useEffect(() => {
    const initialTabId = tabs[activeTab].id;
    const initialPosition = getMascotPosition(initialTabId);
    setMascotPosition(initialPosition);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle keyboard navigation and mascot position
  useEffect(() => {
    if (!tabNavigationRef.current || isMobile) return;

    const tabButtons = Array.from(tabNavigationRef.current.querySelectorAll('.tab-button'));
    const handlers: Array<() => void> = [];
    
    // Add focus event listeners to each tab button
    tabButtons.forEach((button, index) => {
      const handleFocus = () => {
        if (index !== activeTab) {
          setActiveTab(index);
          const tabId = tabs[index].id;
          const position = getMascotPosition(tabId);
          setMascotPosition(position);
        }
      };
      
      button.addEventListener('focus', handleFocus);
      handlers.push(() => button.removeEventListener('focus', handleFocus));
    });

    return () => {
      handlers.forEach(cleanup => cleanup());
    };
  }, [activeTab, isMobile, tabs]);

  // Update mascot position when activeTab changes via click
  useEffect(() => {
    const tabId = tabs[activeTab].id;
    const position = getMascotPosition(tabId);
    setMascotPosition(position);
  }, [activeTab, tabs]);

  const toggleAccordion = (index: number) => {
    setOpenAccordions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Map tab ID to image filename
  const getImagePath = (tabId: string): string => {
    const imageMap: Record<string, string> = {
      'centralizacion': '/images/Solutions/HP-centralizacion.webp',
      'automatizacion': '/images/Solutions/HP-automatizacion.webp',
      'gestion': '/images/Solutions/HP-gestion.webp',
      'analitica': '/images/Solutions/HP-analitica.webp',
      'firma': '/images/Solutions/HP-firma.webp',
    };
    return imageMap[tabId] || '';
  };

  return (
    <section 
      id="soluciones" 
      ref={elementRef as React.RefObject<HTMLElement>}
      className={`solutions-section scroll-animate ${isVisible ? 'visible' : ''}`}
    >
      <div className="solutions-background"></div>
      
      <div className="container-wide">
        <h2 className="solutions-main-title">{mainTitle}</h2>

        {/* Desktop: Tabs Navigation */}
        {!isMobile && (
          <div className="tabs-navigation" ref={tabNavigationRef}>
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                className={`tab-button ${index === activeTab ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                {tab.tabName}
              </button>
            ))}
          </div>
        )}

        {/* Desktop: Tab Content */}
        {!isMobile && (
          <div className="tab-content-container">
            {tabs.map((tab, index) => (
              <div
                key={tab.id}
                className={`tab-content ${index === activeTab ? 'active' : ''}`}
              >
                <div className="tab-grid">
                  <div className="tab-image">
                    <img 
                      src={getImagePath(tab.id)} 
                      alt={tab.imagePlaceholder}
                      className="tab-image-content"
                    />
                    {/* Demo image with animation for Centralización */}
                    {tab.id === 'centralizacion' && (
                      <img 
                        src="/images/Solutions/HP-demoimage.png" 
                        alt="Demo de la aplicación"
                        className="tab-image-content tab-demo-image"
                      />
                    )}
                    {/* Mascot for image position (Gestión) */}
                    {tab.id === 'gestion' && (
                      <div className={`binder-character-image position-${mascotPosition}`}>
                        <img src="/Clerk.png" alt="Clerk" className="clerk-image" />
                      </div>
                    )}
                  </div>

                  <div className="tab-text">
                    <h3 className="tab-title">{tab.title}</h3>
                    <p className="tab-subtitle">{tab.subtitle}</p>
                    <p className="tab-description">{tab.description}</p>
                    
                    <ul className="tab-bullets">
                      {tab.bullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>

                    {/* Binder character placeholder - hidden for Gestión */}
                    {tab.id !== 'gestion' && (
                      <div className={`binder-character position-${mascotPosition}`}>
                        <img src="/Clerk.png" alt="Clerk" className="clerk-image" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mobile: Accordion */}
        {isMobile && (
          <div className="accordion-container">
            {tabs.map((tab, index) => {
              const isOpen = openAccordions.has(index);
              return (
                <div key={tab.id} className="accordion-item">
                  <button
                    className={`accordion-button ${isOpen ? 'active' : ''}`}
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                  >
                    <span className="accordion-title">{tab.tabName}</span>
                    <span className="accordion-icon">{isOpen ? '−' : '+'}</span>
                  </button>
                  <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
                    <div className="accordion-grid">
                      <div className="accordion-image">
                        <img 
                          src={getImagePath(tab.id)} 
                          alt={tab.imagePlaceholder}
                          className="tab-image-content"
                        />
                        {/* Demo image with animation for Centralización (mobile) */}
                        {tab.id === 'centralizacion' && (
                          <img 
                            src="/images/Solutions/HP-demoimage.png" 
                            alt="Demo de la aplicación"
                            className="tab-image-content tab-demo-image"
                          />
                        )}
                      </div>

                      <div className="accordion-text">
                        <h3 className="tab-title">{tab.title}</h3>
                        <p className="tab-subtitle">{tab.subtitle}</p>
                        <p className="tab-description">{tab.description}</p>
                        
                        <ul className="tab-bullets">
                          {tab.bullets.map((bullet, idx) => (
                            <li key={idx}>{bullet}</li>
                          ))}
                        </ul>

                        {/* Binder character placeholder */}
                        <div className="binder-character">
                          <img src="/Clerk.png" alt="Clerk" className="clerk-image" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

