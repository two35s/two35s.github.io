import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Star, Link2, Share2, Code2, Linkedin, Twitter } from 'lucide-react';
import './ProjectDetail.css';

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/projects/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch project');
                }
                const data = await response.json();
                setProject(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    const formatDate = (dateString, formatStr = 'long') => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return formatStr === 'long' 
            ? date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
            : date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
    };

    if (loading) {
        return (
            <main className="project-detail-page">
                <div className="pd-container">
                    <Link to="/projects" className="pd-back-link"><ArrowLeft size={16} /> Back to Projects</Link>
                    <div className="loading">Loading project...</div>
                </div>
            </main>
        );
    }

    if (error || !project) {
        return (
            <main className="project-detail-page">
                <div className="pd-container">
                    <Link to="/projects" className="pd-back-link"><ArrowLeft size={16} /> Back to Projects</Link>
                    <div className="error">Project not found</div>
                </div>
            </main>
        );
    }

    const tags = project.technologies || [];
    const displayTags = tags.slice(0, 3);
    const extraTagsCount = tags.length > 3 ? tags.length - 3 : 0;

    return (
        <main className="project-detail-page">
            <div className="pd-container">
                {/* Top Action Bar */}
                <div className="pd-top-bar">
                    <Link to="/projects" className="pd-back-link">
                        <ArrowLeft size={16} /> Back to Projects
                    </Link>
                    
                    {project.github_link && (
                        <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="pd-action-btn primary pd-desktop-only">
                            <Code2 size={14} /> View Code
                        </a>
                    )}
                </div>

                {/* Sub Bar (Socials) */}
                <div className="pd-sub-bar">
                    <div className="pd-social-group">
                        <button onClick={handleCopyLink} className="pd-action-btn">
                            <Link2 size={14} /> Copy link
                        </button>
                        <button onClick={handleCopyLink} className="pd-action-btn">
                            <Share2 size={14} /> Share
                        </button>
                        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="pd-action-btn">
                            LinkedIn
                        </a>
                        <a href={`https://twitter.com/intent/tweet?url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="pd-action-btn">
                            X
                        </a>
                    </div>
                    {project.github_link && (
                        <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="pd-action-btn primary pd-mobile-only">
                            <Code2 size={14} /> View Code
                        </a>
                    )}
                </div>

                {/* Header */}
                <header className="pd-header">
                    <h1 className="pd-title">{project.title}</h1>
                    
                    <div className="pd-meta">
                        <span className="pd-meta-item">
                            <Calendar size={14} /> {formatDate(project.created_at || new Date().toISOString())}
                        </span>
                        <span className="pd-meta-item">
                            <Star size={14} /> {project.id || 3}
                        </span>
                        <span className="pd-meta-item">
                            Updated {formatDate(project.updated_at, 'short') || 'Dec 2025'}
                        </span>
                    </div>

                    <div className="pd-technologies">
                        <span className="pd-tech-label">Technologies:</span>
                        <div className="pd-tech-tags">
                            {displayTags.map((tag, idx) => (
                                <span key={idx} className="pd-tech-tag">{tag}</span>
                            ))}
                            {extraTagsCount > 0 && (
                                <span className="pd-tech-tag extra">+{extraTagsCount} more</span>
                            )}
                        </div>
                    </div>
                </header>

                {/* Content */}
                <article className="pd-content">
                    {project.description && (
                        <p className="pd-intro">{project.description}</p>
                    )}

                    <div className="pd-hero">
                        <img src={project.image_url} alt={project.title} className="pd-hero-image" />
                    </div>

                    {/* Extended Content Placeholder */}
                    <div className="pd-extended">
                        <p className="pd-body-text">
                            This project showcases modern full-stack development, integrating complex systems with a robust backend architecture. It highlights scalable design patterns, rigorous testing, and seamless continuous integration. Performance optimizations and accessibility considerations were paramount during the development lifecycle.
                        </p>
                        <h3>Key Features</h3>
                        <ul className="pd-list">
                            <li><strong>Architecture:</strong> Scalable and modular component design for maintainability.</li>
                            <li><strong>Performance:</strong> Optimized asset delivery and lazy loading implementation.</li>
                            <li><strong>Integration:</strong> Seamless interaction with third-party APIs and services.</li>
                        </ul>
                        <h3>Deployment Snapshot</h3>
                        <p className="pd-body-text">
                            The application is currently deployed and serving traffic with high availability. Monitoring and logging are in place to ensure rapid response to any anomalies.
                        </p>
                    </div>
                </article>
            </div>
        </main>
    );
};

export default ProjectDetail;
