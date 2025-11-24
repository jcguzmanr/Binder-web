export interface ExpedienteTab {
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
  expedienteDigital: string | boolean;
}

export const expedienteDigitalContent = {
  hero: {
    title: "Mesa de Partes Online - Automatiza, controla y mide tu operación jurídica",
    subtitle: "Convierte el trabajo operativo en procesos claros, trazables y colaborativos. Binder transforma la gestión legal en una experiencia eficiente y medible, con IA que prioriza, alerta y aprende de tus flujos diarios.",
    ctaText: "Agenda tu Demo",
  },
  stats: {
    question: "¿Tu equipo legal invierte más tiempo en tareas que en estrategia?",
    percentage: 60,
    text: "del tiempo del equipo legal se pierde en",
    description: "Binder organiza, automatiza y da visibilidad a todo tu flujo legal para que el tiempo del equipo genere valor.",
  },
  tabs: {
    mainTitle: "Menos seguimiento. Más resultados.",
    subtitle: "Binder convierte la operación jurídica en flujos automatizados con IA, diseñados para dar visibilidad y orden en cada paso. Desde la recepción de solicitudes hasta su cierre, todo queda centralizado, trazado y asignado.",
    tabs: [
      {
        id: "automatizacion",
        tabName: "Automatización",
        title: "Automatización",
        subtitle: "Define aprobaciones, responsables y pasos según tipo de proceso",
        description: "🔁 Elimina tareas repetitivas y estandariza la atención legal.",
        bullets: [],
        imagePlaceholder: "Imagen de Automatización",
      },
      {
        id: "alertas",
        tabName: "Alertas",
        title: "Alertas",
        subtitle: "Recibe notificaciones antes de cada vencimiento o evento clave",
        description: "📅 Binder te recuerda lo importante antes de que se convierta en urgencia.",
        bullets: [],
        imagePlaceholder: "Imagen de Alertas",
      },
      {
        id: "colaboracion",
        tabName: "Colaboración",
        title: "Colaboración",
        subtitle: "Asignación de tareas, comentarios y seguimiento visible para todo el equipo",
        description: "🤝 Menos correos, más acción compartida.",
        bullets: [],
        imagePlaceholder: "Imagen de Colaboración",
      },
      {
        id: "analitica",
        tabName: "Analítica",
        title: "Analítica",
        subtitle: "Monitorea carga de trabajo, cumplimiento y tiempos de respuesta",
        description: "📊 Convierte la gestión operativa en indicadores de eficiencia.",
        bullets: [],
        imagePlaceholder: "Imagen de Analítica",
      },
      {
        id: "predictibilidad",
        tabName: "Predictibilidad",
        title: "Predictibilidad",
        subtitle: "Binder aprende de tus flujos para recomendar mejoras automáticas y detectar patrones de trabajo",
        description: "🧠 Operación más inteligente con cada uso.",
        bullets: [],
        imagePlaceholder: "Imagen de Predictibilidad",
      },
    ] as ExpedienteTab[],
  },
  testimonials: {
    mainTitle: "¿Qué pasa cuando los procesos legales fluyen con claridad y seguimiento real?",
    testimonials: [
      {
        id: "testimonial-1",
        name: "Coordinadora Legal, Multinacional de Servicios",
        role: "",
        company: "",
        logoPlaceholder: "",
        logoPath: null,
        message: "Pasamos de 200 correos semanales a 20. Todo está en un tablero con trazabilidad completa.",
      },
      {
        id: "testimonial-2",
        name: "Jefe de Asuntos Legales, Empresa Industrial",
        role: "",
        company: "",
        logoPlaceholder: "",
        logoPath: null,
        message: "Binder nos permitió controlar plazos, tareas y riesgos sin depender de hojas de cálculo.",
      },
    ],
  },
  comparison: {
    title: "Por qué Binder y no los flujos de siempre",
    rows: [
      {
        feature: "Gestión de solicitudes",
        tradicional: "Solicitudes perdidas en correo",
        expedienteDigital: "Intake centralizado y priorizado",
      },
      {
        feature: "Asignación de tareas",
        tradicional: "Tareas sin responsable definido",
        expedienteDigital: "Asignaciones automáticas con seguimiento",
      },
      {
        feature: "Control y seguimiento",
        tradicional: "Sin control de plazos ni avances",
        expedienteDigital: "Alertas inteligentes y reportes",
      },
      {
        feature: "Métricas y análisis",
        tradicional: "Falta de métricas",
        expedienteDigital: "Analítica visual con KPIs y dashboards",
      },
    ] as ComparisonRow[],
  },
  faq: {
    title: "Preguntas frecuentes",
    intro: "Sabemos que implementar una nueva herramienta en el área legal puede generar dudas. Aquí respondemos las más comunes, con la misma claridad con la que Binder organiza tus procesos.",
    items: [
      {
        id: "faq-1",
        question: "¿Binder puede adaptarse a mis flujos legales específicos?",
        answer: "Sí. Binder permite configurar flujos personalizados sin necesidad de programación. Puedes crear tus propios tipos de proceso, responsables y reglas de aprobación.",
      },
      {
        id: "faq-2",
        question: "¿Puedo buscar documentos rápidamente dentro de mis expedientes?",
        answer: "Sí. Binder cuenta con un buscador avanzado por palabra clave, tipo de documento o parte involucrada. Puedes acceder al documento correcto en segundos, incluso desde tu móvil.",
      },
      {
        id: "faq-3",
        question: "¿Necesito TI para implementar los flujos?",
        answer: "No. Todo se configura con una interfaz visual simple. Nuestro equipo de Customer Success te acompaña paso a paso durante el onboarding.",
      },
      {
        id: "faq-4",
        question: "¿Binder incluye analítica de desempeño?",
        answer: "Sí. Cada proceso genera métricas automáticas: tiempos de resolución, carga del equipo y cumplimiento de plazos.",
      },
      {
        id: "faq-5",
        question: "¿Puedo empezar con un solo flujo y escalar después?",
        answer: "Claro. Puedes comenzar con un proceso (por ejemplo, consultas legales o licencias) y luego ir agregando más conforme tu equipo se familiariza.",
      },
      {
        id: "faq-6",
        question: "¿Qué tipo de procesos puedo gestionar con Binder?",
        answer: "Consultas legales, contratos, litigios, auditorías, regulatorio, permisos, compliance y más. Binder se adapta al ritmo y estructura de tu área.",
      },
    ] as FAQItem[],
  },
};

