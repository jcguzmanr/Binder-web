import { InternalPage } from '../components/layout/InternalPage';
import { PageHead } from '../components/seo/PageHead';
import { SchemaMarkup } from '../components/seo/SchemaMarkup';

export const SolucionesPage = () => {
  const breadcrumbs = [
    { label: 'Inicio', path: '/' },
    { label: 'Soluciones', path: '/soluciones' }
  ];

  return (
    <>
      <PageHead
        title="Soluciones - Plataforma Legal Binder | CLM, Gestión de Procesos, Expediente Digital"
        description="Binder ofrece soluciones especializadas: CLM con IA, gestión de procesos legales, expediente digital y mesa de partes para áreas legales corporativas."
        canonicalUrl="/soluciones"
      />
      <SchemaMarkup type="breadcrumbList" data={{ breadcrumbs }} />
      <InternalPage title="Soluciones" breadcrumbs={breadcrumbs}>
      <p>
        Binder ofrece soluciones especializadas para diferentes necesidades del sector legal, 
        adaptándose a las particularidades de cada organización.
      </p>
      <h2>CLM con Inteligencia Artificial</h2>
      <p>
        Gestione el ciclo de vida completo de sus contratos con la ayuda de inteligencia 
        artificial. Automatice procesos, identifique riesgos y optimice la negociación.
      </p>
      <h2>Gestión de Procesos Legales</h2>
      <p>
        Solución integral para la gestión de procesos legales internos y externos, 
        con seguimiento detallado y reportes automatizados.
      </p>
      <h2>Expediente Digital y Mesa de Partes</h2>
      <p>
        Transforme su mesa de partes tradicional en un sistema digital moderno y eficiente. 
        Gestione expedientes, documentos y comunicaciones desde una plataforma centralizada.
      </p>
      <h2>Personalización y Escalabilidad</h2>
      <p>
        Nuestras soluciones se adaptan a las necesidades específicas de su organización, 
        creciendo junto con su negocio y evolucionando según sus requerimientos.
      </p>
      </InternalPage>
    </>
  );
};

