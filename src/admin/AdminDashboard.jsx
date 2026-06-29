import React, { useState, useCallback, useRef } from 'react';
import { useContent } from '../context/ContentContext';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, Type, User, Wrench, FolderOpen, GraduationCap,
  Mail, LogOut, ExternalLink, Save, RotateCcw, Plus, X, Upload, Check, Image,
} from 'lucide-react';
import './admin.css';

const tabs = [
  { id: 'hero', label: 'Hero Section', icon: Type },
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'contact', label: 'Contact', icon: Mail },
];

const AdminDashboard = ({ onBack }) => {
  const { content, updateSection, resetSection, resetContent } = useContent();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('hero');
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const handleSave = useCallback((section, data) => {
    updateSection(section, data);
    showToast(`${section.charAt(0).toUpperCase() + section.slice(1)} section saved!`);
  }, [updateSection, showToast]);

  const handleReset = useCallback((section) => {
    resetSection(section);
    showToast(`${section.charAt(0).toUpperCase() + section.slice(1)} section reset to default.`);
  }, [resetSection, showToast]);

  const handleLogout = () => {
    logout();
    onBack();
  };

  const activeTabData = tabs.find((t) => t.id === activeTab);

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-logo">
            <div className="nav-monogram">MR</div>
            <div>
              <div className="admin-sidebar-title">Admin Panel</div>
              <div className="admin-sidebar-subtitle">Portfolio CMS</div>
            </div>
          </div>
        </div>

        <nav className="admin-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`admin-nav-item${activeTab === tab.id ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <button className="admin-view-site-btn" onClick={onBack} style={{ width: '100%', marginBottom: '0.5rem' }}>
            <ExternalLink size={14} />
            View Portfolio
          </button>
          <button className="admin-logout-btn" onClick={handleLogout}>
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <div className="admin-main-header">
          <div>
            <h1 className="admin-main-title">
              {activeTabData?.label || 'Dashboard'}
            </h1>
            <p className="admin-main-subtitle">
              Edit the content below and save your changes.
            </p>
          </div>
        </div>

        {activeTab === 'hero' && (
          <HeroEditor content={content.hero} onSave={(d) => handleSave('hero', d)} onReset={() => handleReset('hero')} />
        )}
        {activeTab === 'about' && (
          <AboutEditor content={content.about} onSave={(d) => handleSave('about', d)} onReset={() => handleReset('about')} />
        )}
        {activeTab === 'skills' && (
          <SkillsEditor content={content.skills} onSave={(d) => handleSave('skills', d)} onReset={() => handleReset('skills')} />
        )}
        {activeTab === 'projects' && (
          <ProjectsEditor content={content.projects} onSave={(d) => handleSave('projects', d)} onReset={() => handleReset('projects')} />
        )}
        {activeTab === 'education' && (
          <EducationEditor content={content.education} onSave={(d) => handleSave('education', d)} onReset={() => handleReset('education')} />
        )}
        {activeTab === 'contact' && (
          <ContactEditor content={content.contact} onSave={(d) => handleSave('contact', d)} onReset={() => handleReset('contact')} />
        )}
      </main>

      {/* Toast */}
      {toast && (
        <div className="admin-toast">
          <Check size={16} />
          {toast}
        </div>
      )}
    </div>
  );
};

/* ============================================
   HERO EDITOR
   ============================================ */

function HeroEditor({ content, onSave, onReset }) {
  const [data, setData] = useState(content);
  const update = (key, val) => setData((p) => ({ ...p, [key]: val }));

  // Sync if content changes from reset
  React.useEffect(() => { setData(content); }, [content]);

  return (
    <div>
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Badge & Heading</h3>
        <div className="admin-form-group">
          <label className="admin-label">Badge Text</label>
          <input className="admin-input" value={data.badge} onChange={(e) => update('badge', e.target.value)} />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">Title Line 1</label>
          <input className="admin-input" value={data.titleLine1} onChange={(e) => update('titleLine1', e.target.value)} />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">Title Line 2 (Gradient Accent)</label>
          <input className="admin-input" value={data.titleLine2} onChange={(e) => update('titleLine2', e.target.value)} />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">Title Line 3</label>
          <input className="admin-input" value={data.titleLine3} onChange={(e) => update('titleLine3', e.target.value)} />
        </div>
      </div>

      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Subtitle & Meta</h3>
        <div className="admin-form-group">
          <label className="admin-label">Subtitle</label>
          <textarea className="admin-textarea" rows={3} value={data.subtitle} onChange={(e) => update('subtitle', e.target.value)} />
        </div>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-label">Location</label>
            <input className="admin-input" value={data.location} onChange={(e) => update('location', e.target.value)} />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Affiliation</label>
            <input className="admin-input" value={data.affiliation} onChange={(e) => update('affiliation', e.target.value)} />
          </div>
        </div>
      </div>

      <div className="admin-actions">
        <button className="admin-btn admin-btn-primary" onClick={() => onSave(data)}><Save size={16} /> Save Changes</button>
        <button className="admin-btn admin-btn-secondary" onClick={onReset}><RotateCcw size={16} /> Reset</button>
      </div>
    </div>
  );
}

