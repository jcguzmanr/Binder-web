import { useState } from 'react';
import { dealsContent } from '../../content/deals';
import './DealsFAQ.css';

export const DealsFAQ = () => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set([dealsContent.faq.items[0]?.id || '']));
  const { title, intro, items } = dealsContent.faq;

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

  // Render answer with bold text
  const renderAnswer = (answer: string, boldParts?: string[]) => {
    if (!boldParts || boldParts.length === 0) {
      return <>{answer}</>;
    }

    let parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    const sortedBoldParts = [...boldParts].sort((a, b) => {
      const indexA = answer.toLowerCase().indexOf(a.toLowerCase());
      const indexB = answer.toLowerCase().indexOf(b.toLowerCase());
      return indexA - indexB;
    });

    sortedBoldParts.forEach((boldPart, idx) => {
      const index = answer.toLowerCase().indexOf(boldPart.toLowerCase(), lastIndex);
      if (index !== -1) {
        // Add text before bold part
        if (index > lastIndex) {
          parts.push(answer.slice(lastIndex, index));
        }
        // Add bold part
        parts.push(<strong key={`bold-${idx}`}>{answer.slice(index, index + boldPart.length)}</strong>);
        lastIndex = index + boldPart.length;
      }
    });

    // Add remaining text
    if (lastIndex < answer.length) {
      parts.push(answer.slice(lastIndex));
    }

    return <>{parts}</>;
  };

  return (
    <section className="deals-faq-section">
      <div className="container-wide">
        <h2 className="deals-faq-title">{title}</h2>
        {intro && (
          <p className="deals-faq-intro">{intro}</p>
        )}
        
        <div className="deals-faq-container">
          {items.map((item) => {
            const isOpen = openItems.has(item.id);
            return (
              <div key={item.id} className="deals-faq-item">
                <button
                  className={`deals-faq-button ${isOpen ? 'active' : ''}`}
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                >
                  <span className="deals-faq-question">{item.question}</span>
                  <span className="deals-faq-icon">{isOpen ? '−' : '+'}</span>
                </button>
                <div className={`deals-faq-answer ${isOpen ? 'open' : ''}`}>
                  <p>{renderAnswer(item.answer, item.boldParts)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

