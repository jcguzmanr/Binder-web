/**
 * Bubble workflow API (POST .../wf/{name}) often returns JSON like:
 * { statusCode: 404, body: { message: "..." } } when the URL o modo no coincide.
 * El frontend debe leer body.message, no solo error.
 */
export function getBubbleWorkflowErrorMessage(
  res: Response,
  parsed: unknown,
  rawBody?: string
): string {
  const fromParsed = extractMessageFromParsed(parsed);
  if (fromParsed) return fromParsed;

  const t = res.statusText?.trim();
  if (t) return `Error ${res.status}: ${t}`;

  const snippet = rawBody?.trim().replace(/\s+/g, ' ').slice(0, 280);
  if (snippet) return `Error ${res.status}: ${snippet}`;

  return `Error ${res.status} (sin texto de estado ni cuerpo útil; revisa consola [EventPage]).`;
}

function extractMessageFromParsed(parsed: unknown): string | null {
  if (!parsed || typeof parsed !== 'object') return null;
  const o = parsed as Record<string, unknown>;

  if (typeof o.error === 'string' && o.error.trim()) return o.error;

  // Bubble: { message: "..." } at root (sometimes)
  if (typeof o.message === 'string' && o.message.trim()) {
    // Avoid treating SUCCESS messages as errors (caller should only use when !res.ok)
    const st = o.status;
    if (st === 'SUCCESS') return null;
    return o.message;
  }

  const inner = o.body;
  if (inner && typeof inner === 'object') {
    const b = inner as Record<string, unknown>;
    if (typeof b.message === 'string' && b.message.trim()) return b.message;
  }

  return null;
}
