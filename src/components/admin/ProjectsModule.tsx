import React, { useState } from 'react';
import { Project } from '../../types';
import { ConfirmModal } from './ConfirmModal';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  ExternalLink,
  Save,
  X,
  Upload,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface ProjectsModuleProps {
  projects: Project[];
  token: string;
  onRefresh: () => void;
}

export const ProjectsModule: React.FC<ProjectsModuleProps> = ({ projects, token, onRefresh }) => {
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Deletion modal state
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const categories = [
    'Public Representative Portfolio',
    'Personal Portfolio',
    'Foundation Website',
    'Legal Professional Website',
    'Business & Corporate Websites',
    'Full-Stack Web Applications',
  ];

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingProject({
      id: `proj_${Date.now()}`,
      title: '',
      category: 'Public Representative Portfolio',
      shortDescription: '',
      fullDescription: '',
      clientType: '',
      technologies: ['React', 'Tailwind CSS', 'Node.js'],
      liveUrl: '',
      githubUrl: '',
      featured: false,
      published: true,
      order: projects.length + 1,
      accentColor: '#00f5ff',
      mockupTheme: 'dark-navy',
      keyFeatures: ['Responsive Interface', 'High-Speed Architecture'],
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    setIsUploading(true);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setEditingProject((prev) => ({ ...prev, image: json.fileUrl }));
      } else {
        setStatusMessage({ type: 'error', text: json.message || 'Image upload failed.' });
      }
    } catch {
      setStatusMessage({ type: 'error', text: 'Upload failed.' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title) return;

    setIsSaving(true);
    setStatusMessage(null);

    const isEdit = !isCreating && editingProject.id;
    const url = isEdit ? `/api/admin/projects/${editingProject.id}` : '/api/admin/projects';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingProject),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setStatusMessage({ type: 'success', text: `Project ${isEdit ? 'updated' : 'created'} successfully.` });
        setEditingProject(null);
        setIsCreating(false);
        onRefresh();
      } else {
        setStatusMessage({ type: 'error', text: json.message || 'Failed to save project.' });
      }
    } catch {
      setStatusMessage({ type: 'error', text: 'Error connecting to database.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const res = await fetch(`/api/admin/projects/${deleteId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setStatusMessage({ type: 'success', text: 'Project deleted successfully.' });
        setDeleteId(null);
        onRefresh();
      }
    } catch {
      setStatusMessage({ type: 'error', text: 'Failed to delete project.' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h3 className="text-xl font-bold font-display text-white">Project Showcase Management</h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Create, edit, feature, and order your portfolio works with live links and screenshots.
          </p>
        </div>
        <button
          onClick={handleStartCreate}
          className="px-5 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-space-950 bg-gradient-to-r from-electric-cyan to-electric-sky hover:to-white shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-2 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
              : 'bg-rose-950/60 border border-rose-500/40 text-rose-300'
          }`}
        >
          {statusMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Editor Modal / Drawer */}
      {editingProject && (
        <div className="rounded-2xl p-6 bg-space-900 border border-electric-cyan/40 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h4 className="text-base font-bold text-white">
              {isCreating ? 'Create New Showcase Project' : `Edit Project: ${editingProject.title}`}
            </h4>
            <button
              onClick={() => {
                setEditingProject(null);
                setIsCreating(false);
              }}
              className="p-1.5 rounded-lg bg-space-850 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.title || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Category
                </label>
                <select
                  value={editingProject.category || categories[0]}
                  onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white bg-space-950"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Client / Identity Type
                </label>
                <input
                  type="text"
                  value={editingProject.clientType || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, clientType: e.target.value })}
                  placeholder="e.g. Public Representative / Senior Advocate"
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={editingProject.order || 1}
                  onChange={(e) => setEditingProject({ ...editingProject, order: parseInt(e.target.value) || 1 })}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Live Demo URL
                </label>
                <input
                  type="url"
                  value={editingProject.liveUrl || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  GitHub Code Repository URL
                </label>
                <input
                  type="url"
                  value={editingProject.githubUrl || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                  placeholder="https://github.com/sunnypendela/..."
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                value={(editingProject.technologies || []).join(', ')}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Short Description (Card summary)
              </label>
              <textarea
                rows={2}
                value={editingProject.shortDescription || ''}
                onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white resize-none"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Full Description (Case study modal)
              </label>
              <textarea
                rows={3}
                value={editingProject.fullDescription || ''}
                onChange={(e) => setEditingProject({ ...editingProject, fullDescription: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white resize-none"
              />
            </div>

            {/* Image screenshot upload */}
            <div className="p-4 rounded-xl bg-space-850 border border-white/10 space-y-2">
              <label className="text-xs font-mono uppercase text-slate-300 block">
                Project Preview Screenshot / Image
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={editingProject.image || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                  placeholder="Image URL or upload a file"
                  className="flex-1 px-4 py-2 rounded-xl glass-input text-xs text-white"
                />
                <label className="px-3.5 py-2 rounded-xl bg-space-800 hover:bg-space-700 border border-white/10 text-xs font-mono text-slate-200 cursor-pointer flex items-center gap-1.5 shrink-0">
                  <Upload className="w-3.5 h-3.5 text-electric-cyan" />
                  <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
            </div>

            {/* Checkboxes: Featured & Published */}
            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-300">
                <input
                  type="checkbox"
                  checked={editingProject.published !== false}
                  onChange={(e) => setEditingProject({ ...editingProject, published: e.target.checked })}
                  className="w-4 h-4 rounded text-electric-cyan"
                />
                <span>Published (Visible on public portfolio)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-300">
                <input
                  type="checkbox"
                  checked={!!editingProject.featured}
                  onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-amber-400"
                />
                <span>Mark as Featured</span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setEditingProject(null);
                  setIsCreating(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-space-950 bg-electric-cyan hover:bg-white flex items-center gap-2"
              >
                {isSaving ? <div className="w-3.5 h-3.5 border-2 border-space-950 border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save Project</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects List Table */}
      <div className="rounded-2xl border border-white/10 overflow-hidden bg-space-900/60 backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-space-950/80 text-slate-400 font-mono uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Project Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Live Link</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 font-mono text-slate-500">#{p.order}</td>
                  <td className="px-4 py-3 font-bold text-white flex items-center gap-2">
                    {p.featured && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />}
                    <span>{p.title}</span>
                  </td>
                  <td className="px-4 py-3 font-mono text-electric-cyan">{p.category}</td>
                  <td className="px-4 py-3">
                    {p.published !== false ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono inline-flex items-center gap-1">
                        <Eye className="w-2.5 h-2.5" /> Published
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/30 text-[10px] font-mono inline-flex items-center gap-1">
                        <EyeOff className="w-2.5 h-2.5" /> Draft
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-400">
                    {p.liveUrl ? (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-white flex items-center gap-1 truncate max-w-[150px]"
                      >
                        <span className="truncate">{p.liveUrl.replace('https://', '')}</span>
                        <ExternalLink className="w-3 h-3 text-electric-cyan shrink-0" />
                      </a>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingProject(p);
                          setIsCreating(false);
                        }}
                        className="p-1.5 rounded-lg bg-space-850 hover:bg-space-800 text-slate-300 hover:text-white border border-white/10"
                        title="Edit Project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteId(p.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Project"
        message="Are you sure you want to delete this project? This will permanently remove it from the ASTRA portfolio."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};

