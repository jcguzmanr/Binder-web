/**
 * Event landing pages — content keyed by URL slug (`/eventos/:slug`).
 * Swap `heroImageUrl` when the key visual is delivered.
 */

export interface EventSpeaker {
  name: string;
  initials: string;
  role: string;
  company: string;
  bio: string;
  avatarUrl?: string;
}

export interface EventMetaBadge {
  text: string;
  /** CSS color for badge background (e.g. Zoom blue) */
  background?: string;
}

export interface EventMeta {
  icon: string;
  label: string;
  /** Main line (can include simple text; use `sub` for muted secondary) */
  value: string;
  sub?: string;
  badge?: EventMetaBadge;
}

export interface EventData {
  slug: string;
  /** Co-host label shown in nav pill (e.g. NIUBOX) */
  coHostPill?: string;
  seoTitle: string;
  seoDescription: string;
  badgeText: string;
  /** Title line 1: text before highlighted word */
  titleLine1Before: string;
  /** Word(s) highlighted in teal */
  titleLine1Highlight: string;
  /** Title line 1: text after highlight (e.g. ":") */
  titleLine1After: string;
  /** Subtitle under H1 */
  titleLine2: string;
  description: string;
  meta: EventMeta[];
  speakers: EventSpeaker[];
  formHeading: string;
  formSubtext: string;
  formSubtextStrong?: string;
  ctaText: string;
  navTag: string;
  footerLogos: string[];
  footerNote: string;
  formNoteHtml?: string;
  /** Optional hero image URL — when set, shows key visual slot above copy */
  heroImageUrl?: string;
  heroImageAlt?: string;
}

export const eventsBySlug: Record<string, EventData> = {
  'webinar-legalops-binder-niubox': {
    slug: 'webinar-legalops-binder-niubox',
    coHostPill: 'NIUBOX',
    seoTitle: 'De lo reactivo al control — Binder × Niubox | Webinar',
    seoDescription:
      'Webinar gratuito: cómo preparar tu área legal para un negocio que ya no espera. Binder y Niubox. 15 de abril de 2026.',
    badgeText: 'Webinar gratuito',
    titleLine1Before: 'De lo reactivo al ',
    titleLine1Highlight: 'control',
    titleLine1After: ':',
    titleLine2:
      'cómo preparar tu área legal\npara un negocio que ya no espera',
    description:
      'El mercado cambió, la tecnología avanzó y otras áreas ya operan con más eficiencia. Legal no puede ser la excepción. Únete a esta conversación sobre cómo elevar su madurez operativa y responder con más orden, trazabilidad y eficiencia.',
    meta: [
      {
        icon: '📅',
        label: 'Fecha',
        value: 'Miércoles 15 de abril, 2026',
      },
      {
        icon: '⏰',
        label: 'Hora',
        value: '11:00 AM',
        sub: '· 60 minutos · Acceso gratuito · Cupo limitado',
      },
      {
        icon: '💻',
        label: 'Plataforma',
        value: '',
        sub: 'Online · Link al confirmar registro',
        badge: { text: '★ Zoom', background: '#1a6fd4' },
      },
      {
        icon: '🎙',
        label: 'Speakers',
        value:
          'Oscar Montezuma · Niubox + Carlos Arana · Binder',
      },
    ],
    speakers: [
      {
        name: 'Carlos Arana',
        initials: 'CA',
        role: 'CEO & Founder · Binder',
        company: 'Binder',
        bio: 'Construyó Binder para resolver el caos operativo del trabajo legal. Acompaña a equipos desde el diagnóstico hasta la adopción.',
        avatarUrl: '/imgs-webinar/carlos.png',
      },
      {
        name: 'Oscar Montezuma',
        initials: 'OM',
        role: 'CEO & Founder · Niubox Legal | Digital',
        company: 'Niubox',
        bio: 'Consultor experto en diagnóstico y transformación operativa de áreas legales. Cree que la tecnología llega después del proceso.',
        avatarUrl: '/imgs-webinar/oscar.png',
      },
    ],
    formHeading: 'Reserva tu lugar',
    formSubtext: 'Cupo limitado. ',
    formSubtextStrong: 'Es gratuito.',
    ctaText: 'Inscríbete',
    navTag: 'Webinar · 15 Abr 2026',
    footerLogos: ['BINDER', 'NIUBOX LEGAL | DIGITAL', 'PROGRAMA PI'],
    footerNote: '© 2026 · Webinar LegalTech · De lo reactivo al control',
    formNoteHtml:
      'Al registrarte aceptas recibir comunicaciones de Binder y Niubox.<br /><strong>Sin spam. Puedes darte de baja en cualquier momento.</strong>',
    // heroImageUrl: '/images/eventos/webinar-hero.jpg',
  },
};

export function getEventBySlug(slug: string | undefined): EventData | undefined {
  if (!slug) return undefined;
  return eventsBySlug[slug];
}

export const eventSlugs = Object.keys(eventsBySlug);
