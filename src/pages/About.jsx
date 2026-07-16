import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Github, Linkedin, Calendar, MapPin, Briefcase, ExternalLink } from 'lucide-react';
import ShinyText from '../components/ReactBits/ShinyText/ShinyText';
import SpotlightCard from '../components/ReactBits/SpotlightCard/SpotlightCard';
import './About.css';

const skills = [
  'Brand Identity', 'UI/UX Design', 'Packaging', 'Strategy',
  'Typography', 'Motion', 'Photography', 'Cybersecurity',
  'Web Development', 'Pentesting', 'Social Media', 'Art Direction'
];

const experience = [
  {
    company: 'creation.agence',
    period: '2025 — Present',
    role: 'Co-Founder & Art Director',
    desc: 'Co-founded a full-service creative agency based in Agadir, offering branding, web design, social media, and advertising for local SMBs and startups. Leading the creative direction and visual identity across all client projects.'
  },
  {
    company: 'Y/B Design Studio',
    period: '2021 — Present',
    role: 'Founder & Principal Designer',
    desc: 'Leading design strategy and execution for diverse clients ranging from tech startups to lifestyle brands.'
  },
  {
    company: 'Chicko\'s',
    period: 'Dec 2025 — Jan 2026',
    role: 'Social Media Designer',
    desc: 'Designed Instagram-native content for a food brand, maintaining strict visual identity consistency. Adapted designs to platform trends and collaborated with the team to grow digital presence.',
    tag: 'Food & Bev'
  },
  {
    company: 'Sushi Fleur de Ming',
    period: 'Nov 2025 — Jan 2026',
    role: 'Graphic Designer & Web Designer',
    desc: 'Led the full visual identity and web presence. Designed social media visuals, marketing materials, and built the brand\'s website (WordPress, responsive UI/UX).',
    tag: 'Food & Bev'
  },
  {
    company: 'Maghreb Passion',
    period: 'Apr 2025 — Nov 2025',
    role: 'Graphic Designer',
    desc: 'Contributed to visual design projects across brand and marketing materials for a Moroccan creative studio.',
    tag: 'Creative Studio'
  }
];

const About = () => {
  return (
    <main className="about-page" id="main-content">
      <div className="about-bg" />

      <div className="container">
        <header className="about-header">
          <Link to="/" className="back-link">
            <ArrowLeft size={16} /> Back
          </Link>
          <h1 className="about-title">
            About Me<span className="about-title-dot">.</span>
          </h1>
          <p className="about-subtitle-line">
            <ShinyText
              text="Graphic Designer & Brand Identity Specialist"
              color="rgba(255,255,255,0.5)"
              shineColor="#C7FF32"
              spread={90}
              speed={4}
              direction="left"
              yoyo={true}
            />
          </p>
        </header>

        <div className="about-grid">
          <section className="about-main">
            <div className="about-bio">
              <p>
                I'm Youssef Baaziz, a Graphic Designer and Brand Identity Specialist based in Agadir, Morocco. I help businesses build visual identities that are consistent, strategic, and built to last — from logo systems and social media content to fully responsive websites.
              </p>

              <div className="about-stats">
                <div className="about-stat">
                  <span className="about-stat-value">5+</span>
                  <span className="about-stat-label">Years Experience</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat-value">50+</span>
                  <span className="about-stat-label">Projects Delivered</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat-value">20+</span>
                  <span className="about-stat-label">Happy Clients</span>
                </div>
              </div>

              <p>
                I've worked with food brands, creative studios, and startups across Morocco, delivering design that drives real results. My approach combines creative intuition with strategic thinking to create brands that stand the test of time.
              </p>
              <p>
                Alongside design, I bring a background in cybersecurity — vulnerability research, penetration testing, and offensive tooling — making me uniquely suited for clients who need both creative and technical thinking. If you're looking for a designer who understands systems as deeply as aesthetics, let's work together.
              </p>
            </div>

            <div className="about-experience">
              <h2 className="section-label">Experience</h2>
              <div className="experience-timeline">
                {experience.map((exp, i) => (
                  <div key={i} className="experience-item-wrapper">
                    <div className="experience-dot" style={{ animationDelay: `${i * 0.1}s` }} />
                    <SpotlightCard
                      className="experience-card"
                      spotlightColor="rgba(199, 255, 50, 0.06)"
                    >
                      <div className="experience-card-inner">
                        <div className="exp-header">
                          <Briefcase size={14} className="exp-icon" />
                          <span className="exp-company">{exp.company}</span>
                          <span className="exp-period">{exp.period}</span>
                          {exp.tag && <span className="exp-tag">{exp.tag}</span>}
                        </div>
                        <h3 className="exp-role">{exp.role}</h3>
                        <p className="exp-desc">{exp.desc}</p>
                      </div>
                    </SpotlightCard>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="about-sidebar">
            <SpotlightCard className="sidebar-card" spotlightColor="rgba(255, 255, 255, 0.05)">
              <h3 className="sidebar-card-title">Contact</h3>
              <div className="sidebar-contacts">
                <a href="mailto:youssefbaaziz2077@gmail.com" className="sidebar-contact-link">
                  <Mail size={16} />
                  <span>youssefbaaziz2077@gmail.com</span>
                </a>
                <a href="https://github.com/two35s" target="_blank" rel="noopener noreferrer" className="sidebar-contact-link">
                  <Github size={16} />
                  <span>GitHub</span>
                  <ExternalLink size={12} className="external-icon" />
                </a>
                <a href="https://www.linkedin.com/in/youssef-baaziz-180a38334/" target="_blank" rel="noopener noreferrer" className="sidebar-contact-link">
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                  <ExternalLink size={12} className="external-icon" />
                </a>
              </div>
            </SpotlightCard>

            <SpotlightCard className="sidebar-card" spotlightColor="rgba(199, 255, 50, 0.06)">
              <h3 className="sidebar-card-title">Skills</h3>
              <div className="skills-cloud">
                {skills.map(skill => (
                  <span key={skill} className="skill-chip">{skill}</span>
                ))}
              </div>
            </SpotlightCard>

            <SpotlightCard className="sidebar-card" spotlightColor="rgba(255, 255, 255, 0.05)">
              <h3 className="sidebar-card-title">Details</h3>
              <div className="sidebar-details">
                <div className="sidebar-detail">
                  <MapPin size={16} />
                  <span>Agadir, Morocco</span>
                </div>
                <div className="sidebar-detail">
                  <Calendar size={16} />
                  <span>Available for freelance</span>
                </div>
              </div>
            </SpotlightCard>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default About;
