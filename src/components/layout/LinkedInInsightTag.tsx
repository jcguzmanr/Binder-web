import { useEffect } from 'react';

declare global {
  interface Window {
    _linkedin_partner_id?: string;
    _linkedin_data_partner_ids?: string[];
    lintrk?: ((a: string, b?: unknown) => void) & { q?: unknown[] };
  }
}

const LINKEDIN_PARTNER_ID = '8105746';
const LINKEDIN_SCRIPT_ID = 'linkedin-insight-script';

export const LinkedInInsightTag = () => {
  useEffect(() => {
    window._linkedin_partner_id = LINKEDIN_PARTNER_ID;
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];

    if (!window._linkedin_data_partner_ids.includes(LINKEDIN_PARTNER_ID)) {
      window._linkedin_data_partner_ids.push(LINKEDIN_PARTNER_ID);
    }

    if (!window.lintrk) {
      const lintrk = ((a: string, b?: unknown) => {
        lintrk.q = lintrk.q || [];
        lintrk.q.push([a, b]);
      }) as ((a: string, b?: unknown) => void) & { q?: unknown[] };
      lintrk.q = [];
      window.lintrk = lintrk;
    }

    if (!document.getElementById(LINKEDIN_SCRIPT_ID)) {
      const script = document.createElement('script');
      script.id = LINKEDIN_SCRIPT_ID;
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript?.parentNode?.insertBefore(script, firstScript);
    }
  }, []);

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        alt=""
        src="https://px.ads.linkedin.com/collect/?pid=8105746&fmt=gif"
      />
    </noscript>
  );
};
