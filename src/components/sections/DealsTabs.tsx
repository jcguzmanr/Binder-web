import { useState, useEffect, useRef } from 'react';
import { dealsContent } from '../../content/deals';
import './DealsTabs.css';

export const DealsTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<Set<number>>(new Set());
  const tabNavigationRef = useRef<HTMLDivElement>(null);
  const { mainTitle, tabs } = dealsContent.tabs;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      'centralizacion-total': '/images/CLM/deals-centralizacion-total.webp',
      'redaccion-inteligente': '/images/CLM/deals-redaccion-inteligente.webp',
      'firma-electronica': '/images/CLM/deals-firma-electronica.webp',
      'dashboards-analitica': '/images/CLM/deals-dashboards-analitica.webp',
      'trazabilidad-auditoria': '/images/CLM/deals-trazabilidad-auditoria.webp',
    };
    return imageMap[tabId] || '';
  };

  return (
    <section className="deals-tabs-section">
      <div className="deals-tabs-background"></div>
      
      <div className="container-wide">
        <h2 className="deals-tabs-main-title">{mainTitle}</h2>
        {dealsContent.tabs.subtitle && (
          <p className="deals-tabs-subtitle">{dealsContent.tabs.subtitle}</p>
        )}

        {/* Desktop: Tabs Navigation */}
        {!isMobile && (
          <div className="deals-tabs-navigation" ref={tabNavigationRef}>
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                className={`deals-tab-button ${index === activeTab ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                {tab.tabName}
              </button>
            ))}
          </div>
        )}

        {/* Desktop: Tab Content */}
        {!isMobile && (
          <div className="deals-tab-content-container">
            {tabs.map((tab, index) => (
              <div
                key={tab.id}
                className={`deals-tab-content ${index === activeTab ? 'active' : ''}`}
              >
                <div className="deals-tab-grid">
                  <div className="deals-tab-image">
                    <img 
                      src={getImagePath(tab.id)} 
                      alt={tab.imagePlaceholder}
                      className="deals-tab-image-content"
                    />
                  </div>

                  <div className="deals-tab-text">
                    <h3 className="deals-tab-title">{tab.title}</h3>
                    <p className="deals-tab-subtitle">{tab.subtitle}</p>
                    <p className="deals-tab-description">{tab.description}</p>
                    
                    {tab.bullets && tab.bullets.length > 0 && (
                      <ul className="deals-tab-bullets">
                        {tab.bullets.map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mobile: Accordion */}
        {isMobile && (
          <div className="deals-accordion-container">
            {tabs.map((tab, index) => {
              const isOpen = openAccordions.has(index);
              return (
                <div key={tab.id} className="deals-accordion-item">
                  <button
                    className={`deals-accordion-button ${isOpen ? 'active' : ''}`}
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                  >
                    <span className="deals-accordion-title">{tab.tabName}</span>
                    <span className="deals-accordion-icon">{isOpen ? '−' : '+'}</span>
                  </button>
                  <div className={`deals-accordion-content ${isOpen ? 'open' : ''}`}>
                    <div className="deals-accordion-grid">
                      <div className="deals-accordion-image">
                        <img 
                          src={getImagePath(tab.id)} 
                          alt={tab.imagePlaceholder}
                          className="deals-tab-image-content"
                        />
                      </div>

                      <div className="deals-accordion-text">
                        <h3 className="deals-tab-title">{tab.title}</h3>
                        <p className="deals-tab-subtitle">{tab.subtitle}</p>
                        <p className="deals-tab-description">{tab.description}</p>
                        
                        {tab.bullets && tab.bullets.length > 0 && (
                          <ul className="deals-tab-bullets">
                            {tab.bullets.map((bullet, idx) => (
                              <li key={idx}>{bullet}</li>
                            ))}
                          </ul>
                        )}
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

