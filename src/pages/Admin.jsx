import React, { useState, useEffect } from 'react';
import { supabase, parseTechnologies } from '../lib/supabase';
import { LogOut, Plus, Pencil, Trash2, Save, X, Loader2 } from 'lucide-react';
import './Admin.css';

const EMPTY_PROJECT = {
  title: '',
  category: '',
  filter_type: 'DESIGN',
  description: '',
  image_url: '',
  size: 'medium',
  technologies: [],
  live_link: '',
  github_link: '',
  content: '',
};

const fetchAllProjects = () => supabase.from('projects').select('*').order('id');

const Admin = () => {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_PROJECT);
  const [techInput, setTechInput] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  const refreshProjects = async () => {
    if (!supabase) {
      showFeedback('Supabase client not initialized.');
      return;
    }
    setLoading(true);
    const { data, error } = await fetchAllProjects();
    if (!error) setProjects(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (!session || !supabase) return;
    let cancelled = false;
    fetchAllProjects().then(({ data, error }) => {
      if (cancelled) return;
      if (!error) setProjects(data || []);
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [session]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!supabase) {
      setLoginError('Supabase configuration missing.');
      return;
    }
    setLoginError('');
    setLoginLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setLoginError(error.message);
    setLoginLoading(false);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut({ scope: 'local' });
    if (error) {
      showFeedback(`Logout error: ${error.message}`);
    }
    setSession(null);
    setProjects([]);
  };

  const showFeedback = (msg) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(''), 3000);
  };

  const startCreate = () => {
    setEditing('new');
    setForm({ ...EMPTY_PROJECT });
    setTechInput('');
  };

  const startEdit = (project) => {
    setEditing(project.id);
    setForm({ ...project });
    setTechInput(parseTechnologies(project.technologies).join(', '));
  };

  const cancelEdit = () => {
    setEditing(null);
    setForm(EMPTY_PROJECT);
    setTechInput('');
  };

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.category.trim() || !form.filter_type.trim()) {
      showFeedback('Title, category, and filter type are required.');
      return;
    }

    setSaving(true);
    const payload = {
      ...form,
      technologies: techInput.split(',').map(t => t.trim()).filter(Boolean),
    };
    delete payload.id;
    delete payload.created_at;
    delete payload.updated_at;

    let error;
    if (editing === 'new') {
      ({ error } = await supabase.from('projects').insert(payload));
    } else {
      ({ error } = await supabase.from('projects').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', editing));
    }

    setSaving(false);
    if (error) {
      showFeedback(`Error: ${error.message}`);
    } else {
      showFeedback(editing === 'new' ? 'Project created!' : 'Project updated!');
      cancelEdit();
      refreshProjects();
    }
  };

  const handleDelete = async (id) => {
    setSaving(true);
    const { error } = await supabase.from('projects').delete().eq('id', id);
    setSaving(false);
    setDeleteConfirm(null);
    if (error) {
      showFeedback(`Error: ${error.message}`);
    } else {
      showFeedback('Project deleted.');
      refreshProjects();
    }
  };

  if (!session) {
    return (
      <main className="admin-page">
        <div className="admin-login-card">
          <h1>Admin Login</h1>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            {loginError && <p className="admin-error">{loginError}</p>}
            <button type="submit" className="admin-btn primary" disabled={loginLoading}>
              {loginLoading ? <><Loader2 size={14} className="spin" /> Signing in...</> : 'Sign In'}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <div className="admin-header-actions">
            <span className="admin-user">{session.user.email}</span>
            <button onClick={handleLogout} className="admin-btn ghost"><LogOut size={14} /> Logout</button>
          </div>
        </div>

        {feedback && <div className="admin-feedback">{feedback}</div>}

        <div className="admin-toolbar">
          <span className="admin-count">{projects.length} project{projects.length !== 1 ? 's' : ''}</span>
          <button onClick={startCreate} className="admin-btn primary" disabled={editing !== null}>
            <Plus size={14} /> New Project
          </button>
        </div>

        {editing === 'new' && (
          <div className="admin-form-card">
            <h2>New Project</h2>
            <ProjectForm form={form} techInput={techInput} setTechInput={setTechInput} updateField={updateField} />
            <div className="admin-form-actions">
              <button onClick={cancelEdit} className="admin-btn ghost"><X size={14} /> Cancel</button>
              <button onClick={handleSave} className="admin-btn primary" disabled={saving}>
                {saving ? <><Loader2 size={14} className="spin" /> Saving...</> : <><Save size={14} /> Create</>}
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <p className="admin-status">Loading projects...</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Size</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(p => (
                  <React.Fragment key={p.id}>
                    <tr className={editing === p.id ? 'editing-row' : ''}>
                      <td>{p.id}</td>
                      <td>{p.title}</td>
                      <td>{p.category}</td>
                      <td><span className={`admin-badge ${p.filter_type.toLowerCase()}`}>{p.filter_type}</span></td>
                      <td>{p.size}</td>
                      <td className="admin-actions-cell">
                        {deleteConfirm === p.id ? (
                          <>
                            <button onClick={() => handleDelete(p.id)} className="admin-btn danger-sm">Confirm</button>
                            <button onClick={() => setDeleteConfirm(null)} className="admin-btn ghost-sm">Cancel</button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => startEdit(p)} className="admin-btn ghost-sm" disabled={editing !== null}><Pencil size={14} /></button>
                            <button onClick={() => setDeleteConfirm(p.id)} className="admin-btn danger-sm" disabled={editing !== null}><Trash2 size={14} /></button>
                          </>
                        )}
                      </td>
                    </tr>
                    {editing === p.id && (
                      <tr className="admin-edit-row">
                        <td colSpan={6}>
                          <div className="admin-form-card inline">
                            <ProjectForm form={form} techInput={techInput} setTechInput={setTechInput} updateField={updateField} />
                            <div className="admin-form-actions">
                              <button onClick={cancelEdit} className="admin-btn ghost"><X size={14} /> Cancel</button>
                              <button onClick={handleSave} className="admin-btn primary" disabled={saving}>
                                {saving ? <><Loader2 size={14} className="spin" /> Saving...</> : <><Save size={14} /> Save</>}
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
};

const ProjectForm = ({ form, techInput, setTechInput, updateField }) => (
  <div className="admin-form-grid">
    <label>
      Title *
      <input value={form.title} onChange={e => updateField('title', e.target.value)} placeholder="Project title" />
    </label>
    <label>
      Category *
      <input value={form.category} onChange={e => updateField('category', e.target.value)} placeholder="e.g. Brand Identity" />
    </label>
    <label>
      Filter Type *
      <select value={form.filter_type} onChange={e => updateField('filter_type', e.target.value)}>
        <option value="DESIGN">DESIGN</option>
        <option value="SECURITY">SECURITY</option>
      </select>
    </label>
    <label>
      Size
      <select value={form.size} onChange={e => updateField('size', e.target.value)}>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
    </label>
    <label className="full-width">
      Description
      <textarea value={form.description || ''} onChange={e => updateField('description', e.target.value)} rows={3} placeholder="Project description" />
    </label>
    <label className="full-width">
      Image URL
      <input value={form.image_url || ''} onChange={e => updateField('image_url', e.target.value)} placeholder="https://..." />
    </label>
    <label className="full-width">
      Technologies (comma-separated)
      <input value={techInput} onChange={e => setTechInput(e.target.value)} placeholder="React, Node.js, PostgreSQL" />
    </label>
    <label>
      Live Link
      <input value={form.live_link || ''} onChange={e => updateField('live_link', e.target.value)} placeholder="https://..." />
    </label>
    <label>
      GitHub Link
      <input value={form.github_link || ''} onChange={e => updateField('github_link', e.target.value)} placeholder="https://github.com/..." />
    </label>
    <label className="full-width">
      Project Content (Markdown supported)
      <textarea
        className="content-textarea"
        value={form.content || ''}
        onChange={e => updateField('content', e.target.value)}
        rows={14}
        placeholder="Write a detailed breakdown of this project. Markdown is supported (## headings, **bold**, - lists, code blocks, etc.)"
      />
    </label>
  </div>
);

export default Admin;
