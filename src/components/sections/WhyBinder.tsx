import { useState, useEffect, useRef, useMemo } from 'react';
import { whyBinderContent } from '../../content/porquebinder';
import './WhyBinder.css';

interface IconPosition {
  startTop: number; // porcentaje inicial
  endTop: number; // porcentaje final
  startLeft: number; // píxeles desde el centro inicial
  endLeft: number; // píxeles desde el centro final
  tabletOffset: number; // offset para tablet (150-200px)
  side: 'left' | 'right';
}

export const WhyBinder = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { slides, autoAdvanceSeconds } = whyBinderContent;

  // Generar posiciones balanceadas con variación aleatoria controlada
  const iconPositions = useMemo<IconPosition[]>(() => {
    const icons: IconPosition[] = [];
    const iconCount = 14;
    
    // Distribución balanceada: 7 izquierda, 7 derecha
    const leftIndices = [0, 2, 5, 6, 8, 10, 12]; // Índices que van a la izquierda
    const rightIndices = [1, 3, 4, 7, 9, 11, 13]; // Índices que van a la derecha
    
    // Posiciones verticales base distribuidas uniformemente
    const verticalPositions = [
      -15, 5, 10, 22, 30, 33, 40, -14, 48, 58, 65, 82, 88, -12
    ];
    
    // Variación aleatoria pequeña para cada posición (±5%)
    const verticalVariation = verticalPositions.map(() => (Math.random() - 0.5) * 10);
    
    // Distancias horizontales base con variación controlada
    const horizontalStartBase = [1300, 1220, 1200, 1120, 1270, 1100, 1250, 1260, 1150, 1140, 1280, 1090, 1080, 1290];
    const horizontalEndBase = [150, 165, 170, 195, 160, 200, 160, 170, 190, 185, 155, 210, 220, 150];
    
    for (let i = 0; i < iconCount; i++) {
      const isLeft = leftIndices.includes(i);
      const side = isLeft ? 'left' : 'right';
      
      // Posición vertical con variación controlada
      const baseTop = verticalPositions[i];
      const variation = verticalVariation[i];
      const startTop = baseTop + variation;
      const endTop = baseTop + variation + (Math.random() - 0.5) * 8; // Pequeña variación en el final
      
      // Posición horizontal con variación controlada (±50px)
      const baseStartLeft = horizontalStartBase[i];
      const baseEndLeft = horizontalEndBase[i];
      const startLeft = baseStartLeft + (Math.random() - 0.5) * 100;
      const endLeft = baseEndLeft + (Math.random() - 0.5) * 40;
      const tabletOffset = 150 + (Math.random() - 0.5) * 50;
      
      icons.push({
        startTop,
        endTop,
        startLeft,
        endLeft,
        tabletOffset,
        side
      });
    }
    
    return icons;
  }, []); // Solo se genera una vez al montar el componente

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoAdvanceSeconds * 1000);

    return () => clearInterval(interval);
  }, [isPaused, slides.length, autoAdvanceSeconds]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      
      // Calculate when section is entering/centered in viewport
      const sectionTop = rect.top;
      const sectionCenter = sectionTop + sectionHeight / 2;
      const viewportCenter = windowHeight / 2;
      
      // Calculate progress based on how close the section center is to viewport center
      // Progress: 0 = section far from viewport, 1 = section centered in viewport
      const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);
      // Start animation when section is within 1.5 viewport heights
      const triggerDistance = windowHeight * 1.5;
      const progress = Math.max(0, Math.min(1, 1 - (distanceFromCenter / triggerDistance)));
      
      setScrollProgress(progress);
      
      // Update CSS custom property for all icons
      sectionRef.current.style.setProperty('--scroll-progress', progress.toString());
    };

    // Use requestAnimationFrame for smoother performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Emojis para cada icono
  const emojis = ['📧', '📄', '📊', '💬', '📱', '📋', '📝', '📧', '📑', '📈', '📌', '📦', '📎', '🔖'];

  // Detectar tamaño de pantalla para posicionamiento responsive
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1920); // Default desktop width

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width < 1248);
      setViewportWidth(width);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <section id="porquebinder" ref={sectionRef} className="why-binder-section">
      {/* Floating icons - positioned outside the grid system */}
      <div className="floating-icons">
        {iconPositions.map((pos, index) => {
          let style: React.CSSProperties = {};
          
          if (isMobile) {
            // En móvil: posiciones fijas simples
            style = {
              top: `${pos.endTop}%`,
              [pos.side === 'left' ? 'left' : 'right']: '10px',
              animationDelay: `${index * 0.3}s`
            };
          } else if (isTablet) {
            // En tablet: usar viewport width relativo
            const currentOffset = pos.tabletOffset + (1 - scrollProgress) * 50;
            style = {
              top: `${pos.startTop + (pos.endTop - pos.startTop) * scrollProgress}%`,
              [pos.side === 'left' ? 'left' : 'right']: `calc(50% - 50vw + 20px + ${currentOffset}px)`,
              animationDelay: `${index * 0.3}s`
            };
          } else {
            // Desktop: usar posiciones aleatorias completas
            const currentTop = pos.startTop + (pos.endTop - pos.startTop) * scrollProgress;
            // Limitar la distancia horizontal para evitar scroll (máximo 40% del viewport)
            const maxDistance = viewportWidth * 0.4;
            const clampedStartLeft = Math.min(pos.startLeft, maxDistance);
            const clampedEndLeft = Math.min(pos.endLeft, maxDistance * 0.15);
            const currentLeft = clampedStartLeft - (clampedStartLeft - clampedEndLeft) * scrollProgress;
            
            style = {
              top: `${currentTop}%`,
              [pos.side === 'left' ? 'left' : 'right']: `calc(50% - ${currentLeft}px)`,
              animationDelay: `${index * 0.3}s`
            };
          }
          
          return (
            <div 
              key={index}
              className="icon-placeholder"
              style={style}
            >
              {emojis[index]}
            </div>
          );
        })}
      </div>

      <div className="container">
        <div 
          className="why-binder-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="why-binder-solapa"></div>
          <div className="carousel-content">
            <div className="slides-wrapper">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`slide ${index === currentSlide ? 'active' : ''}`}
                >
                  <p className="slide-question">{slide.question}</p>
                  <h2 className="slide-headline">{slide.headline}</h2>
                  <p className="slide-support">{slide.support}</p>
                </div>
              ))}
            </div>

            {/* Navigation arrows */}
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
          </div>
        </div>
        
        {/* Indicators */}
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

