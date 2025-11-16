import { dealsContent } from '../../content/deals';
import './DealsComparison.css';

export const DealsComparison = () => {
  const { title, rows } = dealsContent.comparison;

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
    <section className="deals-comparison-section">
      <div className="container-wide">
        <h2 className="deals-comparison-title">{title}</h2>
        
        <div className="deals-comparison-table-container">
          <table className="deals-comparison-table">
            <thead>
              <tr>
                <th className="deals-comparison-feature-header">Característica</th>
                <th className="deals-comparison-tradicional-header">Gestión Tradicional</th>
                <th className="deals-comparison-deals-header">Deals con IA</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="deals-comparison-row">
                  <td className="deals-comparison-feature">{row.feature}</td>
                  <td className="deals-comparison-tradicional">{renderValue(row.tradicional)}</td>
                  <td className="deals-comparison-deals">{renderValue(row.deals)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

