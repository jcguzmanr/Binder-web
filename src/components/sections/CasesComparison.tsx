import { casesContent } from '../../content/cases';
import './CasesComparison.css';

export const CasesComparison = () => {
  const { title, rows } = casesContent.comparison;

  const renderValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <span className="cases-comparison-check">✓</span>
      ) : (
        <span className="cases-comparison-cross">✗</span>
      );
    }
    return <span>{value}</span>;
  };

  return (
    <section className="cases-comparison-section">
      <div className="container-wide">
        <h2 className="cases-comparison-title">{title}</h2>
        
        <div className="cases-comparison-table-container">
          <table className="cases-comparison-table">
            <thead>
              <tr>
                <th className="cases-comparison-sin-binder-header">Sin Binder</th>
                <th className="cases-comparison-con-binder-header">
                  <div className="cases-comparison-con-binder-tab"></div>
                  Con Binder
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="cases-comparison-row">
                  <td className="cases-comparison-sin-binder">{renderValue(row.sinBinder)}</td>
                  <td className="cases-comparison-con-binder">{renderValue(row.conBinder)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

