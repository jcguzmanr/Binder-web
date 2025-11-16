import { expedienteDigitalContent } from '../../content/expedienteDigital';
import { useNumberAnimation } from '../../hooks/useNumberAnimation';
import './ExpedienteStats.css';

export const ExpedienteStats = () => {
  const { displayText, elementRef } = useNumberAnimation({
    targetValue: expedienteDigitalContent.stats.percentage,
    duration: 2000,
    startValue: 0,
    suffix: '%',
    decimals: 0,
  });

  return (
    <section className="expediente-stats-section">
      <div className="container-wide">
        <div className="expediente-stats-content" ref={elementRef}>
          <div className="expediente-stats-number">
            <span className="expediente-stats-percentage">{displayText}</span>
          </div>
          <p className="expediente-stats-text">{expedienteDigitalContent.stats.text}</p>
          <p className="expediente-stats-description">{expedienteDigitalContent.stats.description}</p>
        </div>
      </div>
    </section>
  );
};

