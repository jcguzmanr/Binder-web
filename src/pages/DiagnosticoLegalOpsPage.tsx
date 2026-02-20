import { FormEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import blockedEmailDomains from '../data/blockedEmailDomains.json';
import { PageHead } from '../components/seo/PageHead';
import { SchemaMarkup } from '../components/seo/SchemaMarkup';
import './DiagnosticoLegalOpsPage.css';

type Stage = 'quiz' | 'result';
type RoleOption = 'Legal Counsel' | 'Head of Legal' | 'GC' | 'Legal Ops' | 'Compliance' | 'Procurement' | 'Otros';
type CompanySize = '1-50' | '51-200' | '201-1000' | '1000+';

interface FinalFormData {
  name: string;
  email: string;
  company: string;
  role: RoleOption | '';
  companySize: CompanySize | '';
  wantsMaterial: boolean;
}

interface FinalFormErrors {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  companySize?: string;
  submit?: string;
}

interface Question {
  question: string;
  yesLabel: string;
  noLabel: string;
}

interface LevelContent {
  number: 1 | 2 | 3 | 4;
  level: string;
  symptom: string;
  opportunity: string;
  situation: string;
  usuallyHappens: string[];
  opportunities: string[];
  ctaText: string;
  buttonLabel: string;
}

const questions: Question[] = [
  {
    question: '¿Tus contratos están centralizados en un repositorio único?',
    yesLabel: 'Repositorio digital con control de acceso/identidad',
    noLabel: 'Están distribuidos en distintos soportes o carpetas',
  },
  {
    question: '¿Tienes un sistema consistente para archivar y organizar contratos?',
    yesLabel: 'Se guardan con estructura definida y automática',
    noLabel: 'No hay garantía de que queden correctamente archivados',
  },
  {
    question: '¿Tienes alertas automatizadas de vencimiento/renovación?',
    yesLabel: 'El sistema avisa con anticipación',
    noLabel: 'Dependemos de recordatorios manuales o agendas personales',
  },
  {
    question: '¿Puedes ver el estado de cada solicitud de contrato en tiempo real?',
    yesLabel: 'Tengo visibilidad del avance y responsables',
    noLabel: 'Debo pedir actualizaciones por correo o WhatsApp',
  },
  {
    question: '¿Miden tiempos de atención (SLA) de las solicitudes?',
    yesLabel: 'Medimos cuánto demora cada tipo de caso',
    noLabel: 'Solo tenemos una idea aproximada',
  },
  {
    question: '¿Tienes indicadores de carga y desempeño del equipo?',
    yesLabel: 'Conozco carga y tiempos por persona/proceso',
    noLabel: 'Pregunto manualmente quién tiene disponibilidad',
  },
  {
    question: '¿Las tareas repetitivas están automatizadas?',
    yesLabel: 'Rutinas (seguimientos, recordatorios, updates) se ejecutan automático',
    noLabel: 'Aún se hacen seguimientos y actualizaciones manuales',
  },
];

const levels: LevelContent[] = [
  {
    number: 1,
    level: 'Reactivo',
    symptom: 'alta dependencia de esfuerzos individuales y baja visibilidad operativa',
    opportunity: 'centralizar contratos, intake y alertas para recuperar control operativo',
    situation:
      'Hoy el área opera con alta dependencia de esfuerzos individuales. La demanda entra por múltiples canales y el control se sostiene más en memoria organizacional que en un sistema.',
    usuallyHappens: [
      'Priorización reactiva (todo es urgente)',
      'Contratos y solicitudes sin trazabilidad consistente',
      'Riesgo operativo por vencimientos, versiones y seguimiento manual',
    ],
    opportunities: [
      'Centralizar contratos e intake en un solo lugar (con roles y permisos).',
      'Definir una taxonomía mínima (tipos, áreas, contrapartes, fechas clave).',
      'Activar alertas de vencimientos y estados de solicitudes.',
    ],
    ctaText: 'Te mostramos cómo pasar de apagar incendios a tener control en 30 días.',
    buttonLabel: 'Quiero agendar una demo',
  },
  {
    number: 2,
    level: 'Estructurado',
    symptom: 'intención de orden, pero con ejecución heterogénea y fricción en el proceso',
    opportunity: 'estandarizar versiones, flujo y métricas para consolidar una fuente única de verdad',
    situation:
      'Existe intención de orden y algunas prácticas definidas, pero la ejecución es heterogénea. El costo aparece en duplicidad, fricción y decisiones sin una fuente única de verdad.',
    usuallyHappens: [
      'Variaciones del proceso por persona o equipo',
      'Control de versiones débil',
      'Alertas y renovaciones parcialmente manuales',
    ],
    opportunities: [
      'Implementar control de versiones y plantillas maestras.',
      'Unificar el flujo de solicitudes con estados y responsables.',
      'Medir tiempos de respuesta para priorizar automatizaciones.',
    ],
    ctaText: 'Agenda una demo y te damos un roadmap por fases.',
    buttonLabel: 'Ver roadmap en una demo',
  },
  {
    number: 3,
    level: 'Eficiente',
    symptom: 'buena base de automatización con visibilidad aún no completamente end-to-end',
    opportunity: 'consolidar dashboards y automatizaciones para anticipar cuellos de botella',
    situation:
      'Ya hay automatización y señales claras de madurez. El reto está en consolidar visibilidad: reducir puntos ciegos, anticipar cuellos de botella y gestionar capacidad con datos.',
    usuallyHappens: [
      'Trazabilidad parcial (no siempre end-to-end)',
      'Métricas útiles, pero dispersas o tardías',
      'Dependencia de coordinación manual en momentos críticos',
    ],
    opportunities: [
      'Consolidar dashboards (SLA, backlog, cuellos de botella).',
      'Automatizar ciclos repetitivos (renovaciones, aprobaciones, recordatorios).',
      'Explorar IA en extracción de datos y clasificación.',
    ],
    ctaText: 'En demo te mostramos cómo subir a escalable sin rehacer todo.',
    buttonLabel: 'Quiero ver el modelo escalable',
  },
  {
    number: 4,
    level: 'Escalable',
    symptom: 'operación instrumentada con datos, automatización y gobierno consistente',
    opportunity: 'profundizar governance y extender automatización/IA a áreas satélite',
    situation:
      'La operación legal está instrumentada: visibilidad centralizada, métricas confiables y gobierno de datos. Esto habilita crecimiento sin incrementar proporcionalmente la carga operativa.',
    usuallyHappens: [
      'Decisiones basadas en datos (SLA, backlog, capacidad)',
      'Automatización consistente y controles claros',
      'Base sólida para IA aplicada con casos de negocio',
    ],
    opportunities: [
      'Profundizar governance (data quality, ownership, auditoría).',
      'Expandir automatización a áreas satélite (compras, finanzas, compliance).',
      'IA aplicada a análisis contractual y predicción de riesgos.',
    ],
    ctaText: 'Conversemos sobre expansión: benchmarks, playbooks y quick wins.',
    buttonLabel: 'Agendar conversación estratégica',
  },
];

const roleOptions: RoleOption[] = ['Legal Counsel', 'Head of Legal', 'GC', 'Legal Ops', 'Compliance', 'Procurement', 'Otros'];
const companySizeOptions: CompanySize[] = ['1-50', '51-200', '201-1000', '1000+'];

const getLevelByNoCount = (noCount: number): LevelContent => {
  if (noCount >= 6) return levels[0];
  if (noCount >= 4) return levels[1];
  if (noCount >= 2) return levels[2];
  return levels[3];
};

export const DiagnosticoLegalOpsPage = () => {
  const navigate = useNavigate();
  const blockedDomains = blockedEmailDomains.blockedDomains as string[];

  const [stage, setStage] = useState<Stage>('quiz');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<boolean | null>>(Array(questions.length).fill(null));
  const [finalFormData, setFinalFormData] = useState<FinalFormData>({
    name: '',
    email: '',
    company: '',
    role: '',
    companySize: '',
    wantsMaterial: true,
  });
  const [finalErrors, setFinalErrors] = useState<FinalFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const noCount = useMemo(() => answers.filter((answer) => answer === false).length, [answers]);
  const finalLevel = useMemo(() => getLevelByNoCount(noCount), [noCount]);

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestionIndex];

  const breadcrumbs = [
    { label: 'Inicio', path: '/' },
    { label: 'Diagnóstico Legal Ops (Formulario al final)', path: '/diagnostico-legal-ops-formulario-final' },
  ];

  const validateFinalForm = (): boolean => {
    const errors: FinalFormErrors = {};

    if (!finalFormData.name.trim()) {
      errors.name = 'El nombre y apellido es requerido.';
    }

    if (!finalFormData.company.trim()) {
      errors.company = 'La empresa es requerida.';
    }

    if (!finalFormData.email.trim()) {
      errors.email = 'El email corporativo es requerido.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(finalFormData.email)) {
      errors.email = 'Ingresa un email válido.';
    } else {
      const domain = finalFormData.email.split('@')[1]?.toLowerCase();
      if (domain && blockedDomains.includes(domain)) {
        errors.email = 'Por favor utiliza un correo corporativo.';
      }
    }

    if (!finalFormData.role) {
      errors.role = 'Selecciona tu cargo.';
    }

    if (!finalFormData.companySize) {
      errors.companySize = 'Selecciona el tamaño de empresa.';
    }

    setFinalErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSetAnswer = (value: boolean) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = value;
    setAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentAnswer === null) {
      return;
    }

    if (currentQuestionIndex === questions.length - 1) {
      setStage('result');
      return;
    }

    setCurrentQuestionIndex((index) => index + 1);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex === 0) {
      return;
    }

    setCurrentQuestionIndex((index) => index - 1);
  };

  const handleResetTest = () => {
    setAnswers(Array(questions.length).fill(null));
    setCurrentQuestionIndex(0);
    setStage('quiz');
    setFinalErrors({});
    setIsSubmitting(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitDiagnosis = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateFinalForm()) {
      return;
    }

    setIsSubmitting(true);
    setFinalErrors({});

    try {
      const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;

      if (!webhookUrl) {
        throw new Error('Webhook URL no configurada');
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: finalFormData.name,
          company: finalFormData.company,
          email: finalFormData.email,
          phone: null,
          phoneCountry: null,
          challenge: `Diagnóstico Legal Ops - Nivel ${finalLevel.number} (${finalLevel.level})`,
          consent: true,
          timestamp: new Date().toISOString(),
          source: 'legal-ops-diagnosis-final-form',
          role: finalFormData.role,
          companySize: finalFormData.companySize,
          wantsMaterial: finalFormData.wantsMaterial,
          diagnosis: {
            levelNumber: finalLevel.number,
            levelName: finalLevel.level,
            noCount,
            yesCount: questions.length - noCount,
            totalQuestions: questions.length,
            answers: answers.map((answer, index) => ({
              question: questions[index].question,
              answer: answer === true ? 'Sí' : 'No',
            })),
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
      }

      sessionStorage.setItem(
        'formSubmission',
        JSON.stringify({
          name: finalFormData.name,
          company: finalFormData.company,
          email: finalFormData.email,
        })
      );

      navigate('/gracias');
    } catch (error) {
      setFinalErrors({
        submit: error instanceof Error ? error.message : 'No se pudo enviar el diagnóstico. Intenta nuevamente.',
      });
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHead
        title="Diagnóstico Legal Ops (Formulario al final) | Evalúa tu madurez legal"
        description="Evalúa en minutos el nivel de madurez Legal Ops de tu operación legal y recibe recomendaciones accionables para crecer con trazabilidad, control y velocidad."
        canonicalUrl="/diagnostico-legal-ops-formulario-final"
        ogImage="/metatag.jpeg"
      />
      <SchemaMarkup type="breadcrumbList" data={{ breadcrumbs }} />

      <main className="diagnostico-page section-has-local-background" style={{ '--section-bg': '#FFFFFF' } as React.CSSProperties}>
        <div className="diagnostico-video-background" aria-hidden="true">
          <video autoPlay loop muted playsInline preload="auto">
            <source src="/videos/videobackground.mp4" type="video/mp4" />
          </video>
        </div>
        <section className="diagnostico-hero">
          <div className="container">
            <h1>Diagnóstico Legal Ops</h1>
            <p className="diagnostico-subtitle">El caos legal no es falta de esfuerzo, es falta de estructura.</p>
            <p className="diagnostico-description">
              Descubre si tu operación legal está preparada para crecer sin colapsar. En menos de 3 minutos sabrás tu nivel de
              madurez y los siguientes pasos para ganar trazabilidad, control y velocidad.
            </p>
            <p className="diagnostico-proof">Sin costo · 3 minutos · Resultado inmediato · Recomendaciones accionables</p>
          </div>
        </section>

        {stage === 'quiz' && (
          <section className="diagnostico-stage">
            <div className="container">
              <div className="diagnostico-card">
                <h2>Evalúa tu madurez Legal Ops en minutos</h2>
                <p className="diagnostico-instruction">
                  Responde 7 preguntas. Mientras más No tengas, más urgente es avanzar hacia un modelo con visibilidad y control.
                </p>

                <div className="diagnostico-progress-block">
                  <div className="diagnostico-steps" role="list" aria-label="Progreso de preguntas">
                    {questions.map((_, index) => {
                      const status = answers[index] !== null ? 'done' : index === currentQuestionIndex ? 'current' : 'pending';
                      return (
                        <span
                          key={index}
                          className={`diagnostico-step ${status}`}
                          aria-label={`Pregunta ${index + 1}`}
                        />
                      );
                    })}
                  </div>
                </div>

                <article className="diagnostico-question-card">
                  <header>
                    <span>Pregunta {currentQuestionIndex + 1} de 7</span>
                    <h3>{currentQuestion.question}</h3>
                  </header>

                  <div className="diagnostico-options">
                    <button
                      type="button"
                      className={`diagnostico-option ${currentAnswer === true ? 'selected' : ''}`}
                      onClick={() => handleSetAnswer(true)}
                    >
                      <strong>Sí</strong>
                      <span>{currentQuestion.yesLabel}</span>
                    </button>
                    <button
                      type="button"
                      className={`diagnostico-option ${currentAnswer === false ? 'selected' : ''}`}
                      onClick={() => handleSetAnswer(false)}
                    >
                      <strong>No</strong>
                      <span>{currentQuestion.noLabel}</span>
                    </button>
                  </div>

                  <div className="diagnostico-question-actions">
                    <button
                      type="button"
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestionIndex === 0}
                      className="diagnostico-secondary-button"
                    >
                      Anterior
                    </button>
                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      disabled={currentAnswer === null}
                      className="diagnostico-primary-button"
                    >
                      {currentQuestionIndex === questions.length - 1 ? 'Ver mi diagnóstico' : 'Siguiente'}
                    </button>
                  </div>
                </article>
              </div>
            </div>
          </section>
        )}

        {stage === 'result' && (
          <section className="diagnostico-stage">
            <div className="container">
              <div className="diagnostico-card diagnostico-result-card">
                <h2>
                  Tu nivel de madurez Legal Ops: <span>Nivel {finalLevel.number} - {finalLevel.level}</span>
                </h2>
                <p className="diagnostico-result-subtitle">No se trata de hacer más, sino de ver más claro.</p>
                <p>
                  Hoy tu operación muestra señales de {finalLevel.symptom}. La oportunidad más rápida está en {finalLevel.opportunity}.
                </p>

                <div className="diagnostico-level-track" aria-label="Barra visual de madurez">
                  {[1, 2, 3, 4].map((levelNumber) => (
                    <span
                      key={levelNumber}
                      className={`diagnostico-level-node ${levelNumber <= finalLevel.number ? 'active' : ''}`}
                    >
                      Nivel {levelNumber}
                    </span>
                  ))}
                </div>

                <div className="diagnostico-highlight">
                  <h3>Tu situación</h3>
                  <p>{finalLevel.situation}</p>
                </div>

                <div className="diagnostico-lists">
                  <div>
                    <h4>Lo que suele pasar aquí</h4>
                    <ul>
                      {finalLevel.usuallyHappens.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4>Oportunidades</h4>
                    <ol>
                      {finalLevel.opportunities.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                <p className="diagnostico-cta-text">{finalLevel.ctaText}</p>

                <button type="button" className="diagnostico-secondary-button" onClick={handleResetTest}>
                  Reiniciar diagnóstico
                </button>

                <div className="diagnostico-material-placeholder">
                  <h3>Material para llevarte</h3>
                  <p>
                    Placeholder: Checklist de madurez Legal Ops (PDF) con acciones por fase y quick wins por nivel.
                  </p>
                  <button type="button" className="diagnostico-material-button" disabled>
                    Descarga disponible tras enviar tus datos
                  </button>
                </div>

                <div className="diagnostico-final-form-block">
                  <h3>Obtén tu diagnóstico en tu correo</h3>
                  <p>Déjanos tus datos para enviarte el resultado y la guía breve con acciones por nivel.</p>

                  <form onSubmit={handleSubmitDiagnosis} className="diagnostico-form" noValidate>
                    <div className="diagnostico-form-grid">
                      <label>
                        Nombre y apellido
                        <input
                          type="text"
                          value={finalFormData.name}
                          onChange={(event) => setFinalFormData((prev) => ({ ...prev, name: event.target.value }))}
                          className={finalErrors.name ? 'error' : ''}
                        />
                        {finalErrors.name && <span className="error-text">{finalErrors.name}</span>}
                      </label>

                      <label>
                        Email corporativo
                        <input
                          type="email"
                          value={finalFormData.email}
                          onChange={(event) => setFinalFormData((prev) => ({ ...prev, email: event.target.value }))}
                          className={finalErrors.email ? 'error' : ''}
                        />
                        {finalErrors.email && <span className="error-text">{finalErrors.email}</span>}
                      </label>

                      <label>
                        Empresa
                        <input
                          type="text"
                          value={finalFormData.company}
                          onChange={(event) => setFinalFormData((prev) => ({ ...prev, company: event.target.value }))}
                          className={finalErrors.company ? 'error' : ''}
                        />
                        {finalErrors.company && <span className="error-text">{finalErrors.company}</span>}
                      </label>

                      <label>
                        Cargo
                        <select
                          value={finalFormData.role}
                          onChange={(event) =>
                            setFinalFormData((prev) => ({
                              ...prev,
                              role: event.target.value as RoleOption | '',
                            }))
                          }
                          className={finalErrors.role ? 'error' : ''}
                        >
                          <option value="">Selecciona tu cargo</option>
                          {roleOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        {finalErrors.role && <span className="error-text">{finalErrors.role}</span>}
                      </label>

                      <label>
                        Tamaño de empresa
                        <select
                          value={finalFormData.companySize}
                          onChange={(event) =>
                            setFinalFormData((prev) => ({
                              ...prev,
                              companySize: event.target.value as CompanySize | '',
                            }))
                          }
                          className={finalErrors.companySize ? 'error' : ''}
                        >
                          <option value="">Selecciona el tamaño</option>
                          {companySizeOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        {finalErrors.companySize && <span className="error-text">{finalErrors.companySize}</span>}
                      </label>
                    </div>

                    <label className="diagnostico-checkbox-label">
                      <input
                        type="checkbox"
                        checked={finalFormData.wantsMaterial}
                        onChange={(event) =>
                          setFinalFormData((prev) => ({
                            ...prev,
                            wantsMaterial: event.target.checked,
                          }))
                        }
                      />
                      <span>Quiero recibir también el checklist de madurez Legal Ops (material complementario).</span>
                    </label>

                    <p className="diagnostico-note">
                      Tu información es confidencial y se usa solo para enviarte el diagnóstico y coordinar una conversación si la
                      solicitas.
                    </p>

                    {finalErrors.submit && <p className="error-text submit-error">{finalErrors.submit}</p>}

                    <button type="submit" className="diagnostico-primary-button" disabled={isSubmitting}>
                      {isSubmitting ? 'Enviando...' : finalLevel.buttonLabel}
                    </button>
                  </form>
                </div>
              </div>

              <div className="diagnostico-close-block">
                <h3>Las áreas legales que escalan no son las más grandes: son las más conectadas.</h3>
                <p>
                  Según nuestro benchmark regional, equipos con trazabilidad, flujos automatizados y visibilidad centralizada
                  logran:
                </p>
                <ul>
                  <li>+35% eficiencia en gestión contractual</li>
                  <li>40% tiempos de respuesta</li>
                  <li>+27% satisfacción interna</li>
                </ul>
                <p>
                  ¿Quieres que lo aterricemos a tu realidad? En una demo vemos tu flujo actual y te proponemos una ruta por fases.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
};
