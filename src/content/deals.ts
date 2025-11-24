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
  boldParts?: string[];
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
        id: "centralizacion-total",
        tabName: "Centralización",
        title: "Centralización total",
        subtitle: "Un único portal de solicitudes contractuales (intake) con trazabilidad y prioridades claras",
        description: "📁 Sin correos dispersos. Sin documentos perdidos.",
        bullets: [],
        imagePlaceholder: "Imagen de Centralización",
      },
      {
        id: "redaccion-inteligente",
        tabName: "Redacción con IA",
        title: "Redacción inteligente con IA",
        subtitle: "Plantillas estandarizadas y sugerencias automáticas de cláusulas validadas",
        description: "🤖 Evita errores y acelera la redacción hasta un 80 %.",
        bullets: [],
        imagePlaceholder: "Imagen de Redacción inteligente",
      },
      {
        id: "firma-electronica",
        tabName: "Firma Electrónica",
        title: "Firma electrónica integrada y segura",
        subtitle: "Validez jurídica, control de autorizaciones y registro automático de versiones",
        description: "✍️ Firma y archiva todo sin salir de Binder.",
        bullets: [],
        imagePlaceholder: "Imagen de Firma electrónica",
      },
      {
        id: "dashboards-analitica",
        tabName: "Analítica",
        title: "Dashboards de control y analítica",
        subtitle: "Visualiza tiempos de ciclo, KPIs legales y riesgos de vencimiento en tiempo real",
        description: "📊 Demuestra el valor del área legal con datos.",
        bullets: [],
        imagePlaceholder: "Imagen de Dashboards",
      },
      {
        id: "trazabilidad-auditoria",
        tabName: "Trazabilidad",
        title: "Trazabilidad y auditoría completa",
        subtitle: "Cada cambio, firma y versión queda registrada automáticamente",
        description: "🔒 Cumplimiento total",
        bullets: [],
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
        boldParts: ["IA legal, automatización y analítica", "workspace legal integral"],
      },
      {
        id: "faq-deals-2",
        question: "¿Binder reemplaza al abogado?",
        answer: "No. Binder no sustituye la experiencia humana. Libera al abogado de tareas manuales y repetitivas para que se enfoque en lo estratégico: decisiones, asesoría y análisis.",
        boldParts: ["decisiones, asesoría y análisis"],
      },
      {
        id: "faq-deals-3",
        question: "¿Puedo usar mis plantillas actuales?",
        answer: "Sí. Binder importa tus contratos existentes y los transforma en plantillas inteligentes compatibles con IA, respetando tu estilo jurídico y formato corporativo.",
        boldParts: ["plantillas inteligentes compatibles con IA"],
      },
      {
        id: "faq-deals-4",
        question: "¿Cómo garantiza Binder la seguridad y confidencialidad de los datos?",
        answer: "La seguridad está en el centro de nuestra arquitectura. Binder cumple con los más altos estándares internacionales de seguridad de la información: SOC 2 Tipo II, ISO 27001, ISO 27017 e ISO 27018, además de pruebas de penetración y hacking ético regulares. Garantizamos la protección de datos sensibles y el cumplimiento normativo en cada operación, con servidores de alta seguridad.",
        boldParts: ["SOC 2 Tipo II, ISO 27001, ISO 27017 e ISO 27018", "pruebas de penetración y hacking ético", "protección de datos sensibles", "cumplimiento normativo en cada operación"],
      },
      {
        id: "faq-deals-5",
        question: "¿Cuánto tiempo toma implementar Binder?",
        answer: "La implementación completa toma entre 2 y 4 semanas, según el volumen de documentos y plantillas. Sin embargo, puedes empezar a usar Binder desde la primera semana con tus flujos más simples, e ir ampliando progresivamente hasta una operación integral.",
        boldParts: ["2 y 4 semanas", "empezar a usar Binder desde la primera semana"],
      },
      {
        id: "faq-deals-6",
        question: "¿Binder se integra con mis sistemas (ERP, CRM, BI)?",
        answer: "Sí. Binder está preparado para conectarse con otras soluciones mediante API y conectores personalizados.",
      },
      {
        id: "faq-deals-7",
        question: "¿Qué soporte incluye?",
        answer: "Contarás con soporte técnico continuo, un equipo de Customer Success dedicado a tu implementación y capacitaciones Legal Ops para asegurar que tu equipo aproveche todo el potencial de Binder.",
        boldParts: ["soporte técnico continuo", "Customer Success", "capacitaciones Legal Ops"],
      },
    ] as FAQItem[],
  },
};

