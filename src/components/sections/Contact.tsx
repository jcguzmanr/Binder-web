import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { contactoContent } from '../../content/contacto';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import blockedEmailDomains from '../../data/blockedEmailDomains.json';
import countriesData from '../../data/countries.json';
import './Contact.css';

interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

interface FormData {
  name: string;
  company: string;
  email: string;
  phoneCountry: string;
  phone: string;
  message: string;
  consent: boolean;
}

interface FormErrors {
  name?: string;
  company?: string;
  email?: string;
  consent?: string;
  submit?: string;
}

export const Contact = () => {
  const navigate = useNavigate();
  const countries = countriesData.countries as Country[];
  const blockedDomains = blockedEmailDomains.blockedDomains as string[];
  
  // Encontrar Perú como país por defecto
  const defaultCountry = countries.find(c => c.code === 'PE') || countries[0];
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phoneCountry: defaultCountry.code,
    phone: '',
    message: '',
    consent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px',
    triggerOnce: true,
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'La empresa es requerida';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Correo inválido';
    } else {
      // Validar dominio bloqueado
      const emailDomain = formData.email.split('@')[1]?.toLowerCase();
      if (emailDomain && blockedDomains.includes(emailDomain)) {
        newErrors.email = 'Por favor, utiliza un correo corporativo. No se permiten correos personales (Gmail, Hotmail, etc.)';
      }
    }

    if (!formData.consent) {
      newErrors.consent = 'Debes aceptar el consentimiento';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({}); // Clear previous errors
    
    try {
      const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;
      
      if (!webhookUrl) {
        throw new Error('Webhook URL no configurada');
      }

      // Enviar datos al webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone 
            ? `${countries.find(c => c.code === formData.phoneCountry)?.dialCode || ''} ${formData.phone}`.trim()
            : null,
          phoneCountry: formData.phoneCountry,
          challenge: formData.message || null,
          consent: formData.consent,
          timestamp: new Date().toISOString(),
          source: 'contact-form',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
      }

      // Guardar datos en sessionStorage para la página de agradecimiento
      const submissionData = {
        name: formData.name,
        company: formData.company,
        email: formData.email,
      };
      sessionStorage.setItem('formSubmission', JSON.stringify(submissionData));
      
      // Redirigir a página de agradecimiento
      navigate('/gracias');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ 
        submit: error instanceof Error 
          ? error.message 
          : 'Hubo un error al enviar el formulario. Por favor, intenta nuevamente.' 
      });
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    // Clear email error when email changes
    if (field === 'email' && errors.email) {
      setErrors(prev => ({ ...prev, email: undefined }));
    }
  };

  return (
    <section 
      id="contacto" 
      ref={elementRef as React.RefObject<HTMLElement>}
      className={`contact-section scroll-animate ${isVisible ? 'visible' : ''}`}
    >
      <div className="container-wide">
        <div className="contact-grid">
          <div className="contact-text">
            <h2 className="contact-title">{contactoContent.title}</h2>
            <p className="contact-description">{contactoContent.description}</p>
            <p className="contact-cta">{contactoContent.callToAction}</p>
          </div>

          <div className="contact-form-container">
            <div className="contact-decoration">
              <img src="/Clerk-2.png" alt="Clerk" className="clerk-decoration-image" />
            </div>
            <form onSubmit={handleSubmit} className="contact-form">
              <h3 className="form-title">{contactoContent.form.title}</h3>

              <div className="form-group">
                <input
                  type="text"
                  placeholder={contactoContent.form.fields.name.placeholder}
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder={contactoContent.form.fields.company.placeholder}
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  className={errors.company ? 'error' : ''}
                />
                {errors.company && <span className="error-message">{errors.company}</span>}
              </div>

              <div className="form-group">
                <input
                  type="email"
                  placeholder={contactoContent.form.fields.email.placeholder}
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <div className="phone-input-wrapper">
                  <select
                    className="phone-country-select"
                    value={formData.phoneCountry}
                    onChange={(e) => handleChange('phoneCountry', e.target.value)}
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.dialCode}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    placeholder={contactoContent.form.fields.phone.placeholder}
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="phone-number-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <select
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  className={formData.message ? '' : 'placeholder-selected'}
                >
                  <option value="" disabled>
                    {contactoContent.form.fields.message.placeholder}
                  </option>
                  {contactoContent.form.fields.message.options?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => handleChange('consent', e.target.checked)}
                  />
                  <span>{contactoContent.form.consent.text}</span>
                </label>
                {errors.consent && <span className="error-message">{errors.consent}</span>}
              </div>

              {errors.submit && (
                <div className="form-group">
                  <span className="error-message">{errors.submit}</span>
                </div>
              )}

              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : contactoContent.form.submitText}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

