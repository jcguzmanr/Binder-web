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

/** External webhook for event registrations — configure in `.env` as `VITE_EVENTS_WEBHOOK_URL`. */
const EVENTS_WEBHOOK_URL = import.meta.env.VITE_EVENTS_WEBHOOK_URL as string | undefined;

/** LinkedIn Insight Tag partner ID — configure as `VITE_LINKEDIN_PARTNER_ID` when available. */
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

    if (!EVENTS_WEBHOOK_URL) {
      setErrors({
        submit: 'Registro temporalmente no disponible. Intenta más tarde o contacta a Binder.',
      });
      return;
    }

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
            ? err.message
            : 'Hubo un error al enviar. Por favor, intenta nuevamente.',
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

      <div className="event-page">
        <div className="event-page-inner">
          <nav className="event-nav" aria-label="Evento">
            <div className="event-nav-logos">
              <Link to="/" className="event-nav-logo-link" aria-label="Binder — inicio">
                <img src="/lightmode_default.svg" alt="Binder" />
              </Link>
              {event.coHostPill && (
                <>
                  <div className="event-logo-divider" aria-hidden />
                  <span className="event-logo-pill">{event.coHostPill}</span>
                </>
              )}
            </div>
            <span className="event-nav-tag">{event.navTag}</span>
          </nav>

          <div className="event-hero">
            <div className="event-hero-left">
              <div className="event-hero-left-block">
                {event.heroImageUrl ? (
                  <div className="event-key-visual">
                    <img src={event.heroImageUrl} alt={event.heroImageAlt || ''} />
                  </div>
                ) : null}

                <div>
                  <div className="event-badge">{event.badgeText}</div>
                  <h1>
                    <span className="event-title-eyebrow">
                      {event.titleLine1Before}
                      <em>{event.titleLine1Highlight}</em>
                      {event.titleLine1After}
                    </span>
                    <span className="event-title-sub">{event.titleLine2}</span>
                  </h1>
                  <p className="event-hero-subtitle">{event.description}</p>

                  <div className="event-meta">
                    {event.meta.map((row) => (
                      <div key={row.label} className="event-meta-row">
                        <div className="event-meta-icon" aria-hidden>
                          {row.icon}
                        </div>
                        <div className="event-meta-content">
                          <div className="event-meta-label">{row.label}</div>
                          <div className="event-meta-value">
                            {row.badge && (
                              <span
                                className="event-zoom-badge"
                                style={
                                  row.badge.background
                                    ? { background: row.badge.background }
                                    : undefined
                                }
                              >
                                {row.badge.text}
                              </span>
                            )}
                            {row.value ? <span>{row.value}</span> : null}
                            {row.sub ? (
                              <span className="event-meta-sub"> {row.sub}</span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="event-hero-right" id="registro">
              {success ? (
                <div className="event-form-success">
                  <div className="event-form-success-icon" aria-hidden>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h2 className="event-form-success-title">
                    ¡Te has registrado correctamente!
                  </h2>
                  <p className="event-form-success-text">
                    Revisa tu correo para los siguientes pasos. Si no ves el mensaje, revisa
                    spam o promociones.
                  </p>
                </div>
              ) : (
                <>
                  <p className="event-form-heading">{event.formHeading}</p>
                  <p className="event-form-sub">
                    {event.formSubtext}
                    {event.formSubtextStrong ? (
                      <strong>{event.formSubtextStrong}</strong>
                    ) : null}
                  </p>

                  <form onSubmit={handleSubmit} noValidate>
                    <div className="event-form-grid">
                      <div>
                        <input
                          type="text"
                          placeholder="Nombre *"
                          value={form.firstName}
                          onChange={(e) => setField('firstName', e.target.value)}
                          className={errors.firstName ? 'event-input-error' : ''}
                          autoComplete="given-name"
                          aria-invalid={!!errors.firstName}
                        />
                        {errors.firstName && (
                          <div className="event-field-error">{errors.firstName}</div>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Apellido *"
                          value={form.lastName}
                          onChange={(e) => setField('lastName', e.target.value)}
                          className={errors.lastName ? 'event-input-error' : ''}
                          autoComplete="family-name"
                          aria-invalid={!!errors.lastName}
                        />
                        {errors.lastName && (
                          <div className="event-field-error">{errors.lastName}</div>
                        )}
                      </div>

                      <div className="event-form-full">
                        <input
                          type="email"
                          placeholder="Email corporativo *"
                          value={form.email}
                          onChange={(e) => setField('email', e.target.value)}
                          className={errors.email ? 'event-input-error' : ''}
                          autoComplete="email"
                          aria-invalid={!!errors.email}
                        />
                        {errors.email && (
                          <div className="event-field-error">{errors.email}</div>
                        )}
                      </div>

                      <div>
                        <input
                          type="text"
                          placeholder="Cargo *"
                          value={form.jobTitle}
                          onChange={(e) => setField('jobTitle', e.target.value)}
                          className={errors.jobTitle ? 'event-input-error' : ''}
                          autoComplete="organization-title"
                          aria-invalid={!!errors.jobTitle}
                        />
                        {errors.jobTitle && (
                          <div className="event-field-error">{errors.jobTitle}</div>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Empresa *"
                          value={form.company}
                          onChange={(e) => setField('company', e.target.value)}
                          className={errors.company ? 'event-input-error' : ''}
                          autoComplete="organization"
                          aria-invalid={!!errors.company}
                        />
                        {errors.company && (
                          <div className="event-field-error">{errors.company}</div>
                        )}
                      </div>

                      <div className="event-phone-row">
                        <select
                          className="event-phone-country"
                          value={form.phoneCountry}
                          onChange={(e) => setField('phoneCountry', e.target.value)}
                          aria-label="Código de país"
                        >
                          {countries.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.flag} {c.dialCode}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          className="event-phone-number"
                          placeholder="Teléfono (solo números)"
                          value={form.phone}
                          onChange={(e) =>
                            setField('phone', e.target.value.replace(/\D/g, ''))
                          }
                          autoComplete="tel-national"
                        />
                      </div>

                      <label className="event-consent event-form-full">
                        <input
                          type="checkbox"
                          checked={form.consent}
                          onChange={(e) => setField('consent', e.target.checked)}
                        />
                        <span>
                          Acepto el tratamiento de mis datos según la{' '}
                          <Link to="/legal/privacidad" target="_blank" rel="noopener noreferrer">
                            política de privacidad
                          </Link>
                          .
                        </span>
                      </label>
                      {errors.consent && (
                        <div className="event-field-error event-form-full">{errors.consent}</div>
                      )}
                    </div>

                    {errors.submit && (
                      <p className="event-form-error" role="alert">
                        {errors.submit}
                      </p>
                    )}

                    <button type="submit" className="event-cta-btn" disabled={submitting}>
                      {submitting ? 'Enviando…' : event.ctaText}
                    </button>

                    {event.formNoteHtml && (
                      <p
                        className="event-form-note"
                        dangerouslySetInnerHTML={{ __html: event.formNoteHtml }}
                      />
                    )}
                  </form>
                </>
              )}
            </div>
          </div>

          <section className="event-speakers" aria-labelledby="event-speakers-heading">
            <h2 id="event-speakers-heading" className="event-speakers-label">
              Speakers
            </h2>
            <div className="event-speakers-grid">
              {event.speakers.map((s) => (
                <article key={s.name} className="event-speaker-card">
                  <div className="event-speaker-avatar">
                    {s.avatarUrl ? (
                      <img src={s.avatarUrl} alt="" />
                    ) : (
                      s.initials
                    )}
                  </div>
                  <div className="event-speaker-info">
                    <div className="event-speaker-name">{s.name}</div>
                    <div className="event-speaker-role">{s.role}</div>
                    <p className="event-speaker-bio">{s.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <footer className="event-footer">
            <div className="event-footer-logos">
              {event.footerLogos.map((logo, i) => (
                <Fragment key={logo}>
                  {i > 0 ? <div className="event-footer-sep" aria-hidden /> : null}
                  <span className="event-footer-logo">{logo}</span>
                </Fragment>
              ))}
            </div>
            <div className="event-footer-note">{event.footerNote}</div>
          </footer>
        </div>
      </div>
    </>
  );
}
