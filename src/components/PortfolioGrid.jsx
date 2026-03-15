import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ExternalLink } from 'lucide-react';
import { supabase, parseTechnologies } from '../lib/supabase';
import './PortfolioGrid.css';

const PortfolioGrid = ({ limit = null }) => {
    const [activeFilter, setActiveFilter] = useState('ALL');
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            if (!supabase) {
                setError('Supabase configuration is missing. Please check environment variables.');
                setLoading(false);
                return;
            }
            setLoading(true);
            setError('');
            try {
                let query = supabase.from('projects').select('*').order('id', { ascending: true });
                if (activeFilter !== 'ALL') {
                    query = query.eq('filter_type', activeFilter);
                }
                
                if (limit) {
                    query = query.limit(limit);
                }

                const { data, error: dbError } = await query;
                if (dbError) throw dbError;
                setProjects(data || []);
            } catch (err) {
                setProjects([]);
                setError(err.message || 'Failed to load projects');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [activeFilter, limit]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
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

                {loading && <p className="portfolio-status">Loading projects...</p>}
                {error && <p className="portfolio-status error">{error}</p>}

                {!loading && !error && (
                    <>
                        <div className="portfolio-grid">
                            {projects.map((project) => {
                                const tags = parseTechnologies(project.technologies);
                                const displayTags = tags.slice(0, 3);
                                const extraTagsCount = tags.length > 3 ? tags.length - 3 : 0;

                                return (
                                    <Link 
                                        key={project.id} 
                                        to={`/projects/${project.id}`} 
                                        className="project-card"
                                        onMouseMove={handleMouseMove}
                                    >
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
                                                    <span className="meta-item"><Star size={14} fill="currentColor" /> {project.category}</span>
                                                    {project.updated_at && <span className="meta-item">Updated {formatDate(project.updated_at)}</span>}
                                                </div>
                                                <span className="project-view-btn">
                                                    View Project <ExternalLink size={14} />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                        {limit && projects.length >= limit && (
                            <div className="view-all-container">
                                <Link to="/projects" className="view-all-link">
                                    View All Projects <ExternalLink size={16} />
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default PortfolioGrid;
