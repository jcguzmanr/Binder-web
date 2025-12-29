import { Helmet } from 'react-helmet-async';
import { SchemaMarkup } from '../seo/SchemaMarkup';

export const GlobalHead = () => {
  return (
    <>
      <Helmet>
        <link rel="icon" type="image/svg+xml" href="/lightmode_default_isotipo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <SchemaMarkup type="organization" />
    </>
  );
};





