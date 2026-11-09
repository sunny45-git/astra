import React, { useState } from 'react';
import { SkillItem } from '../../types';
import { ConfirmModal } from './ConfirmModal';
import { Plus, Edit2, Trash2, Save, X, CheckCircle2, AlertCircle, Code } from 'lucide-react';

interface SkillsModuleProps {
  skills: SkillItem[];
  token: string;
  onRefresh: () => void;
}

export const SkillsModule: React.FC<SkillsModuleProps> = ({ skills, token, onRefresh }) => {
  const [editingSkill, setEditingSkill] = useState<Partial<SkillItem> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const categories: Array<'FRONTEND' | 'BACKEND' | 'DATABASE' | 'TOOLS'> = [
    'FRONTEND',
    'BACKEND',
    'DATABASE',
    'TOOLS',
  ];

  const handleStartCreate = (category: 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'TOOLS' = 'FRONTEND') => {
    setIsCreating(true);
    setEditingSkill({
      id: `skill_${Date.now()}`,
      name: '',
      category,
      tag: 'Core Proficiency',
      icon: 'Code',
      description: '',
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill || !editingSkill.name) return;

    setIsSaving(true);
    setStatusMessage(null);

    const isEdit = !isCreating && editingSkill.id;
    const url = isEdit ? `/api/admin/skills/${editingSkill.id}` : '/api/admin/skills';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingSkill),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setStatusMessage({ type: 'success', text: `Skill ${isEdit ? 'updated' : 'added'} successfully.` });
        setEditingSkill(null);
        setIsCreating(false);
        onRefresh();
      } else {
        setStatusMessage({ type: 'error', text: json.message || 'Failed to save technology.' });
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
      const res = await fetch(`/api/admin/skills/${deleteId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setStatusMessage({ type: 'success', text: 'Skill removed successfully.' });
        setDeleteId(null);
        onRefresh();
      }
    } catch {
      setStatusMessage({ type: 'error', text: 'Failed to delete skill.' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h3 className="text-xl font-bold font-display text-white">Technology &amp; Stack Management</h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Organize verified technical skills across Frontend, Backend, Database, and Tooling.
          </p>
        </div>
        <button
          onClick={() => handleStartCreate('FRONTEND')}
          className="px-5 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-space-950 bg-gradient-to-r from-electric-cyan to-electric-sky hover:to-white shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Technology</span>
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

      {/* Editor Modal / Card */}
      {editingSkill && (
        <div className="rounded-2xl p-6 bg-space-900 border border-electric-cyan/40 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h4 className="text-base font-bold text-white">
              {isCreating ? 'Add New Technology' : `Edit Technology: ${editingSkill.name}`}
            </h4>
            <button
              onClick={() => {
                setEditingSkill(null);
                setIsCreating(false);
              }}
              className="p-1.5 rounded-lg bg-space-850 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Technology Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingSkill.name || ''}
                  onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                  placeholder="e.g. React / Docker / PostgreSQL"
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Stack Category
                </label>
                <select
                  value={editingSkill.category || 'FRONTEND'}
                  onChange={(e) =>
                    setEditingSkill({
                      ...editingSkill,
                      category: e.target.value as 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'TOOLS',
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white bg-space-950"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Proficiency Role / Tag
                </label>
                <input
                  type="text"
                  value={editingSkill.tag || ''}
                  onChange={(e) => setEditingSkill({ ...editingSkill, tag: e.target.value })}
                  placeholder="e.g. Component Architecture"
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Practical Usage Description
              </label>
              <textarea
                rows={2}
                value={editingSkill.description || ''}
                onChange={(e) => setEditingSkill({ ...editingSkill, description: e.target.value })}
                placeholder="How this technology is utilized in your projects..."
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setEditingSkill(null);
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
                <span>Save Technology</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categorized Skills Grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => {
          const items = skills.filter((s) => s.category === cat);
          return (
            <div key={cat} className="rounded-2xl p-6 bg-space-900/60 border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h4 className="text-sm font-bold font-mono uppercase tracking-wider text-electric-cyan flex items-center gap-2">
                  <span>{cat}</span>
                  <span className="text-xs text-slate-500">({items.length})</span>
                </h4>
                <button
                  onClick={() => handleStartCreate(cat)}
                  className="p-1 rounded-md bg-space-850 hover:bg-space-800 text-slate-300 hover:text-white border border-white/10 text-xs font-mono flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add</span>
                </button>
              </div>

              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.id || item.name}
                    className="p-3 rounded-xl bg-space-850/60 border border-white/5 flex items-center justify-between group hover:border-white/20 transition-colors"
                  >
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>{item.name}</span>
                        <span className="text-[10px] font-mono text-electric-cyan/90 bg-white/5 px-2 py-0.5 rounded">
                          {item.tag}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                        {item.description}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 ml-3">
                      <button
                        onClick={() => {
                          setEditingSkill(item);
                          setIsCreating(false);
                        }}
                        className="p-1.5 rounded-lg bg-space-800 hover:bg-space-700 text-slate-300 hover:text-white"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteId(item.id || item.name)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <ConfirmModal
        isOpen={!!deleteId}
        title="Remove Technology"
        message="Are you sure you want to remove this skill from the ASTRA portfolio?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};
