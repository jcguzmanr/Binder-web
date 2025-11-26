import { useState, useEffect } from 'react';
import { whyBinderContent } from '../../content/porquebinder';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './WhyBinder.css';

interface IconPosition {
  top: number; // porcentaje dentro del contenedor
  left: number; // porcentaje dentro del contenedor
}

export const WhyBinder = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [iconPositions, setIconPositions] = useState<IconPosition[]>([]);
  const [popKey, setPopKey] = useState(0); // Key para forzar re-render y animación
  const { slides, autoAdvanceSeconds } = whyBinderContent;

  // Generar posiciones aleatorias dentro del contenedor azul, evitando el área central del texto
  const generateRandomPositions = (): IconPosition[] => {
    const iconCount = 5; // Máximo 5 emojis por slide
    const positions: IconPosition[] = [];
    
    // Área central a evitar (donde está el contenido del texto)
    // Horizontal: 25% a 75% (zona central del 50%)
    // Vertical: 30% a 70% (zona central del 40%)
    const centerLeftStart = 25;
    const centerLeftEnd = 75;
    const centerTopStart = 30;
    const centerTopEnd = 70;
    
    for (let i = 0; i < iconCount; i++) {
      let top: number;
      let left: number;
      let attempts = 0;
      const maxAttempts = 50;
      
      // Generar posiciones que eviten el área central
      do {
        // Distribuir más hacia los bordes: 5% a 95% para tener más espacio
        top = 5 + Math.random() * 90;
        left = 5 + Math.random() * 90;
        attempts++;
        
        // Si está en el área central, regenerar
        const isInCenter = 
          left >= centerLeftStart && left <= centerLeftEnd &&
          top >= centerTopStart && top <= centerTopEnd;
        
        if (!isInCenter || attempts >= maxAttempts) {
          break;
        }
      } while (attempts < maxAttempts);
      
      positions.push({ top, left });
    }
    
    return positions;
  };

  // Inicializar posiciones y emojis al montar
  useEffect(() => {
    setIconPositions(generateRandomPositions());
    setCurrentEmojis(getRandomEmojis());
  }, []);

  // Regenerar posiciones y emojis cuando cambia el slide (esto hace que los emojis hagan pop)
  useEffect(() => {
    setIconPositions(generateRandomPositions());
    setCurrentEmojis(getRandomEmojis());
    setPopKey(prev => prev + 1); // Incrementar key para forzar animación
  }, [currentSlide]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoAdvanceSeconds * 1000);

    return () => clearInterval(interval);
  }, [isPaused, slides.length, autoAdvanceSeconds]);


  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Emojis disponibles - se seleccionan 5 aleatorios por slide
  const allEmojis = ['📧', '📄', '⏱️', '💬', '📱', '📋', '📝', '📧', '📑', '📈', '📌', '📦', '📎', '🔖'];
  
  // Seleccionar 5 emojis aleatorios para el slide actual
  const getRandomEmojis = (): string[] => {
    const shuffled = [...allEmojis].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  };
  
  const [currentEmojis, setCurrentEmojis] = useState<string[]>([]);
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px',
    triggerOnce: true,
  });

  return (
    <section 
      id="porquebinder" 
      ref={elementRef as React.RefObject<HTMLElement>}
      className={`why-binder-section scroll-animate ${isVisible ? 'visible' : ''}`}
    >
      <div className="container">
        <div 
          className="why-binder-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="why-binder-solapa"></div>
          
          {/* Floating icons - positioned inside the blue container */}
          <div className="floating-icons">
            {iconPositions.map((pos, index) => (
              <div 
                key={`${popKey}-${index}`}
                className="icon-placeholder"
                style={{
                  top: `${pos.top}%`,
                  left: `${pos.left}%`,
                  animationDelay: `${index * 0.05}s`
                }}
              >
                {currentEmojis[index]}
              </div>
            ))}
          </div>

          <div className="carousel-content">
            <div className="slides-wrapper">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`slide ${index === currentSlide ? 'active' : ''}`}
                >
                  <p className="slide-question">{slide.question}</p>
                  <h2 className="slide-headline">{slide.headline}</h2>
                  <p className="slide-support">
                    {slide.support.split('Binder une todo lo legal en un solo espacio').map((part, i, arr) => 
                      i === arr.length - 1 ? (
                        <span key={i}>{part}</span>
                      ) : (
                        <span key={i}>
                          {part}
                          <strong style={{ color: '#96EFFF' }}>Binder une todo lo legal en un solo espacio</strong>
                        </span>
                      )
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation arrows - outside container */}
        <button 
          className="carousel-arrow carousel-arrow-prev"
          onClick={prevSlide}
          aria-label="Anterior"
        >
          ‹
        </button>
        <button 
          className="carousel-arrow carousel-arrow-next"
          onClick={nextSlide}
          aria-label="Siguiente"
        >
          ›
        </button>
        
        {/* Indicators */}
        <div className="carousel-indicators">
          <button 
            className="carousel-nav-button carousel-nav-prev"
            onClick={prevSlide}
            aria-label="Anterior"
          >
            ‹
          </button>
          <div className="indicators-wrapper">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Ir a slide ${index + 1}`}
              />
            ))}
          </div>
          <button 
            className="carousel-nav-button carousel-nav-next"
            onClick={nextSlide}
            aria-label="Siguiente"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

