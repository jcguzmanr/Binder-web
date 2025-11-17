import { archiveContent } from '../../content/archive';
import { Button } from '../ui/Button';
import './ArchiveHero.css';

export const ArchiveHero = () => {
  return (
    <section className="archive-hero-section">
      <div className="archive-hero-left">
        <div className="archive-hero-content">
          <div className="archive-hero-icon-wrapper">
            <img 
              src="/ARCHIVE_Transp_BG.svg" 
              alt="Archive icon" 
              className="archive-hero-icon"
            />
            <span className="archive-hero-name">Archive</span>
          </div>
          <h1 className="archive-hero-title">{archiveContent.hero.title}</h1>
          <p className="archive-hero-subtitle">{archiveContent.hero.subtitle}</p>
          <div className="archive-hero-cta">
            <Button 
              variant="primary" 
              onClick={() => {
                document.getElementById('archive-contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {archiveContent.hero.ctaText}
            </Button>
          </div>
        </div>
      </div>
      <div className="archive-hero-right">
        <img 
          src="/archive-hero.png" 
          alt="Persona trabajando con Archive" 
          className="archive-hero-image"
          onError={(e) => {
            // Fallback si la imagen no existe
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>
    </section>
  );
};

