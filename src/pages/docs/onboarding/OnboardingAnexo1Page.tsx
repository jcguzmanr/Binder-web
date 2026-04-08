import { Helmet } from 'react-helmet-async';
import { InternalPage } from '../../../components/layout/InternalPage';
import { AnexoBackLink } from '../../../components/docs/AnexoBackLink';
import './OnboardingAnexos.css';

const DRIVE_TREE = `Binder_Onboarding/
├── Cliente_AcmeCorp/
│   ├── Deals/
│   │   ├── Contrato_Proveedor_2024/
│   │   │   ├── contrato_principal.pdf
│   │   │   └── adenda_01.pdf
│   │   └── Contrato_Arrendamiento/
│   │       └── arrendamiento_v2.pdf
│   └── Cases/
│       └── Expediente_2024-1532/
│           ├── demanda.pdf
│           ├── contestacion.pdf
│           └── resolucion_03.txt
└── Cliente_LegalTech_SA/
    └── Deals/
        └── NDA_Confidencialidad/
            └── nda_bilateral.pdf`;

const S3_TREE = `binder-onboarding/
├── raw/                (original)
│   └── acme/deals/contrato_proveedor/contrato_principal.pdf
├── processed/          (normalizado)
├── extracted_text/     (OCR/texto)
└── structured_output/  (JSON IA)`;

export const OnboardingAnexo1Page = () => {
  return (
    <>
      <Helmet>
        <title>Anexo 1 — Estructura de Carpeta de Onboarding | Binder</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <InternalPage title="Anexo 1 — Estructura Estándar de Carpeta de Onboarding">
        <AnexoBackLink fallbackTo="/hito2/anexos" />
        <p className="onb-anexo-intro">
          Onboarding Pipeline — Fase 0 (estructura de entrada) y referencia de persistencia en S3.
        </p>

        <section className="onb-section">
          <div className="onb-section-header">
            <h2>📂 Google Drive — Carpeta controlada por Binder</h2>
            <span className="onb-badge">Estructura /Cliente/Application/Workflow</span>
          </div>
          <div className="onb-card">
            <pre className="onb-code">{DRIVE_TREE}</pre>
          </div>
        </section>

        <section className="onb-section">
          <div className="onb-section-header">
            <h2>☁️ AWS S3 — Estructura de persistencia</h2>
            <span className="onb-badge">FASE 1 — Ingesta</span>
          </div>
          <div className="onb-card">
            <pre className="onb-code">{S3_TREE}</pre>
          </div>
        </section>

        <section className="onb-section">
          <div className="onb-section-header">
            <h2>📋 Reglas de ingesta</h2>
            <span className="onb-badge">Validación previa a S3</span>
          </div>
          <div className="onb-grid-2">
            <div className="onb-card">
              <h3>✅ Permitido</h3>
              <ul>
                <li>
                  <strong>Formatos</strong>: PDF y TXT.
                </li>
                <li>
                  <strong>Validación</strong>: se verifica ubicación/estructura antes de copiar a S3.
                </li>
                <li>
                  <strong>Metadata</strong>: cliente, application, workflow, archivo, fecha de carga.
                </li>
              </ul>
            </div>
            <div className="onb-card">
              <h3>🚫 Rechazado</h3>
              <ul>
                <li>
                  <strong>Formatos</strong>: XLS, DOC, imágenes sueltas.
                </li>
                <li>
                  <strong>Acción</strong>: rechazo con notificación al operador.
                </li>
                <li>
                  <strong>Accesos</strong>: Drive controlado por Binder; S3 con IAM restringido.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </InternalPage>
    </>
  );
};

