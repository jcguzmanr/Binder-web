import { dealsContent } from '../../content/deals';
import { Button } from '../ui/Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './DealsHero.css';

export const DealsHero = () => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px',
    triggerOnce: true,
  });

  return (
    <section 
      ref={elementRef as React.RefObject<HTMLElement>}
      className={`deals-hero-section scroll-animate ${isVisible ? 'visible' : ''}`}
    >
      <div className="deals-hero-left">
        <div className="deals-hero-content">
          <div className="deals-hero-icon-wrapper">
            <img 
              src="/DEALS_Transp_BG.svg" 
              alt="Deals icon" 
              className="deals-hero-icon"
            />
            <span className="deals-hero-name">Deals</span>
          </div>
          <h1 className="deals-hero-title">{dealsContent.hero.title}</h1>
          <p className="deals-hero-subtitle">{dealsContent.hero.subtitle}</p>
          <div className="deals-hero-cta">
            <Button 
              variant="primary" 
              onClick={() => {
                document.getElementById('deals-contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {dealsContent.hero.ctaText}
            </Button>
          </div>
        </div>
      </div>
      <div className="deals-hero-right">
        <img 
          src="/deals-hero.png" 
          alt="Persona trabajando con Deals CLM" 
          className="deals-hero-image"
          onError={(e) => {
            // Fallback si la imagen no existe
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>
    </section>
  );
};

