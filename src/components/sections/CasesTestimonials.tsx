import { useState } from 'react';
import { casesContent } from '../../content/cases';
import './CasesTestimonials.css';

export const CasesTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { mainTitle, testimonials } = casesContent.testimonials;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="cases-testimonials-section">
      <div className="container-wide">
        <h2 className="cases-testimonials-title">{mainTitle}</h2>
        
        <div className="cases-testimonials-container">
          <div className="cases-testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="cases-testimonial-card">
                <div className="cases-testimonial-message">
                  <p>{testimonial.message}</p>
                </div>
                
                <div className="cases-testimonial-author">
                  <div className="cases-testimonial-author-tab"></div>
                  <h4 className="cases-author-name">{testimonial.name}</h4>
                  {testimonial.role && (
                    <p className="cases-author-role">{testimonial.role}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="cases-testimonials-carousel">
            <div className="cases-carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="cases-carousel-item">
                  <div className="cases-testimonial-card">
                    <div className="cases-testimonial-message">
                      <p>{testimonial.message}</p>
                    </div>
                    
                    <div className="cases-testimonial-author">
                      <div className="cases-testimonial-author-tab"></div>
                      <h4 className="cases-author-name">{testimonial.name}</h4>
                      {testimonial.role && (
                        <p className="cases-author-role">{testimonial.role}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cases-carousel-controls">
              <button onClick={prevTestimonial} aria-label="Anterior">‹</button>
              <div className="cases-carousel-dots">
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

