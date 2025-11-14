import { homeContent } from '../../content/home';
import { Button } from '../ui/Button';
import { useTypewriter } from '../../hooks/useTypewriter';
import './Home.css';

const subtitles = [
  "La única plataforma legal con IA que conecta contratos, expedientes y procesos con trazabilidad total.",
  "Ordena tus procesos judiciales y administrativos de forma automática con apoyo de IA.",
  "Tu operación legal, unificada en un solo espacio con IA que aprende de tus procesos."
];

export const Home = () => {
  const { displayedText } = useTypewriter({
    texts: subtitles,
    displayDuration: 8000, // 8 seconds
    typingSpeed: 30 // milliseconds between characters
  });

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

