/**
 * Misma lógica de “correo corporativo” que el resto de formularios Binder:
 * lista en `blockedEmailDomains.json`, más coincidencia por subdominio (ej. *.gmail.com).
 */

export const CORPORATE_EMAIL_REQUIRED_MESSAGE =
  'Por favor, utiliza un correo corporativo. No se permiten correos personales (Gmail, Hotmail, etc.)';

/** true si el dominio (post-@) está bloqueado o es subdominio de uno bloqueado */
export function isBlockedPersonalEmailDomain(
  domain: string,
  blockedDomains: string[]
): boolean {
  const d = domain.toLowerCase().trim();
  if (!d) return false;
  for (const raw of blockedDomains) {
    const b = raw.toLowerCase().trim();
    if (!b) continue;
    if (d === b || d.endsWith('.' + b)) return true;
  }
  return false;
}

/** Email completo: devuelve dominio normalizado en minúsculas o undefined */
export function getEmailDomain(email: string): string | undefined {
  const trimmed = email.trim();
  const at = trimmed.lastIndexOf('@');
  if (at === -1 || at === trimmed.length - 1) return undefined;
  return trimmed.slice(at + 1).toLowerCase();
}
