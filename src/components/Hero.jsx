import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import MagneticButton from './MagneticButton';
import StatCards from './StatCards';
import SoftAurora from './ReactBits/SoftAurora/SoftAurora';
import ShinyText from './ReactBits/ShinyText/ShinyText';
import './Hero.css';

const Hero = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height * 0.5)));
      section.style.setProperty('--scroll-progress', progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="hero" id="home">
      <div className="hero-bg">
        <div className="hero-aurora">
          <SoftAurora
            speed={0.4}
            scale={1.8}
            brightness={0.6}
            color1="#C7FF32"
            color2="#00d4ff"
            noiseFrequency={1.8}
            noiseAmplitude={0.8}
            bandSpread={0.7}
            enableMouseInteraction={true}
            mouseInfluence={0.3}
          />
        </div>
        <div className="hero-grid" />
      </div>

      <div className="container hero-inner">
        <div className="hero-content">
          <div className="hero-label-wrapper">
            <span className="hero-label">
              <span className="hero-label-dot" />
              DEVELOPER &bull; SECURITY RESEARCHER &bull; DESIGNER
            </span>
          </div>

          <h1 className="hero-title">
            <span className="hero-line hero-line-1">Building</span>
            <span className="hero-line hero-line-2">
              <span className="text-accent-word">
                <ShinyText
                  text="Secure"
                  color="#C7FF32"
                  shineColor="#ffffff"
                  spread={90}
                  speed={3}
                  direction="left"
                  yoyo={true}
                  pauseOnHover={true}
                />
              </span>
            </span>
            <span className="hero-line hero-line-3">Digital Products.</span>
          </h1>

          <p className="hero-desc">
            I build secure, modern, high-performance digital experiences 
            focused on design, automation and cybersecurity.
          </p>

          <div className="hero-actions">
            <MagneticButton as={Link} to="/projects" variant="primary" icon="arrow">
              Explore Projects
            </MagneticButton>
            <MagneticButton href="/resume.pdf" variant="secondary" icon="download">
              Download Resume
            </MagneticButton>
          </div>
        </div>

        <div className="hero-visual">
          <StatCards />
        </div>
      </div>
    </section>
  );
};

export default Hero;
