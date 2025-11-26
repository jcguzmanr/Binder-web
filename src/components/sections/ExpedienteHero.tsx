import { expedienteDigitalContent } from '../../content/expedienteDigital';
import { Button } from '../ui/Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './ExpedienteHero.css';

export const ExpedienteHero = () => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px',
    triggerOnce: true,
  });

  return (
    <section 
      ref={elementRef as React.RefObject<HTMLElement>}
      className={`expediente-hero-section scroll-animate ${isVisible ? 'visible' : ''}`}
    >
      <div className="expediente-hero-left">
        <div className="expediente-hero-content">
          <div className="expediente-hero-icon-wrapper">
            <div className="expediente-hero-icon-container">
              <img 
                src="/ARCHIVE_Transp_BG.svg" 
                alt="Expediente Digital icon" 
                className="expediente-hero-icon"
              />
            </div>
            <span className="expediente-hero-name">Archive</span>
          </div>
          <h1 className="expediente-hero-title">{expedienteDigitalContent.hero.title}</h1>
          <p className="expediente-hero-subtitle">{expedienteDigitalContent.hero.subtitle}</p>
          <div className="expediente-hero-cta">
            <Button 
              variant="primary" 
              onClick={() => {
                document.getElementById('expediente-contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {expedienteDigitalContent.hero.ctaText}
            </Button>
          </div>
        </div>
      </div>
      <div className="expediente-hero-right">
        <img 
          src="/archive-hero.png" 
          alt="Persona trabajando con expediente digital" 
          className="expediente-hero-image"
          onError={(e) => {
            // Fallback si la imagen no existe
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>
    </section>
  );
};

