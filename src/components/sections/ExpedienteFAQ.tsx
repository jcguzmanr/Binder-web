import { useState } from 'react';
import { expedienteDigitalContent } from '../../content/expedienteDigital';
import './ExpedienteFAQ.css';

export const ExpedienteFAQ = () => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set([expedienteDigitalContent.faq.items[0]?.id || '']));
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

  // Render answer with bold text for specific FAQs
  const renderAnswer = (answer: string, id: string) => {
    if (id === 'faq-2') {
      // For FAQ about document search, make "buscador avanzado por palabra clave" bold
      const boldText = 'buscador avanzado por palabra clave';
      const index = answer.indexOf(boldText);
      
      if (index !== -1) {
        const before = answer.slice(0, index);
        const bold = answer.slice(index, index + boldText.length);
        const after = answer.slice(index + boldText.length);

        return (
          <>
            {before}
            <strong>{bold}</strong>
            {after}
          </>
        );
      }
    }
    
    return <>{answer}</>;
  };

  return (
    <section className="expediente-faq-section">
      <div className="container-wide">
        <h2 className="expediente-faq-title">{title}</h2>
        {expedienteDigitalContent.faq.intro && (
          <p className="expediente-faq-intro">{expedienteDigitalContent.faq.intro}</p>
        )}
        
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
                  <p>{renderAnswer(item.answer, item.id)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

