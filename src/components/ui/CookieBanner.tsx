import { useCookie } from '../../context/CookieContext';
import './CookieBanner.css';

export const CookieBanner = () => {
  const { hasConsent, acceptAll, rejectAll, openSettings } = useCookie();

  if (hasConsent) {
    return null;
  }

  return (
    <div className="cookie-banner" role="dialog" aria-labelledby="cookie-banner-title" aria-describedby="cookie-banner-description">
      <div className="cookie-banner-content">
        <div className="cookie-banner-text">
          <h3 id="cookie-banner-title" className="cookie-banner-title">
            Uso de Cookies
          </h3>
          <p id="cookie-banner-description" className="cookie-banner-description">
            Utilizamos cookies para mejorar su experiencia, analizar el tráfico del sitio y personalizar el contenido. 
            Al hacer clic en "Aceptar todas", acepta nuestro uso de cookies.{' '}
            <a href="/legal/cookies" className="cookie-banner-link">
              Más información
            </a>
          </p>
        </div>
        <div className="cookie-banner-actions">
          <button
            type="button"
            className="cookie-banner-btn cookie-banner-btn--secondary"
            onClick={rejectAll}
            aria-label="Rechazar todas las cookies"
          >
            Rechazar
          </button>
          <button
            type="button"
            className="cookie-banner-btn cookie-banner-btn--secondary"
            onClick={openSettings}
            aria-label="Configurar preferencias de cookies"
          >
            Configurar
          </button>
          <button
            type="button"
            className="cookie-banner-btn cookie-banner-btn--primary"
            onClick={acceptAll}
            aria-label="Aceptar todas las cookies"
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  );
};

