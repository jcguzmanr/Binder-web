import { footerContent } from '../../content/footer';
import { homeContent } from '../../content/home';
import './Footer.css';

export const Footer = () => {
  const { columns, socialLinks, legalNote } = footerContent;

  const isExternalLink = (href: string) => {
    return href.startsWith('http') || href.startsWith('https');
  };

  const isHashLink = (href: string) => {
    return href.startsWith('#');
  };

  const handleHashLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If element not found, navigate to home with hash
      window.location.href = `/${href}`;
    }
  };

  const handleInternalLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    // Force full page reload for internal links to avoid scroll animation
    window.location.href = href;
  };

  return (
    <footer className="footer">
      <div className="container-wide">
        <div className="footer-columns">
          {columns.map((column, index) => (
            <div key={index} className="footer-column">
              <div>
                <h4 className="column-title">{column.title}</h4>
                <ul className="column-links">
                  {column.links.map((link, linkIndex) => {
                    if (isExternalLink(link.href)) {
                      return (
                        <li key={linkIndex}>
                          <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
                        </li>
                      );
                    } else if (isHashLink(link.href)) {
                      return (
                        <li key={linkIndex}>
                          <a href={link.href} onClick={(e) => handleHashLinkClick(e, link.href)}>{link.label}</a>
                        </li>
                      );
                    } else {
                      // Use regular <a> tag with full page reload for internal routes
                      return (
                        <li key={linkIndex}>
                          <a href={link.href} onClick={(e) => handleInternalLinkClick(e, link.href)}>{link.label}</a>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
              {index === 3 && (
                <div className="footer-badge footer-badge-column footer-badge-mobile">
                  <span className="footer-badge-text">{homeContent.badgeText}</span>
                  <span className="footer-badge-icon">
                    <img 
                      src="/proinnovate.png" 
                      alt="PRO innovate" 
                      className="footer-badge-logo"
                    />
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p className="legal-note">{legalNote}</p>
          
          <div className="social-links">
            <a 
              href={socialLinks.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="linkedin-link"
              aria-label="LinkedIn"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

