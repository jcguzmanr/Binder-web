import { Fragment, useCallback, useEffect, useMemo, useState, FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getEventBySlug } from '../../content/eventos';
import blockedEmailDomains from '../../data/blockedEmailDomains.json';
import countriesData from '../../data/countries.json';
import {
  CORPORATE_EMAIL_REQUIRED_MESSAGE,
  getEmailDomain,
  isBlockedPersonalEmailDomain,
} from '../../utils/corporateEmailValidation';
import './EventPage.css';

const EVENTS_WEBHOOK_URL =
  'https://binder0.bubbleapps.io/version-test/api/1.1/wf/evento-de-cierre/initialize';
const LINKEDIN_PARTNER_ID = import.meta.env.VITE_LINKEDIN_PARTNER_ID as string | undefined;
const SITE_URL = 'https://binder.la';

declare global {
  interface Window {
    _linkedin_partner_id?: string;
    _linkedin_data_partner_ids?: string[];
    lintrk?: (a: string, b: string) => void;
  }
}

interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  company: string;
  phoneCountry: string;
  phone: string;
  consent: boolean;
}

interface FieldErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  jobTitle?: string;
  company?: string;
  consent?: string;
  submit?: string;
}

/** Logos Binder + Niubox + Nexum (reutilizado en barra desktop y toolbar móvil) */
function WebinarPartnerLogos() {
  return (
    <>
      <Link to="/" aria-label="Binder — inicio">
        <img src="/lightmode_default.svg" alt="Binder" className="ev-logo-binder" />
      </Link>
      <img src="/imgs-webinar/niubox_logo.webp" alt="Niubox" className="ev-logo-niubox-img" />
      <div className="ev-logo-nexum-wrap" aria-label="Nexum">
        <img src="/imgs-webinar/nexum_logo.png" alt="Nexum" className="ev-logo-nexum-img" />
      </div>
    </>
  );
}

