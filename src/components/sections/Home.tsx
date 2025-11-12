import { homeContent } from '../../content/home';
import { Button } from '../ui/Button';
import './Home.css';

export const Home = () => {
  return (
    <section id="home" className="home-section">
      <div className="home-background">
        {/* Animated dots placeholder - to be implemented later */}
        <div className="dots-animation"></div>
      </div>
      
      <div className="container">
        <div className="home-content">
          <p className="home-top-text">{homeContent.topText}</p>
          
          <h1 className="home-title">{homeContent.title}</h1>
          
          <p className="home-subtitle">{homeContent.subtitle}</p>
          
          <div className="home-image-container">
            {/* Placeholder for main dashboard image */}
            <div className="home-image-placeholder">
              <span>{homeContent.imagePlaceholder}</span>
            </div>
          </div>
          
          <div className="home-cta">
            <Button variant="primary" onClick={() => {
              document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              {homeContent.ctaText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

