import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './InternalPage.css';

interface InternalPageProps {
  title: string;
  children: ReactNode;
}

export const InternalPage = ({ title, children }: InternalPageProps) => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <main className="internal-page">
      <div className="internal-page-container">
        <div className="frosted-glass">
          <h1 className="internal-page-title">{title}</h1>
          <div className="internal-page-content">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

