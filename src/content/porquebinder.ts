export interface WhyBinderSlide {
  question: string;
  headline: string;
  support: string;
}

export const whyBinderContent = {
  slides: [
    {
      question: "¿Tu equipo está desbordado con solicitudes dispersas?",
      headline: "Correos dispersos llenos de solicitudes sin seguimiento",
      support: "Sin trazabilidad ni visibilidad, los riesgos aumentan y el valor del equipo queda oculto. Binder une todo lo legal en un solo espacio, con IA que automatiza y muestra resultados.",
    },
    {
      question: "¿Cada persona maneja su propia versión del documento?",
      headline: "Documentos y versiones sin control ni trazabilidad",
      support: "Sin trazabilidad ni visibilidad, los riesgos aumentan y el valor del equipo queda oculto. Binder une todo lo legal en un solo espacio, con IA que automatiza y muestra resultados.",
    },
    {
      question: "¿El equipo legal dedica horas a tareas manuales?",
      headline: "Hasta 30 % del tiempo operativo se pierde solo organizando información",
      support: "Sin trazabilidad ni visibilidad, los riesgos aumentan y el valor del equipo queda oculto. Binder une todo lo legal en un solo espacio, con IA que automatiza y muestra resultados.",
    },
  ] as WhyBinderSlide[],
  autoAdvanceSeconds: 5,
};

