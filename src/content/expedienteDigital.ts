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
    title: "Expediente Digital y Mesa de Partes",
    subtitle: "Digitalice completamente su mesa de partes y transforme la gestión de expedientes con nuestra solución integral.",
    ctaText: "Agendar Demo",
  },
  stats: {
    percentage: 60,
    text: "de reducción en tiempos de procesamiento",
    description: "Con nuestra solución de expediente digital, las organizaciones han logrado reducir significativamente los tiempos de procesamiento de documentos y expedientes.",
  },
  tabs: {
    mainTitle: "Funcionalidades de Expediente Digital",
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
    mainTitle: "Organizaciones que confían en Expediente Digital",
    testimonials: [
      {
        id: "testimonial-1",
        name: "María González",
        role: "Directora Legal",
        company: "Gobierno Regional",
        logoPlaceholder: "Logo Gobierno",
        logoPath: null,
        message: "La implementación del expediente digital ha transformado completamente nuestra mesa de partes. Ahora procesamos documentos en minutos en lugar de días.",
      },
      {
        id: "testimonial-2",
        name: "Carlos Ramírez",
        role: "Gerente Administrativo",
        company: "Municipalidad",
        logoPlaceholder: "Logo Municipalidad",
        logoPath: null,
        message: "La trazabilidad completa nos ha permitido mejorar significativamente nuestros procesos internos y cumplir con todos los requisitos de auditoría.",
      },
      {
        id: "testimonial-3",
        name: "Ana Martínez",
        role: "Jefa de Mesa de Partes",
        company: "Institución Pública",
        logoPlaceholder: "Logo Institución",
        logoPath: null,
        message: "La búsqueda avanzada nos ahorra horas de trabajo. Encontrar un expediente específico ahora toma segundos en lugar de horas.",
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
    title: "Preguntas Frecuentes",
    items: [
      {
        id: "faq-1",
        question: "¿Cómo funciona la recepción digital de documentos?",
        answer: "La recepción digital permite que los usuarios suban documentos a través de un portal web o aplicación móvil. Los documentos se procesan automáticamente, se asignan a responsables y se registran en el sistema con timestamps y metadatos completos.",
      },
      {
        id: "faq-2",
        question: "¿Es seguro almacenar documentos digitales?",
        answer: "Sí, nuestro sistema utiliza encriptación de extremo a extremo, respaldos automáticos y controles de acceso granulares. Cumplimos con los más altos estándares de seguridad y privacidad de datos.",
      },
      {
        id: "faq-3",
        question: "¿Puedo migrar documentos físicos existentes?",
        answer: "Sí, ofrecemos servicios de digitalización y migración de documentos físicos. Nuestro equipo puede ayudarle a escanear, indexar y organizar sus documentos históricos en el sistema digital.",
      },
      {
        id: "faq-4",
        question: "¿Qué tipo de documentos puedo gestionar?",
        answer: "Puede gestionar cualquier tipo de documento: contratos, solicitudes, oficios, resoluciones, expedientes administrativos, documentos legales y más. El sistema soporta múltiples formatos incluyendo PDF, Word, Excel e imágenes.",
      },
      {
        id: "faq-5",
        question: "¿Cómo funciona la asignación automática de responsables?",
        answer: "El sistema utiliza reglas configurables basadas en el tipo de documento, categoría o palabras clave. Puede configurar flujos de trabajo que asignen automáticamente documentos a los responsables apropiados según sus criterios específicos.",
      },
      {
        id: "faq-6",
        question: "¿Necesito capacitación especial para usar el sistema?",
        answer: "No, nuestro sistema está diseñado para ser intuitivo y fácil de usar. Ofrecemos capacitación inicial y documentación completa. La mayoría de los usuarios se sienten cómodos usando el sistema después de una sesión de capacitación breve.",
      },
    ] as FAQItem[],
  },
};

