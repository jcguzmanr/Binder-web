import { ExpedienteHero } from '../../components/sections/ExpedienteHero';
import { ExpedienteStats } from '../../components/sections/ExpedienteStats';
import { ExpedienteTabs } from '../../components/sections/ExpedienteTabs';
// import { ExpedienteTestimonials } from '../../components/sections/ExpedienteTestimonials';
import { ExpedienteComparison } from '../../components/sections/ExpedienteComparison';
import { ExpedienteFAQ } from '../../components/sections/ExpedienteFAQ';
import { ExpedienteContact } from '../../components/sections/ExpedienteContact';
import { PageHead } from '../../components/seo/PageHead';
import { SchemaMarkup } from '../../components/seo/SchemaMarkup';
import { Breadcrumbs } from '../../components/layout/Breadcrumbs';
import { expedienteDigitalContent } from '../../content/expedienteDigital';

export const ExpedienteDigitalPage = () => {
  const faqItems = expedienteDigitalContent.faq.items.map(item => ({
    question: item.question,
    answer: item.answer.replace(/<[^>]*>/g, '').trim()
  }));

  const breadcrumbs = [
    { label: 'Inicio', path: '/' },
    { label: 'Casos de uso', path: '/casos-uso/expediente-digital' },
    { label: 'Expediente Digital y Mesa de Partes', path: '/casos-uso/expediente-digital' }
  ];

  return (
    <>
      <PageHead
        title="Expediente Digital y Mesa de Partes Online | Binder"
        description="Mesa de partes online que automatiza, controla y mide tu operación jurídica. Convierte trabajo operativo en procesos claros y trazables."
        canonicalUrl="/casos-uso/expediente-digital"
      />
      <SchemaMarkup 
        type="faqPage" 
        data={{ faqItems }}
      />
      <SchemaMarkup 
        type="breadcrumbList" 
        data={{ breadcrumbs }}
      />
      <main>
        <Breadcrumbs items={breadcrumbs} />
        <ExpedienteHero />
        <ExpedienteStats />
        <ExpedienteTabs />
        {/* <ExpedienteTestimonials /> */}
        <ExpedienteComparison />
        <ExpedienteFAQ />
        <ExpedienteContact />
      </main>
    </>
  );
};

