import { Helmet } from 'react-helmet-async';
import { InternalPage } from '../../../components/layout/InternalPage';
import { AnexoBackLink } from '../../../components/docs/AnexoBackLink';
import './OnboardingAnexos.css';

const JSON_OUTPUT = `{
  "extraction_id": "ext_2026_0407_acme_001",
  "document_type": "contract",
  "application": "Deals",
  "extraction_timestamp": "2026-04-07T14:32:18Z",
  "prompt_version": "contract_closure_v1.4",
  "confidence_score": 0.94,
  "contract": {
    "title": "Contrato de Prestación de Servicios",
    "contract_date": "2026-03-15",
    "expiration_date": "2028-03-15",
    "duration_months": 24,
    "amount": 185000.0,
    "currency": "USD",
    "contract_type": "service_agreement",
    "subject": "Consultoría tecnológica y desarrollo de software",
    "governing_law": "Perú",
    "has_annexes": true,
    "annexes_referenced": ["Anexo A"]
  },
  "parties": [
    {
      "role": "contractor",
      "entity_name": "ACME CORPORATION S.A.C.",
      "tax_id": "20512345678",
      "representative": "Roberto Méndez Torres",
      "rep_id_type": "DNI",
      "rep_id_number": "45678912",
      "address": "Av. Javier Prado Este 4200, Surco, Lima"
    },
    {
      "role": "provider",
      "entity_name": "TECH SOLUTIONS PERÚ S.A.",
      "tax_id": "20698745123",
      "representative": "María Elena Vásquez",
      "rep_id_type": "DNI",
      "rep_id_number": "3216549B",
      "address": "Calle Las Begonias 475, San Isidro, Lima"
    }
  ],
  "quality_flags": [
    {
      "field": "parties[1].rep_id_number",
      "issue": "possible_ocr_error",
      "confidence": 0.72,
      "suggestion": "Verificar manualmente: último carácter puede ser 8 en vez de B"
    }
  ],
  "mapping_status": "pending_validation"
}`;

export const OnboardingAnexo3Page = () => {
  return (
    <>
      <Helmet>
        <title>Anexo 3 — Output estructurado (JSON) | Binder</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <InternalPage title="Anexo 3 — Output estructurado por IA: contrato (JSON)">
        <AnexoBackLink fallbackTo="/hito2/anexos" />
        <p className="onb-anexo-intro">
          Onboarding Pipeline — Fase 3.3 (<span className="onb-kbd">ContractClosurePrompt</span>). Ejemplo de{' '}
          <span className="onb-kbd">structured_data</span> para Deals.
        </p>

        <section className="onb-section">
          <div className="onb-section-header">
            <h2>📄 structured_data</h2>
            <span className="onb-badge">Válido ✓ · confidence 0.94</span>
          </div>
          <div className="onb-card">
            <pre className="onb-code">{JSON_OUTPUT}</pre>
          </div>
        </section>

        <section className="onb-section">
          <div className="onb-section-header">
            <h2>🔄 Preview de mapping → Bubble</h2>
            <span className="onb-badge">Deals config</span>
          </div>
          <div className="onb-card">
            <table className="onb-table">
              <thead>
                <tr>
                  <th>structured_data (Binder)</th>
                  <th>Bubble field</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>contract.contract_date</code>
                  </td>
                  <td>
                    <code>Bubble.contract_date</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>parties[0].entity_name</code>
                  </td>
                  <td>
                    <code>Bubble.counterparty</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>contract.amount</code>
                  </td>
                  <td>
                    <code>Bubble.amount</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>contract.currency</code>
                  </td>
                  <td>
                    <code>Bubble.currency</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>contract.expiration_date</code>
                  </td>
                  <td>
                    <code>Bubble.expiry_date</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>contract.subject</code>
                  </td>
                  <td>
                    <code>Bubble.description</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>parties[1].entity_name</code>
                  </td>
                  <td>
                    <code>Bubble.provider_name</code>
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="onb-muted" style={{ marginTop: 12 }}>
              Nota: este preview ilustra el mapping conceptual. La validación se completa en fase de QA/mapping.
            </p>
          </div>
        </section>
      </InternalPage>
    </>
  );
};

