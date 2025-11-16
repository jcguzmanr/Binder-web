import { dealsContent } from '../../content/deals';
import { Button } from '../ui/Button';
import './DealsHero.css';

export const DealsHero = () => {
  return (
    <section className="deals-hero-section">
      <div className="deals-hero-container">
        <div className="deals-hero-content">
          <h1 className="deals-hero-title">{dealsContent.hero.title}</h1>
          <p className="deals-hero-subtitle">{dealsContent.hero.subtitle}</p>
          
          <div className="deals-hero-image-container">
            <img 
              src="/images/deals-hero-person.png" 
              alt="Persona trabajando con Deals CLM" 
              className="deals-hero-image"
              onError={(e) => {
                // Fallback si la imagen no existe
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div className="deals-hero-cta-floating">
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
      </div>
    </section>
  );
};

