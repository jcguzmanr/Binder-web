import { expedienteDigitalContent } from '../../content/expedienteDigital';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './ExpedienteComparison.css';

export const ExpedienteComparison = () => {
  const { title, rows } = expedienteDigitalContent.comparison;
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px',
    triggerOnce: true,
  });

  const renderValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <span className="expediente-comparison-check">✓</span>
      ) : (
        <span className="expediente-comparison-cross">✗</span>
      );
    }
    return <span>{value}</span>;
  };

  return (
    <section 
      ref={elementRef as React.RefObject<HTMLElement>}
      className={`expediente-comparison-section scroll-animate ${isVisible ? 'visible' : ''}`}
    >
      <div className="container-wide">
        <h2 className="expediente-comparison-title">{title}</h2>
        
        <div className="expediente-comparison-table-container">
          <table className="expediente-comparison-table">
            <thead>
              <tr>
                <th className="expediente-comparison-tradicional-header">Sin Binder</th>
                <th className="expediente-comparison-digital-header">
                  <div className="expediente-comparison-digital-tab"></div>
                  Con Binder
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="expediente-comparison-row">
                  <td className="expediente-comparison-tradicional">{renderValue(row.tradicional)}</td>
                  <td className="expediente-comparison-digital">{renderValue(row.expedienteDigital)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

