export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  logoPlaceholder: string;
  logoPath?: string;
  message: string;
}

export const testimoniosContent = {
  mainTitle: "Las áreas legales más eficientes confían en Binder",
  testimonials: [
    {
      id: "haylin-tello",
      name: "Haylin Tello",
      role: "Gerente Legal",
      company: "Laive",
      logoPlaceholder: "Logo Laive",
      logoPath: "/Laive_Logo.png",
      message: "Binder nos permitió centralizar todos nuestros contratos y procesos. Ahora tenemos visibilidad total y hemos reducido tiempos de respuesta significativamente.",
    },
    {
      id: "erika-rafael",
      name: "Erika Rafael",
      role: "Socia",
      company: "Grupo EFE",
      logoPlaceholder: "Logo Grupo EFE",
      logoPath: "/logo-EFE.png",
      message: "La automatización con IA ha transformado nuestro día a día. Lo que antes tomaba horas, ahora se resuelve en minutos. El equipo puede enfocarse en lo estratégico.",
    },
    {
      id: "testimonio-3",
      name: "Roberto Vargas",
      role: "Director Legal",
      company: "Rodman & Asociados",
      logoPlaceholder: "Logo Rodman & Asociados",
      logoPath: "/roadmon-logo.jpeg",
      message: "Implementar Binder fue un cambio radical para nosotros. La trazabilidad completa y los reportes en tiempo real nos dan un control que nunca habíamos tenido.",
    },
  ] as Testimonial[],
};

