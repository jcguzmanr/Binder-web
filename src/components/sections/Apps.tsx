import { appsContent } from '../../content/apps';
import './Apps.css';

export const Apps = () => {
  const { mainTitle, subtitle, apps } = appsContent;

  return (
    <section id="apps" className="apps-section">
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
                <div className="app-icon">
                  <span>{app.imagePlaceholder}</span>
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

