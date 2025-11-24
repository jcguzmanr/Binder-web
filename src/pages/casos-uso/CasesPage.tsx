import { CasesHero } from '../../components/sections/CasesHero';
import { CasesStats } from '../../components/sections/CasesStats';
import { CasesTabs } from '../../components/sections/CasesTabs';
import { CasesTestimonials } from '../../components/sections/CasesTestimonials';
import { CasesComparison } from '../../components/sections/CasesComparison';
import { CasesFAQ } from '../../components/sections/CasesFAQ';
import { CasesContact } from '../../components/sections/CasesContact';

export const CasesPage = () => {
  return (
    <main>
      <CasesHero />
      <CasesStats />
      <CasesTabs />
      <CasesTestimonials />
      <CasesComparison />
      <CasesFAQ />
      <CasesContact />
    </main>
  );
};

