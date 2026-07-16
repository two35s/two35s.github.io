import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { AnimatedThemeToggler } from './AnimatedThemeToggler';
import './Header.css';

const NAV_LINKS = [
  { path: '/', label: 'Work' },
  { path: '/about', label: 'About' },
];

const MagneticLink = ({ to, label, isActive, onClick }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };

  return (
    <Link
      ref={ref}
      to={to}
      className={`nav-link ${isActive ? 'active' : ''}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
    >
      {label}
      {isActive && <span className="nav-indicator" />}
    </Link>
  );
};

const Header = ({ theme, toggleTheme }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const close = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      ref={headerRef}
      className={`header ${scrolled ? 'scrolled' : ''}`}
    >
      <nav className="header-inner">
        <Link to="/" className="logo" onClick={closeMobile}>
          Y/B<span className="logo-dot">.</span>
        </Link>

        <div className={`nav-center ${mobileOpen ? 'open' : ''}`}>
          {NAV_LINKS.map((link) => {
            const isActive = link.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(link.path);
            return (
              <MagneticLink
                key={link.path}
                to={link.path}
                label={link.label}
                isActive={isActive}
                onClick={closeMobile}
              />
            );
          })}
          <a
            href="/resume.pdf"
            className="nav-link nav-resume"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobile}
          >
            Resume <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="nav-right">
          <AnimatedThemeToggler theme={theme} onToggle={toggleTheme} className="theme-toggle-btn" />
          <button
            type="button"
            className={`mobile-toggle ${mobileOpen ? 'open' : ''}`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((p) => !p)}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
