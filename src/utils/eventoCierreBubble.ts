import { normalizeBubbleWorkflowPostUrl } from './bubbleWorkflowUrl';

/** Contrato compartido con workflow Bubble `evento-de-cierre` (Contact y EventPage). */
export interface EventoCierreBubblePayload {
  /** Nombre completo — parámetro esperado por el workflow Bubble (`Nombres`). */
  Nombres: string;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  company: string;
  phone: string;
  phoneCountry: string;
  consent: boolean;
  timestamp: string;
}

const DEFAULT_EVENTS_WEBHOOK_URL =
  'https://binder0.bubbleapps.io/version-test/api/1.1/wf/evento-de-cierre';

/** Misma URL que la landing de eventos (`VITE_EVENTS_WEBHOOK_URL` o default). */
export const EVENTO_CIERRE_WEBHOOK_URL = normalizeBubbleWorkflowPostUrl(
  import.meta.env.VITE_EVENTS_WEBHOOK_URL?.trim() || DEFAULT_EVENTS_WEBHOOK_URL
);

const DEFAULT_HOME_CONTACT_WEBHOOK_URL =
  'https://binder0.bubbleapps.io/version-test/api/1.1/wf/binderla-formulario/initialize';

/** Formulario de contacto del home (`Contact`). `VITE_HOME_CONTACT_WEBHOOK_URL` opcional. */
export const HOME_CONTACT_WEBHOOK_URL = normalizeBubbleWorkflowPostUrl(
  import.meta.env.VITE_HOME_CONTACT_WEBHOOK_URL?.trim() || DEFAULT_HOME_CONTACT_WEBHOOK_URL
);

/**
 * Payload para el workflow Bubble `binderla-formulario` (Create Leads).
 * `name` debe ser el nombre completo: en Bubble suele mapearse a Apellidos.
 */
export interface BinderlaFormularioPayload {
  name: string;
  company: string;
  email: string;
  phone: string;
  phoneCountry: string;
  challenge: string;
  consent: boolean;
  timestamp: string;
  source: 'contact-form';
}

/**
 * Parte nombre completo en first/last para Bubble.
 * Si solo hay un token, lastName es "-". Si algo falta tras trim, ese lado es "-".
 */
export function splitFullNameForBubble(fullName: string): {
  firstName: string;
  lastName: string;
} {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return { firstName: '-', lastName: '-' };
  }
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: '-' };
  }
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
}
