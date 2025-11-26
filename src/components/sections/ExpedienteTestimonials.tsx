import { useState } from 'react';
import { expedienteDigitalContent } from '../../content/expedienteDigital';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './ExpedienteTestimonials.css';

export const ExpedienteTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { mainTitle, testimonials } = expedienteDigitalContent.testimonials;
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px',
    triggerOnce: true,
  });

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section 
      ref={elementRef as React.RefObject<HTMLElement>}
      className={`expediente-testimonials-section scroll-animate ${isVisible ? 'visible' : ''}`}
    >
      <div className="container-wide">
        <h2 className="expediente-testimonials-title">{mainTitle}</h2>
        
        <div className="expediente-testimonials-container">
          <div className="expediente-testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="expediente-testimonial-card">
                <div className="expediente-testimonial-message">
                  <p>{testimonial.message}</p>
                </div>
                
                <div className="expediente-testimonial-author">
                  <div className="expediente-testimonial-author-tab"></div>
                  <h4 className="expediente-author-name">{testimonial.name}</h4>
                  {testimonial.role && (
                    <p className="expediente-author-role">{testimonial.role}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="expediente-testimonials-carousel">
            <div className="expediente-carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="expediente-carousel-item">
                  <div className="expediente-testimonial-card">
                    <div className="expediente-testimonial-message">
                      <p>{testimonial.message}</p>
                    </div>
                    
                    <div className="expediente-testimonial-author">
                      <div className="expediente-testimonial-author-tab"></div>
                      <h4 className="expediente-author-name">{testimonial.name}</h4>
                      {testimonial.role && (
                        <p className="expediente-author-role">{testimonial.role}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="expediente-carousel-controls">
              <button onClick={prevTestimonial} aria-label="Anterior">‹</button>
              <div className="expediente-carousel-dots">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    className={idx === currentIndex ? 'active' : ''}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Ir a testimonio ${idx + 1}`}
                  />
                ))}
              </div>
              <button onClick={nextTestimonial} aria-label="Siguiente">›</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

