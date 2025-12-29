import { DealsHero } from '../../components/sections/DealsHero';
import { DealsStats } from '../../components/sections/DealsStats';
import { DealsTabs } from '../../components/sections/DealsTabs';
// import { DealsTestimonials } from '../../components/sections/DealsTestimonials';
import { DealsComparison } from '../../components/sections/DealsComparison';
import { DealsFAQ } from '../../components/sections/DealsFAQ';
import { DealsContact } from '../../components/sections/DealsContact';
import { PageHead } from '../../components/seo/PageHead';
import { SchemaMarkup } from '../../components/seo/SchemaMarkup';
import { Breadcrumbs } from '../../components/layout/Breadcrumbs';
import { dealsContent } from '../../content/deals';

export const CLMPage = () => {
  const faqItems = dealsContent.faq.items.map(item => ({
    question: item.question,
    answer: item.answer.replace(/<[^>]*>/g, '').trim() // Remove any HTML tags
  }));

  const breadcrumbs = [
    { label: 'Inicio', path: '/' },
    { label: 'Casos de uso', path: '/casos-uso/clm' },
    { label: 'CLM con IA', path: '/casos-uso/clm' }
  ];

  return (
    <>
      <PageHead
        title="CLM con IA - Gestión de Contratos | Binder"
        description="Solución CLM con IA para centralizar y automatizar el ciclo de vida de contratos. Redacción inteligente, firma electrónica y trazabilidad total."
        canonicalUrl="/casos-uso/clm"
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
        <DealsHero />
        <DealsStats />
        <DealsTabs />
        {/* <DealsTestimonials /> */}
        <DealsComparison />
        <DealsFAQ />
        <DealsContact />
      </main>
    </>
  );
};

