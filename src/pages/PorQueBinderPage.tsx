import { WhyBinder } from '../components/sections/WhyBinder';
import { PageHead } from '../components/seo/PageHead';
import { SchemaMarkup } from '../components/seo/SchemaMarkup';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';

export const PorQueBinderPage = () => {
  const breadcrumbs = [
    { label: 'Inicio', path: '/' },
    { label: 'Por qué Binder', path: '/porquebinder' }
  ];

  return (
    <>
      <PageHead
        title="Por qué Binder - Solución para Equipos Legales"
        description="Descubre por qué Binder es la mejor solución para equipos legales. Centraliza, automatiza y da visibilidad a toda tu gestión legal con IA."
        canonicalUrl="/porquebinder"
      />
      <SchemaMarkup type="breadcrumbList" data={{ breadcrumbs }} />
      <Breadcrumbs items={breadcrumbs} />
      <WhyBinder />
    </>
  );
};

