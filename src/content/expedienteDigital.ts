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
    ctaText: "Solicita tu Demo",
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
        id: "mesa-partes",
        tabName: "Mesa de Partes Digital",
        title: "Mesa de Partes Digital",
        subtitle: "Reciba, procese y archive documentos de manera digital y eficiente",
        description: "Elimine el papel y automatice los flujos de trabajo de su mesa de partes tradicional. Reciba documentos digitales, asigne responsables automáticamente y mantenga un registro completo de todas las operaciones.",
        bullets: [
          "Recepción digital de documentos",
          "Asignación automática de responsables",
          "Registro completo de operaciones",
          "Notificaciones automáticas",
        ],
        imagePlaceholder: "Imagen de Mesa de Partes Digital",
      },
      {
        id: "gestion-expedientes",
        tabName: "Gestión de Expedientes",
        title: "Gestión de Expedientes",
        subtitle: "Organice y gestione todos sus expedientes desde una plataforma centralizada",
        description: "Acceda a documentos, historial y seguimiento de estado desde cualquier lugar y en cualquier momento. Organice expedientes por categorías, estados y responsables.",
        bullets: [
          "Plataforma centralizada",
          "Acceso desde cualquier lugar",
          "Historial completo de cambios",
          "Búsqueda avanzada",
        ],
        imagePlaceholder: "Imagen de Gestión de Expedientes",
      },
      {
        id: "trazabilidad",
        tabName: "Trazabilidad Completa",
        title: "Trazabilidad Completa",
        subtitle: "Mantenga un registro completo de todas las acciones realizadas",
        description: "Cada acción sobre un expediente queda registrada con timestamps, usuarios responsables y cambios de estado para una auditoría completa y transparente.",
        bullets: [
          "Registro de todas las acciones",
          "Timestamps automáticos",
          "Historial de usuarios",
          "Auditoría completa",
        ],
        imagePlaceholder: "Imagen de Trazabilidad",
      },
      {
        id: "busqueda",
        tabName: "Búsqueda Avanzada",
        title: "Búsqueda Avanzada",
        subtitle: "Encuentre rápidamente cualquier documento o expediente",
        description: "Nuestra herramienta de búsqueda avanzada permite filtrar por múltiples criterios y realizar búsquedas de texto completo en el contenido de los documentos.",
        bullets: [
          "Búsqueda de texto completo",
          "Filtros múltiples",
          "Búsqueda por metadatos",
          "Resultados instantáneos",
        ],
        imagePlaceholder: "Imagen de Búsqueda Avanzada",
      },
    ] as ExpedienteTab[],
  },
  testimonials: {
    mainTitle: "¿Qué pasa cuando los procesos legales fluyen con claridad y seguimiento",
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
    title: "Comparativa: Mesa de Partes Tradicional vs Expediente Digital",
    rows: [
      {
        feature: "Recepción de documentos",
        tradicional: "Presencial, papel",
        expedienteDigital: "Digital, desde cualquier lugar",
      },
      {
        feature: "Tiempo de procesamiento",
        tradicional: "Días o semanas",
        expedienteDigital: "Minutos u horas",
      },
      {
        feature: "Trazabilidad",
        tradicional: "Manual, limitada",
        expedienteDigital: "Completa y automática",
      },
      {
        feature: "Búsqueda de documentos",
        tradicional: "Física, lenta",
        expedienteDigital: "Instantánea, avanzada",
      },
      {
        feature: "Acceso remoto",
        tradicional: false,
        expedienteDigital: true,
      },
      {
        feature: "Notificaciones automáticas",
        tradicional: false,
        expedienteDigital: true,
      },
      {
        feature: "Auditoría",
        tradicional: "Compleja, manual",
        expedienteDigital: "Automática, completa",
      },
      {
        feature: "Costo de almacenamiento",
        tradicional: "Alto (físico)",
        expedienteDigital: "Bajo (digital)",
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
        answer: "Sí, Binder incluye búsqueda avanzada que permite encontrar documentos por texto completo, metadatos, fechas y más criterios. La búsqueda es instantánea y precisa.",
      },
      {
        id: "faq-3",
        question: "¿Necesito TI para implementar los flujos?",
        answer: "No, Binder está diseñado para que los equipos legales configuren sus propios flujos sin necesidad de conocimientos técnicos. Nuestro equipo de soporte está disponible para ayudarte en el proceso.",
      },
      {
        id: "faq-4",
        question: "¿Binder incluye analítica de desempeño?",
        answer: "Sí, Binder incluye dashboards y reportes que te permiten medir el desempeño de tu equipo, tiempos de procesamiento, carga de trabajo y más métricas relevantes para el área legal.",
      },
      {
        id: "faq-5",
        question: "¿Puedo empezar con un solo flujo y escalar después?",
        answer: "Absolutamente. Binder está diseñado para crecer contigo. Puedes comenzar con un proceso específico y agregar más flujos gradualmente según tus necesidades.",
      },
      {
        id: "faq-6",
        question: "¿Qué tipo de procesos puedo gestionar con Binder?",
        answer: "Binder puede gestionar cualquier tipo de proceso legal: contratos, solicitudes, expedientes administrativos, aprobaciones, revisiones, y más. La plataforma es flexible y se adapta a tus necesidades específicas.",
      },
    ] as FAQItem[],
  },
};

