import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatedThemeToggler } from './AnimatedThemeToggler';
import './Header.css';

const Header = ({ theme, toggleTheme }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Close menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="container header-content">
                <Link to="/" className="logo">
                    Y/B<span className="dot">.</span>
                </Link>

                <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
                    <Link to="/projects" onClick={() => setMobileMenuOpen(false)}>Projects</Link>
                    <a href={location.pathname === '/' ? '#about' : '/#about'} onClick={() => setMobileMenuOpen(false)}>About</a>
                    <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="btn-primary-outline">Let's Talk</a>
                </nav>

                <div className="header-actions">
                    <AnimatedThemeToggler 
                        theme={theme} 
                        onToggle={toggleTheme} 
                        className="theme-toggle" 
                    />
                    
                    <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
