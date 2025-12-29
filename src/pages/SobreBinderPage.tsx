import { SobreBinder } from '../components/sections/SobreBinder';
import { PageHead } from '../components/seo/PageHead';
import { SchemaMarkup } from '../components/seo/SchemaMarkup';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';

export const SobreBinderPage = () => {
  const breadcrumbs = [
    { label: 'Inicio', path: '/' },
    { label: 'Sobre Binder', path: '/sobrebinder' }
  ];

  return (
    <>
      <PageHead
        title="Sobre Binder - Quiénes Somos"
        description="Conoce más sobre Binder, la plataforma legal con IA diseñada para transformar la gestión legal de empresas y estudios jurídicos."
        canonicalUrl="/sobrebinder"
      />
      <SchemaMarkup type="breadcrumbList" data={{ breadcrumbs }} />
      <Breadcrumbs items={breadcrumbs} />
      <SobreBinder />
    </>
  );
};







