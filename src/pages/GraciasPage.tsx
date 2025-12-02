import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InternalPage } from '../components/layout/InternalPage';
import './GraciasPage.css';

interface SubmissionData {
  name: string;
  company: string;
  email: string;
}

export const GraciasPage = () => {
  const navigate = useNavigate();
  const [submissionData, setSubmissionData] = useState<SubmissionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Obtener datos del sessionStorage
    const stored = sessionStorage.getItem('formSubmission');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setSubmissionData(data);
        // Limpiar sessionStorage después de leer
        sessionStorage.removeItem('formSubmission');
      } catch (error) {
        console.error('Error parsing submission data:', error);
        navigate('/');
      }
    } else {
      // Si no hay datos, redirigir al home después de un breve delay
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
    setIsLoading(false);
  }, [navigate]);

  if (isLoading) {
    return (
      <InternalPage title="Cargando...">
        <div className="gracias-container">
          <div className="gracias-loading">Cargando...</div>
        </div>
      </InternalPage>
    );
  }

  if (!submissionData) {
    return null;
  }

  return (
    <InternalPage title="¡Gracias por contactarnos!">
      <div className="gracias-container">
        <div className="gracias-content">
          <div className="gracias-icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 6L9 17L4 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="gracias-title">¡Gracias, {submissionData.name}!</h1>
          <p className="gracias-message">
            Hemos recibido tu solicitud de demo correctamente.
          </p>
          <p className="gracias-details">
            Nuestro equipo se pondrá en contacto contigo pronto a través de{' '}
            <strong>{submissionData.email}</strong> para coordinar la demostración 
            personalizada de Binder.
          </p>
          {submissionData.company && (
            <p className="gracias-company">
              Empresa: <strong>{submissionData.company}</strong>
            </p>
          )}
          <div className="gracias-actions">
            <button 
              onClick={() => navigate('/')}
              className="gracias-button primary"
            >
              Volver al inicio
            </button>
            <button 
              onClick={() => navigate('/soluciones')}
              className="gracias-button secondary"
            >
              Conocer más soluciones
            </button>
          </div>
        </div>
      </div>
    </InternalPage>
  );
};



