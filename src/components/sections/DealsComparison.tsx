import { dealsContent } from '../../content/deals';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './DealsComparison.css';

export const DealsComparison = () => {
  const { title, rows } = dealsContent.comparison;
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px',
    triggerOnce: true,
  });

  const renderValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <span className="deals-comparison-check">✓</span>
      ) : (
        <span className="deals-comparison-cross">✗</span>
      );
    }
    return <span>{value}</span>;
  };

  return (
    <section 
      ref={elementRef as React.RefObject<HTMLElement>}
      className={`deals-comparison-section scroll-animate ${isVisible ? 'visible' : ''}`}
    >
      <div className="container-wide">
        <h2 className="deals-comparison-title">{title}</h2>
        
        <div className="deals-comparison-table-container">
          <table className="deals-comparison-table">
            <thead>
              <tr>
                <th className="deals-comparison-tradicional-header">Sin Binder</th>
                <th className="deals-comparison-deals-header">
                  <div className="deals-comparison-deals-tab"></div>
                  Con Binder
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="deals-comparison-row">
                  <td className="deals-comparison-tradicional">
                    {renderValue(row.tradicional)}
                  </td>
                  <td className="deals-comparison-deals">
                    {renderValue(row.deals)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

