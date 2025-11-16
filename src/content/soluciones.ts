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
      description: "Deja atrás correos, carpetas compartidas y hojas de Excel: Binder concentra contratos, procesos, tareas y documentos en un solo lugar. Cada solicitud tiene responsable, estado y prioridad. Ningún pendiente se pierde.",
      bullets: [
        "Intake único y trazabilidad completa",
        "Tableros de control y alertas en tiempo real",
        "Visibilidad del flujo de trabajo de todo el equipo",
      ],
      imagePlaceholder: "Imagen de centralización",
    },
    {
      id: "automatizacion",
      tabName: "Automatización",
      title: "Automatiza y acelera",
      subtitle: "De la carga manual a la eficiencia automática.",
      description: "Binder convierte tareas repetitivas en flujos automatizados con IA legal. Genera contratos, informes o aprobaciones en segundos y elimina errores de versión.",
      bullets: [
        "Redacción automática de contratos con IA",
        "Workflows configurables sin depender de TI",
        "Aprobaciones y recordatorios automáticos",
      ],
      imagePlaceholder: "Imagen de automatización",
    },
    {
      id: "gestion",
      tabName: "Gestión",
      title: "Gestiona procesos con trazabilidad total",
      subtitle: "De lo disperso a lo medible.",
      description: "Cada trámite, auditoría o caso tiene seguimiento, fechas y responsables definidos. Binder organiza los procesos legales para que el equipo trabaje de forma colaborativa y sin fricción.",
      bullets: [
        "Registro único de procesos y etapas",
        "Alertas de cumplimiento y vencimientos",
        "Integraciones con ERP y CRM",
      ],
      imagePlaceholder: "Imagen de gestión",
    },
    {
      id: "analitica",
      tabName: "Analítica",
      title: "Analiza, mide y demuestra impacto",
      subtitle: "De lo invisible a lo estratégico.",
      description: "Binder transforma tu operación en datos: tiempos, carga, cumplimiento, riesgo. Convierte métricas en argumentos para mostrar el valor del área legal ante la dirección.",
      bullets: [
        "Dashboards de performance legal",
        "Reportes automáticos y exportables",
        "Insights accionables con IA",
      ],
      imagePlaceholder: "Imagen de analítica",
    },
    {
      id: "firma",
      tabName: "Firma Electrónica",
      title: "Firma con confianza",
      subtitle: "De firmas dispersas a control digital total.",
      description: "Integra la firma electrónica y registro automático de autorizaciones. Binder elimina los errores, centraliza versiones y garantiza trazabilidad completa.",
      bullets: [
        "Firma electrónica",
        "Control de permisos y auditoría de accesos",
        "Registro seguro y versiones inmutables",
      ],
      imagePlaceholder: "Imagen de firma electrónica",
    },
  ] as SolutionTab[],
};

