import { homeContent } from '../../content/home';
import { Button } from '../ui/Button';
import './Home.css';

export const Home = () => {
  return (
    <section id="home" className="home-section">
      <div className="home-background">
        <img 
          src="/Dots BG 2 - Top.svg" 
          alt="" 
          className="dots-bg-top"
          aria-hidden="true"
        />
        <img 
          src="/Dots BG 1 - Bottom.svg" 
          alt="" 
          className="dots-bg-bottom"
          aria-hidden="true"
        />
      </div>
      
      <div className="container">
        <div className="home-content">
          <p className="home-top-text">{homeContent.topText}</p>
          
          <h1 className="home-title">{homeContent.title}</h1>
          
          <p className="home-subtitle">{homeContent.subtitle}</p>
          
          <div className="home-image-container">
            <img 
              src="/Plataforma.png" 
              alt="Captura de interfaz del panel de Binder" 
              className="home-image"
            />
            <div className="home-cta-floating">
              <Button variant="primary" onClick={() => {
                document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                {homeContent.ctaText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

