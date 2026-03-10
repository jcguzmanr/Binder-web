import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './PrepReunionOkaPage.css';

const SIDEBAR_LINKS = [
  { id: 'contexto', icon: '📋', label: 'Contexto', num: '01' },
  { id: 'arquitectura', icon: '⚙️', label: 'Arquitectura', num: '02' },
  { id: 'ciberseguridad', icon: '🛡', label: 'Ciberseguridad', num: '03' },
  { id: 'regulacion', icon: '⚖️', label: 'Regulación SBS', num: '04' },
  { id: 'operacion', icon: '🔄', label: 'Operación', num: '05' },
  { id: 'preguntas', icon: '❓', label: 'Preguntas', num: '06' },
  { id: 'postura', icon: '🎯', label: 'Postura', num: '07' },
  { id: 'outsourcing', icon: '📋', label: 'Outsourcing', num: '08' },
];

export const PrepReunionOkaPage = () => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const sections = SIDEBAR_LINKS.map((l) => l.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { threshold: 0.2, rootMargin: '-20px 0px -60% 0px' }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleSidebarClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <div className="prep-reunion-doc">
      <Helmet>
        <title>OKA — Prep Reunión Técnica | Ciberseguridad & Integración | Binder</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <nav className="doc-sidebar" aria-label="Navegación del documento">
        <div className="sidebar-logo">
          <Link to="/">
            <img src="/lightmode_default.svg" alt="Binder" />
          </Link>
        </div>
        <div className="sidebar-label">Navegación</div>
        <ul className="sidebar-nav">
          {SIDEBAR_LINKS.map(({ id, icon, label, num }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={activeId === id ? 'active' : ''}
                onClick={(e) => handleSidebarClick(e, id)}
              >
                <span className="nav-icon">{icon}</span>
                {label}
                <span className="nav-num">{num}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="sidebar-footer">
          <div className="conf-badge">Confidencial</div>
          <div className="date-text">Marzo 2026</div>
        </div>
      </nav>

      <div className="page-wrapper">
        <div className="doc-container">
          <div className="top-bar">
            <div className="badge">Preparación de reunión — Confidencial</div>
            <Link to="/">
              <img src="/lightmode_default.svg" alt="Binder" className="logo-img" />
            </Link>
          </div>

          <div className="hero">
            <h1>OKA / Hiraoka</h1>
            <p className="subtitle">Reunión técnica — Integración, Ciberseguridad y Operación diaria</p>
            <div className="hero-meta">
              <div className="hero-meta-item">
                <div className="dot" style={{ background: 'var(--accent)' }} />
                Martes 10 Marzo 2026
              </div>
              <div className="hero-meta-item">
                <div className="dot" style={{ background: 'var(--bright-purple)' }} />
                Equipo técnico OKA
              </div>
              <div className="hero-meta-item">
                <div className="dot" style={{ background: 'var(--green)' }} />
                Francisco (Contraparte técnica)
              </div>
              <div className="hero-meta-item">
                <div className="dot" style={{ background: 'var(--orange)' }} />
                JC
              </div>
            </div>
          </div>

          <div className="divider" />

          <section className="section" id="contexto">
            <div className="section-header">
              <div className="section-icon" style={{ background: 'rgba(0,152,177,0.08)', color: 'var(--accent)' }}>📋</div>
              <div>
                <div className="section-subtitle">Sección 1</div>
                <div className="section-title">Contexto del Proyecto</div>
              </div>
            </div>
            <div className="grid-3" style={{ marginBottom: 18 }}>
              <div className="card">
                <div className="card-label" style={{ color: 'var(--accent)' }}>Cliente</div>
                <h3>OKA / Hiraoka</h3>
                <p>Financiera especializada en productos Hiraoka. Volumen creciente de transacciones con exposición regulatoria en crédito y pagos.</p>
              </div>
              <div className="card">
                <div className="card-label" style={{ color: 'var(--orange)' }}>Problema</div>
                <h3>Cumplimiento manual</h3>
                <p>Procesos en Excel + macros inestables. Sin trazabilidad ni escalabilidad. Riesgo operativo ante auditorías SBS/UIF y crecimiento de volumen.</p>
              </div>
              <div className="card">
                <div className="card-label" style={{ color: 'var(--green)' }}>Solución</div>
                <h3>Plataforma centralizada</h3>
                <p>Infraestructura de cumplimiento moderna en AWS. Ingesta robusta, procesamiento asíncrono, base de datos estructurada, alertas y señales.</p>
              </div>
            </div>
            <h3 style={{ fontSize: 13, fontWeight: 500, marginBottom: 10, color: 'var(--doc-text-secondary)' }}>Stakeholders clave</h3>
            <div className="grid-4" style={{ marginBottom: 18 }}>
              <div className="stake-card">
                <div className="stake-avatar" style={{ background: 'rgba(242,81,255,0.08)', color: 'var(--pink)' }}>PE</div>
                <div className="stake-info">
                  <h4>Pamela Egusquiza</h4>
                  <div className="stake-role">Oficial de Riesgo</div>
                  <div className="stake-focus">Operadora principal. Busca ser owner de la información.</div>
                </div>
              </div>
              <div className="stake-card">
                <div className="stake-avatar" style={{ background: 'rgba(57,135,190,0.08)', color: 'var(--medium-blue)' }}>C</div>
                <div className="stake-info">
                  <h4>Carlos</h4>
                  <div className="stake-role">Jefatura</div>
                  <div className="stake-focus">Decisor. Foco en visibilidad, control y sostenibilidad.</div>
                </div>
              </div>
              <div className="stake-card">
                <div className="stake-avatar" style={{ background: 'rgba(255,144,0,0.08)', color: 'var(--orange)' }}>F</div>
                <div className="stake-info">
                  <h4>Francisco</h4>
                  <div className="stake-role">Equipo técnico OKA</div>
                  <div className="stake-focus">Contraparte técnica. Quiere detalle de integración y ciberseguridad.</div>
                </div>
              </div>
              <div className="stake-card">
                <div className="stake-avatar" style={{ background: 'rgba(0,152,177,0.08)', color: 'var(--accent)' }}>JC</div>
                <div className="stake-info">
                  <h4>JC</h4>
                  <div className="stake-role">Dir. Operación Consultiva</div>
                  <div className="stake-focus">Liderar propuesta. Mapear postura de seguridad de OKA.</div>
                </div>
              </div>
            </div>
            <h3 style={{ fontSize: 13, fontWeight: 500, marginBottom: 10, color: 'var(--doc-text-secondary)' }}>Fuentes de datos que integra la plataforma</h3>
            <div className="grid-3">
              <div className="card" style={{ borderLeft: '3px solid var(--accent)' }}>
                <div className="card-label" style={{ color: 'var(--accent)' }}>Mambu</div>
                <h3>Motor transaccional</h3>
                <p>Cuentas, titulares, montos, estados, saldos, cuotas, canal de origen.</p>
              </div>
              <div className="card" style={{ borderLeft: '3px solid var(--bright-purple)' }}>
                <div className="card-label" style={{ color: 'var(--bright-purple)' }}>Analytics</div>
                <h3>Perfil del cliente</h3>
                <p>DNI, rango de ingresos, tipo de empleo, dirección (L1-L3), estado PEP.</p>
              </div>
              <div className="card" style={{ borderLeft: '3px solid var(--medium-blue)' }}>
                <div className="card-label" style={{ color: 'var(--medium-blue)' }}>GesIntel</div>
                <h3>Cumplimiento & screening</h3>
                <p>PEP actual/histórico, watchlists, adverse media, riesgo final (verde / amarillo / rojo).</p>
              </div>
            </div>
          </section>

          <div className="divider" />

          <section className="section" id="arquitectura">
            <div className="section-header">
              <div className="section-icon" style={{ background: 'rgba(57,135,190,0.08)', color: 'var(--medium-blue)' }}>⚙️</div>
              <div>
                <div className="section-subtitle">Sección 2 — Lo que Francisco quiere saber</div>
                <div className="section-title">Integración & Arquitectura</div>
              </div>
            </div>
            <div className="flow-container" style={{ marginBottom: 18 }}>
              <h3 style={{ fontSize: 12, fontWeight: 500, marginBottom: 16, color: 'var(--doc-text-secondary)' }}>Flujo end-to-end (ingesta mensual)</h3>
              <div className="flow">
                {[
                  { icon: '👤', label: 'Usuario', desc: 'Selecciona fuente + periodo', bg: 'rgba(0,152,177,0.06)', color: 'var(--accent)' },
                  { icon: '🖥', label: 'UI / Next.js', desc: 'Solicita URL firmada', bg: 'rgba(109,60,255,0.06)', color: 'var(--bright-purple)' },
                  { icon: '🔑', label: 'Lambda API', desc: 'Presigned PUT URL', bg: 'rgba(255,144,0,0.06)', color: 'var(--orange)' },
                  { icon: '📦', label: 'S3', desc: 'XLS crudo + checksum', bg: 'rgba(0,212,78,0.06)', color: 'var(--green)' },
                  { icon: '🔄', label: 'Step Functions', desc: 'Validar → Parse → Normalizar', bg: 'rgba(57,135,190,0.06)', color: 'var(--medium-blue)' },
                  { icon: '🗄', label: 'RDS PostgreSQL', desc: 'Core + Mart views', bg: 'rgba(48,51,156,0.06)', color: 'var(--navy)' },
                  { icon: '📊', label: 'Dashboard', desc: 'Alertas, casos, 360', bg: 'rgba(242,81,255,0.06)', color: 'var(--pink)' },
                ].map((step, i) => (
                  <React.Fragment key={i}>
                    <div className="flow-step">
                      <div className="icon-box" style={{ background: step.bg, borderColor: step.color, color: step.color }}>{step.icon}</div>
                      <div className="step-label" style={{ color: step.color }}>{step.label}</div>
                      <div className="step-desc">{step.desc}</div>
                    </div>
                    {i < 6 && <div className="flow-arrow">→</div>}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="grid-2">
              <div className="card">
                <div className="card-label" style={{ color: 'var(--medium-blue)' }}>Capas de datos</div>
                <div className="layers">
                  <div className="layer" style={{ background: 'rgba(0,152,177,0.05)' }}>
                    <div className="layer-name" style={{ color: 'var(--accent)' }}>Staging</div>
                    <div className="layer-desc">Raw snapshot por archivo. Control de calidad e integridad (runId).</div>
                  </div>
                  <div className="layer-arrow">↓</div>
                  <div className="layer" style={{ background: 'rgba(109,60,255,0.05)' }}>
                    <div className="layer-name" style={{ color: 'var(--bright-purple)' }}>Core</div>
                    <div className="layer-desc">Entidades normalizadas: customers, accounts, transactions, screening.</div>
                  </div>
                  <div className="layer-arrow">↓</div>
                  <div className="layer" style={{ background: 'rgba(0,212,78,0.05)' }}>
                    <div className="layer-name" style={{ color: 'var(--green)' }}>Mart</div>
                    <div className="layer-desc">Snapshots por periodo, señales, métricas de calidad, risk drivers.</div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-label" style={{ color: 'var(--orange)' }}>Puntos clave para Francisco</div>
                <ul>
                  <li><strong>Fase 1 no toca APIs</strong> — solo consumimos exports XLS que ya generan. Cero riesgo de integración directa.</li>
                  <li><strong>Presigned URLs</strong> — el archivo va directo a S3, nunca pasa por el backend en memoria.</li>
                  <li><strong>Idempotencia</strong> — si resuben un archivo, el sistema detecta duplicados por checksum.</li>
                  <li><strong>Step Functions orquesta</strong> — cada paso es independiente, auditable y con rollback.</li>
                  <li><strong>Fase 2 (API)</strong> depende de accesos que OKA habilite. No es requisito para operar.</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="divider" />

          <section className="section" id="ciberseguridad">
            <div className="section-header">
              <div className="section-icon" style={{ background: 'rgba(48,51,156,0.08)', color: 'var(--navy)' }}>🛡</div>
              <div>
                <div className="section-subtitle">Sección 3 — Núcleo de la reunión</div>
                <div className="section-title">Controles de Ciberseguridad</div>
              </div>
            </div>
            <div className="sec-grid" style={{ marginBottom: 18 }}>
              {[
                { bar: 'var(--accent)', icon: '🔐', title: 'Control de accesos', text: '<strong>IAM mínimo privilegio</strong> — cada Lambda con rol específico. Cognito/OIDC con roles: Oficial de Riesgo / Jefatura / Admin. MFA obligatorio. Buckets S3 privados.' },
                { bar: 'var(--green)', icon: '🔒', title: 'Cifrado', text: '<strong>KMS</strong> para cifrado en reposo (S3 + RDS). <strong>TLS 1.2+</strong> en tránsito. Llaves gestionadas con rotación automática.' },
                { bar: 'var(--bright-purple)', icon: '📊', title: 'Trazabilidad y logs', text: '<strong>CloudWatch + X-Ray</strong> — logs inmutables con retención definida. Cada ingesta registra: quién, cuándo, qué, checksum. Alarmas por fallos.' },
                { bar: 'var(--medium-blue)', icon: '🖥', title: 'Segregación de ambientes', text: '<strong>dev / staging / prod</strong> completamente separados (cuentas o prefijos). Infra as Code (Terraform/CDK). CI/CD con GitHub Actions.' },
                { bar: 'var(--orange)', icon: '👁', title: 'Protección de PII', text: 'Política de <strong>minimización</strong> — solo datos necesarios. <strong>Mascarado</strong> en UI donde aplique. Sin exposición innecesaria de datos sensibles.' },
                { bar: 'var(--pink)', icon: '🚨', title: 'Respuesta a incidentes', text: 'Alarmas CloudWatch por anomalías. Procedimiento de escalamiento definido. Logs para análisis post-mortem. Compatible con reportería SBS.' },
              ].map((item, i) => (
                <div key={i} className="sec-card">
                  <div className="sec-top-bar" style={{ background: item.bar }} />
                  <div className="sec-icon">{item.icon}</div>
                  <h4>{item.title}</h4>
                  <p dangerouslySetInnerHTML={{ __html: item.text }} />
                </div>
              ))}
            </div>
            <div className="card">
              <div className="card-label" style={{ color: 'var(--navy)' }}>Alineación con frameworks</div>
              <h3>La arquitectura cubre controles clave de ISO 27001, ISO 22301 y SOC 2</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginTop: 12 }}>
                <div>
                  <div style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--accent)', marginBottom: 6 }}>ISO 27001</div>
                  <ul><li>Gestión de riesgos</li><li>Control de accesos (IAM)</li><li>Cifrado (KMS/TLS)</li><li>Registro y monitoreo</li><li>Gestión de incidentes</li></ul>
                </div>
                <div>
                  <div style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--green)', marginBottom: 6 }}>ISO 22301</div>
                  <ul><li>RTO/RPO definibles</li><li>Backups automáticos</li><li>Ambientes alternos</li><li>DRP compatible</li><li>Step Functions con retry</li></ul>
                </div>
                <div>
                  <div style={{ fontSize: '11.5px', fontWeight: 500, color: 'var(--bright-purple)', marginBottom: 6 }}>SOC 2</div>
                  <ul><li>Segregación dev/prod</li><li>Autenticación fuerte</li><li>Change management (CI/CD)</li><li>Acceso mínimo necesario</li><li>Logs inmutables</li></ul>
                </div>
              </div>
            </div>
          </section>

          <div className="divider" />

          <section className="section" id="regulacion">
            <div className="section-header">
              <div className="section-icon" style={{ background: 'rgba(255,144,0,0.08)', color: 'var(--orange)' }}>⚖️</div>
              <div>
                <div className="section-subtitle">Sección 4 — Contexto regulatorio</div>
                <div className="section-title">Marco SBS — Ciberseguridad en Financieras Perú</div>
              </div>
            </div>
            <div className="grid-2">
              <div>
                <div className="reg-timeline">
                  {[
                    { dot: 'var(--accent)', date: 'Feb 2021', title: 'Resolución SBS N° 504-2021', p: 'Reglamento para Gestión de Seguridad de la Información y Ciberseguridad. Norma marco vigente. Exige SGSI-C, programa de ciberseguridad, reporte de incidentes.' },
                    { dot: 'var(--bright-purple)', date: 'Q1 2025', title: 'Actualización Fase 1 (FMI)', p: 'Modificaciones prioritarias con consultoría del Fondo Monetario Internacional. Cambios en reportería de incidentes y supervisión.' },
                    { dot: 'var(--medium-blue)', date: 'Jul 2025', title: 'Comité de alto nivel SBS', p: 'Actualización de equipos de supervisión. Comité para alinear iniciativas de ciberseguridad en el sector financiero.' },
                    { dot: 'var(--green)', date: 'Dic 2025', title: 'Oficial de Datos Personales', p: 'Resolución 100-2025-JUS. Designación obligatoria para empresas reguladas. Ley 29733 de Protección de Datos reforzada.' },
                  ].map((item, i) => (
                    <div key={i} className="reg-item">
                      <div className="reg-dot" style={{ borderColor: item.dot }} />
                      <div className="reg-date" style={{ color: item.dot }}>{item.date}</div>
                      <h4>{item.title}</h4>
                      <p>{item.p}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="card" style={{ marginBottom: 12 }}>
                  <div className="card-label" style={{ color: 'var(--orange)' }}>Régimen aplicable a OKA</div>
                  <h3>Probablemente Régimen General (Res. 504-2021)</h3>
                  <p style={{ marginTop: 4 }}>Como financiera, OKA caería en el régimen más exigente:</p>
                  <ul style={{ marginTop: 4 }}>
                    <li><strong>SGSI-C</strong> formalizado con políticas y procedimientos</li>
                    <li><strong>Comité de Riesgos</strong> con funciones de seguridad</li>
                    <li><strong>Función de seguridad independiente</strong> de TI</li>
                    <li><strong>Programa de ciberseguridad</strong> con diagnóstico y mejora</li>
                    <li><strong>Reporte obligatorio</strong> ante incidentes significativos</li>
                    <li><strong>Outsourcing cloud</strong> — notificación a SBS requerida</li>
                  </ul>
                </div>
                <div className="card" style={{ background: 'rgba(0,152,177,0.02)', borderColor: 'rgba(0,152,177,0.15)' }}>
                  <div className="card-label" style={{ color: 'var(--accent)' }}>Oportunidad estratégica</div>
                  <p>La presión regulatoria creciente (actualización FMI 2025-2026) <strong>justifica la inversión de OKA</strong> en formalizar controles. La plataforma no solo resuelve cumplimiento operativo — <strong>fortalece su postura ante la SBS</strong>.</p>
                </div>
              </div>
            </div>
          </section>

          <div className="divider" />

          <section className="section" id="operacion">
            <div className="section-header">
              <div className="section-icon" style={{ background: 'rgba(0,212,78,0.08)', color: 'var(--green)' }}>🔄</div>
              <div>
                <div className="section-subtitle">Sección 5</div>
                <div className="section-title">Operación día a día</div>
              </div>
            </div>
            <div className="grid-2">
              <div className="card">
                <div className="card-label" style={{ color: 'var(--green)' }}>Modelo operativo</div>
                <h3>Quién hace qué y cuándo</h3>
                <ul>
                  <li><strong>Pamela (Oficial de Riesgo)</strong> — carga XLS mensual por fuente, revisa alertas, clasifica casos, genera reportes.</li>
                  <li><strong>Carlos (Jefatura)</strong> — monitorea dashboards, valida escalamientos, reporta a dirección.</li>
                  <li><strong>Sistema</strong> — procesa automáticamente: valida, normaliza, cruza, genera señales.</li>
                  <li><strong>Servicio recurrente</strong> — ajusta reglas, umbrales, evoluciona el sistema por cambios regulatorios.</li>
                </ul>
              </div>
              <div className="card">
                <div className="card-label" style={{ color: 'var(--accent)' }}>Capacidades del workspace</div>
                <h3>Lo que ven los usuarios</h3>
                <ul>
                  <li><strong>Panel de ingestas</strong> — estado de cada carga, errores, métricas de calidad.</li>
                  <li><strong>Matriz consolidada</strong> — data cruzada con filtros (monto, canal, PEP, riesgo).</li>
                  <li><strong>Customer 360</strong> — vista unificada por cliente con semáforo y drivers visibles.</li>
                  <li><strong>Señales y alertas</strong> — clasificadas: informativas, revisión humana, escalamiento.</li>
                  <li><strong>Exportación</strong> — XLS/CSV para reportería externa o auditoría.</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="divider" />

          <section className="section" id="preguntas">
            <div className="section-header">
              <div className="section-icon" style={{ background: 'rgba(109,60,255,0.08)', color: 'var(--bright-purple)' }}>❓</div>
              <div>
                <div className="section-subtitle">Sección 6</div>
                <div className="section-title">Preguntas estratégicas para Francisco</div>
              </div>
            </div>
            <div className="q-list">
              {[
                { n: 1, color: 'rgba(0,152,177,0.08)', colorVar: 'var(--accent)', q: '¿Bajo qué régimen de la Resolución 504-2021 opera OKA? ¿General o Simplificado?', why: 'Define el nivel de exigencia regulatoria y los controles mínimos que debemos cumplir.' },
                { n: 2, color: 'rgba(109,60,255,0.08)', colorVar: 'var(--bright-purple)', q: '¿Manejan algún framework de referencia para ciberseguridad? ¿NIST? ¿ISO 27001?', why: 'Permite alinear la arquitectura a su lenguaje y criterios de evaluación internos.' },
                { n: 3, color: 'rgba(57,135,190,0.08)', colorVar: 'var(--medium-blue)', q: '¿Han hecho la notificación a SBS sobre uso de servicios cloud? ¿O se formalizaría con este proyecto?', why: 'Outsourcing TI en financieras requiere aviso formal a SBS. Mejor saber si es trámite nuevo o existente.' },
                { n: 4, color: 'rgba(0,212,78,0.08)', colorVar: 'var(--green)', q: '¿Tienen definido un RTO y RPO para los procesos de cumplimiento?', why: 'Determina requerimientos de disponibilidad y backup para la plataforma.' },
                { n: 5, color: 'rgba(255,144,0,0.08)', colorVar: 'var(--orange)', q: '¿Tienen un proceso de evaluación de proveedores tecnológicos? ¿Necesitan un security dossier?', why: 'Posiciona proactivamente y demuestra que entendemos sus requerimientos de gobernanza.' },
                { n: 6, color: 'rgba(48,51,156,0.08)', colorVar: 'var(--navy)', q: '¿Han tenido alguna observación de auditoría o supervisión SBS reciente sobre cumplimiento?', why: 'Si hay dolor reciente, la solución se convierte en respuesta directa a esa observación.' },
                { n: 7, color: 'rgba(242,81,255,0.08)', colorVar: 'var(--pink)', q: '¿Tienen restricciones sobre residencia de datos o regiones AWS permitidas?', why: 'Regulación y política interna pueden exigir que los datos permanezcan en una región específica.' },
                { n: 8, color: 'rgba(138,208,220,0.1)', colorVar: 'var(--accent)', q: '¿Cómo manejan hoy el control de accesos a la información de cumplimiento?', why: 'Entender su estado actual permite diseñar una transición suave, no un cambio brusco.' },
              ].map((item) => (
                <div key={item.n} className="q-item">
                  <div className="q-number" style={{ background: item.color, color: item.colorVar }}>{item.n}</div>
                  <div className="q-content">
                    <div className="q-text">{item.q}</div>
                    <div className="q-why">{item.why}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="divider" />

          <section className="section" id="postura">
            <div className="section-header">
              <div className="section-icon" style={{ background: 'rgba(242,81,255,0.08)', color: 'var(--pink)' }}>🎯</div>
              <div>
                <div className="section-subtitle">Sección 7</div>
                <div className="section-title">Postura para la reunión</div>
              </div>
            </div>
            <div className="posture-card">
              <h3>Escuchar y mapear, no vender</h3>
              <p style={{ color: 'var(--doc-text-secondary)', fontSize: '12.5px', fontWeight: 300, marginBottom: 12 }}>
                El objetivo es entender la postura de ciberseguridad de OKA y posicionar la arquitectura como extensión natural de sus controles existentes.
              </p>
              <div className="posture-grid">
                <div className="posture-do">
                  <h4>Sí hacer</h4>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li>• Preguntar antes de afirmar</li>
                    <li>• Hablar en su lenguaje (SBS, SGSI-C, UIF)</li>
                    <li>• Mostrar que la arquitectura ya tiene controles alineados</li>
                    <li>• Ofrecer preparar un security dossier si lo necesitan</li>
                    <li>• Validar sus preocupaciones antes de dar soluciones</li>
                    <li>• Tomar notas de sus lineamientos internos</li>
                  </ul>
                </div>
                <div className="posture-dont">
                  <h4>No hacer</h4>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li>• No prometer certificaciones que no tenemos</li>
                    <li>• No minimizar sus preocupaciones de seguridad</li>
                    <li>• No hablar de Fase 2 (API) si no preguntan</li>
                    <li>• No asumir que usan frameworks específicos</li>
                    <li>• No entrar en detalles de pricing</li>
                    <li>• No comprometer alcances no definidos</li>
                  </ul>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 14 }}>
              <div className="card" style={{ background: 'rgba(0,212,78,0.03)', borderColor: 'rgba(0,212,78,0.15)' }}>
                <div className="card-label" style={{ color: 'var(--green)' }}>Frase de cierre sugerida</div>
                <p style={{ fontSize: '13.5px', fontStyle: 'italic' }}>"La arquitectura está diseñada alineada a los controles que exige la SBS. Podemos preparar un dossier de seguridad formal que documente cada control implementado y cómo mapea a sus requerimientos internos."</p>
              </div>
            </div>
          </section>

          <div className="divider" />

          <section className="section" id="outsourcing">
            <div className="section-header">
              <div className="section-icon" style={{ background: 'rgba(138,208,220,0.1)', color: 'var(--accent)' }}>📋</div>
              <div>
                <div className="section-subtitle">Sección 8 — Si surge el tema</div>
                <div className="section-title">Outsourcing tecnológico en financieras</div>
              </div>
            </div>
            <div className="grid-4">
              <div className="card" style={{ borderTop: '3px solid var(--accent)' }}>
                <h3 style={{ fontSize: 13 }}>Evaluación del proveedor</h3>
                <p style={{ marginTop: 4 }}>Matriz de riesgos, evaluación de seguridad, declaración de subprocesadores (AWS). Evaluación anual.</p>
              </div>
              <div className="card" style={{ borderTop: '3px solid var(--bright-purple)' }}>
                <h3 style={{ fontSize: 13 }}>Cláusulas contractuales</h3>
                <p style={{ marginTop: 4 }}>Derecho de auditoría, confidencialidad reforzada, notificación de incidentes, subcontratación informada.</p>
              </div>
              <div className="card" style={{ borderTop: '3px solid var(--green)' }}>
                <h3 style={{ fontSize: 13 }}>Gobierno del servicio</h3>
                <p style={{ marginTop: 4 }}>SLAs definidos, reportes periódicos, comité de seguimiento, KPIs de disponibilidad.</p>
              </div>
              <div className="card" style={{ borderTop: '3px solid var(--orange)' }}>
                <h3 style={{ fontSize: 13 }}>Plan de salida</h3>
                <p style={{ marginTop: 4 }}>Migración de datos, plazo de entrega, eliminación certificada, continuidad post-terminación.</p>
              </div>
            </div>
          </section>

          <div className="doc-footer">
            <div className="footer-text">Material interno de preparación — <span className="brand">OKA / Hiraoka</span> · Reunión técnica Marzo 2026 · Confidencial</div>
            <Link to="/">
              <img src="/lightmode_default.svg" alt="Binder" className="logo-img" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
