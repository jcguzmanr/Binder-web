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
        { label: "Sobre Binder", href: "#home" },
        { label: "Iniciar sesión", href: "https://app.binder.com.pe" },
      ],
    },
    {
      title: "Plataforma",
      links: [
        { label: "Por qué Binder", href: "#porquebinder" },
        { label: "Funcionalidades", href: "#soluciones" },
        { label: "Testimonios", href: "#testimonios" },
        { label: "Blog", href: "#blog" },
        { label: "Agenda Demo", href: "#contacto" },
      ],
    },
    {
      title: "Casos de uso",
      links: [
        { label: "CLM con IA", href: "#deals" },
        { label: "Gestión de procesos legales", href: "#cases" },
        { label: "Expediente digital y mesa de partes", href: "#archive" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Política de privacidad", href: "#privacidad" },
        { label: "Términos y condiciones", href: "#terminos" },
        { label: "Aviso legal", href: "#aviso" },
        { label: "Seguridad de datos / cumplimiento", href: "#seguridad" },
        { label: "Libro de reclamaciones", href: "#reclamaciones" },
      ],
    },
  ] as FooterColumn[],
  socialLinks: {
    linkedin: "https://www.linkedin.com/company/binder-legal",
  },
  legalNote: "© 2025 Binder. Todos los derechos reservados.",
};

