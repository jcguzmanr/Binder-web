import { dealsContent } from '../../content/deals';
import { useNumberAnimation } from '../../hooks/useNumberAnimation';
import './DealsStats.css';

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
      <div className="deals-stat-block">
        <div className="deals-stat-number">
          <span className="deals-stat-value">{item.text}</span>
        </div>
        <p className="deals-stat-text">{item.subtitle}</p>
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
    <div className="deals-stat-block" ref={elementRef}>
      <div className="deals-stat-number">
        <span className="deals-stat-value">{displayText}</span>
      </div>
      <p className="deals-stat-text">{item.text}</p>
    </div>
  );
};

export const DealsStats = () => {
  const { title, items, description } = dealsContent.stats;

  return (
    <section className="deals-stats-section">
      <div className="container-wide">
        {title && (
          <h2 className="deals-stats-title">{title}</h2>
        )}
        <div className="deals-stats-grid">
          {items.map((item, index) => (
            <StatBlock key={index} item={item} />
          ))}
        </div>
        <p className="deals-stats-description">{description}</p>
      </div>
    </section>
  );
};

