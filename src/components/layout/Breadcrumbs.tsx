import { Link } from 'react-router-dom';
import './Breadcrumbs.css';

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  if (!items || items.length === 0) return null;

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={item.path} className="breadcrumbs-item">
              {isLast ? (
                <span className="breadcrumbs-current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link to={item.path} className="breadcrumbs-link">
                    {item.label}
                  </Link>
                  <span className="breadcrumbs-separator" aria-hidden="true">
                    {' > '}
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
