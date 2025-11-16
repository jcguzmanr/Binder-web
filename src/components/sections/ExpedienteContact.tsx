import { useState, FormEvent } from 'react';
import { contactoContent } from '../../content/contacto';
import './ExpedienteContact.css';

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
}

interface FormErrors {
  name?: string;
  company?: string;
  email?: string;
  consent?: string;
}

export const ExpedienteContact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    consent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        message: '',
        consent: false,
      });
      setSubmitSuccess(false);
    }, 3000);
  };

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section id="expediente-contact" className="expediente-contact-section">
      <div className="container-wide">
        <div className="expediente-contact-grid">
          <div className="expediente-contact-text">
            <h2 className="expediente-contact-title">{contactoContent.title}</h2>
            <p className="expediente-contact-description">{contactoContent.description}</p>
            <p className="expediente-contact-cta">{contactoContent.callToAction}</p>
          </div>

          <div className="expediente-contact-form-container">
            <div className="expediente-contact-decoration">
              <img src="/Clerk-2.png" alt="Clerk" className="expediente-clerk-decoration-image" />
            </div>
            <form onSubmit={handleSubmit} className="expediente-contact-form">
              <h3 className="expediente-form-title">{contactoContent.form.title}</h3>

              <div className="expediente-form-group">
                <input
                  type="text"
                  placeholder={contactoContent.form.fields.name.placeholder}
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="expediente-error-message">{errors.name}</span>}
              </div>

              <div className="expediente-form-group">
                <input
                  type="text"
                  placeholder={contactoContent.form.fields.company.placeholder}
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  className={errors.company ? 'error' : ''}
                />
                {errors.company && <span className="expediente-error-message">{errors.company}</span>}
              </div>

              <div className="expediente-form-group">
                <input
                  type="email"
                  placeholder={contactoContent.form.fields.email.placeholder}
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="expediente-error-message">{errors.email}</span>}
              </div>

              <div className="expediente-form-group">
                <input
                  type="tel"
                  placeholder={contactoContent.form.fields.phone.placeholder}
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                />
              </div>

              <div className="expediente-form-group">
                <textarea
                  placeholder={contactoContent.form.fields.message.placeholder}
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  rows={4}
                />
              </div>

              <div className="expediente-form-group expediente-checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => handleChange('consent', e.target.checked)}
                  />
                  <span>{contactoContent.form.consent.text}</span>
                </label>
                {errors.consent && <span className="expediente-error-message">{errors.consent}</span>}
              </div>

              <button 
                type="submit" 
                className="expediente-submit-button"
                disabled={isSubmitting || submitSuccess}
              >
                {isSubmitting ? 'Enviando...' : submitSuccess ? '¡Enviado!' : contactoContent.form.submitText}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

