import { ExpedienteHero } from '../../components/sections/ExpedienteHero';
import { ExpedienteStats } from '../../components/sections/ExpedienteStats';
import { ExpedienteTabs } from '../../components/sections/ExpedienteTabs';
import { ExpedienteTestimonials } from '../../components/sections/ExpedienteTestimonials';
import { ExpedienteComparison } from '../../components/sections/ExpedienteComparison';
import { ExpedienteFAQ } from '../../components/sections/ExpedienteFAQ';
import { ExpedienteContact } from '../../components/sections/ExpedienteContact';

export const ExpedienteDigitalPage = () => {
  return (
    <main>
      <ExpedienteHero />
      <ExpedienteStats />
      <ExpedienteTabs />
      <ExpedienteTestimonials />
      <ExpedienteComparison />
      <ExpedienteFAQ />
      <ExpedienteContact />
    </main>
  );
};

