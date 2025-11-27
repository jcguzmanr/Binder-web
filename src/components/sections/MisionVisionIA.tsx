import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './MisionVisionIA.css';

export const MisionVisionIA = () => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px',
    triggerOnce: true,
  });

  return (
    <section 
      ref={elementRef as React.RefObject<HTMLElement>}
      className={`mision-vision-ia scroll-animate ${isVisible ? 'visible' : ''}`}
    >
      {/* Wave pattern background */}
      <div className="wave-pattern-bg" aria-hidden="true">
        <svg 
          width="100%" 
          height="100%" 
          preserveAspectRatio="none" 
          viewBox="0 0 1200 600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="wave-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="#AEE7F8" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wave-dots)" />
          {/* Wave paths */}
          <path 
            d="M0,200 Q300,150 600,200 T1200,200 L1200,600 L0,600 Z" 
            fill="#AEE7F8" 
            opacity="0.1"
          />
          <path 
            d="M0,300 Q400,250 800,300 T1200,300 L1200,600 L0,600 Z" 
            fill="#AEE7F8" 
            opacity="0.15"
          />
        </svg>
      </div>

      <div className="container">
        <div className="mision-vision-content">
          <div className="subsection">
            <h2 className="subsection-title">Nuestra misión</h2>
            <p className="subsection-text">
              Liberar al abogado de lo operativo para que se concentre en lo estratégico.
            </p>
            <p className="subsection-text">
              Cada flujo en Binder convierte el esfuerzo manual en eficiencia medible.
            </p>
          </div>

          <div className="subsection">
            <h2 className="subsection-title">Nuestra visión</h2>
            <p className="subsection-text">
              Redefinir cómo operan los equipos legales: más orden, más claridad, más impacto.
            </p>
            <p className="subsection-text">
              No digitalizamos el desorden. Lo resolvemos con Legal Ops e IA aplicada.
            </p>
          </div>

          <div className="subsection">
            <h2 className="subsection-title">IA que amplifica el criterio humano</h2>
            <p className="subsection-text">
              Creemos en una inteligencia artificial que complementa, no reemplaza.
            </p>
            <p className="subsection-text">
              Binder aprende de tus procesos y te ayuda a priorizar lo importante, siempre bajo tu control.
            </p>
          </div>

          <div className="subsection">
            <h2 className="subsection-title">Legal Ops como brújula</h2>
            <p className="subsection-text">
              Diseñamos bajo los principios de Legal Operations: eficiencia, trazabilidad y análisis.
            </p>
            <p className="subsection-text">
              La gestión legal deja de ser reactiva y se convierte en una operación medible y estratégica.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

