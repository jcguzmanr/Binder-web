import { useState, useEffect, useRef } from 'react';
import { casesContent } from '../../content/cases';
import './CasesTabs.css';

export const CasesTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<Set<number>>(new Set());
  const tabNavigationRef = useRef<HTMLDivElement>(null);
  const { mainTitle, subtitle, tabs } = casesContent.tabs;

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
      'centralizacion-total': '/images/Cases/cases-centralizacion-total.webp',
      'redaccion-inteligente': '/images/Cases/cases-redaccion-inteligente.webp',
      'firma-electronica': '/images/Cases/cases-firma-electronica.webp',
      'dashboards-analitica': '/images/Cases/cases-dashboards-analitica.webp',
      'trazabilidad-auditoria': '/images/Cases/cases-trazabilidad-auditoria.webp',
    };
    return imageMap[tabId] || '';
  };

  const formatSubtitle = (text: string) => {
    // Format "expediente digital y mesa de partes online" in bold
    if (text.includes('expediente digital y mesa de partes online')) {
      return text.split('expediente digital y mesa de partes online').map((part, i, arr) => 
        i === arr.length - 1 ? (
          <span key={i}>{part}</span>
        ) : (
          <span key={i}>
            {part}
            <strong>expediente digital y mesa de partes online</strong>
          </span>
        )
      );
    }
    // Format "Poder Judicial, Indecopi y plataformas regulatorias." in bold
    if (text.includes('Poder Judicial, Indecopi y plataformas regulatorias.')) {
      return text.split('Poder Judicial, Indecopi y plataformas regulatorias.').map((part, i, arr) => 
        i === arr.length - 1 ? (
          <span key={i}>{part}</span>
        ) : (
          <span key={i}>
            {part}
            <strong>Poder Judicial, Indecopi y plataformas regulatorias.</strong>
          </span>
        )
      );
    }
    return text;
  };

  return (
    <section className="cases-tabs-section">
      <div className="cases-tabs-background"></div>
      
      <div className="container-wide">
        <h2 className="cases-tabs-main-title">{mainTitle}</h2>
        {subtitle && (
          <p className="cases-tabs-subtitle">
            {subtitle.split('expediente digital y mesa de partes online').map((part, i, arr) => 
              i === arr.length - 1 ? (
                <span key={i}>{part}</span>
              ) : (
                <span key={i}>
                  {part}
                  <strong>expediente digital y mesa de partes online</strong>
                </span>
              )
            )}
          </p>
        )}

        {/* Desktop: Tabs Navigation */}
        {!isMobile && (
          <div className="cases-tabs-navigation" ref={tabNavigationRef}>
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                className={`cases-tab-button ${index === activeTab ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                {tab.tabName}
              </button>
            ))}
          </div>
        )}

        {/* Desktop: Tab Content */}
        {!isMobile && (
          <div className="cases-tab-content-container">
            {tabs.map((tab, index) => (
              <div
                key={tab.id}
                className={`cases-tab-content ${index === activeTab ? 'active' : ''}`}
              >
                <div className="cases-tab-grid">
                  <div className="cases-tab-image">
                    <img 
                      src={getImagePath(tab.id)} 
                      alt={tab.imagePlaceholder}
                      className="cases-tab-image-content"
                    />
                  </div>

                  <div className="cases-tab-text">
                    <h3 className="cases-tab-title">{tab.title}</h3>
                    <p className="cases-tab-subtitle">{formatSubtitle(tab.subtitle)}</p>
                    {tab.description && (
                      <p className="cases-tab-description">{tab.description}</p>
                    )}
                    
                    {tab.bullets && tab.bullets.length > 0 && (
                      <ul className="cases-tab-bullets">
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
          <div className="cases-accordion-container">
            {tabs.map((tab, index) => {
              const isOpen = openAccordions.has(index);
              return (
                <div key={tab.id} className="cases-accordion-item">
                  <button
                    className={`cases-accordion-button ${isOpen ? 'active' : ''}`}
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                  >
                    <span className="cases-accordion-title">{tab.tabName}</span>
                    <span className="cases-accordion-icon">{isOpen ? '−' : '+'}</span>
                  </button>
                  <div className={`cases-accordion-content ${isOpen ? 'open' : ''}`}>
                    <div className="cases-accordion-grid">
                      <div className="cases-accordion-image">
                        <img 
                          src={getImagePath(tab.id)} 
                          alt={tab.imagePlaceholder}
                          className="cases-tab-image-content"
                        />
                      </div>

                      <div className="cases-accordion-text">
                        <h3 className="cases-tab-title">{tab.title}</h3>
                        <p className="cases-tab-subtitle">{formatSubtitle(tab.subtitle)}</p>
                        {tab.description && (
                          <p className="cases-tab-description">{tab.description}</p>
                        )}
                        
                        {tab.bullets && tab.bullets.length > 0 && (
                          <ul className="cases-tab-bullets">
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

