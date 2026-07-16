import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Mail, Github, Linkedin, Calendar, MapPin, Briefcase } from 'lucide-react';
import './About.css';

const About = () => {
    return (
        <main className="about-page" id="main-content">
            <div className="container">
                <header className="about-header">
                    <Link to="/" className="back-link">
                        <ArrowLeft size={18} /> Back to Home
                    </Link>
                    <h1 className="about-title">About Me<span className="dot">.</span></h1>
                </header>

                <div className="about-grid">
                    <section className="about-main">
                        <div className="about-bio">
                            <h2 className="about-subtitle">Graphic Designer & Brand Identity Specialist</h2>
                            <p>
                                I'm Youssef Baaziz, a Graphic Designer and Brand Identity Specialist based in Agadir, Morocco. I help businesses build visual identities that are consistent, strategic, and built to last — from logo systems and social media content to fully responsive websites.
                            </p>
                            <p>
                                I've worked with food brands, creative studios, and startups across Morocco, delivering design that drives real results. My approach combines creative intuition with strategic thinking to create brands that stand the test of time.
                            </p>
                            <p>
                                Alongside design, I bring a background in cybersecurity — vulnerability research, penetration testing, and offensive tooling — making me uniquely suited for clients who need both creative and technical thinking. If you're looking for a designer who understands systems as deeply as aesthetics, let's work together.
                            </p>
                        </div>

                        <div className="about-experience">
                            <h2 className="about-subtitle">Experience</h2>
                            <div className="experience-list">
                                <div className="experience-item">
                                    <div className="exp-meta">
                                        <Briefcase size={16} />
                                        <span className="exp-company">creation.agence</span>
                                        <span className="exp-period">2025 — Present</span>
                                    </div>
                                    <h3 className="exp-role">Co-Founder & Art Director</h3>
                                    <p>Co-founded a full-service creative agency based in Agadir, offering branding, web design, social media, and advertising for local SMBs and startups. Leading the creative direction and visual identity across all client projects.</p>
                                </div>
                                <div className="experience-item">
                                    <div className="exp-meta">
                                        <Briefcase size={16} />
                                        <span className="exp-company">Y/B Design Studio</span>
                                        <span className="exp-period">2021 — Present</span>
                                    </div>
                                    <h3 className="exp-role">Founder & Principal Designer</h3>
                                    <p>Leading design strategy and execution for diverse clients ranging from tech startups to lifestyle brands.</p>
                                </div>
                                <div className="experience-item">
                                    <div className="exp-meta">
                                        <Briefcase size={16} />
                                        <span className="exp-company">Chicko's</span>
                                        <span className="exp-period">Dec 2025 - Jan 2026 · 2 mos</span>
                                    </div>
                                    <h3 className="exp-role">Social Media Designer</h3>
                                    <p>Designed Instagram-native content (posts & stories) for a food brand, maintaining strict visual identity consistency. Adapted designs to current platform trends and formats while collaborating with the team to grow the brand's digital presence.</p>
                                </div>
                                <div className="experience-item">
                                    <div className="exp-meta">
                                        <Briefcase size={16} />
                                        <span className="exp-company">Sushi Fleur de ming</span>
                                        <span className="exp-period">Nov 2025 - Jan 2026 · 3 mos</span>
                                    </div>
                                    <h3 className="exp-role">Graphic Designer & Web Designer</h3>
                                    <p>Designed Instagram-native content (posts & stories) for a food brand, maintaining strict visual identity consistency. Adapted designs to current plLed the full visual identity and web presence of the brand. Designed social media visuals, marketing materials, and built the brand's website (WordPress, responsive/UI-UX). Ensured visual consistency across branding, digital, and communication channels.</p>
                                </div>
                                <div className="experience-item">
                                    <div className="exp-meta">
                                        <Briefcase size={16} />
                                        <span className="exp-company">Maghreb Passion</span>
                                        <span className="exp-period">Apr 2025 - Nov 2025 · 8 mos</span>
                                    </div>
                                    <h3 className="exp-role">Graphic Designer</h3>
                                    <p>Contributed to visual design projects across brand and marketing materials for a Moroccan creative studio.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <aside className="about-sidebar">
                        <div className="sidebar-section">
                            <h3 className="sidebar-title">Contact Information</h3>
                            <ul className="social-list">
                                <li>
                                    <a href="mailto:youssefbaaziz2077@gmail.com" className="social-link">
                                        <Mail size={18} /> youssefbaaziz2077@gmail.com
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/two35s" target="_blank" rel="noopener noreferrer" className="social-link">
                                        <Github size={18} /> GitHub
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.linkedin.com/in/youssef-baaziz-180a38334/" target="_blank" rel="noopener noreferrer" className="social-link">
                                        <Linkedin size={18} /> LinkedIn
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="sidebar-section">
                            <h3 className="sidebar-title">Skills</h3>
                            <div className="skills-grid">
                                <span className="skill-tag">Brand Identity</span>
                                <span className="skill-tag">UI/UX Design</span>
                                <span className="skill-tag">Packaging</span>
                                <span className="skill-tag">Strategy</span>
                                <span className="skill-tag">Typography</span>
                                <span className="skill-tag">Motion</span>
                                <span className="skill-tag">Photography</span>
                                <span className="skill-tag">Cybersecurity</span>
                            </div>
                        </div>

                        <div className="sidebar-section">
                            <h3 className="sidebar-title">Personal Details</h3>
                            <div className="details-list">
                                <div className="detail-item">
                                    <MapPin size={16} />
                                    <span>Based in Agadir, Morocco</span>
                                </div>
                                <div className="detail-item">
                                    <Calendar size={16} />
                                    <span>5+ Years Experience</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
};

export default About;
