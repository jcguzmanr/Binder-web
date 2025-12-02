import { DealsHero } from '../../components/sections/DealsHero';
import { DealsStats } from '../../components/sections/DealsStats';
import { DealsTabs } from '../../components/sections/DealsTabs';
// import { DealsTestimonials } from '../../components/sections/DealsTestimonials';
import { DealsComparison } from '../../components/sections/DealsComparison';
import { DealsFAQ } from '../../components/sections/DealsFAQ';
import { DealsContact } from '../../components/sections/DealsContact';

export const CLMPage = () => {
  return (
    <main>
      <DealsHero />
      <DealsStats />
      <DealsTabs />
      {/* <DealsTestimonials /> */}
      <DealsComparison />
      <DealsFAQ />
      <DealsContact />
    </main>
  );
};

