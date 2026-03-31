import { normalizeBubbleWorkflowPostUrl } from './bubbleWorkflowUrl';

/** Contrato compartido con workflow Bubble `evento-de-cierre` (Contact y EventPage). */
export interface EventoCierreBubblePayload {
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