/* ============================================
   ABOUT EDITOR
   ============================================ */

function AboutEditor({ content, onSave, onReset }) {
  const [data, setData] = useState(content);
  const update = (key, val) => setData((p) => ({ ...p, [key]: val }));
  const updateStat = (index, key, val) => {
    setData((p) => {
      const stats = [...p.stats];
      stats[index] = { ...stats[index], [key]: val };
      return { ...p, stats };
    });
  };

  React.useEffect(() => { setData(content); }, [content]);

  return (
    <div>
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">About Paragraphs</h3>
        <div className="admin-form-group">
          <label className="admin-label">Paragraph 1</label>
          <textarea className="admin-textarea" rows={4} value={data.paragraph1} onChange={(e) => update('paragraph1', e.target.value)} />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">Paragraph 2</label>
          <textarea className="admin-textarea" rows={4} value={data.paragraph2} onChange={(e) => update('paragraph2', e.target.value)} />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">Paragraph 3</label>
          <textarea className="admin-textarea" rows={4} value={data.paragraph3} onChange={(e) => update('paragraph3', e.target.value)} />
        </div>
      </div>

      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Stat Cards</h3>
        <div className="admin-stats-row">
          {data.stats.map((stat, i) => (
            <div key={i} className="admin-card">
              <div className="admin-form-group">
                <label className="admin-label">Value</label>
                <input className="admin-input" value={stat.value} onChange={(e) => updateStat(i, 'value', e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Suffix (optional)</label>
                <input className="admin-input" value={stat.suffix} onChange={(e) => updateStat(i, 'suffix', e.target.value)} placeholder="e.g. /4.00" />
              </div>
              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <label className="admin-label">Label</label>
                <input className="admin-input" value={stat.label} onChange={(e) => updateStat(i, 'label', e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-actions">
        <button className="admin-btn admin-btn-primary" onClick={() => onSave(data)}><Save size={16} /> Save Changes</button>
        <button className="admin-btn admin-btn-secondary" onClick={onReset}><RotateCcw size={16} /> Reset</button>
      </div>
    </div>
  );
}

/* ============================================
   SKILLS EDITOR
   ============================================ */

function SkillsEditor({ content, onSave, onReset }) {
  const [data, setData] = useState(content);

  React.useEffect(() => { setData(content); }, [content]);

  const updateSkillTitle = (index, val) => {
    setData((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], title: val };
      return next;
    });
  };

  const updateTool = (skillIdx, toolIdx, val) => {
    setData((prev) => {
      const next = [...prev];
      const tools = [...next[skillIdx].tools];
      tools[toolIdx] = val;
      next[skillIdx] = { ...next[skillIdx], tools };
      return next;
    });
  };

  const addTool = (skillIdx) => {
    setData((prev) => {
      const next = [...prev];
      next[skillIdx] = { ...next[skillIdx], tools: [...next[skillIdx].tools, ''] };
      return next;
    });
  };

  const removeTool = (skillIdx, toolIdx) => {
    setData((prev) => {
      const next = [...prev];
      const tools = next[skillIdx].tools.filter((_, i) => i !== toolIdx);
      next[skillIdx] = { ...next[skillIdx], tools };
      return next;
    });
  };

  const addSkill = () => {
    setData((prev) => [...prev, { title: 'New Skill Category', tools: [''] }]);
  };

  const removeSkill = (index) => {
    setData((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Skill Categories</h3>
        {data.map((skill, si) => (
          <div key={si} className="admin-card">
            <div className="admin-card-header">
              <span className="admin-card-title">Category {si + 1}</span>
              <button className="admin-remove-btn" onClick={() => removeSkill(si)} title="Remove category"><X size={14} /></button>
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Category Title</label>
              <input className="admin-input" value={skill.title} onChange={(e) => updateSkillTitle(si, e.target.value)} />
            </div>
            <label className="admin-label">Tools & Methodologies</label>
            {skill.tools.map((tool, ti) => (
              <div key={ti} className="admin-list-item">
                <input className="admin-input" value={tool} onChange={(e) => updateTool(si, ti, e.target.value)} placeholder="Tool name" />
                <button className="admin-remove-btn" onClick={() => removeTool(si, ti)}><X size={14} /></button>
              </div>
            ))}
            <button className="admin-add-btn" onClick={() => addTool(si)}><Plus size={14} /> Add Tool</button>
          </div>
        ))}
        <button className="admin-add-btn" onClick={addSkill} style={{ marginTop: '0.5rem' }}><Plus size={14} /> Add Skill Category</button>
      </div>

      <div className="admin-actions">
        <button className="admin-btn admin-btn-primary" onClick={() => onSave(data)}><Save size={16} /> Save Changes</button>
        <button className="admin-btn admin-btn-secondary" onClick={onReset}><RotateCcw size={16} /> Reset</button>
      </div>
    </div>
  );
}

/* ============================================
   PROJECTS EDITOR
   ============================================ */

function ProjectsEditor({ content, onSave, onReset }) {
  const [data, setData] = useState(content);
  const fileRefs = useRef({});

  React.useEffect(() => { setData(content); }, [content]);

  const updateProject = (index, key, val) => {
    setData((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: val };
      return next;
    });
  };

  const updateBullet = (projIdx, bulletIdx, val) => {
    setData((prev) => {
      const next = [...prev];
      const bullets = [...next[projIdx].bullets];
      bullets[bulletIdx] = val;
      next[projIdx] = { ...next[projIdx], bullets };
      return next;
    });
  };

  const addBullet = (projIdx) => {
    setData((prev) => {
      const next = [...prev];
      next[projIdx] = { ...next[projIdx], bullets: [...next[projIdx].bullets, ''] };
      return next;
    });
  };

  const removeBullet = (projIdx, bulletIdx) => {
    setData((prev) => {
      const next = [...prev];
      const bullets = next[projIdx].bullets.filter((_, i) => i !== bulletIdx);
      next[projIdx] = { ...next[projIdx], bullets };
      return next;
    });
  };

  const handleImageUpload = (projIdx, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      updateProject(projIdx, 'image', ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const addProject = () => {
    setData((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: 'New Project',
        role: 'Role',
        context: 'Context',
        image: '',
        bullets: ['Description of work done.'],
      },
    ]);
  };

  const removeProject = (index) => {
    setData((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Projects</h3>
        {data.map((proj, pi) => (
          <div key={proj.id || pi} className="admin-card">
            <div className="admin-card-header">
              <span className="admin-card-title">Project {pi + 1}</span>
              <button className="admin-remove-btn" onClick={() => removeProject(pi)} title="Remove project"><X size={14} /></button>
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-label">Title</label>
                <input className="admin-input" value={proj.title} onChange={(e) => updateProject(pi, 'title', e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Role</label>
                <input className="admin-input" value={proj.role} onChange={(e) => updateProject(pi, 'role', e.target.value)} />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Context</label>
              <input className="admin-input" value={proj.context} onChange={(e) => updateProject(pi, 'context', e.target.value)} />
            </div>

            {/* Image Upload */}
            <div className="admin-form-group">
              <label className="admin-label">Project Image</label>
              <div className="admin-image-upload" onClick={() => fileRefs.current[pi]?.click()}>
                <input
                  ref={(el) => (fileRefs.current[pi] = el)}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(pi, e)}
                  style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                />
                {proj.image ? (
                  <img src={proj.image} alt="Preview" className="admin-image-preview" />
                ) : (
                  <>
                    <Upload size={24} style={{ color: 'var(--text-muted)' }} />
                    <p className="admin-image-upload-text">
                      <strong>Click to upload</strong> or drag image here
                    </p>
                  </>
                )}
              </div>
              <div style={{ marginTop: '0.5rem' }}>
                <label className="admin-label">Or paste image URL</label>
                <input
                  className="admin-input"
                  value={proj.image?.startsWith('data:') ? '' : proj.image}
                  onChange={(e) => updateProject(pi, 'image', e.target.value)}
                  placeholder="/images/project.png or https://..."
                />
              </div>
            </div>

            {/* Bullets */}
            <div className="admin-form-group">
              <label className="admin-label">Description Bullets</label>
              {proj.bullets.map((bullet, bi) => (
                <div key={bi} className="admin-list-item">
                  <textarea
                    className="admin-textarea"
                    style={{ minHeight: '60px' }}
                    value={bullet}
                    onChange={(e) => updateBullet(pi, bi, e.target.value)}
                    placeholder="Describe what you did..."
                  />
                  <button className="admin-remove-btn" onClick={() => removeBullet(pi, bi)}><X size={14} /></button>
                </div>
              ))}
              <button className="admin-add-btn" onClick={() => addBullet(pi)}><Plus size={14} /> Add Bullet</button>
            </div>
          </div>
        ))}
        <button className="admin-add-btn" onClick={addProject} style={{ marginTop: '0.5rem' }}><Plus size={14} /> Add Project</button>
      </div>

      <div className="admin-actions">
        <button className="admin-btn admin-btn-primary" onClick={() => onSave(data)}><Save size={16} /> Save Changes</button>
        <button className="admin-btn admin-btn-secondary" onClick={onReset}><RotateCcw size={16} /> Reset</button>
      </div>
    </div>
  );
}

/* ============================================
   EDUCATION EDITOR
   ============================================ */

function EducationEditor({ content, onSave, onReset }) {
  const [data, setData] = useState(content);

  React.useEffect(() => { setData(content); }, [content]);

  const updateItem = (index, key, val) => {
    setData((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: val };
      return next;
    });
  };

  const addItem = () => {
    setData((prev) => [
      ...prev,
      { degree: 'New Degree', school: 'Institution Name', gpa: 'GPA: 0.00 / 0.00', note: '', isMain: false },
    ]);
  };

  const removeItem = (index) => {
    setData((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Education Entries</h3>
        {data.map((item, i) => (
          <div key={i} className="admin-card">
            <div className="admin-card-header">
              <span className="admin-card-title">Entry {i + 1}</span>
              <button className="admin-remove-btn" onClick={() => removeItem(i)} title="Remove entry"><X size={14} /></button>
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Degree / Certificate</label>
              <input className="admin-input" value={item.degree} onChange={(e) => updateItem(i, 'degree', e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">School / Institution</label>
              <input className="admin-input" value={item.school} onChange={(e) => updateItem(i, 'school', e.target.value)} />
            </div>
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-label">GPA / CGPA</label>
                <input className="admin-input" value={item.gpa} onChange={(e) => updateItem(i, 'gpa', e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Note (optional)</label>
                <input className="admin-input" value={item.note || ''} onChange={(e) => updateItem(i, 'note', e.target.value)} placeholder="e.g. Up to 6th Semester" />
              </div>
            </div>
            <div className="admin-checkbox-group">
              <input
                type="checkbox"
                id={`main-${i}`}
                checked={item.isMain}
                onChange={(e) => updateItem(i, 'isMain', e.target.checked)}
              />
              <label htmlFor={`main-${i}`}>Primary degree (highlighted in timeline)</label>
            </div>
          </div>
        ))}
        <button className="admin-add-btn" onClick={addItem} style={{ marginTop: '0.5rem' }}><Plus size={14} /> Add Education Entry</button>
      </div>

      <div className="admin-actions">
        <button className="admin-btn admin-btn-primary" onClick={() => onSave(data)}><Save size={16} /> Save Changes</button>
        <button className="admin-btn admin-btn-secondary" onClick={onReset}><RotateCcw size={16} /> Reset</button>
      </div>
    </div>
  );
}

/* ============================================
   CONTACT EDITOR
   ============================================ */

function ContactEditor({ content, onSave, onReset }) {
  const [data, setData] = useState(content);
  const update = (key, val) => setData((p) => ({ ...p, [key]: val }));

  React.useEffect(() => { setData(content); }, [content]);

  return (
    <div>
      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Contact Information</h3>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-label">Email</label>
            <input className="admin-input" type="email" value={data.email} onChange={(e) => update('email', e.target.value)} />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Phone</label>
            <input className="admin-input" type="tel" value={data.phone} onChange={(e) => update('phone', e.target.value)} />
          </div>
        </div>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-label">LinkedIn Label</label>
            <input className="admin-input" value={data.linkedinLabel} onChange={(e) => update('linkedinLabel', e.target.value)} />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">LinkedIn URL</label>
            <input className="admin-input" type="url" value={data.linkedinUrl} onChange={(e) => update('linkedinUrl', e.target.value)} placeholder="https://linkedin.com/in/..." />
          </div>
        </div>
        <div className="admin-form-group">
          <label className="admin-label">Location</label>
          <input className="admin-input" value={data.location} onChange={(e) => update('location', e.target.value)} />
        </div>
      </div>

      <div className="admin-form-section">
        <h3 className="admin-form-section-title">Description</h3>
        <div className="admin-form-group">
          <label className="admin-label">Contact Section Description</label>
          <textarea className="admin-textarea" rows={3} value={data.description} onChange={(e) => update('description', e.target.value)} />
        </div>
      </div>

      <div className="admin-actions">
        <button className="admin-btn admin-btn-primary" onClick={() => onSave(data)}><Save size={16} /> Save Changes</button>
        <button className="admin-btn admin-btn-secondary" onClick={onReset}><RotateCcw size={16} /> Reset</button>
      </div>
    </div>
  );
}

export default AdminDashboard;
