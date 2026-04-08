import { Helmet } from 'react-helmet-async';
import { InternalPage } from '../../../components/layout/InternalPage';
import { AnexoBackLink } from '../../../components/docs/AnexoBackLink';
import './OnboardingAnexos.css';

const SCAN_TEXT = `CONTRATO DE PRESTACIÓN DE SERVICIOS

Conste por el presente documento, el CONTRATO DE PRESTACIÓN
DE SERVICIOS que celebran de una parte:

PRIMERA PARTE (EL CONTRATANTE):
ACME CORPORATION S.A.C., con RUC N° 20512345678...

SEGUNDA PARTE (EL PROVEEDOR):
TECH SOLUTIONS PERÚ S.A., con RUC N° 20698745123...

CLÁUSULA PRIMERA: OBJETO DEL CONTRATO
... USD 185,000.00 ...

CLÁUSULA SEGUNDA: VIGENCIA
... 24 meses ...`;

const OCR_LINES: Array<{ n: number; text: string; kind?: 'ok' | 'highlight' | 'warn' }> = [
  { n: 1, text: 'CONTRATO DE PRESTACIÓN DE SERVICIOS', kind: 'highlight' },
  { n: 3, text: 'Conste por el presente documento, el CONTRATO DE PRESTACIÓN' },
  { n: 4, text: 'DE SERVICIOS que celebran de una parte:' },
  { n: 6, text: 'PRIMERA PARTE (EL CONTRATANTE):', kind: 'highlight' },
  { n: 7, text: 'ACME CORPORATION S.A.C., con RUC N° 20512345678 (98%)', kind: 'highlight' },
  { n: 12, text: 'SEGUNDA PARTE (EL PROVEEDOR):', kind: 'highlight' },
  { n: 13, text: 'TECH SOLUTIONS PERÚ S.A., con RUC N° 20698745123 (97%)', kind: 'highlight' },
  { n: 15, text: 'identificada con DNI N° 3216549B (72% ⚠)', kind: 'warn' },
  { n: 22, text: 'USD 185,000.00 (99%)', kind: 'highlight' },
  { n: 26, text: 'vigencia de 24 meses, computados a partir del 15/03/2026 (96%)', kind: 'highlight' },
  { n: 29, text: '[sello notarial — no procesable]', kind: 'warn' },
];

export const OnboardingAnexo2Page = () => {
  return (
    <>
      <Helmet>
        <title>Anexo 2 — OCR Output | Binder</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <InternalPage title="Anexo 2 — Documento escaneado: texto extraído por OCR">
        <AnexoBackLink fallbackTo="/hito2/anexos" />
        <p className="onb-anexo-intro">
          Onboarding Pipeline — Fase 3.1 (<span className="onb-kbd">TextExtract</span>). Comparación entre documento fuente y salida OCR.
        </p>

        <div className="onb-card">
          <div className="onb-meta-grid">
            <div className="onb-meta-item">
              <div className="onb-meta-label">Cliente</div>
              <div className="onb-meta-value">AcmeCorp</div>
            </div>
            <div className="onb-meta-item">
              <div className="onb-meta-label">Application</div>
              <div className="onb-meta-value">Deals</div>
            </div>
            <div className="onb-meta-item">
              <div className="onb-meta-label">Workflow</div>
              <div className="onb-meta-value">Contrato Proveedor</div>
            </div>
            <div className="onb-meta-item">
              <div className="onb-meta-label">Archivo</div>
              <div className="onb-meta-value">contrato_principal.pdf</div>
            </div>
            <div className="onb-meta-item">
              <div className="onb-meta-label">Fecha ingesta</div>
              <div className="onb-meta-value">2026-04-07</div>
            </div>
          </div>
        </div>

        <section className="onb-section">
          <div className="onb-section-header">
            <h2>🪟 Vista lado a lado</h2>
            <span className="onb-badge">Escaneo vs OCR</span>
          </div>

          <div className="onb-grid-2">
            <div className="onb-card">
              <h3>📄 Documento original (escaneo)</h3>
              <pre className="onb-code" style={{ whiteSpace: 'pre-wrap' }}>
                {SCAN_TEXT}
              </pre>
            </div>

            <div className="onb-card">
              <h3>🔍 Texto extraído (OCR engine)</h3>
              <div className="onb-code" style={{ whiteSpace: 'pre-wrap' }}>
                {OCR_LINES.map((l) => {
                  const prefix = String(l.n).padStart(2, ' ');
                  const label = `${prefix}  ${l.text}`;
                  const bg =
                    l.kind === 'highlight'
                      ? 'rgba(0,152,177,0.10)'
                      : l.kind === 'warn'
                        ? 'rgba(255,144,0,0.12)'
                        : 'transparent';
                  const border =
                    l.kind === 'highlight'
                      ? '2px solid rgba(0,152,177,0.35)'
                      : l.kind === 'warn'
                        ? '2px solid rgba(255,144,0,0.35)'
                        : '2px solid transparent';
                  return (
                    <div key={l.n} style={{ padding: '2px 0', background: bg, borderLeft: border, paddingLeft: 10, marginLeft: -10 }}>
                      {label}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="onb-section">
          <div className="onb-section-header">
            <h2>📊 Métricas de extracción</h2>
            <span className="onb-badge">Calidad</span>
          </div>
          <div className="onb-grid-2">
            <div className="onb-card">
              <h3>Confianza OCR</h3>
              <p className="onb-muted">Indicador global de calidad para la salida OCR.</p>
              <p>
                <span className="onb-pill ok">94.2%</span>
              </p>
            </div>
            <div className="onb-card">
              <h3>Observaciones</h3>
              <ul>
                <li>
                  <strong>Entidades detectadas</strong>: 7/8 (alto).
                </li>
                <li>
                  <strong>Baja confianza</strong>: 2 flags (ej. DNI con carácter final ambiguo).
                </li>
                <li>
                  <strong>No procesable</strong>: sellos/firma (se marca como referencia).
                </li>
              </ul>
            </div>
          </div>
        </section>
      </InternalPage>
    </>
  );
};

