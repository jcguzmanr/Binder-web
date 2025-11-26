import { useState } from 'react';
import { dealsContent } from '../../content/deals';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './DealsTestimonials.css';

export const DealsTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { mainTitle, testimonials } = dealsContent.testimonials;
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
      className={`deals-testimonials-section scroll-animate ${isVisible ? 'visible' : ''}`}
    >
      <div className="container-wide">
        <h2 className="deals-testimonials-title">{mainTitle}</h2>
        
        <div className="deals-testimonials-container">
          <div className="deals-testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="deals-testimonial-card">
                <div className="deals-testimonial-message">
                  <p>{testimonial.message}</p>
                </div>
                
                <div className="deals-testimonial-author">
                  <div className="deals-testimonial-author-tab"></div>
                  <h4 className="deals-author-name">{testimonial.name}</h4>
                  {testimonial.role && (
                    <p className="deals-author-role">{testimonial.role}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="deals-testimonials-carousel">
            <div className="deals-carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="deals-carousel-item">
                  <div className="deals-testimonial-card">
                    <div className="deals-testimonial-message">
                      <p>{testimonial.message}</p>
                    </div>
                    
                    <div className="deals-testimonial-author">
                      <div className="deals-testimonial-author-tab"></div>
                      <h4 className="deals-author-name">{testimonial.name}</h4>
                      {testimonial.role && (
                        <p className="deals-author-role">{testimonial.role}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="deals-carousel-controls">
              <button onClick={prevTestimonial} aria-label="Anterior">‹</button>
              <div className="deals-carousel-dots">
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

