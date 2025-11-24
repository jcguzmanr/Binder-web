import { casesContent } from '../../content/cases';
import { Button } from '../ui/Button';
import './CasesHero.css';

export const CasesHero = () => {
  return (
    <section className="cases-hero-section">
      <div className="cases-hero-left">
        <div className="cases-hero-content">
          <div className="cases-hero-icon-wrapper">
            <img 
              src="/CASES_Transp_BG.svg" 
              alt="Cases icon" 
              className="cases-hero-icon"
            />
            <span className="cases-hero-name">Cases</span>
          </div>
          <h1 className="cases-hero-title">{casesContent.hero.title}</h1>
          <p className="cases-hero-subtitle">{casesContent.hero.subtitle}</p>
          <div className="cases-hero-cta">
            <Button 
              variant="primary" 
              onClick={() => {
                document.getElementById('cases-contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {casesContent.hero.ctaText}
            </Button>
          </div>
        </div>
      </div>
      <div className="cases-hero-right">
        <img 
          src="/images/CasesRef/seccion1.png" 
          alt="Cases hero" 
          className="cases-hero-image"
          onError={(e) => {
            // Fallback si la imagen no existe
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>
    </section>
  );
};

