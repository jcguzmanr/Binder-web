import { useState } from 'react';
import { testimoniosContent } from '../../content/testimonios';
import './Testimonials.css';

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { mainTitle, testimonials } = testimoniosContent;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonios" className="testimonials-section">
      <div className="container-wide">
        <h2 className="testimonials-title">{mainTitle}</h2>
        
        <div className="testimonials-container">
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-message">
                  <p>{testimonial.message}</p>
                </div>
                
                <div className="testimonial-author">
                  <div className="testimonial-author-tab"></div>
                  <h4 className="author-name">{testimonial.name}</h4>
                  <p className="author-role">{testimonial.role}</p>
                  
                  <div className="company-logo">
                    <span>{testimonial.logoPlaceholder}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="testimonials-carousel">
            <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="carousel-item">
                  <div className="testimonial-card">
                    <div className="testimonial-message">
                      <p>{testimonial.message}</p>
                    </div>
                    
                    <div className="testimonial-author">
                      <div className="testimonial-author-tab"></div>
                      <h4 className="author-name">{testimonial.name}</h4>
                      <p className="author-role">{testimonial.role}</p>
                      
                      <div className="company-logo">
                        <span>{testimonial.logoPlaceholder}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="carousel-controls">
              <button onClick={prevTestimonial} aria-label="Anterior">‹</button>
              <div className="carousel-dots">
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
