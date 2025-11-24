import { casesContent } from '../../content/cases';
import { useNumberAnimation } from '../../hooks/useNumberAnimation';
import './CasesStats.css';

interface StatBlockProps {
  item: {
    value: number | null;
    suffix: string;
    text: string;
    subtitle?: string;
  };
}

const StatBlock = ({ item }: StatBlockProps) => {
  if (item.value === null) {
    return (
      <div className="cases-stat-block">
        <div className="cases-stat-number">
          <span className="cases-stat-value">{item.text}</span>
        </div>
        <p className="cases-stat-text">{item.subtitle}</p>
      </div>
    );
  }

  const { displayText, elementRef } = useNumberAnimation({
    targetValue: item.value,
    duration: 2000,
    startValue: 0,
    suffix: item.suffix,
    decimals: 0,
  });

  return (
    <div className="cases-stat-block" ref={elementRef}>
      <div className="cases-stat-number">
        <span className="cases-stat-value">{displayText}</span>
        <span className="cases-stat-text">{item.text}</span>
      </div>
    </div>
  );
};

export const CasesStats = () => {
  const { title, items, description } = casesContent.stats;

  return (
    <section className="cases-stats-section">
      <div className="container-wide">
        {title && (
          <h2 className="cases-stats-title">{title}</h2>
        )}
        <div className="cases-stats-grid">
          {items.map((item, index) => (
            <StatBlock key={index} item={item} />
          ))}
        </div>
        <p className="cases-stats-description">{description}</p>
      </div>
    </section>
  );
};

