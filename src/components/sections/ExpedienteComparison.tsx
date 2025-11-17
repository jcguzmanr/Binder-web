import { expedienteDigitalContent } from '../../content/expedienteDigital';
import './ExpedienteComparison.css';

export const ExpedienteComparison = () => {
  const { title, rows } = expedienteDigitalContent.comparison;

  const renderValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <span className="comparison-check">✓</span>
      ) : (
        <span className="comparison-cross">✗</span>
      );
    }
    return <span>{value}</span>;
  };

  return (
    <section className="expediente-comparison-section">
      <div className="container-wide">
        <h2 className="expediente-comparison-title">{title}</h2>
        
        <div className="expediente-comparison-table-container">
          <table className="expediente-comparison-table">
            <thead>
              <tr>
                <th className="comparison-feature-header">Característica</th>
                <th className="comparison-tradicional-header">Sin Binder</th>
                <th className="comparison-digital-header">
                  <div className="comparison-digital-tab"></div>
                  Con Binder
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="comparison-row">
                  <td className="comparison-feature">{row.feature}</td>
                  <td className="comparison-tradicional">{renderValue(row.tradicional)}</td>
                  <td className="comparison-digital">{renderValue(row.expedienteDigital)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

