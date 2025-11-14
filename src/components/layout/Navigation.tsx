import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';
import './Navigation.css';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: '¿Por qué Binder?', href: '#porquebinder' },
    { label: 'Soluciones', href: '#soluciones' },
    { label: 'Apps', href: '#apps' },
    { label: 'Testimonios', href: '#testimonios' },
    { label: 'Contacto', href: '#contacto' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container-wide">
        <div className="nav-content">
          {/* Logo */}
          <a href="#home" className="logo" onClick={(e) => handleNavClick(e, '#home')}>
            <img src="/lightmode_default.svg" alt="Binder" className="logo-full" />
            <img src="/lightmode_default_isotipo.svg" alt="Binder" className="logo-isotipo" />
          </a>

          {/* Desktop Navigation */}
          <div className="nav-links">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="nav-actions">
            <ThemeToggle />
            <Button variant="primary">Agendar Demo</Button>
            <Button variant="secondary">Ingresar</Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
            <div className="mobile-menu-actions">
              <Button variant="primary">Agendar Demo</Button>
              <Button variant="secondary">Ingresar</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

