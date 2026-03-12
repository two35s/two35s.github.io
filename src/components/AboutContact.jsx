import React, { useRef } from 'react';
import { Mail, Instagram, Twitter, Linkedin } from 'lucide-react';
import VariableProximity from './VariableProximity';
import './AboutContact.css';

const AboutContact = () => {
    const containerRef = useRef(null);

    return (
        <section className="about-contact" id="about">
            <div className="container">
                <div className="about-content">
                    <h2 className="section-title">Beyond the Canvas</h2>
                    <p className="about-text">
                        I am a multi-disciplinary designer with over 5 years of experience in brand identity, packaging, and digital experiences. My approach is rooted in simplicity, strategy, and aesthetics. I believe that good design is not just about how it looks, but how it works and communicates.
                    </p>
                    <p className="about-text">
                        When I'm not designing, you can find me exploring typography, visiting art galleries, or experimenting with analog photography.
                    </p>
                </div>
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
                        <a href="mailto:hello@example.com" className="email-link">
                            hello@example.com
                        </a>
                    </div>

                    <div className="footer-bottom">
                        <div className="social-links">
                            <a href="#" aria-label="Instagram"><Instagram size={24} /></a>
                            <a href="#" aria-label="Twitter"><Twitter size={24} /></a>
                            <a href="#" aria-label="LinkedIn"><Linkedin size={24} /></a>
                            <a href="#" aria-label="Email"><Mail size={24} /></a>
                        </div>
                        <p className="copyright">&copy; {new Date().getFullYear()} Y/B Design. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </section>
    );
};

export default AboutContact;
