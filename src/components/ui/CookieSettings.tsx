import { useState, useEffect } from 'react';
import { useCookie } from '../../context/CookieContext';
import './CookieSettings.css';

export const CookieSettings = () => {
  const {
    isSettingsOpen,
    closeSettings,
    preferences,
    updatePreferences,
  } = useCookie();

  const [localPreferences, setLocalPreferences] = useState(preferences);

  useEffect(() => {
    setLocalPreferences(preferences);
  }, [preferences]);

  useEffect(() => {
    if (isSettingsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSettingsOpen]);

  if (!isSettingsOpen) {
    return null;
  }

  const handleSave = () => {
    updatePreferences(localPreferences);
    closeSettings();
  };

  const handleToggle = (category: 'analytics') => {
    setLocalPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeSettings();
    }
  };

  return (
    <div
      className="cookie-settings-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-settings-title"
    >
      <div className="cookie-settings-modal">
        <div className="cookie-settings-header">
          <h2 id="cookie-settings-title" className="cookie-settings-title">
            Configuración de Cookies
          </h2>
          <button
            type="button"
            className="cookie-settings-close"
            onClick={closeSettings}
            aria-label="Cerrar configuración de cookies"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="cookie-settings-content">
          <p className="cookie-settings-intro">
            Utilizamos cookies para mejorar su experiencia en nuestro sitio web. Puede elegir qué tipos de cookies 
            desea aceptar. Las cookies esenciales son necesarias para el funcionamiento del sitio y no se pueden desactivar.
          </p>

          <div className="cookie-categories">
            {/* Essential Cookies - Always enabled */}
            <div className="cookie-category">
              <div className="cookie-category-header">
                <div className="cookie-category-info">
                  <h3 className="cookie-category-title">Cookies Esenciales</h3>
                  <p className="cookie-category-description">
                    Estas cookies son necesarias para el funcionamiento básico del sitio web. Incluyen preferencias 
                    de tema, configuración de fondo y datos de sesión del formulario. No se pueden desactivar.
                  </p>
                </div>
                <div className="cookie-category-toggle">
                  <input
                    type="checkbox"
                    id="essential"
                    checked={true}
                    disabled
                    aria-label="Cookies esenciales (siempre activas)"
                  />
                  <label htmlFor="essential" className="cookie-toggle-label cookie-toggle-label--checked cookie-toggle-label--disabled">
                    <span className="cookie-toggle-slider"></span>
                  </label>
                </div>
              </div>
              <div className="cookie-category-details">
                <p className="cookie-category-detail-text">
                  <strong>Cookies utilizadas:</strong>
                </p>
                <ul className="cookie-list">
                  <li><code>binder-theme</code> - Almacena la preferencia de tema (claro/oscuro)</li>
                  <li><code>binder-background</code> - Almacena la preferencia de fondo</li>
                  <li><code>formSubmission</code> - Datos temporales del formulario de contacto (sessionStorage)</li>
                </ul>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="cookie-category">
              <div className="cookie-category-header">
                <div className="cookie-category-info">
                  <h3 className="cookie-category-title">Cookies Analíticas</h3>
                  <p className="cookie-category-description">
                    Estas cookies nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web, 
                    proporcionando información sobre las páginas visitadas, el tiempo de permanencia y posibles errores.
                  </p>
                </div>
                <div className="cookie-category-toggle">
                  <input
                    type="checkbox"
                    id="analytics"
                    checked={localPreferences.analytics}
                    onChange={() => handleToggle('analytics')}
                    aria-label="Activar cookies analíticas"
                  />
                  <label 
                    htmlFor="analytics" 
                    className={`cookie-toggle-label ${localPreferences.analytics ? 'cookie-toggle-label--checked' : ''}`}
                  >
                    <span className="cookie-toggle-slider"></span>
                  </label>
                </div>
              </div>
              <div className="cookie-category-details">
                <p className="cookie-category-detail-text">
                  <strong>Cookies utilizadas:</strong>
                </p>
                <ul className="cookie-list">
                  <li><code>_ga</code> - Distingue a los usuarios (2 años)</li>
                  <li><code>_ga_*</code> - Mantiene el estado de la sesión (2 años)</li>
                  <li><code>_gid</code> - Distingue a los usuarios (24 horas)</li>
                </ul>
                <p className="cookie-category-detail-text">
                  <strong>Proveedor:</strong> Google Analytics (ID: G-YR3V5CRVQE)
                </p>
                <p className="cookie-category-detail-text">
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cookie-external-link"
                  >
                    Desactivar Google Analytics
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="cookie-settings-footer">
          <button
            type="button"
            className="cookie-settings-btn cookie-settings-btn--secondary"
            onClick={closeSettings}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="cookie-settings-btn cookie-settings-btn--secondary"
            onClick={() => {
              setLocalPreferences({ essential: true, analytics: false });
            }}
          >
            Rechazar todas
          </button>
          <button
            type="button"
            className="cookie-settings-btn cookie-settings-btn--primary"
            onClick={handleSave}
          >
            Guardar preferencias
          </button>
        </div>
      </div>
    </div>
  );
};

