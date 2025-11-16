import { expedienteDigitalContent } from '../../content/expedienteDigital';
import { Button } from '../ui/Button';
import './ExpedienteHero.css';

export const ExpedienteHero = () => {
  return (
    <section className="expediente-hero-section">
      <div className="expediente-hero-container">
        <div className="expediente-hero-content">
          <h1 className="expediente-hero-title">{expedienteDigitalContent.hero.title}</h1>
          <p className="expediente-hero-subtitle">{expedienteDigitalContent.hero.subtitle}</p>
          
          <div className="expediente-hero-image-container">
            <img 
              src="/images/expediente-hero-person.png" 
              alt="Persona trabajando con expediente digital" 
              className="expediente-hero-image"
              onError={(e) => {
                // Fallback si la imagen no existe
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div className="expediente-hero-cta-floating">
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
      </div>
    </section>
  );
};

