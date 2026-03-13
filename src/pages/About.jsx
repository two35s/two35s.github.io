import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Mail, Github, Linkedin, Calendar, MapPin, Briefcase } from 'lucide-react';
import './About.css';

const About = () => {
    return (
        <main className="about-page">
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
                            <h2 className="about-subtitle">Designer, Creator, Strategist</h2>
                            <p>
                                I am a multi-disciplinary designer with a passion for building digital experiences that are as functional as they are beautiful. With over 5 years of experience in brand identity, packaging, and digital design, I bring a holistic approach to every project.
                            </p>
                            <p>
                                My design philosophy is rooted in simplicity and strategic thinking. I believe that good design isn't just about how it looks, but about how it communicates and solves problems. Every pixel and every choice should serve a purpose.
                            </p>
                            <p>
                                When I'm not designing, you can find me exploring typography, visiting art galleries, or experimenting with analog photography. I'm constantly seeking new ways to blend art and technology.
                            </p>
                        </div>

                        <div className="about-experience">
                            <h2 className="about-subtitle">Experience</h2>
                            <div className="experience-list">
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
                                        <span className="exp-company">Creative Agency X</span>
                                        <span className="exp-period">2019 — 2021</span>
                                    </div>
                                    <h3 className="exp-role">Senior Brand Designer</h3>
                                    <p>Developed comprehensive brand identities and digital assets for international clients.</p>
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
                                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
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
                                    <span>Based in Morocco</span>
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
