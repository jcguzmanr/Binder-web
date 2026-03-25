import { Helmet } from 'react-helmet-async';
import { InternalPage } from '../../components/layout/InternalPage';
import './Hito2AnexosPage.css';

type AnexoItem = {
  anexo: string;
  tipo: string;
  descripcion: string;
  url: string;
};

type AnexoSection = {
  id: string;
  titulo: string;
  items: AnexoItem[];
};

const DEFAULT_CLICKUP_URL = 'https://app.clickup.com/';

const SECCIONES: AnexoSection[] = [
  {
    id: 'comply',
    titulo: '⚖️ Comply - Anexos',
    items: [
      { anexo: 'Anexo 1', tipo: 'Video', descripcion: 'Ejecucion diaria del sistema de captura de normas', url: DEFAULT_CLICKUP_URL },
      { anexo: 'Anexo 2', tipo: 'Video', descripcion: 'Norma procesada con output estructurado por IA', url: DEFAULT_CLICKUP_URL },
      { anexo: 'Anexo 3', tipo: 'Video', descripcion: 'Pantalla de configuracion de alertas', url: DEFAULT_CLICKUP_URL },
      { anexo: 'Anexo 4', tipo: 'Video', descripcion: 'Tablero de gestion de proyectos de cumplimiento', url: DEFAULT_CLICKUP_URL },
      { anexo: 'Anexo 5', tipo: 'Video', descripcion: 'Frontend completo - vistas principales de Comply', url: DEFAULT_CLICKUP_URL },
      { anexo: 'Anexo 6', tipo: 'Diagrama', descripcion: 'Arquitectura del sistema Comply (backend + frontend)', url: DEFAULT_CLICKUP_URL },
    ],
  },
  {
    id: 'quorum',
    titulo: '🏛️ Quorum - Anexos',
    items: [
      { anexo: 'Anexo 1', tipo: 'Video', descripcion: 'Vista de Libros y listado de sesiones por organo de gobierno', url: DEFAULT_CLICKUP_URL },
      { anexo: 'Anexo 2', tipo: 'Video', descripcion: 'Progreso de sesion - flujo de 7 pasos', url: DEFAULT_CLICKUP_URL },
      { anexo: 'Anexo 3', tipo: 'Video', descripcion: 'Instalacion de sesion con quorum en tiempo real', url: DEFAULT_CLICKUP_URL },
      { anexo: 'Anexo 7', tipo: 'Video', descripcion: 'Front Desk - acceso de participantes externos', url: DEFAULT_CLICKUP_URL },
    ],
  },
  {
    id: 'tally',
    titulo: '⏱️ Tally - Anexos',
    items: [
      { anexo: 'Anexo 1', tipo: 'Diagrama', descripcion: 'Modelo de datos - estructura jerarquica', url: DEFAULT_CLICKUP_URL },
      { anexo: 'Anexo 2', tipo: 'Video', descripcion: 'Configuracion de proyecto (Bolsa / Pacto)', url: DEFAULT_CLICKUP_URL },
      { anexo: 'Anexo 3', tipo: 'Video', descripcion: 'Registro de horas con diferenciacion de tipos', url: DEFAULT_CLICKUP_URL },
      { anexo: 'Anexo 4', tipo: 'Video', descripcion: 'Flujo de aprobacion y pantalla de arqueo', url: DEFAULT_CLICKUP_URL },
    ],
  },
  {
    id: 'onboarding',
    titulo: '📂 Onboarding - Anexos',
    items: [
      { anexo: 'Anexo 1', tipo: 'Diagrama', descripcion: 'Estructura estandar de carpeta de onboarding', url: DEFAULT_CLICKUP_URL },
      { anexo: 'Anexo 2', tipo: 'Screenshot / Output', descripcion: 'Documento escaneado - texto extraido por OCR', url: DEFAULT_CLICKUP_URL },
      { anexo: 'Anexo 3', tipo: 'JSON', descripcion: 'Output estructurado generado por IA para un contrato', url: DEFAULT_CLICKUP_URL },
      { anexo: 'Anexo 4', tipo: 'Screenshot', descripcion: 'Pantalla de revision de documentos con flags de calidad', url: DEFAULT_CLICKUP_URL },
      { anexo: 'Anexo 5', tipo: 'Diagrama', descripcion: 'Pipeline completo: recepcion -> extraccion -> IA -> validacion -> Binder', url: DEFAULT_CLICKUP_URL },
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
                    {seccion.items.map((item) => (
                      <tr key={`${seccion.id}-${item.anexo}`}>
                        <td>{item.anexo}</td>
                        <td>{item.tipo}</td>
                        <td>{item.descripcion}</td>
                        <td>
                          <a href={item.url} target="_blank" rel="noopener noreferrer">
                            Abrir
                          </a>
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
