export interface App {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  color: string;
  imagePlaceholder: string;
  link: string;
  status?: 'available' | 'development';
}

export const appsContent = {
  mainTitle: "Descubre cómo Binder se adapta a cada equipo legal",
  subtitle: "Tres soluciones diseñadas para diferentes desafíos: desde la gestión de contratos hasta el control total de procesos y expedientes.",
  apps: [
    {
      id: "cases",
      name: "Cases",
      subtitle: "Gestión de procesos judiciales y administrativos",
      description: "Digitaliza expedientes completos y mantén control total de todos tus flujos legales. Seguimiento en tiempo real y acceso instantáneo.",
      color: "var(--navy)",
      imagePlaceholder: "Icono de Cases",
      link: "#cases",
      status: 'available',
    },
    {
      id: "deals",
      name: "Deals",
      subtitle: "CLM con IA",
      description: "Optimiza la gestión contractual de principio a fin. Automatiza tareas repetitivas y reduce tiempos de revisión con inteligencia artificial.",
      color: "var(--bright-purple)",
      imagePlaceholder: "Icono de Deals",
      link: "#deals",
      status: 'available',
    },
    {
      id: "archive",
      name: "Archive",
      subtitle: "Mesa de Partes Online y Portal de Requerimientos",
      description: "Centraliza todas las solicitudes y tareas operativas del equipo. Intake único con trazabilidad completa desde el inicio.",
      color: "var(--light-blue)",
      imagePlaceholder: "Icono de Archive",
      link: "#archive",
      status: 'available',
    },
    // Comentadas temporalmente - se mostrarán más adelante
    // {
    //   id: "comply",
    //   name: "Comply",
    //   subtitle: "Cumplimiento normativo",
    //   description: "Gestiona y monitorea el cumplimiento regulatorio. Alertas automáticas y reportes de cumplimiento en tiempo real.",
    //   color: "var(--medium-blue)",
    //   imagePlaceholder: "Icono de Comply",
    //   link: "#comply",
    //   status: 'development',
    // },
    // {
    //   id: "tally",
    //   name: "Tally",
    //   subtitle: "Control financiero y reportes",
    //   description: "Controla presupuestos, gastos legales y genera reportes financieros detallados. Visibilidad total del área legal.",
    //   color: "var(--accent-teal)",
    //   imagePlaceholder: "Icono de Tally",
    //   link: "#tally",
    //   status: 'development',
    // },
    // {
    //   id: "quorum",
    //   name: "Quorum",
    //   subtitle: "Gestión de directorios y reuniones",
    //   description: "Organiza juntas de accionistas y directorios. Votaciones digitales y gestión documental completa.",
    //   color: "var(--very-light-blue)",
    //   imagePlaceholder: "Icono de Quorum",
    //   link: "#quorum",
    //   status: 'development',
    // },
  ] as App[],
};

