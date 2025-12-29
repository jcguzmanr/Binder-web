import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Breadcrumbs } from './Breadcrumbs';
import './InternalPage.css';

interface InternalPageProps {
  title: string;
  children: ReactNode;
  breadcrumbs?: Array<{ label: string; path: string }>;
}

export const InternalPage = ({ title, children, breadcrumbs }: InternalPageProps) => {
  const location = useLocation();
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px',
    triggerOnce: true,
  });

  useEffect(() => {
    // Scroll to top instantly when route changes (no smooth scroll to avoid visible scroll animation)
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  const defaultBreadcrumbs = breadcrumbs || [{ label: 'Inicio', path: '/' }, { label: title, path: location.pathname }];

  return (
    <main className="internal-page">
      <div className="internal-page-container">
        {breadcrumbs && <Breadcrumbs items={defaultBreadcrumbs} />}
        <div 
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className={`frosted-glass scroll-animate ${isVisible ? 'visible' : ''}`}
        >
          <h1 className="internal-page-title">{title}</h1>
          <div className="internal-page-content">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

