import { useState, useEffect, useRef } from 'react';
import { expedienteDigitalContent } from '../../content/expedienteDigital';
import './ExpedienteTabs.css';

export const ExpedienteTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<Set<number>>(new Set());
  const tabNavigationRef = useRef<HTMLDivElement>(null);
  const { mainTitle, tabs } = expedienteDigitalContent.tabs;

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

  return (
    <section className="expediente-tabs-section">
      <div className="expediente-tabs-background"></div>
      
      <div className="container-wide">
        <h2 className="expediente-tabs-main-title">{mainTitle}</h2>

        {/* Desktop: Tabs Navigation */}
        {!isMobile && (
          <div className="expediente-tabs-navigation" ref={tabNavigationRef}>
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                className={`expediente-tab-button ${index === activeTab ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                {tab.tabName}
              </button>
            ))}
          </div>
        )}

        {/* Desktop: Tab Content */}
        {!isMobile && (
          <div className="expediente-tab-content-container">
            {tabs.map((tab, index) => (
              <div
                key={tab.id}
                className={`expediente-tab-content ${index === activeTab ? 'active' : ''}`}
              >
                <div className="expediente-tab-grid">
                  <div className="expediente-tab-image">
                    <div className="expediente-image-placeholder">
                      <span>{tab.imagePlaceholder}</span>
                    </div>
                  </div>

                  <div className="expediente-tab-text">
                    <h3 className="expediente-tab-title">{tab.title}</h3>
                    <p className="expediente-tab-subtitle">{tab.subtitle}</p>
                    <p className="expediente-tab-description">{tab.description}</p>
                    
                    <ul className="expediente-tab-bullets">
                      {tab.bullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mobile: Accordion */}
        {isMobile && (
          <div className="expediente-accordion-container">
            {tabs.map((tab, index) => {
              const isOpen = openAccordions.has(index);
              return (
                <div key={tab.id} className="expediente-accordion-item">
                  <button
                    className={`expediente-accordion-button ${isOpen ? 'active' : ''}`}
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                  >
                    <span className="expediente-accordion-title">{tab.tabName}</span>
                    <span className="expediente-accordion-icon">{isOpen ? '−' : '+'}</span>
                  </button>
                  <div className={`expediente-accordion-content ${isOpen ? 'open' : ''}`}>
                    <div className="expediente-accordion-grid">
                      <div className="expediente-accordion-image">
                        <div className="expediente-image-placeholder">
                          <span>{tab.imagePlaceholder}</span>
                        </div>
                      </div>

                      <div className="expediente-accordion-text">
                        <h3 className="expediente-tab-title">{tab.title}</h3>
                        <p className="expediente-tab-subtitle">{tab.subtitle}</p>
                        <p className="expediente-tab-description">{tab.description}</p>
                        
                        <ul className="expediente-tab-bullets">
                          {tab.bullets.map((bullet, idx) => (
                            <li key={idx}>{bullet}</li>
                          ))}
                        </ul>
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

