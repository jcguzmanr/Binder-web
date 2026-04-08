import { Helmet } from 'react-helmet-async';
import { InternalPage } from '../../../components/layout/InternalPage';
import { AnexoBackLink } from '../../../components/docs/AnexoBackLink';
import './OnboardingAnexos.css';

type DocRow = {
  name: string;
  context: string;
  app: 'Deals' | 'Cases';
  confidence: string;
  status: 'Validado' | 'Revisión' | 'Error';
  mapping: 'Listo' | 'Pendiente' | 'Bloqueado';
  flags: string[];
};

const ROWS: DocRow[] = [
  {
    name: 'contrato_principal.pdf',
    context: 'AcmeCorp / Deals / Contrato Proveedor',
    app: 'Deals',
    confidence: '94.2%',
    status: 'Validado',
    mapping: 'Listo',
    flags: ['OCR ⚠'],
  },
  {
    name: 'adenda_01.pdf',
    context: 'AcmeCorp / Deals / Contrato Proveedor',
    app: 'Deals',
    confidence: '97.8%',
    status: 'Validado',
    mapping: 'Listo',
    flags: ['OK ✓'],
  },
  {
    name: 'demanda.pdf',
    context: 'AcmeCorp / Cases / Exp. 2024-1532',
    app: 'Cases',
    confidence: '81.3%',
    status: 'Revisión',
    mapping: 'Pendiente',
    flags: ['OCR ⚠', 'CAMPO'],
  },
  {
    name: 'contestacion.pdf',
    context: 'AcmeCorp / Cases / Exp. 2024-1532',
    app: 'Cases',
    confidence: '92.1%',
    status: 'Validado',
    mapping: 'Listo',
    flags: ['OK ✓'],
  },
  {
    name: 'resolucion_03.txt',
    context: 'AcmeCorp / Cases / Exp. 2024-1532',
    app: 'Cases',
    confidence: '43.7%',
    status: 'Error',
    mapping: 'Bloqueado',
    flags: ['JSON ✗', 'PROMPT'],
  },
  {
    name: 'nda_bilateral.pdf',
    context: 'LegalTech SA / Deals / NDA',
    app: 'Deals',
    confidence: '98.5%',
    status: 'Validado',
    mapping: 'Listo',
    flags: ['OK ✓'],
  },
  {
    name: 'arrendamiento_v2.pdf',
    context: 'AcmeCorp / Deals / Contrato Arrendamiento',
    app: 'Deals',
    confidence: '76.4%',
    status: 'Revisión',
    mapping: 'Pendiente',
    flags: ['OCR ⚠', 'DUP?'],
  },
];

const pillForStatus = (status: DocRow['status']) => {
  if (status === 'Validado') return <span className="onb-pill ok">Validado</span>;
  if (status === 'Revisión') return <span className="onb-pill warn">Revisión</span>;
  return <span className="onb-pill err">Error</span>;
};

const pillForMapping = (mapping: DocRow['mapping']) => {
  if (mapping === 'Listo') return <span className="onb-pill ok">Listo</span>;
  if (mapping === 'Pendiente') return <span className="onb-pill warn">Pendiente</span>;
  return <span className="onb-pill err">Bloqueado</span>;
};

export const OnboardingAnexo4Page = () => {
  return (
    <>
      <Helmet>
        <title>Anexo 4 — Revisión de documentos | Binder</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <InternalPage title="Anexo 4 — Pantalla de revisión de documentos (QA + flags)">
        <AnexoBackLink fallbackTo="/hito2/anexos" />
        <p className="onb-anexo-intro">
          Vista conceptual del módulo de revisión: lista de documentos, confianza, estado y flags de calidad.
        </p>

        <section className="onb-section">
          <div className="onb-section-header">
            <h2>📑 Bandeja de documentos</h2>
            <span className="onb-badge">Onboarding · QA</span>
          </div>

          <div className="onb-card" style={{ padding: 0, overflow: 'hidden' }}>
            <table className="onb-table">
              <thead>
                <tr>
                  <th>Documento</th>
                  <th>Application</th>
                  <th>Confianza</th>
                  <th>Status</th>
                  <th>Mapping</th>
                  <th>Flags</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.name}>
                    <td>
                      <div>
                        <strong>{r.name}</strong>
                      </div>
                      <div className="onb-muted">{r.context}</div>
                    </td>
                    <td>
                      <span className="onb-badge">{r.app}</span>
                    </td>
                    <td>
                      <strong>{r.confidence}</strong>
                    </td>
                    <td>{pillForStatus(r.status)}</td>
                    <td>{pillForMapping(r.mapping)}</td>
                    <td>
                      {r.flags.length ? (
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          {r.flags.map((f) => (
                            <span key={f} className="onb-pill warn">
                              {f}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="onb-muted">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="onb-section">
          <div className="onb-section-header">
            <h2>🧾 Detalle de flags (ejemplo)</h2>
            <span className="onb-badge">resolucion_03.txt</span>
          </div>

          <div className="onb-grid-2">
            <div className="onb-card">
              <h3>Metadata</h3>
              <ul>
                <li>
                  <strong>Cliente</strong>: AcmeCorp
                </li>
                <li>
                  <strong>Application</strong>: Cases
                </li>
                <li>
                  <strong>Workflow</strong>: Exp. 2024-1532
                </li>
                <li>
                  <strong>Fecha ingesta</strong>: 2026-04-07
                </li>
                <li>
                  <strong>Tamaño</strong>: 2.1 KB
                </li>
              </ul>
            </div>

            <div className="onb-card">
              <h3>Flags detectados</h3>
              <ul>
                <li>
                  <span className="onb-pill err">JSON mal formado</span> — el prompt retornó JSON inválido (posible corte por límite).
                </li>
                <li>
                  <span className="onb-pill err">Prompt fallido</span> — <code>CaseExtractPrompt</code> no existe para esta application.
                </li>
                <li>
                  <span className="onb-pill warn">Confianza &lt; 50%</span> — alta proporción de caracteres no reconocidos.
                </li>
              </ul>
            </div>
          </div>

          <div className="onb-card" style={{ marginTop: 'var(--spacing-md)' }}>
            <h3>Acciones sugeridas</h3>
            <ol>
              <li>
                <strong>Crear</strong> <code>CaseExtractPrompt</code> (módulo nuevo para Cases).
              </li>
              <li>
                <strong>Reprocesar</strong> el archivo desde fase 3.2 una vez disponible el prompt.
              </li>
              <li>
                <strong>Revisar fuente</strong> del TXT original (calidad de entrada).
              </li>
            </ol>
          </div>
        </section>
      </InternalPage>
    </>
  );
};

