import { useState } from 'react';
import { casesContent } from '../../content/cases';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './CasesFAQ.css';

export const CasesFAQ = () => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set([casesContent.faq.items[0]?.id || '']));
  const { title, intro, items } = casesContent.faq;
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px',
    triggerOnce: true,
  });

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

  const formatAnswer = (id: string, answer: string) => {
    const formatWithBold = (text: string, boldTexts: string[]) => {
      let result: (string | JSX.Element)[] = [text];
      
      boldTexts.forEach((boldText) => {
        const newResult: (string | JSX.Element)[] = [];
        result.forEach((part) => {
          if (typeof part === 'string') {
            const parts = part.split(boldText);
            parts.forEach((p, i) => {
              if (p) newResult.push(p);
              if (i < parts.length - 1) {
                newResult.push(<strong key={`${boldText}-${i}`}>{boldText}</strong>);
              }
            });
          } else {
            newResult.push(part);
          }
        });
        result = newResult;
      });
      
      return result.length === 1 && typeof result[0] === 'string' ? result[0] : result;
    };

    // FAQ 1: Bold "digitaliza todo el flujo de los procesos judiciales y administrativos, con trazabilidad, alertas automáticas, control de gastos y provisiones, además de una mesa de partes digital integrada."
    if (id === 'faq-cases-1') {
      return formatWithBold(answer, ['digitaliza todo el flujo de los procesos judiciales y administrativos, con trazabilidad, alertas automáticas, control de gastos y provisiones, además de una mesa de partes digital integrada.']);
    }

    // FAQ 3: Bold "SOC 2 Tipo II, ISO 27001, 27017 y 27018" and "pruebas de penetración y hacking ético"
    if (id === 'faq-cases-3') {
      return formatWithBold(answer, ['SOC 2 Tipo II, ISO 27001, 27017 y 27018', 'pruebas de penetración y hacking ético']);
    }

    // FAQ 4: Bold "mesa de partes digital integrada"
    if (id === 'faq-cases-4') {
      return formatWithBold(answer, ['mesa de partes digital integrada']);
    }

    // FAQ 5: Bold "asistente virtual con IA" and "revisar, resumir y redactar documentos judiciales o administrativos."
    if (id === 'faq-cases-5') {
      return formatWithBold(answer, ['asistente virtual con IA', 'revisar, resumir y redactar documentos judiciales o administrativos.']);
    }

    // FAQ 6: Bold "alertas automáticas y recordatorios de vencimientos"
    if (id === 'faq-cases-6') {
      return formatWithBold(answer, ['alertas automáticas y recordatorios de vencimientos']);
    }

    // FAQ 7: Bold "registrar gastos, provisiones y honorarios"
    if (id === 'faq-cases-7') {
      return formatWithBold(answer, ['registrar gastos, provisiones y honorarios']);
    }

    return answer;
  };

  return (
    <section 
      ref={elementRef as React.RefObject<HTMLElement>}
      className={`cases-faq-section scroll-animate ${isVisible ? 'visible' : ''}`}
    >
      <div className="container-wide">
        <h2 className="cases-faq-title">{title}</h2>
        {intro && (
          <p className="cases-faq-intro">{intro}</p>
        )}
        
        <div className="cases-faq-container">
          {items.map((item) => {
            const isOpen = openItems.has(item.id);
            return (
              <div key={item.id} className="cases-faq-item">
                <button
                  className={`cases-faq-button ${isOpen ? 'active' : ''}`}
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                >
                  <span className="cases-faq-question">{item.question}</span>
                  <span className="cases-faq-icon">{isOpen ? '−' : '+'}</span>
                </button>
                <div className={`cases-faq-answer ${isOpen ? 'open' : ''}`}>
                  <p>{formatAnswer(item.id, item.answer)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

