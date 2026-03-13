import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatedThemeToggler } from './AnimatedThemeToggler';
import { prefetchProjectsRoute } from '../lib/routePrefetch';
import './Header.css';

const Header = ({ theme, toggleTheme }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setMobileMenuOpen(false);
    };

    const handleProjectsIntent = () => {
        prefetchProjectsRoute().catch(() => {});
    };

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="container header-content">
                <Link to="/" className="logo" onClick={() => setMobileMenuOpen(false)}>
                    Y/B<span className="dot">.</span>
                </Link>

                <nav id="primary-navigation" className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
                    <Link
                        to="/projects"
                        onMouseEnter={handleProjectsIntent}
                        onFocus={handleProjectsIntent}
                        onTouchStart={handleProjectsIntent}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Projects
                    </Link>
                    <Link
                        to="/about"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        About
                    </Link>
                </nav>

                <div className="header-actions">
                    <AnimatedThemeToggler 
                        theme={theme} 
                        onToggle={toggleTheme} 
                        className="theme-toggle" 
                    />
                    
                    <button
                        type="button"
                        className="mobile-toggle"
                        aria-expanded={mobileMenuOpen}
                        aria-controls="primary-navigation"
                        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
