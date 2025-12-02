import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';
import { BackgroundToggle } from '../ui/BackgroundToggle';
import './Navigation.css';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          // Close mobile menu on scroll
          if (isMobileMenuOpen && window.scrollY > 50) {
            setIsMobileMenuOpen(false);
          }
          
            // Only detect active section on home page
          if (location.pathname === '/') {
            const sections = ['home', 'porquebinder', 'soluciones', 'apps', 'contacto'];
            const scrollPosition = window.scrollY + 150; // Offset for fixed nav
            
            let currentSection = '';
            for (const sectionId of sections) {
              const element = document.getElementById(sectionId);
              if (element) {
                const offsetTop = element.offsetTop;
                const offsetHeight = element.offsetHeight;
                if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                  currentSection = sectionId;
                  break;
                }
              }
            }
            
            // If no section found, check if we're at the top (home)
            if (!currentSection && window.scrollY < 200) {
              currentSection = 'home';
            }
            
            setActiveSection(currentSection);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen, location.pathname]);

  // On home page, use hash links for OnePage scroll behavior
  // On internal pages, these links navigate to home sections
  const navLinks = [
    { label: '¿Por qué Binder?', href: '#porquebinder', sectionId: 'porquebinder' },
    { label: 'Funcionalidades', href: '#soluciones', sectionId: 'soluciones' },
    { label: 'Soluciones', href: '#apps', sectionId: 'apps' },
    // { label: 'Testimonios', href: '#testimonios', sectionId: 'testimonios' },
    { label: 'Contacto', href: '#contacto', sectionId: 'contacto' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (location.pathname === '/') {
      // On home page, use smooth scroll
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
      }
    } else {
      // On internal pages, navigate to home with hash
      e.preventDefault();
      window.location.href = `/${href}`;
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container-wide">
        <div className="nav-content">
          {/* Left side: Mobile Menu Toggle and Logo */}
          <div className="nav-content-left">
            {/* Mobile Menu Toggle */}
            <button
              className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            {location.pathname === '/' ? (
              <a 
                href="#home" 
                className="logo"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setIsMobileMenuOpen(false);
                }}
              >
                <img src="/lightmode_default.svg" alt="Binder" className="logo-full" />
                <img src="/lightmode_default_isotipo.svg" alt="Binder" className="logo-isotipo" />
              </a>
            ) : (
              <Link 
                to="/" 
                className="logo"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <img src="/lightmode_default.svg" alt="Binder" className="logo-full" />
                <img src="/lightmode_default_isotipo.svg" alt="Binder" className="logo-isotipo" />
              </Link>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="nav-links">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={location.pathname === '/' && activeSection === link.sectionId ? 'active' : ''}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side: Actions */}
          <div className="nav-content-right">
            <div className="nav-actions">
              {/* <ThemeToggle /> */}
              {/* <BackgroundToggle /> */}
              <a 
                href="#contacto"
                onClick={(e) => {
                  if (location.pathname === '/') {
                    e.preventDefault();
                    const element = document.querySelector('#contacto');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  } else {
                    e.preventDefault();
                    window.location.href = '/#contacto';
                  }
                }}
              >
                <Button variant="primary">
                  Agendar demo
                </Button>
              </a>
              <Button variant="secondary">Ingresar</Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  handleNavClick(e, link.href);
                }}
                className={location.pathname === '/' && activeSection === link.sectionId ? 'active' : ''}
              >
                {link.label}
              </a>
            ))}
            <div className="mobile-menu-actions">
              {/* <ThemeToggle /> */}
              {/* <BackgroundToggle /> */}
              <a 
                href="#contacto"
                onClick={(e) => {
                  if (location.pathname === '/') {
                    e.preventDefault();
                    const element = document.querySelector('#contacto');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  } else {
                    e.preventDefault();
                    window.location.href = '/#contacto';
                  }
                  setIsMobileMenuOpen(false);
                }}
              >
                <Button variant="primary">
                  Agendar demo
                </Button>
              </a>
              <Button variant="secondary">Ingresar</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

