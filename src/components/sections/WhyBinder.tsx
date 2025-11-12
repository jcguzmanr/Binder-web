import { useState, useEffect } from 'react';
import { whyBinderContent } from '../../content/porquebinder';
import './WhyBinder.css';

export const WhyBinder = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { slides, autoAdvanceSeconds } = whyBinderContent;

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

  return (
    <section id="porquebinder" className="why-binder-section">
      <div className="container">
        <div 
          className="why-binder-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Floating icons - placeholders */}
          <div className="floating-icons">
            <div className="icon-placeholder icon-1">📧</div>
            <div className="icon-placeholder icon-2">📄</div>
            <div className="icon-placeholder icon-3">📊</div>
            <div className="icon-placeholder icon-4">💬</div>
            <div className="icon-placeholder icon-5">📱</div>
            <div className="icon-placeholder icon-6">📋</div>
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
      </div>
    </section>
  );
};

