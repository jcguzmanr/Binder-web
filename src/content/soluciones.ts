export interface SolutionTab {
  id: string;
  tabName: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  imagePlaceholder: string;
}

export const solucionesContent = {
  mainTitle: "Binder — La plataforma legal con IA para equipos que buscan orden, eficiencia y control",
  tabs: [
    {
      id: "centralizacion",
      tabName: "Centralización",
      title: "Centraliza y toma el control",
      subtitle: "Del caos a la visibilidad total.",
      description: "Unifica todas las solicitudes, documentos y flujos de trabajo en un solo espacio. Mantén el control completo con trazabilidad en tiempo real.",
      bullets: [
        "Intake único y trazabilidad completa.",
        "Alertas en tiempo real y tableros de control.",
        "Visibilidad total del flujo del equipo.",
      ],
      imagePlaceholder: "Imagen de centralización",
    },
    {
      id: "automatizacion",
      tabName: "Automatización",
      title: "Automatiza lo repetitivo",
      subtitle: "Libera tiempo, aumenta el impacto.",
      description: "Deja que la IA se encargue de las tareas manuales y repetitivas. Enfócate en el trabajo estratégico que realmente importa.",
      bullets: [
        "Generación automática de documentos.",
        "Clasificación inteligente con IA.",
        "Alertas y recordatorios automatizados.",
      ],
      imagePlaceholder: "Imagen de automatización",
    },
    {
      id: "gestion",
      tabName: "Gestión",
      title: "Gestiona con claridad",
      subtitle: "Todo bajo control, sin sorpresas.",
      description: "Administra contratos, expedientes y procesos desde una plataforma única. Accede a la información que necesitas, cuando la necesitas.",
      bullets: [
        "Gestión completa de ciclo de vida contractual.",
        "Seguimiento de expedientes judiciales.",
        "Workflows personalizables y escalables.",
      ],
      imagePlaceholder: "Imagen de gestión",
    },
    {
      id: "analitica",
      tabName: "Analítica",
      title: "Analiza y decide mejor",
      subtitle: "Datos claros, decisiones inteligentes.",
      description: "Convierte datos legales en insights accionables. Reportes en tiempo real que muestran el valor real de tu equipo.",
      bullets: [
        "Dashboards personalizados y en tiempo real.",
        "Análisis de riesgos y cumplimiento.",
        "Reportes automatizados para stakeholders.",
      ],
      imagePlaceholder: "Imagen de analítica",
    },
    {
      id: "firma",
      tabName: "Firma Electrónica",
      title: "Firma con validez legal",
      subtitle: "Rápido, seguro y sin papel.",
      description: "Firma electrónica integrada con validez legal completa. Acelera tus procesos sin comprometer la seguridad.",
      bullets: [
        "Firma electrónica simple y avanzada.",
        "Integración directa con tus documentos.",
        "Cumplimiento normativo garantizado.",
      ],
      imagePlaceholder: "Imagen de firma electrónica",
    },
  ] as SolutionTab[],
};

