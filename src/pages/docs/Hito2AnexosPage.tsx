import { Helmet } from 'react-helmet-async';
import { InternalPage } from '../../components/layout/InternalPage';
import { Link } from 'react-router-dom';
import { AnexoBackLink } from '../../components/docs/AnexoBackLink';
import './Hito2AnexosPage.css';

type AnexoLink = {
  emoji: string;
  label: string;
  href: string;
};

type AnexoItem = {
  anexo: string;
  tipo: string;
  descripcion: string;
  links: AnexoLink[];
};

type AnexoSection = {
  id: string;
  titulo: string;
  items: AnexoItem[];
};

const COMPLY_CLIP_BASE = 'https://sharing.clickup.com/clip/p/t90132749493';

const SECCIONES: AnexoSection[] = [
  {
    id: 'comply',
    titulo: '⚖️ Comply - Anexos',
    items: [
      {
        anexo: 'Anexo 1',
        tipo: 'Video',
        descripcion: 'Ejecucion diaria del sistema de captura de normas',
        links: [
          {
            emoji: '🎥',
            label: 'Abrir',
            href: `${COMPLY_CLIP_BASE}/cfd4a5dd-b1be-4ea1-abb0-7d87890f700d/cfd4a5dd-b1be-4ea1-abb0-7d87890f700d.webm?filename=screen-recording-2026-03-26-01%3A57.webm`,
          },
        ],
      },
      {
        anexo: 'Anexo 2',
        tipo: 'Video',
        descripcion: 'Norma procesada con output estructurado por IA',
        links: [
          {
            emoji: '🎥',
            label: 'Abrir',
            href: `${COMPLY_CLIP_BASE}/dc5c23df-bce2-4b6d-9369-329eb7e3d731/dc5c23df-bce2-4b6d-9369-329eb7e3d731.webm?filename=screen-recording-2026-03-26-02%3A06.webm`,
          },
        ],
      },
      {
        anexo: 'Anexo 3',
        tipo: 'Video',
        descripcion: 'Pantalla de configuracion de alertas',
        links: [
          {
            emoji: '🎥',
            label: 'Parte 1',
            href: `${COMPLY_CLIP_BASE}/bf31790f-bd6e-498d-87e6-8fe799fffdd9/bf31790f-bd6e-498d-87e6-8fe799fffdd9.webm?filename=screen-recording-2026-03-26-02%3A10.webm`,
          },
          {
            emoji: '🎥',
            label: 'Parte 2',
            href: `${COMPLY_CLIP_BASE}/ff2b758b-a828-492e-9aa2-518a882fb9ee/ff2b758b-a828-492e-9aa2-518a882fb9ee.webm?filename=screen-recording-2026-03-26-02%3A13.webm`,
          },
        ],
      },
      {
        anexo: 'Anexo 4',
        tipo: 'Video',
        descripcion: 'Tablero de gestion de proyectos de cumplimiento',
        links: [
          {
            emoji: '🎥',
            label: 'Abrir',
            href: `${COMPLY_CLIP_BASE}/757c81e8-4a34-45c5-ba79-ab25bbd29c46/757c81e8-4a34-45c5-ba79-ab25bbd29c46.webm?filename=screen-recording-2026-03-26-02%3A19.webm`,
          },
        ],
      },
      {
        anexo: 'Anexo 5',
        tipo: 'Video',
        descripcion: 'Frontend completo - vistas principales de Comply',
        links: [
          {
            emoji: '🎥',
            label: 'Abrir',
            href: `${COMPLY_CLIP_BASE}/edaa7e0c-33fa-41ed-8288-cf3346954a53/edaa7e0c-33fa-41ed-8288-cf3346954a53.webm?filename=screen-recording-2026-03-26-02%3A25.webm`,
          },
        ],
      },
      {
        anexo: 'Anexo 6',
        tipo: 'Diagrama',
        descripcion: 'Arquitectura del módulo Comply (backend + front-end)',
        links: [
          {
            emoji: '🖼️',
            label: 'Miro — Backend',
            href: 'https://miro.com/app/board/uXjVGEC00xc=/?sharelinkid=334332453545',
          },
          {
            emoji: '🖼️',
            label: 'Miro — Front-end',
            href: 'https://miro.com/app/board/uXjVKy71gkU=/?sharelinkid=896993882244',
          },
        ],
      },
    ],
  },
  {
    id: 'quorum',
    titulo: '🏛️ Quorum - Anexos',
    items: [
      {
        anexo: 'Anexo 1',
        tipo: 'Video',
        descripcion: 'Vista de Libros y listado de sesiones por organo de gobierno',
        links: [
          {
            emoji: '🎥',
            label: 'Abrir',
            href: `${COMPLY_CLIP_BASE}/12c4a085-cd2e-4eb6-a3ee-b6c4a754e8f1/12c4a085-cd2e-4eb6-a3ee-b6c4a754e8f1.webm?filename=screen-recording-2026-03-26-02%3A36.webm`,
          },
        ],
      },
      {
        anexo: 'Anexo 2',
        tipo: 'Video',
        descripcion: 'Progreso de sesion - flujo de 7 pasos',
        links: [
          {
            emoji: '🎥',
            label: 'Abrir',
            href: `${COMPLY_CLIP_BASE}/4d16347e-9717-42d3-a3af-1fbe5c5186c1/4d16347e-9717-42d3-a3af-1fbe5c5186c1.webm?filename=screen-recording-2026-03-26-02%3A41.webm`,
          },
        ],
      },
      {
        anexo: 'Anexo 3',
        tipo: 'Video',
        descripcion: 'Instalación de sesión con Quorum demo',
        links: [
          {
            emoji: '🎥',
            label: 'Abrir',
            href: `${COMPLY_CLIP_BASE}/5b7e4a3b-fc00-495f-a1fc-4df66525faf9/5b7e4a3b-fc00-495f-a1fc-4df66525faf9.webm?filename=screen-recording-2026-03-26-02%3A44.webm`,
          },
        ],
      },
      {
        anexo: 'Anexo 4',
        tipo: 'Diagrama',
        descripcion: 'Arquitectura del sistema del módulo Quorum',
        links: [
          {
            emoji: '🖼️',
            label: 'Miro',
            href: 'https://miro.com/app/board/uXjVGcaosQI=/?sharelinkid=350954450778',
          },
        ],
      },
    ],
  },
  {
    id: 'tally',
    titulo: '⏱️ Tally - Anexos',
    items: [
      {
        anexo: 'Anexo 1',
        tipo: 'Video',
        descripcion: 'Intro + usuarios y roles',
        links: [
          {
            emoji: '🎥',
            label: 'Binder - Tally - 1 Intro + Usuarios y Roles',
            href: 'https://sharing.clickup.com/clip/p/t90132749493/f8a44b20-9222-4f7c-bc0e-fe84f6fb9f82/f8a44b20-9222-4f7c-bc0e-fe84f6fb9f82.webm',
          },
        ],
      },
      {
        anexo: 'Anexo 2',
        tipo: 'Video',
        descripcion: 'Bonos y metas',
        links: [
          {
            emoji: '🎥',
            label: 'Binder - Tally - 2 Bonos y Metas',
            href: 'https://app.clickup.com/90132749493/hubs/clips/319743e3-36e6-4cd4-8eb8-c54b21bee042.webm',
          },
        ],
      },
      {
        anexo: 'Anexo 3',
        tipo: 'Video',
        descripcion: 'Clientes',
        links: [
          {
            emoji: '🎥',
            label: 'Binder - Tally - 3 Clientes',
            href: 'https://app.clickup.com/90132749493/hubs/clips/72166d36-d20b-4500-9b71-811b2684419a.webm',
          },
        ],
      },
      {
        anexo: 'Anexo 4',
        tipo: 'Video',
        descripcion: 'Proyectos',
        links: [
          {
            emoji: '🎥',
            label: 'Binder - Tally - 4 Proyectos',
            href: 'https://app.clickup.com/90132749493/hubs/clips/ee9fe9ee-dfbd-472b-8221-84c9e7a011d4.webm',
          },
        ],
      },
      {
        anexo: 'Anexo 5',
        tipo: 'Video',
        descripcion: 'Timetracking, gastos y actividad',
        links: [
          {
            emoji: '🎥',
            label: 'Binder - Tally - 5 Timetracking, Gastos y Actividad',
            href: 'https://app.clickup.com/90132749493/hubs/clips/17ec9014-a03b-4b4e-a92e-7afd9146b7f9.webm',
          },
        ],
      },
    ],
  },
  {
    id: 'onboarding',
    titulo: '📂 Onboarding - Anexos',
    items: [
      { anexo: 'Anexo 1', tipo: 'Diagrama', descripcion: 'Estructura estandar de carpeta de onboarding', links: [{ emoji: '📄', label: 'Abrir', href: '/hito2/anexos/onboarding/anexo-1' }] },
      { anexo: 'Anexo 2', tipo: 'Screenshot / Output', descripcion: 'Documento escaneado - texto extraido por OCR', links: [{ emoji: '📄', label: 'Abrir', href: '/hito2/anexos/onboarding/anexo-2' }] },
      { anexo: 'Anexo 3', tipo: 'JSON', descripcion: 'Output estructurado generado por IA para un contrato', links: [{ emoji: '📄', label: 'Abrir', href: '/hito2/anexos/onboarding/anexo-3' }] },
      { anexo: 'Anexo 4', tipo: 'Screenshot', descripcion: 'Pantalla de revision de documentos con flags de calidad', links: [{ emoji: '📄', label: 'Abrir', href: '/hito2/anexos/onboarding/anexo-4' }] },
      { anexo: 'Anexo 5', tipo: 'Diagrama', descripcion: 'Pipeline completo: recepcion -> extraccion -> IA -> validacion -> Binder', links: [{ emoji: '📄', label: 'Abrir', href: '/hito2/anexos/onboarding/anexo-5' }] },
    ],
  },
];

