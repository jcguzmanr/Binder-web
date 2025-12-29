import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
  name?: string;
  url?: string;
  label?: string;
  path?: string;
}

interface SchemaMarkupProps {
  type: 'organization' | 'breadcrumbList' | 'faqPage';
  data?: {
    breadcrumbs?: BreadcrumbItem[];
    faqItems?: Array<{ question: string; answer: string }>;
  };
}

export const SchemaMarkup = ({ type, data }: SchemaMarkupProps) => {
  const siteUrl = 'https://binder.la';

  const getSchema = () => {
    switch (type) {
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Binder',
          url: siteUrl,
          logo: `${siteUrl}/lightmode_default.svg`,
          description: 'Binder es la plataforma legal con IA que centraliza, automatiza y analiza la gestión legal. CLM, gestión de procesos y expediente digital para áreas legales.',
          sameAs: [
            'https://www.linkedin.com/company/thelegalbinder/'
          ]
        };

      case 'breadcrumbList':
        if (!data?.breadcrumbs || data.breadcrumbs.length === 0) return null;
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: data.breadcrumbs.map((crumb, index) => {
            // Support both formats: { name, url } and { label, path }
            const name = crumb.name || crumb.label || '';
            const url = crumb.url || crumb.path || '';
            const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;
            
            return {
              '@type': 'ListItem',
              position: index + 1,
              name: name,
              item: fullUrl
            };
          })
        };

      case 'faqPage':
        if (!data?.faqItems || data.faqItems.length === 0) return null;
        return {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: data.faqItems.map(item => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer
            }
          }))
        };

      default:
        return null;
    }
  };

  const schema = getSchema();
  if (!schema) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};


