import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Star, ExternalLink } from 'lucide-react';
import './PortfolioGrid.css';

const PortfolioGrid = () => {
    const [activeFilter, setActiveFilter] = useState('ALL');
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const url = activeFilter === 'ALL'
                    ? 'http://localhost:5000/api/projects'
                    : `http://localhost:5000/api/projects?filter=${activeFilter}`;
                
                const response = await fetch(url);
                const data = await response.json();
                setProjects(data);
            } catch (err) {
                console.error('Error fetching projects:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [activeFilter]);

    const filteredProjects = projects;

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <section className="portfolio" id="work">
            <div className="container">
                <div className="section-header">
                    <div>
                        <h2 className="section-title">Projects</h2>
                        <p className="section-subtitle">A collection of my latest and greatest projects.</p>
                    </div>

                    <div className="portfolio-filter-bar">
                        {['ALL', 'DESIGN', 'SECURITY'].map((filter) => (
                            <button
                                key={filter}
                                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                                onClick={() => setActiveFilter(filter)}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="portfolio-grid">
                    {filteredProjects.map((project) => {
                        const tags = project.technologies || [];
                        const displayTags = tags.slice(0, 3);
                        const extraTagsCount = tags.length > 3 ? tags.length - 3 : 0;

                        return (
                            <Link key={project.id} to={`/projects/${project.id}`} className="project-card">
                                <div className="project-image-wrapper">
                                    <img src={project.image_url} alt={project.title} loading="lazy" />
                                </div>
                                <div className="project-content">
                                    <h3 className="project-title">{project.title}</h3>
                                    
                                    <div className="project-tags">
                                        {displayTags.map((tag, idx) => (
                                            <span key={idx} className="project-tag">{tag}</span>
                                        ))}
                                        {extraTagsCount > 0 && (
                                            <span className="project-tag extra">+{extraTagsCount}</span>
                                        )}
                                    </div>
                                    
                                    <p className="project-description">{project.description}</p>
                                    
                                    <div className="project-footer">
                                        <div className="project-meta">
                                            <span className="meta-item"><Star size={14} fill="currentColor" /> {project.id || 1}</span>
                                            <span className="meta-item">Updated {formatDate(project.updated_at) || 'Dec 2025'}</span>
                                        </div>
                                        <button className="project-view-btn">
                                            View Project <ExternalLink size={14} />
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default PortfolioGrid;
