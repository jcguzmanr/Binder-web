import { homeContent } from '../../content/home';
import { Button } from '../ui/Button';
import { useTypewriter } from '../../hooks/useTypewriter';
import './Home.css';

const subtitles = [
  "La plataforma legal que conecta contratos, expedientes y procesos con trazabilidad total.",
  "Organiza tus procesos judiciales y administrativos de forma automática.",
  "Unifica tu operación legal con IA que aprende de tus procesos."
];

export const Home = () => {
  const { displayedText } = useTypewriter({
    texts: subtitles,
    displayDuration: 8000, // 8 seconds
    typingSpeed: 30 // milliseconds between characters
  });

  return (
    <section id="home" className="home-section">
      <div className="container">
        <div className="home-content">
          <a 
            href={homeContent.badgeLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="home-badge"
          >
            <span className="home-badge-text">{homeContent.badgeText}</span>
            <span className="home-badge-icon">
              <img 
                src="/proinnovate.png" 
                alt="PRO innovate" 
                className="home-badge-logo"
              />
            </span>
          </a>
          
          <p className="home-top-text">{homeContent.topText}</p>
          
          <h1 className="home-title">{homeContent.title}</h1>
          
          <p className="home-subtitle">{displayedText}</p>
          
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

