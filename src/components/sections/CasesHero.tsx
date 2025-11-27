import { casesContent } from '../../content/cases';
import { Button } from '../ui/Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './CasesHero.css';

export const CasesHero = () => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px',
    triggerOnce: true,
  });

  return (
    <section 
      ref={elementRef as React.RefObject<HTMLElement>}
      className={`cases-hero-section scroll-animate ${isVisible ? 'visible' : ''}`}
    >
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
          src="/cases-hero.png" 
          alt="Cases hero" 
          className="cases-hero-image"
        />
      </div>
    </section>
  );
};

