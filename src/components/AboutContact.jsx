import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Github, Linkedin } from 'lucide-react';
import VariableProximity from './VariableProximity';
import './AboutContact.css';

const AboutContact = () => {
    const containerRef = useRef(null);

    return (
        <section className="about-contact" id="about">
            <div className="container">

            </div>

            <footer className="footer" id="contact" ref={containerRef}>
                <div className="container footer-container">
                    <div className="footer-cta">
                        <h2 style={{ width: '100%' }}>
                            <VariableProximity
                                label={"Let's create something extraordinary together."}
                                className={'variable-proximity-demo'}
                                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                                containerRef={containerRef}
                                radius={150}
                                falloff='linear'
                            />
                        </h2>
                        <a href="mailto:youssefbaaziz2077@gmail.com" className="email-link">
                            youssefbaaziz2077@gmail.com
                        </a>
                    </div>

                    <div className="footer-bottom">
                        <div className="social-links">
                            <a href="https://github.com/two35s" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={24} /></a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={24} /></a>
                            <a href="mailto:youssefbaaziz2077@gmail.com" aria-label="Email"><Mail size={24} /></a>
                        </div>
                        <p className="copyright">&copy; {new Date().getFullYear()} Y/B Design. All rights reserved. <Link to="/admin" style={{ opacity: 0.2, fontSize: '0.7rem', textDecoration: 'none', color: 'inherit' }}>admin</Link></p>
                    </div>
                </div>
            </footer>
        </section>
    );
};

export default AboutContact;
