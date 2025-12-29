import { CasesHero } from '../../components/sections/CasesHero';
import { CasesStats } from '../../components/sections/CasesStats';
import { CasesTabs } from '../../components/sections/CasesTabs';
// import { CasesTestimonials } from '../../components/sections/CasesTestimonials';
import { CasesComparison } from '../../components/sections/CasesComparison';
import { CasesFAQ } from '../../components/sections/CasesFAQ';
import { CasesContact } from '../../components/sections/CasesContact';
import { PageHead } from '../../components/seo/PageHead';
import { SchemaMarkup } from '../../components/seo/SchemaMarkup';
import { Breadcrumbs } from '../../components/layout/Breadcrumbs';
import { casesContent } from '../../content/cases';

export const CasesPage = () => {
  const faqItems = casesContent.faq.items.map(item => ({
    question: item.question,
    answer: item.answer.replace(/<[^>]*>/g, '').trim()
  }));

  const breadcrumbs = [
    { label: 'Inicio', path: '/' },
    { label: 'Casos de uso', path: '/casos-uso/gestion-procesos' },
    { label: 'Gestión de Procesos Legales', path: '/casos-uso/gestion-procesos' }
  ];

  return (
    <>
      <PageHead
        title="Gestión de Procesos Legales - Digitalización Legal | Binder"
        description="Digitaliza y controla tus procesos judiciales y administrativos. Centraliza expedientes, oficios y presentaciones con trazabilidad total."
        canonicalUrl="/casos-uso/gestion-procesos"
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
        <CasesHero />
        <CasesStats />
        <CasesTabs />
        {/* <CasesTestimonials /> */}
        <CasesComparison />
        <CasesFAQ />
        <CasesContact />
      </main>
    </>
  );
};

