import React from 'react';
import { Link } from 'react-router-dom';
import PortfolioGrid from '../components/PortfolioGrid';
import './Projects.css';

const Projects = () => {
    return (
        <main className="projects-page">
            <div className="container">
                <Link to="/" className="back-home-link">← Back to Home</Link>
            </div>
            <PortfolioGrid />
        </main>
    );
};

export default Projects;
