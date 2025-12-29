import { InternalPage } from '../components/layout/InternalPage';
import { PageHead } from '../components/seo/PageHead';
import { SchemaMarkup } from '../components/seo/SchemaMarkup';

export const ContactoPage = () => {
  const breadcrumbs = [
    { label: 'Inicio', path: '/' },
    { label: 'Contacto', path: '/contacto' }
  ];

  return (
    <>
      <PageHead
        title="Contacto - Solicita tu Demo | Binder"
        description="Contacta con Binder para obtener más información sobre nuestra plataforma legal con IA o agendar una demostración personalizada."
        canonicalUrl="/contacto"
      />
      <SchemaMarkup type="breadcrumbList" data={{ breadcrumbs }} />
      <InternalPage title="Contacto" breadcrumbs={breadcrumbs}>
      <p>
        Estamos aquí para ayudarle. Contáctenos para obtener más información sobre nuestras 
        soluciones o para agendar una demostración personalizada.
      </p>
      <h2>Información de Contacto</h2>
      <p>
        Nuestro equipo está disponible para responder sus preguntas y ayudarle a encontrar 
        la solución que mejor se adapte a sus necesidades.
      </p>
      <h3>Email</h3>
      <p>contacto@binder.com.pe</p>
      <h3>Teléfono</h3>
      <p>+51 XXX XXX XXX</p>
      <h3>Horario de Atención</h3>
      <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
      <h2>Agendar una Demo</h2>
      <p>
        Programe una demostración personalizada de nuestra plataforma. Nuestro equipo le 
        mostrará cómo Binder puede transformar la gestión legal de su organización.
      </p>
      <h2>Oficinas</h2>
      <p>
        Visítenos en nuestras oficinas para conocer más sobre nuestras soluciones y 
        discutir cómo podemos ayudarle.
      </p>
      </InternalPage>
    </>
  );
};

