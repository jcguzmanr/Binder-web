export const contactoContent = {
  title: "Descubre cómo Binder transforma la gestión legal.",
  description: "Binder centraliza contratos, procesos, expedientes y firmas en una sola plataforma inteligente.",
  callToAction: "Agenda una demo y conoce cómo los equipos legales más eficientes trabajan con Binder.",
  
  form: {
    title: "Agenda tu demo",
    fields: {
      name: {
        label: "Nombre y apellido",
        placeholder: "Tu nombre completo",
        required: true,
      },
      company: {
        label: "Empresa / Estudio",
        placeholder: "Nombre de tu organización",
        required: true,
      },
      email: {
        label: "Correo corporativo",
        placeholder: "tu.email@empresa.com",
        required: true,
        type: "email",
      },
      phone: {
        label: "Teléfono",
        placeholder: "+51 999 999 999",
        required: false,
        type: "tel",
      },
      message: {
        label: "Cuéntanos brevemente tus necesidades legales",
        placeholder: "¿Qué desafíos enfrenta tu área legal?",
        required: false,
        type: "textarea",
      },
    },
    consent: {
      text: "Acepto que Binder contacte conmigo con información sobre sus productos y servicios.",
      required: true,
    },
    submitText: "Solicita tu Demo",
  },
};

