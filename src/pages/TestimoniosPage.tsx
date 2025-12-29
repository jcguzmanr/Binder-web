import { InternalPage } from '../components/layout/InternalPage';
import { PageHead } from '../components/seo/PageHead';
import { SchemaMarkup } from '../components/seo/SchemaMarkup';

export const TestimoniosPage = () => {
  const breadcrumbs = [
    { label: 'Inicio', path: '/' },
    { label: 'Testimonios', path: '/testimonios' }
  ];

  return (
    <>
      <PageHead
        title="Testimonios - Clientes Binder | Casos de Éxito"
        description="Descubre cómo Binder ha transformado la gestión legal de empresas como Laive, Grupo EFE y Rodman & Asociados. Testimonios reales de clientes."
        canonicalUrl="/testimonios"
      />
      <SchemaMarkup type="breadcrumbList" data={{ breadcrumbs }} />
      <InternalPage title="Testimonios" breadcrumbs={breadcrumbs}>
      <p>
        Descubra cómo nuestras soluciones han transformado la gestión legal de diversas 
        organizaciones en diferentes sectores.
      </p>
      <h2>Casos de Éxito</h2>
      <p>
        Nuestros clientes han experimentado mejoras significativas en eficiencia, 
        productividad y satisfacción al implementar nuestras soluciones.
      </p>
      <h3>Empresa de Tecnología</h3>
      <p>
        "Binder ha revolucionado nuestra gestión de contratos. La inteligencia artificial 
        integrada nos ha permitido reducir el tiempo de revisión en un 60%."
      </p>
      <h3>Firma Legal</h3>
      <p>
        "La plataforma nos ha ayudado a organizar mejor nuestros casos y mejorar la 
        comunicación con nuestros clientes. Es una herramienta indispensable."
      </p>
      <h3>Corporación Multinacional</h3>
      <p>
        "La implementación de Binder ha mejorado significativamente nuestro cumplimiento 
        normativo y la gestión de documentos legales en toda la organización."
      </p>
      <h2>Métricas de Impacto</h2>
      <ul>
        <li>Reducción del 50% en tiempo de gestión de contratos</li>
        <li>Aumento del 40% en productividad del equipo legal</li>
        <li>Mejora del 95% en organización de documentos</li>
        <li>Satisfacción del cliente superior al 90%</li>
      </ul>
      </InternalPage>
    </>
  );
};

