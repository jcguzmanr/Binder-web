import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './BloqueDestacadoHumano.css';

export const BloqueDestacadoHumano = () => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px',
    triggerOnce: true,
  });

  return (
    <section 
      ref={elementRef as React.RefObject<HTMLElement>}
      className={`bloque-destacado-humano scroll-animate ${isVisible ? 'visible' : ''}`}
    >
      <div className="container">
        <div className="bloque-destacado-content">
          <div className="bloque-destacado-solapa"></div>

          <div className="bloque-text-content">
            <h2 className="bloque-title">
              Binder es una nueva forma de trabajar lo legal: más clara, más eficiente y más humana.
            </h2>
            <button 
              className="bloque-cta-button"
              onClick={() => {
                if (window.location.pathname === '/') {
                  // Si ya estamos en el home, hacer scroll suave
                  const element = document.querySelector('#contacto');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                } else {
                  // Si estamos en otra página, navegar al home con hash
                  window.location.href = '/#contacto';
                }
              }}
            >
              Solicita tu demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

