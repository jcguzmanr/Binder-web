import { useState } from 'react';
import { expedienteDigitalContent } from '../../content/expedienteDigital';
import './ExpedienteFAQ.css';

export const ExpedienteFAQ = () => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const { title, items } = expedienteDigitalContent.faq;

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <section className="expediente-faq-section">
      <div className="container-wide">
        <h2 className="expediente-faq-title">{title}</h2>
        
        <div className="expediente-faq-container">
          {items.map((item) => {
            const isOpen = openItems.has(item.id);
            return (
              <div key={item.id} className="expediente-faq-item">
                <button
                  className={`expediente-faq-button ${isOpen ? 'active' : ''}`}
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                >
                  <span className="expediente-faq-question">{item.question}</span>
                  <span className="expediente-faq-icon">{isOpen ? '−' : '+'}</span>
                </button>
                <div className={`expediente-faq-answer ${isOpen ? 'open' : ''}`}>
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

