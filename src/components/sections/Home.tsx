import { useState, useEffect, useRef } from 'react';
import { homeContent } from '../../content/home';
import { Button } from '../ui/Button';
import { useTypewriter } from '../../hooks/useTypewriter';
import { PageHead } from '../seo/PageHead';
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

  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlayThrough = () => {
      // Small delay to ensure smooth transition
      setTimeout(() => {
        setShowVideo(true);
      }, 100);
    };

    video.addEventListener('canplaythrough', handleCanPlayThrough);
    
    // Start loading the video
    video.load();

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, []);

  return (
    <>
      <PageHead
        title="Binder - Plataforma Legal con IA | CLM y Legal Ops"
        description="Binder centraliza, automatiza y analiza la gestión legal con IA. CLM, gestión de procesos y expediente digital para áreas legales corporativas."
        canonicalUrl="/"
      />
      <section id="home" className="home-section">
      <div className="container">
        <div className="home-content">
          <p className="home-top-text">{homeContent.topText}</p>
          
          <h1 className="home-title">
            Gestiona, automatiza y analiza<br />
            todo tu mundo legal
          </h1>
          
          <p className="home-subtitle">{displayedText}</p>
          
          <div className="home-image-container">
            {/* Placeholder image - shown initially, fades out when video is ready */}
            <img 
              src="/images/home/hero-binder-home-img.png" 
              alt="Dashboard principal de Binder mostrando la plataforma legal con IA para gestión de contratos, procesos y expedientes digitales" 
              className={`home-image ${showVideo ? 'fade-out' : ''}`}
            />
            
            {/* Video - loads in background, shown when ready */}
            <video
              ref={videoRef}
              className={`home-video ${showVideo ? 'fade-in' : 'hidden'}`}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              <source src="/images/home/hero-binder-home-vid.mp4" type="video/mp4" />
            </video>
            
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
    </>
  );
};

