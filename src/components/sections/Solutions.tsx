import { useState } from 'react';
import { solucionesContent } from '../../content/soluciones';
import './Solutions.css';

export const Solutions = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { mainTitle, tabs } = solucionesContent;

  return (
    <section id="soluciones" className="solutions-section">
      <div className="solutions-background"></div>
      
      <div className="container-wide">
        <h2 className="solutions-main-title">{mainTitle}</h2>

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
      </div>
    </section>
  );
};

