import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';
// import { ThemeToggle } from '../ui/ThemeToggle';
// import { BackgroundToggle } from '../ui/BackgroundToggle';
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
          
            // Detect active section: home page vs doc page
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
            
            if (!currentSection && window.scrollY < 200) {
              currentSection = 'home';
            }
            
            setActiveSection(currentSection);
          } else if (location.pathname === '/docs/prep-reunion-oka-ciberseguridad') {
            const docSections = ['contexto', 'arquitectura', 'ciberseguridad', 'regulacion', 'operacion', 'preguntas', 'postura', 'outsourcing'];
            const scrollPosition = window.scrollY + 120;
            let currentSection = '';
            for (const sectionId of docSections) {
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
            if (!currentSection && document.getElementById('contexto') && window.scrollY < 300) {
              currentSection = 'contexto';
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

  // On home page: OnePage sections. On doc page: document sections. Else: go to home with hash
  const navLinks = [
    { label: '¿Por qué Binder?', href: '#porquebinder', sectionId: 'porquebinder' },
    { label: 'Funcionalidades', href: '#soluciones', sectionId: 'soluciones' },
    { label: 'Soluciones', href: '#apps', sectionId: 'apps' },
    { label: 'Contacto', href: '#contacto', sectionId: 'contacto' },
  ];

  const docNavLinks = [
    { label: 'Contexto', href: '#contexto', sectionId: 'contexto' },
    { label: 'Arquitectura', href: '#arquitectura', sectionId: 'arquitectura' },
    { label: 'Ciberseguridad', href: '#ciberseguridad', sectionId: 'ciberseguridad' },
    { label: 'Regulación SBS', href: '#regulacion', sectionId: 'regulacion' },
    { label: 'Operación', href: '#operacion', sectionId: 'operacion' },
    { label: 'Preguntas', href: '#preguntas', sectionId: 'preguntas' },
    { label: 'Postura', href: '#postura', sectionId: 'postura' },
    { label: 'Outsourcing', href: '#outsourcing', sectionId: 'outsourcing' },
  ];

  const isDocPage = location.pathname === '/docs/prep-reunion-oka-ciberseguridad';
  const isHito2AnexosPage = location.pathname === '/hito2/anexos';
  const currentNavLinks = isDocPage ? docNavLinks : isHito2AnexosPage ? [] : navLinks;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, sectionId?: string) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
      }
    } else if (isDocPage) {
      e.preventDefault();
      const element = document.getElementById(sectionId || href.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
      }
    } else {
      e.preventDefault();
      window.location.href = `/${href}`;
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-menu-open' : ''} ${isDocPage ? 'navigation--doc' : ''}`}>
      <div className="container-wide">
        <div className="nav-content">
          {/* Left side: Mobile Menu Toggle and Logo */}
          <div className="nav-content-left">
            {/* Mobile Menu Toggle */}
            {!isHito2AnexosPage && (
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
            )}
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
            {currentNavLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.sectionId)}
                className={activeSection === link.sectionId ? 'active' : ''}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side: Actions — doc page shows only "Inicio", rest show CTA + Iniciar sesión */}
          <div className="nav-content-right">
            <div className="nav-actions">
              {isDocPage ? (
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="secondary">Inicio</Button>
                </Link>
              ) : isHito2AnexosPage ? (
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
              ) : (
                <>
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
                  <a 
                    href="https://thelegalbinder.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="secondary">Iniciar sesión</Button>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            {currentNavLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  handleNavClick(e, link.href, link.sectionId);
                }}
                className={activeSection === link.sectionId ? 'active' : ''}
              >
                {link.label}
              </a>
            ))}
            <div className="mobile-menu-actions">
              {isDocPage ? (
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} style={{ flex: 1, minWidth: 0 }}>
                  <Button variant="secondary" className="btn" style={{ width: '100%' }}>Inicio</Button>
                </Link>
              ) : isHito2AnexosPage ? (
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
              ) : (
                <>
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
                  <a 
                    href="https://thelegalbinder.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="secondary">Iniciar sesión</Button>
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