export const Hito2AnexosPage = () => {
  return (
    <>
      <Helmet>
        <title>Hito 2 - Anexos | Binder</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <InternalPage title="Anexos - Hito 2">
        <AnexoBackLink fallbackTo="/" label="Volver al inicio" />
        <div className="hito2-anexos-page">
          <p className="hito2-anexos-intro">Listado interno de anexos del informe. Acceso solo por enlace directo.</p>
          {SECCIONES.map((seccion) => (
            <section key={seccion.id} className="hito2-anexos-section">
              <h2>{seccion.titulo}</h2>
              <div className="hito2-anexos-table-wrap">
                <table className="hito2-anexos-table">
                  <thead>
                    <tr>
                      <th>Anexo</th>
                      <th>Tipo</th>
                      <th>Descripcion</th>
                      <th>Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seccion.items.map((item, rowIndex) => (
                      <tr key={`${seccion.id}-${item.anexo}-${rowIndex}`}>
                        <td>{item.anexo}</td>
                        <td>{item.tipo}</td>
                        <td>{item.descripcion}</td>
                        <td>
                          <div className="hito2-anexos-cell-links">
                            {item.links.map((link, i) => (
                              link.href.startsWith('/') ? (
                                <Link key={`${link.href}-${i}`} to={link.href} className="hito2-anexos-link">
                                  <span className="hito2-anexos-link-emoji" aria-hidden="true">
                                    {link.emoji}
                                  </span>{' '}
                                  {link.label}
                                </Link>
                              ) : (
                                <a
                                  key={`${link.href}-${i}`}
                                  href={link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hito2-anexos-link"
                                >
                                  <span className="hito2-anexos-link-emoji" aria-hidden="true">
                                    {link.emoji}
                                  </span>{' '}
                                  {link.label}
                                </a>
                              )
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      </InternalPage>
    </>
  );
};
