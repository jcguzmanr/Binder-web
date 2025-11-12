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
      support: "Sin trazabilidad ni visibilidad, los riesgos aumentan y el valor del equipo queda oculto.",
    },
    {
      question: "¿Cada persona maneja su propia versión del documento?",
      headline: "Contratos sin una versión única de la verdad",
      support: "Binder centraliza todo en un solo espacio colaborativo con historial completo.",
    },
    {
      question: "¿El equipo legal dedica horas a tareas manuales?",
      headline: "Tareas repetitivas que ocultan el valor del equipo",
      support: "Binder une todo lo legal en un solo espacio con IA que automatiza y muestra resultados.",
    },
  ] as WhyBinderSlide[],
  autoAdvanceSeconds: 5,
};

