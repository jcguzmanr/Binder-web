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
    title: "CLM con IA - Centraliza, automatiza y mide el ciclo de vida de tus contratos.",
    subtitle: "Una sola plataforma para crear, revisar, firmar y controlar tus contratos con trazabilidad total",
    ctaText: "Solicita tu Demo",
  },
  stats: {
    title: "La gestión de contratos sigue siendo el mayor punto de fuga del área legal.",
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
    mainTitle: "Menos caos. Más control. Más impacto.",
    subtitle: "Binder unifica el ciclo de vida completo del contrato en una sola plataforma con IA entrenada en derecho. Desde la solicitud inicial (intake) hasta la firma electrónica y el seguimiento, todo se automatiza con trazabilidad y control total.",
    tabs: [
      {
        id: "centralizacion",
        tabName: "Centralización",
        title: "Centralización de Contratos",
        subtitle: "Genere contratos inteligentes con IA en minutos",
        description: "Nuestra IA aprende de sus contratos anteriores para sugerir cláusulas y términos apropiados. Automatice la creación de contratos estándar y personalizados con solo unos clics.",
        bullets: [
          "Generación automática con plantillas inteligentes",
          "Sugerencias de cláusulas basadas en IA",
          "Personalización rápida y eficiente",
          "Reducción de errores humanos",
        ],
        imagePlaceholder: "Imagen de Centralización",
      },
      {
        id: "redaccion",
        tabName: "Redacción",
        title: "Redacción de Contratos",
        subtitle: "Identifique riesgos y oportunidades automáticamente",
        description: "La IA analiza automáticamente los contratos para identificar riesgos, oportunidades y áreas de mejora. Obtenga insights accionables que permiten a su equipo legal enfocarse en decisiones estratégicas.",
        bullets: [
          "Análisis automático de riesgos",
          "Identificación de cláusulas problemáticas",
          "Sugerencias de mejoras",
          "Reportes de cumplimiento",
        ],
        imagePlaceholder: "Imagen de Redacción",
      },
      {
        id: "firma-electronica",
        tabName: "Firma electrónica",
        title: "Firma Electrónica",
        subtitle: "Controle cada etapa del contrato desde la creación hasta la renovación",
        description: "Gestione todo el ciclo de vida de sus contratos desde una plataforma centralizada. Desde la negociación inicial hasta la renovación o terminación, mantenga control total y visibilidad completa.",
        bullets: [
          "Seguimiento de todas las etapas",
          "Alertas de vencimiento automáticas",
          "Gestión de renovaciones",
          "Historial completo de cambios",
        ],
        imagePlaceholder: "Imagen de Firma Electrónica",
      },
      {
        id: "analitica",
        tabName: "Analítica",
        title: "Analítica y Reportes Avanzados",
        subtitle: "Obtenga insights valiosos sobre su cartera de contratos",
        description: "Transforme su operación legal en datos accionables. Dashboards interactivos y reportes automatizados que le ayudan a tomar decisiones informadas y demostrar el valor del área legal.",
        bullets: [
          "Dashboards en tiempo real",
          "Reportes automatizados y exportables",
          "Métricas de performance",
          "Análisis predictivo con IA",
        ],
        imagePlaceholder: "Imagen de Analítica",
      },
      {
        id: "trazabilidad",
        tabName: "Trazabilidad",
        title: "Trazabilidad Completa",
        subtitle: "Obtenga insights valiosos sobre su cartera de contratos",
        description: "Transforme su operación legal en datos accionables. Dashboards interactivos y reportes automatizados que le ayudan a tomar decisiones informadas y demostrar el valor del área legal.",
        bullets: [
          "Dashboards en tiempo real",
          "Reportes automatizados y exportables",
          "Métricas de performance",
          "Análisis predictivo con IA",
        ],
        imagePlaceholder: "Imagen de Trazabilidad",
      },
    ] as DealsTab[],
  },
  testimonials: {
    mainTitle: "¿Cómo se siente tener visibilidad total sobre cada contrato?",
    testimonials: [
      {
        id: "testimonial-deals-1",
        name: "Gerente Legal, Empresa",
        role: "",
        company: "",
        logoPlaceholder: "",
        logoPath: null,
        message: "Antes, encontrar un contrato tomaba horas. Ahora, en segundos sé quién lo pidió, quién lo revisó y cuándo se firmó.",
      },
      {
        id: "testimonial-deals-2",
        name: "Head of Legal, Empresa",
        role: "",
        company: "",
        logoPlaceholder: "",
        logoPath: null,
        message: "Con Binder reducimos nuestros tiempos de aprobación contractual de 2 semanas a 2 días.",
      },
    ],
  },
  comparison: {
    title: "Por qué Binder y no el caos legal",
    rows: [
      {
        feature: "Gestión de versiones",
        tradicional: "Versiones duplicadas en carpetas y correos",
        deals: "Repositorio único con trazabilidad total",
      },
      {
        feature: "Revisión de contratos",
        tradicional: "Revisiones lentas y errores humanos",
        deals: "IA que sugiere y valida cláusulas automáticamente",
      },
      {
        feature: "Control de plazos",
        tradicional: "Falta de control sobre plazos",
        deals: "Alertas inteligentes y renovaciones automáticas",
      },
      {
        feature: "Métricas y desempeño",
        tradicional: "Cero métricas del desempeño legal",
        deals: "Dashboards con KPIs y reportería automática",
      },
    ] as ComparisonRow[],
  },
  faq: {
    title: "Preguntas frecuentes",
    intro: "En Binder creemos que la claridad empieza por tener respuestas simples. Aquí resolvemos las dudas más comunes antes de dar el paso hacia una gestión contractual más eficiente.",
    items: [
      {
        id: "faq-deals-1",
        question: "¿Qué diferencia a Binder de otras plataformas CLM?",
        answer: "Binder combina IA legal, automatización y analítica en una sola herramienta diseñada para el contexto local. No es solo un repositorio: es un workspace legal integral que conecta personas, procesos y datos en un mismo flujo de trabajo.",
      },
      {
        id: "faq-deals-2",
        question: "¿Binder reemplaza al abogado?",
        answer: "No, Binder está diseñado para potenciar a los abogados, no reemplazarlos. La IA maneja tareas repetitivas y análisis iniciales, permitiendo que los abogados se enfoquen en decisiones estratégicas y asesoramiento legal de alto valor.",
      },
      {
        id: "faq-deals-3",
        question: "¿Puedo usar mis plantillas actuales?",
        answer: "Sí, Binder permite importar y usar tus plantillas existentes. La IA puede aprender de ellas para mejorar las sugerencias y mantener la consistencia con tus estándares actuales.",
      },
      {
        id: "faq-deals-4",
        question: "¿Cómo garantiza Binder la seguridad y confidencialidad de los datos?",
        answer: "Binder utiliza encriptación de extremo a extremo, controles de acceso granulares, y cumple con los más altos estándares de seguridad y privacidad de datos. Todos los contratos se almacenan de forma segura con respaldos automáticos y auditoría completa.",
      },
      {
        id: "faq-deals-5",
        question: "¿Cuánto tiempo toma implementar Binder?",
        answer: "La implementación típica toma entre 2 a 4 semanas, dependiendo del tamaño de tu organización y la cantidad de contratos históricos a migrar. Nuestro equipo te guía en cada paso del proceso.",
      },
      {
        id: "faq-deals-6",
        question: "¿Binder se integra con mis sistemas (ERP, CRM, BI)?",
        answer: "Sí, Binder ofrece integraciones con sistemas ERP, CRM, BI y otras herramientas empresariales comunes. Esto permite sincronizar datos y mantener toda tu información legal conectada con el resto de tu organización.",
      },
      {
        id: "faq-deals-7",
        question: "¿Qué soporte incluye?",
        answer: "Binder incluye soporte técnico completo, capacitación para usuarios, documentación detallada y un equipo de éxito del cliente dedicado a ayudarte a maximizar el valor de la plataforma.",
      },
    ] as FAQItem[],
  },
};

