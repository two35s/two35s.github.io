import React from 'react';
import { Link } from 'react-router-dom';
import PixelBlast from './PixelBlast';
import InteractiveHoverButton from './InteractiveHoverButton';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero" id="home">
            <div className="container hero-container">
                <div className="hero-content">
                    <h2 className="hero-subtitle">Visual Designer & Art Director</h2>
                    <h1 className="hero-title">
                        Crafting Digital
                        <span className="text-accent"> Experiences.</span>
                    </h1>
                    <p className="hero-description">
                        Hi, I’m a passionate graphic designer creating beautiful, functional, and minimal brand identities and digital experiences.
                    </p>
                    <div className="hero-cta">
                        <InteractiveHoverButton as={Link} to="/projects">
                            View Projects
                        </InteractiveHoverButton>
                        <a href="#contact" className="btn-secondary">
                            Contact Me
                        </a>
                    </div>
                </div>

                {/* Decorative elements for dynamic feel */}
                <div className="hero-visual">
                    <PixelBlast
                        variant="square"
                        pixelSize={4}
                        color="#d4ff36"
                        patternScale={2}
                        patternDensity={1}
                        pixelSizeJitter={0}
                        enableRipples={true}
                        rippleSpeed={0.4}
                        rippleThickness={0.12}
                        rippleIntensityScale={1.5}
                        liquid={false}
                        liquidStrength={0.12}
                        liquidRadius={1.2}
                        liquidWobbleSpeed={5}
                        speed={0.5}
                        edgeFade={0.25}
                        transparent={true}
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
