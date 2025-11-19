import { useState, useEffect, useRef } from 'react';
import { expedienteDigitalContent } from '../../content/expedienteDigital';
import './ExpedienteStats.css';

interface SlideText {
  content: string;
  boldParts?: string[];
}

const slides: SlideText[] = [
  {
    content: '60% del tiempo del equipo legal se pierde en coordinación y seguimiento',
    boldParts: ['60%']
  },
  {
    content: 'Solicitudes llegan por canales distintos: correos, chats y hojas de cálculo'
  },
  {
    content: 'Los flujos manuales aumentan riesgos y retrasos en decisiones clave',
    boldParts: ['riesgos y retrasos']
  }
];

export const ExpedienteStats = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const autoAdvanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const displayDuration = 8000; // 8 seconds per slide

  // Auto-advance slideshow
  useEffect(() => {
    // Clear any existing timeout
    if (autoAdvanceRef.current) {
      clearTimeout(autoAdvanceRef.current);
    }

    // Set timeout to advance to next slide
    autoAdvanceRef.current = setTimeout(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, displayDuration);

    return () => {
      if (autoAdvanceRef.current) {
        clearTimeout(autoAdvanceRef.current);
        autoAdvanceRef.current = null;
      }
    };
  }, [currentSlideIndex]);

  const nextSlide = () => {
    // Clear auto-advance timer
    if (autoAdvanceRef.current) {
      clearTimeout(autoAdvanceRef.current);
      autoAdvanceRef.current = null;
    }
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    // Clear auto-advance timer
    if (autoAdvanceRef.current) {
      clearTimeout(autoAdvanceRef.current);
      autoAdvanceRef.current = null;
    }
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Render text with bold parts
  const renderText = (text: string, boldParts?: string[]) => {
    if (!boldParts || boldParts.length === 0) {
      return <>{text}</>;
    }

    let parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    const sortedBoldParts = [...boldParts].sort((a, b) => {
      const indexA = text.toLowerCase().indexOf(a.toLowerCase());
      const indexB = text.toLowerCase().indexOf(b.toLowerCase());
      return indexA - indexB;
    });

    sortedBoldParts.forEach((boldPart, idx) => {
      const index = text.toLowerCase().indexOf(boldPart.toLowerCase(), lastIndex);
      if (index !== -1) {
        // Add text before bold part
        if (index > lastIndex) {
          parts.push(text.slice(lastIndex, index));
        }
        // Add bold part
        parts.push(<strong key={`bold-${idx}`}>{text.slice(index, index + boldPart.length)}</strong>);
        lastIndex = index + boldPart.length;
      }
    });

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return <>{parts}</>;
  };

  return (
    <section className="expediente-stats-section">
      <div className="container-wide">
        <div className="expediente-stats-content">
          <h2 className="expediente-stats-question">{expedienteDigitalContent.stats.question}</h2>
          <div className="expediente-stats-slideshow">
            <button 
              className="expediente-stats-arrow expediente-stats-arrow-prev"
              onClick={prevSlide}
              aria-label="Anterior"
            >
              ‹
            </button>
            <div className="expediente-stats-text-container">
              <div className="expediente-stats-text">
                {renderText(slides[currentSlideIndex].content, slides[currentSlideIndex].boldParts)}
              </div>
            </div>
            <button 
              className="expediente-stats-arrow expediente-stats-arrow-next"
              onClick={nextSlide}
              aria-label="Siguiente"
            >
              ›
            </button>
          </div>
          <p className="expediente-stats-description">{expedienteDigitalContent.stats.description}</p>
        </div>
      </div>
    </section>
  );
};

