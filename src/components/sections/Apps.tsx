import { appsContent } from '../../content/apps';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './Apps.css';

// Map app IDs to their corresponding SVG icon files
const getAppIcon = (appId: string): string => {
  const iconMap: Record<string, string> = {
    cases: '/CASES_Transp_BG.svg',
    deals: '/DEALS_Transp_BG.svg',
    archive: '/ARCHIVE_Transp_BG.svg',
    comply: '/COMPLY_Transp_BG.svg',
    tally: '/TALLY_SkyBlu_Transp_BG.svg',
    quorum: '/QUORUM_Transp_BG.svg',
  };
  return iconMap[appId] || '';
};

export const Apps = () => {
  const { mainTitle, subtitle, apps } = appsContent;
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px',
    triggerOnce: true,
  });

  return (
    <section 
      id="apps" 
      ref={elementRef as React.RefObject<HTMLElement>}
      className={`apps-section scroll-animate ${isVisible ? 'visible' : ''}`}
    >
      <div className="container-wide">
        <div className="apps-header">
          <h2 className="apps-title">{mainTitle}</h2>
          <p className="apps-subtitle">{subtitle}</p>
        </div>

        <div className="apps-grid">
          {apps.map((app) => (
            <div 
              key={app.id} 
              className={`app-card ${app.status === 'development' ? 'development' : ''}`}
              style={{ '--app-color': app.color } as React.CSSProperties}
            >
              <div className="app-card-header">
                <div className={`app-icon app-icon-${app.id}`}>
                  <img 
                    src={getAppIcon(app.id)} 
                    alt={`${app.name} icon`}
                    className="app-icon-img"
                  />
                </div>
                <div className="app-name-group">
                  <h3 className="app-name">{app.name}</h3>
                  {app.status === 'development' && (
                    <span className="app-badge">En desarrollo</span>
                  )}
                </div>
              </div>

              <p className="app-subtitle">{app.subtitle}</p>
              
              <p className="app-description">{app.description}</p>

              <div className="app-image-preview">
                <div className="preview-placeholder">
                  <span>Vista previa</span>
                </div>
              </div>

              <a href={app.link} className="app-link">
                Ver más
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

