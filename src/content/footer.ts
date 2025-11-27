export interface FooterColumn {
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}

export const footerContent = {
  columns: [
    {
      title: "Compañía",
      links: [
        { label: "Sobre Binder", href: "/sobrebinder" },
        { label: "Iniciar sesión", href: "https://app.binder.com.pe" },
      ],
    },
    {
      title: "Plataforma",
      links: [
        { label: "Por qué Binder", href: "#porquebinder" },
        { label: "Funcionalidades", href: "#soluciones" },
        { label: "Testimonios", href: "#testimonios" },
        { label: "Contacto", href: "#contacto" },
      ],
    },
    {
      title: "Casos de uso",
      links: [
        { label: "CLM con IA", href: "/casos-uso/clm" },
        { label: "Gestión de procesos legales", href: "/casos-uso/gestion-procesos" },
        { label: "Expediente digital y mesa de partes", href: "/casos-uso/expediente-digital" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Política de privacidad", href: "/legal/privacidad" },
        { label: "Política de cookies", href: "/legal/cookies" },
        { label: "Términos y condiciones", href: "/legal/terminos" },
        { label: "Aviso legal", href: "/legal/aviso" },
        { label: "Seguridad de datos / cumplimiento", href: "/legal/seguridad" },
        { label: "Libro de reclamaciones", href: "/legal/reclamaciones" },
      ],
    },
  ] as FooterColumn[],
  socialLinks: {
    linkedin: "https://www.linkedin.com/company/thelegalbinder/",
  },
  legalNote: "© 2025 Binder. Todos los derechos reservados.",
};

