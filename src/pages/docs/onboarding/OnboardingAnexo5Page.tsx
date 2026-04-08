import { Helmet } from 'react-helmet-async';
import { InternalPage } from '../../../components/layout/InternalPage';
import { AnexoBackLink } from '../../../components/docs/AnexoBackLink';
import './OnboardingAnexos.css';

type Phase = {
  n: number;
  title: string;
  color?: string;
  bullets: string[];
  modules?: Array<{ label: string; kind: 'existing' | 'new' | 'future' }>;
};

const phases: Phase[] = [
  {
    n: 0,
    title: 'Estructura (Drive)',
    color: '#4285F4',
    bullets: [
      'Carpeta controlada por Binder con estructura /Cliente/Application/Workflow/.',
      'Validación de entrada: solo PDF/TXT (rechazo de XLS/DOC/imágenes).',
      'Metadata auto: cliente, application, workflow, archivo, fecha.',
    ],
    modules: [{ label: 'Módulo 1 · Metadata', kind: 'new' }],
  },
  {
    n: 1,
    title: 'Ingesta → S3',
    bullets: [
      'Drive Listener detecta nuevos archivos (webhook o polling).',
      'Copia a S3: binder-onboarding/raw/{cliente}/{app}/{workflow}/',
    ],
    modules: [
      { label: 'Módulo 1 · Drive Listener', kind: 'new' },
      { label: 'Módulo 2 · S3 Uploader', kind: 'new' },
    ],
  },
  {
    n: 2,
    title: 'Persistencia (capas)',
    bullets: [
      'Capas en S3: raw → processed → extracted_text → structured_output.',
      'DB intermedia: clients, applications, workflows, documents, extracted_text, structured_data, mapping_status.',
    ],
    modules: [{ label: 'DB intermedia', kind: 'new' }],
  },
  {
    n: 3,
    title: 'Proceso IA',
    bullets: [
      'TextExtract (OCR) produce texto plano y lo guarda en extracted_text.',
      'Ruteo por Application: Deals → ContractClosurePrompt; Cases → CaseExtractPrompt (pendiente).',
      'Salida: JSON estructurado en structured_output.',
    ],
    modules: [
      { label: 'Módulo 3 · TextExtract', kind: 'existing' },
      { label: 'Módulo 4 · ContractClosurePrompt', kind: 'existing' },
      { label: 'CaseExtractPrompt', kind: 'future' },
    ],
  },
  {
    n: 4,
    title: 'Validación (QA + mapping)',
    bullets: [
      'Quality checks: confianza OCR, campos obligatorios, JSON válido, mapping completo.',
      'Asignación de status: validated, pending_review, error + flags.',
      'Mapping engine por application: structured_data → campos Bubble.',
    ],
    modules: [
      { label: 'Módulo 5 · Mapping Engine', kind: 'new' },
      { label: 'Módulo 7 · Error Monitor', kind: 'new' },
    ],
  },
  {
    n: 5,
    title: 'Envío a destino (Bubble)',
    bullets: [
      'Si mapping_status = validated, se envía por conector a Bubble (webhook controlado).',
      'Solo documentos validados llegan a la plataforma destino.',
    ],
    modules: [{ label: 'Módulo 6 · Bubble Connector', kind: 'new' }],
  },
];

const modulePill = (kind: 'existing' | 'new' | 'future') => {
  if (kind === 'existing') return <span className="onb-pill ok">Existente</span>;
  if (kind === 'new') return <span className="onb-pill warn">Nuevo</span>;
  return <span className="onb-pill err">Futuro</span>;
};

export const OnboardingAnexo5Page = () => {
  return (
    <>
      <Helmet>
        <title>Anexo 5 — Pipeline completo de onboarding | Binder</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <InternalPage title="Anexo 5 — Pipeline completo de Onboarding">
        <AnexoBackLink fallbackTo="/hito2/anexos" />
        <p className="onb-anexo-intro">Recepción → Extracción → IA → Validación → Envío a Binder (destino).</p>

        <section className="onb-section">
          <div className="onb-section-header">
            <h2>🧭 Flujo por fases</h2>
            <span className="onb-badge">Resumen ejecutivo</span>
          </div>

          <div className="onb-stepper">
            {phases.map((p) => (
              <div key={p.n} className="onb-step">
                <div className="onb-step-num" style={{ background: p.color || 'var(--accent)' }}>
                  {p.n}
                </div>
                <div className="onb-step-body">
                  <div className="onb-step-title">
                    <strong>{p.title}</strong>
                    {p.modules?.length ? (
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                        {p.modules.map((m) => (
                          <span key={m.label} className="onb-badge">
                            {m.label} {modulePill(m.kind)}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <ul>
                    {p.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="onb-section">
          <div className="onb-section-header">
            <h2>⚡ Error monitor</h2>
            <span className="onb-badge">Transversal</span>
          </div>
          <div className="onb-card">
            <p className="onb-muted">
              Registro transversal de errores en cada fase (archivo inválido, texto no extraído, prompt fallido, JSON mal
              formado, campo ausente, mapping incompleto) para priorizar re-procesos y acciones correctivas.
            </p>
          </div>
        </section>
      </InternalPage>
    </>
  );
};