export function EventPage() {
  const { slug } = useParams<{ slug: string }>();
  const event = useMemo(() => getEventBySlug(slug), [slug]);

  const countries = countriesData.countries as Country[];
  const blockedDomains = blockedEmailDomains.blockedDomains as string[];
  const defaultCountry = countries.find((c) => c.code === 'PE') || countries[0];

  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    company: '',
    phoneCountry: defaultCountry.code,
    phone: '',
    consent: false,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const canonicalPath = slug ? `/eventos/${slug}` : '';
  const fullUrl = `${SITE_URL}${canonicalPath}`;

  useEffect(() => {
    if (!LINKEDIN_PARTNER_ID) return;

    window._linkedin_partner_id = LINKEDIN_PARTNER_ID;
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    if (!window._linkedin_data_partner_ids.includes(LINKEDIN_PARTNER_ID)) {
      window._linkedin_data_partner_ids.push(LINKEDIN_PARTNER_ID);
    }

    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript?.parentNode?.insertBefore(s, firstScript);

    return () => {
      s.remove();
      if (window._linkedin_data_partner_ids) {
        window._linkedin_data_partner_ids = window._linkedin_data_partner_ids.filter(
          (id) => id !== LINKEDIN_PARTNER_ID
        );
      }
      delete window._linkedin_partner_id;
    };
  }, []);

  /* Quitar límites inline en <html> (p. ej. preview con max-width/max-height) para que la página crezca con el contenido */
  useEffect(() => {
    const el = document.documentElement;
    const prev = {
      maxWidth: el.style.maxWidth,
      maxHeight: el.style.maxHeight,
      overflow: el.style.overflow,
    };
    el.style.removeProperty('max-width');
    el.style.removeProperty('max-height');
    el.style.removeProperty('overflow');
    return () => {
      if (prev.maxWidth) el.style.maxWidth = prev.maxWidth;
      if (prev.maxHeight) el.style.maxHeight = prev.maxHeight;
      if (prev.overflow) el.style.overflow = prev.overflow;
    };
  }, []);

  const validate = useCallback((): boolean => {
    const next: FieldErrors = {};
    if (!form.firstName.trim()) next.firstName = 'El nombre es requerido';
    if (!form.lastName.trim()) next.lastName = 'El apellido es requerido';
    const emailTrimmed = form.email.trim();
    if (!emailTrimmed) {
      next.email = 'El correo es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      next.email = 'Correo inválido';
    } else {
      const domain = getEmailDomain(emailTrimmed);
      if (domain && isBlockedPersonalEmailDomain(domain, blockedDomains)) {
        next.email = CORPORATE_EMAIL_REQUIRED_MESSAGE;
      }
    }
    if (!form.jobTitle.trim()) next.jobTitle = 'El cargo es requerido';
    if (!form.company.trim()) next.company = 'La empresa es requerida';
    if (!form.consent) next.consent = 'Debes aceptar para continuar';
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [form, blockedDomains]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!event || !validate()) return;

    setSubmitting(true);
    setErrors((prev) => ({ ...prev, submit: undefined }));

    const dial = countries.find((c) => c.code === form.phoneCountry)?.dialCode || '';
    const phoneDigits = form.phone.replace(/\D/g, '');
    const phoneFull = phoneDigits ? `${dial} ${phoneDigits}`.trim() : null;

    const at = form.email.trim().lastIndexOf('@');
    const emailNormalized =
      at > 0
        ? `${form.email.trim().slice(0, at + 1)}${form.email.trim().slice(at + 1).toLowerCase()}`
        : form.email.trim();

    try {
      const res = await fetch(EVENTS_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: emailNormalized,
          jobTitle: form.jobTitle.trim(),
          company: form.company.trim(),
          phone: phoneFull,
          phoneCountry: form.phoneCountry,
          consent: form.consent,
          timestamp: new Date().toISOString(),
          source: `evento-${event.slug}`,
          eventSlug: event.slug,
        }),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(
          (errBody as { error?: string }).error ||
            `Error ${res.status}: ${res.statusText}`
        );
      }

      setSuccess(true);
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          event_category: 'evento',
          event_label: event.slug,
        });
      }
    } catch (err) {
      console.error('Event registration error:', err);
      setErrors({
        submit:
          err instanceof Error
            ? `No se pudo enviar tu registro. ${err.message}`
            : 'No se pudo enviar tu registro por un error de red. Intenta nuevamente en unos minutos.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const setField = (field: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    const errKey = field as keyof FieldErrors;
    if (errors[errKey]) {
      setErrors((prev) => ({ ...prev, [errKey]: undefined }));
    }
  };

  const scrollToRegister = useCallback(() => {
    const registerSection = document.getElementById('registro');
    if (!registerSection) return;
    registerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  if (!event) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{event.seoTitle}</title>
        <meta name="description" content={event.seoDescription} />
        <link rel="canonical" href={fullUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:title" content={event.seoTitle} />
        <meta property="og:description" content={event.seoDescription} />
        <meta property="og:site_name" content="Binder" />
        <meta property="og:locale" content="es_ES" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={fullUrl} />
        <meta name="twitter:title" content={event.seoTitle} />
        <meta name="twitter:description" content={event.seoDescription} />
      </Helmet>

      <div className="ev">
        {/* ── HERO ── */}
        <section className="ev-hero">
          {/* Móvil: toolbar superior con Binder + CTA a formulario */}
          <header className="ev-hero-toolbar-mobile">
            <div className="ev-hero-toolbar-mobile-inner">
              <Link to="/" aria-label="Binder — inicio">
                <img src="/lightmode_default.svg" alt="Binder" className="ev-logo-binder ev-logo-binder--toolbar" />
              </Link>
              <button
                type="button"
                className="ev-hero-toolbar-register-btn"
                onClick={scrollToRegister}
              >
                Inscríbete
              </button>
            </div>
          </header>

          {/* Izquierda: columna exterior azul (#30339c); panel morado; video como fondo de .ev-hero-content-inner */}
          <div className="ev-hero-left">
            <div className="ev-hero-left-surface">
              <div className="ev-hero-left-purple">
                <div className="ev-hero-left-content">
                  <div className="ev-hero-content">
                    <div className="ev-hero-content-stack">
                      <div className="ev-hero-content-inner">
                        <div className="ev-logo-bar ev-logo-bar--hero-inner">
                          <WebinarPartnerLogos />
                        </div>
                        <video
                          className="ev-video-bg ev-video-bg--hero-inner"
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="auto"
                          aria-hidden
                        >
                          <source src="/videos/videobackground.mp4" type="video/mp4" />
                        </video>
                        <div className="ev-hero-main">
                          <div className="ev-badge">{event.badgeText.toUpperCase()}</div>
                          <h1 className="ev-title">
                            <span className="ev-title-main">
                              {event.titleLine1Before}
                              {event.titleLine1Highlight}
                              {event.titleLine1After}
                            </span>
                            <span className="ev-title-sub">{event.titleLine2}</span>
                          </h1>

                          <p className="ev-title-lead">{event.description}</p>

                          <div className="ev-speakers-row">
                            {event.speakers.map((s) => (
                              <div key={s.name} className="ev-speaker-item">
                                <div className="ev-speaker-photo">
                                  {s.avatarUrl ? <img src={s.avatarUrl} alt="" /> : s.initials}
                                </div>
                                <div className="ev-speaker-info">
                                  <div className="ev-speaker-name">{s.name.toUpperCase()}</div>
                                  <div className="ev-speaker-role">{s.role}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha: azul sólido; sponsors arriba, formulario centrado debajo */}
          <div className="ev-hero-right" id="registro">
            <div className="ev-hero-right-inner">
              <div className="ev-sponsor-bar">
                <img
                  src="/imgs-webinar/minprod_logo.png"
                  alt="PERÚ — Ministerio de la Producción"
                  className="ev-logo-minprod"
                />
                <div>
                  <div className="ev-sponsor-cofin">Cofinanciado por</div>
                  <img
                    src="/imgs-webinar/proinnovate_logo.png"
                    alt="ProInnovate"
                    className="ev-logo-proinnovate"
                  />
                </div>
              </div>

              <div className="ev-hero-right-body">
                <div className="ev-form-card">
                <p className="ev-form-heading">{event.formHeading}</p>
                <p className="ev-form-sub">
                  {event.formSubtext}
                  {event.formSubtextStrong && <strong>{event.formSubtextStrong}</strong>}
                </p>

                {success ? (
                  <div className="ev-form-success">
                    <div className="ev-form-success-icon" aria-hidden>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h2 className="ev-form-success-title">¡Te has registrado correctamente!</h2>
                    <p className="ev-form-success-text">
                      Revisa tu correo para los siguientes pasos. Si no ves el mensaje, revisa spam o promociones.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="ev-form-grid">
                      <div>
                        <input type="text" placeholder="Nombre *" value={form.firstName} onChange={(e) => setField('firstName', e.target.value)} className={errors.firstName ? 'ev-input-error' : ''} autoComplete="given-name" aria-invalid={!!errors.firstName} />
                        {errors.firstName && <div className="ev-field-error">{errors.firstName}</div>}
                      </div>
                      <div>
                        <input type="text" placeholder="Apellido *" value={form.lastName} onChange={(e) => setField('lastName', e.target.value)} className={errors.lastName ? 'ev-input-error' : ''} autoComplete="family-name" aria-invalid={!!errors.lastName} />
                        {errors.lastName && <div className="ev-field-error">{errors.lastName}</div>}
                      </div>
                      <div className="ev-form-full">
                        <input type="email" placeholder="Email corporativo *" value={form.email} onChange={(e) => setField('email', e.target.value)} className={errors.email ? 'ev-input-error' : ''} autoComplete="email" aria-invalid={!!errors.email} />
                        {errors.email && <div className="ev-field-error">{errors.email}</div>}
                      </div>
                      <div>
                        <input type="text" placeholder="Cargo *" value={form.jobTitle} onChange={(e) => setField('jobTitle', e.target.value)} className={errors.jobTitle ? 'ev-input-error' : ''} autoComplete="organization-title" aria-invalid={!!errors.jobTitle} />
                        {errors.jobTitle && <div className="ev-field-error">{errors.jobTitle}</div>}
                      </div>
                      <div>
                        <input type="text" placeholder="Empresa *" value={form.company} onChange={(e) => setField('company', e.target.value)} className={errors.company ? 'ev-input-error' : ''} autoComplete="organization" aria-invalid={!!errors.company} />
                        {errors.company && <div className="ev-field-error">{errors.company}</div>}
                      </div>
                      <div className="ev-phone-row">
                        <select className="ev-phone-country" value={form.phoneCountry} onChange={(e) => setField('phoneCountry', e.target.value)} aria-label="Código de país">
                          {countries.map((c) => (
                            <option key={c.code} value={c.code}>{c.flag} {c.dialCode}</option>
                          ))}
                        </select>
                        <input type="tel" inputMode="numeric" pattern="[0-9]*" className="ev-phone-number" placeholder="Teléfono (solo números)" value={form.phone} onChange={(e) => setField('phone', e.target.value.replace(/\D/g, ''))} autoComplete="tel-national" />
                      </div>
                      <div className="ev-consent ev-form-full">
                        <input
                          id="event-consent-checkbox"
                          type="checkbox"
                          checked={form.consent}
                          onChange={(e) => setField('consent', e.target.checked)}
                        />
                        <label htmlFor="event-consent-checkbox">
                          Acepto el tratamiento de mis datos según la{' '}
                          <Link to="/legal/privacidad" target="_blank" rel="noopener noreferrer">política de privacidad</Link>.
                        </label>
                      </div>
                      {errors.consent && <div className="ev-field-error ev-form-full">{errors.consent}</div>}
                    </div>

                    {errors.submit && <p className="ev-form-error" role="alert">{errors.submit}</p>}

                    <button type="submit" className="ev-cta-btn" disabled={submitting}>
                      {submitting ? 'Enviando…' : event.ctaText}
                    </button>

                    {event.formNoteHtml && (
                      <p className="ev-form-note" dangerouslySetInnerHTML={{ __html: event.formNoteHtml }} />
                    )}
                  </form>
                )}
                </div>

                <div className="ev-divider" />

                <div className="ev-info-row">
                <div className="ev-info-card">
                  <div className="ev-info-icon" aria-hidden>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <div className="ev-info-title">MIÉRCOLES 15 DE ABRIL</div>
                    <div className="ev-info-sub">11:00 a.m.</div>
                  </div>
                </div>

                <div className="ev-info-divider" />

                <div className="ev-info-card">
                  <div className="ev-info-icon" aria-hidden>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="23 7 16 12 23 17 23 7" />
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                    </svg>
                  </div>
                  <div>
                    <div className="ev-info-title">VÍA ZOOM | 60 MIN</div>
                    <div className="ev-info-sub">Acceso gratuito con cupos limitados</div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="ev-footer">
          <div className="ev-footer-logos">
            {event.footerLogos.map((logo, i) => (
              <Fragment key={logo}>
                {i > 0 ? <div className="ev-footer-sep" aria-hidden /> : null}
                <span className="ev-footer-logo">{logo}</span>
              </Fragment>
            ))}
          </div>
          <div className="ev-footer-note">{event.footerNote}</div>
        </footer>
      </div>
    </>
  );
}
