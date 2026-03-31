/**
 * Algunos endpoints de workflow en Bubble responden 404 con
 * "... not in initialization mode" si se usa el sufijo `/initialize`.
 * La URL operativa es el POST directo a `.../wf/{nombre}`.
 */
export function normalizeBubbleWorkflowPostUrl(url: string): string {
  return url.trim().replace(/\/initialize\/?$/i, '');
}
