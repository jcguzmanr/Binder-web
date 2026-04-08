import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './AnexoBackLink.css';

type AnexoBackLinkProps = {
  fallbackTo: string;
  label?: string;
};

export const AnexoBackLink = ({ fallbackTo, label = 'Volver' }: AnexoBackLinkProps) => {
  const navigate = useNavigate();

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate(fallbackTo);
  };

  return (
    <div className="anexo-back">
      <a className="anexo-back-link" href={fallbackTo} onClick={onClick}>
        <span className="anexo-back-icon" aria-hidden="true">
          ←
        </span>
        {label}
      </a>
    </div>
  );
};

