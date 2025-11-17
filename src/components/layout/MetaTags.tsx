import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const DEFAULT_IMAGE = '/metatag-binder.jpeg';
const DEFAULT_DESCRIPTION = 'Todo tu trabajo legal en un solo lugar. IA, automatización y visibilidad para equipos legales modernos.';
const BASE_URL = 'https://binder.com'; // Update with your actual domain

export const MetaTags = ({ 
  title, 
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url 
}: MetaTagsProps) => {
  const fullTitle = title ? `${title} - Binder` : 'Binder - La plataforma legal con IA';
  const fullUrl = url ? `${BASE_URL}${url}` : BASE_URL;
  const fullImageUrl = image.startsWith('http') ? image : `${BASE_URL}${image}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={fullTitle} />
    </Helmet>
  );
};

