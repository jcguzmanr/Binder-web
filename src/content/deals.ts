export interface DealsTab {
  id: string;
  tabName: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  imagePlaceholder: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ComparisonRow {
  feature: string;
  tradicional: string | boolean;
  deals: string | boolean;
}

export const dealsContent = {
  hero: {
    title: "Deals - CLM con Inteligencia Artificial",
    subtitle: "Optimice la gestión contractual de principio a fin. Automatice tareas repetitivas y reduzca tiempos de revisión con inteligencia artificial.",
    ctaText: "Agendar Demo",
  },
  stats: {
    items: [
      {
        value: 9,
        suffix: "%",
        text: "de los ingresos se pierden por contratos mal gestionados",
      },
      {
        value: 71,
        suffix: "%",
        text: "de las empresas no encuentra documentos clave a tiempo",
      },
      {
        value: null,
        suffix: "",
        text: "Horas perdidas",
        subtitle: "entre versiones duplicadas y aprobaciones lentas",
      },
    ],
    description: "Binder nació para cambiar eso: unifica, automatiza y da trazabilidad a toda tu gestión legal.",
  },
  tabs: {
    mainTitle: "Funcionalidades de Deals - CLM con IA",
    tabs: [
      {
        id: "creacion-automatica",
        tabName: "Creación Automática",
        title: "Creación Automática de Contratos",
        subtitle: "Genere contratos inteligentes con IA en minutos",
        description: "Nuestra IA aprende de sus contratos anteriores para sugerir cláusulas y términos apropiados. Automatice la creación de contratos estándar y personalizados con solo unos clics.",
        bullets: [
          "Generación automática con plantillas inteligentes",
          "Sugerencias de cláusulas basadas en IA",
          "Personalización rápida y eficiente",
          "Reducción de errores humanos",
        ],
        imagePlaceholder: "Imagen de Creación Automática",
      },
      {
        id: "revision-ia",
        tabName: "Revisión con IA",
        title: "Revisión Inteligente con IA",
        subtitle: "Identifique riesgos y oportunidades automáticamente",
        description: "La IA analiza automáticamente los contratos para identificar riesgos, oportunidades y áreas de mejora. Obtenga insights accionables que permiten a su equipo legal enfocarse en decisiones estratégicas.",
        bullets: [
          "Análisis automático de riesgos",
          "Identificación de cláusulas problemáticas",
          "Sugerencias de mejoras",
          "Reportes de cumplimiento",
        ],
        imagePlaceholder: "Imagen de Revisión con IA",
      },
      {
        id: "gestion-ciclo",
        tabName: "Gestión del Ciclo de Vida",
        title: "Gestión Completa del Ciclo de Vida",
        subtitle: "Controle cada etapa del contrato desde la creación hasta la renovación",
        description: "Gestione todo el ciclo de vida de sus contratos desde una plataforma centralizada. Desde la negociación inicial hasta la renovación o terminación, mantenga control total y visibilidad completa.",
        bullets: [
          "Seguimiento de todas las etapas",
          "Alertas de vencimiento automáticas",
          "Gestión de renovaciones",
          "Historial completo de cambios",
        ],
        imagePlaceholder: "Imagen de Gestión del Ciclo de Vida",
      },
      {
        id: "analitica-reportes",
        tabName: "Analítica y Reportes",
        title: "Analítica y Reportes Avanzados",
        subtitle: "Obtenga insights valiosos sobre su cartera de contratos",
        description: "Transforme su operación legal en datos accionables. Dashboards interactivos y reportes automatizados que le ayudan a tomar decisiones informadas y demostrar el valor del área legal.",
        bullets: [
          "Dashboards en tiempo real",
          "Reportes automatizados y exportables",
          "Métricas de performance",
          "Análisis predictivo con IA",
        ],
        imagePlaceholder: "Imagen de Analítica y Reportes",
      },
    ] as DealsTab[],
  },
  testimonials: {
    mainTitle: "Equipos legales que confían en Deals",
    testimonials: [
      {
        id: "testimonial-deals-1",
        name: "Laura Fernández",
        role: "Directora Legal",
        company: "TechCorp",
        logoPlaceholder: "Logo TechCorp",
        logoPath: null,
        message: "Deals ha transformado completamente nuestra gestión de contratos. La IA nos ha permitido reducir los tiempos de revisión en más del 70% y mejorar significativamente la calidad de nuestros contratos.",
      },
      {
        id: "testimonial-deals-2",
        name: "Miguel Torres",
        role: "Gerente de Contratos",
        company: "Innovate Solutions",
        logoPlaceholder: "Logo Innovate",
        logoPath: null,
        message: "La creación automática de contratos con IA ha sido un cambio radical. Lo que antes tomaba días, ahora se completa en horas. El equipo puede enfocarse en negociaciones estratégicas.",
      },
      {
        id: "testimonial-deals-3",
        name: "Carmen Rodríguez",
        role: "Socia Legal",
        company: "Estudio Legal & Asociados",
        logoPlaceholder: "Logo Estudio",
        logoPath: null,
        message: "Los reportes y analítica de Deals nos dan una visibilidad que nunca habíamos tenido. Podemos demostrar el valor del área legal con datos concretos y tomar decisiones basadas en información real.",
      },
    ],
  },
  comparison: {
    title: "Comparativa: Gestión Tradicional vs Deals con IA",
    rows: [
      {
        feature: "Creación de contratos",
        tradicional: "Manual, días o semanas",
        deals: "Automática con IA, minutos u horas",
      },
      {
        feature: "Revisión de contratos",
        tradicional: "Manual, propensa a errores",
        deals: "Automatizada con IA, identificación de riesgos",
      },
      {
        feature: "Tiempo de revisión",
        tradicional: "Horas por contrato",
        deals: "Minutos con IA",
      },
      {
        feature: "Identificación de riesgos",
        tradicional: "Manual, subjetiva",
        deals: "Automática con IA",
      },
      {
        feature: "Seguimiento del ciclo de vida",
        tradicional: "Hojas de cálculo, manual",
        deals: "Automático, alertas inteligentes",
      },
      {
        feature: "Reportes y analítica",
        tradicional: "Manual, limitada",
        deals: "Automática, dashboards en tiempo real",
      },
      {
        feature: "Aprendizaje y mejora continua",
        tradicional: false,
        deals: true,
      },
      {
        feature: "Reducción de errores",
        tradicional: "Depende del revisor",
        deals: "Automática con IA",
      },
    ] as ComparisonRow[],
  },
  faq: {
    title: "Preguntas Frecuentes sobre Deals",
    items: [
      {
        id: "faq-deals-1",
        question: "¿Cómo funciona la creación automática de contratos con IA?",
        answer: "Nuestra IA analiza sus contratos históricos para aprender patrones, cláusulas y términos comunes. Cuando crea un nuevo contrato, la IA sugiere automáticamente cláusulas apropiadas basadas en el tipo de contrato, las partes involucradas y el contexto. Usted puede revisar, modificar y aprobar las sugerencias, reduciendo significativamente el tiempo de creación.",
      },
      {
        id: "faq-deals-2",
        question: "¿La IA puede reemplazar completamente a los abogados?",
        answer: "No, la IA está diseñada para asistir y potenciar a los abogados, no reemplazarlos. La IA maneja tareas repetitivas y análisis iniciales, permitiendo que los abogados se enfoquen en decisiones estratégicas, negociaciones complejas y asesoramiento legal de alto valor. La revisión y aprobación final siempre recae en profesionales legales.",
      },
      {
        id: "faq-deals-3",
        question: "¿Qué tipos de contratos puede gestionar Deals?",
        answer: "Deals puede gestionar cualquier tipo de contrato: contratos de servicios, acuerdos de confidencialidad (NDA), contratos laborales, acuerdos de licencia, contratos de compraventa, acuerdos de asociación, y más. La IA se adapta a diferentes tipos de contratos y puede aprender de cada uno para mejorar sus sugerencias.",
      },
      {
        id: "faq-deals-4",
        question: "¿Cómo garantiza Deals la seguridad y confidencialidad de los contratos?",
        answer: "Deals utiliza encriptación de extremo a extremo, controles de acceso granulares, y cumple con los más altos estándares de seguridad y privacidad de datos. Todos los contratos se almacenan de forma segura con respaldos automáticos y auditoría completa de accesos y cambios.",
      },
      {
        id: "faq-deals-5",
        question: "¿Puedo integrar Deals con otros sistemas que ya uso?",
        answer: "Sí, Deals ofrece integraciones con sistemas ERP, CRM, y otras herramientas empresariales comunes. Esto permite sincronizar datos, automatizar flujos de trabajo y mantener toda su información legal conectada con el resto de su organización.",
      },
      {
        id: "faq-deals-6",
        question: "¿Cuánto tiempo toma implementar Deals en mi organización?",
        answer: "La implementación típica toma entre 2 a 4 semanas, dependiendo del tamaño de su organización y la cantidad de contratos históricos a migrar. Nuestro equipo le guía en cada paso, desde la configuración inicial hasta la capacitación de usuarios y la migración de datos.",
      },
    ] as FAQItem[],
  },
};

