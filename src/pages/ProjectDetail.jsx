import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Star, Link2, Share2, Code2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { supabase, parseTechnologies } from '../lib/supabase';
import './ProjectDetail.css';

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const { data, error: dbError } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('id', id)
                    .single();
                if (dbError) throw dbError;
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
        navigator.clipboard.writeText(window.location.href).catch(() => {});
    };

    const handleShare = async () => {
        if (navigator.share) {
            await navigator.share({ title: project?.title, url: window.location.href }).catch(() => {});
        } else {
            handleCopyLink();
        }
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

    const tags = parseTechnologies(project.technologies);
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
                        <button onClick={handleShare} className="pd-action-btn">
                            <Share2 size={14} /> Share
                        </button>
                        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="pd-action-btn">
                            LinkedIn
                        </a>
                        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="pd-action-btn">
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
                        {project.created_at && (
                            <span className="pd-meta-item">
                                <Calendar size={14} /> {formatDate(project.created_at)}
                            </span>
                        )}
                        <span className="pd-meta-item">
                            <Star size={14} /> {project.category}
                        </span>
                        {project.updated_at && (
                            <span className="pd-meta-item">
                                Updated {formatDate(project.updated_at, 'short')}
                            </span>
                        )}
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

                    {project.image_url && (
                        <div className="pd-hero">
                            <img src={project.image_url} alt={project.title} className="pd-hero-image" />
                        </div>
                    )}

                    {project.content && (
                        <div className="project-detail-markdown">
                            <ReactMarkdown>{project.content}</ReactMarkdown>
                        </div>
                    )}
                </article>
            </div>
        </main>
    );
};

export default ProjectDetail;
