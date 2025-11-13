import { useState, useEffect } from 'react';
import { solucionesContent } from '../../content/soluciones';
import './Solutions.css';

export const Solutions = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<Set<number>>(new Set());
  const { mainTitle, tabs } = solucionesContent;

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
    <section id="soluciones" className="solutions-section">
      <div className="solutions-background"></div>
      
      <div className="container-wide">
        <h2 className="solutions-main-title">{mainTitle}</h2>

        {/* Desktop: Tabs Navigation */}
        {!isMobile && (
          <div className="tabs-navigation">
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
                    <div className="image-placeholder">
                      <span>{tab.imagePlaceholder}</span>
                    </div>
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

                    {/* Binder character placeholder */}
                    <div className="binder-character">
                      <span>🤖</span>
                    </div>
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
                        <div className="image-placeholder">
                          <span>{tab.imagePlaceholder}</span>
                        </div>
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
                          <span>🤖</span>
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

