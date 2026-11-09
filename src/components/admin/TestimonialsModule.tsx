import React, { useState } from 'react';
import { Testimonial } from '../../types';
import { ConfirmModal } from './ConfirmModal';
import { Plus, Edit2, Trash2, Eye, EyeOff, Save, X, CheckCircle2, AlertCircle, Star } from 'lucide-react';

interface TestimonialsModuleProps {
  testimonials: Testimonial[];
  token: string;
  onRefresh: () => void;
}

export const TestimonialsModule: React.FC<TestimonialsModuleProps> = ({ testimonials, token, onRefresh }) => {
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingTestimonial({
      id: `test_${Date.now()}`,
      clientName: '',
      clientRole: '',
      organization: '',
      quote: '',
      rating: 5,
      visible: true,
      projectRef: 'Client Project',
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial || !editingTestimonial.clientName) return;

    setIsSaving(true);
    setStatusMessage(null);

    const isEdit = !isCreating && editingTestimonial.id;
    const url = isEdit ? `/api/admin/testimonials/${editingTestimonial.id}` : '/api/admin/testimonials';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingTestimonial),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setStatusMessage({ type: 'success', text: `Testimonial ${isEdit ? 'updated' : 'added'} successfully.` });
        setEditingTestimonial(null);
        setIsCreating(false);
        onRefresh();
      } else {
        setStatusMessage({ type: 'error', text: json.message || 'Failed to save testimonial.' });
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
      const res = await fetch(`/api/admin/testimonials/${deleteId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setStatusMessage({ type: 'success', text: 'Testimonial deleted successfully.' });
        setDeleteId(null);
        onRefresh();
      }
    } catch {
      setStatusMessage({ type: 'error', text: 'Failed to delete testimonial.' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h3 className="text-xl font-bold font-display text-white">Testimonials Management</h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Manage genuine client endorsements and control public portfolio visibility.
          </p>
        </div>
        <button
          onClick={handleStartCreate}
          className="px-5 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-space-950 bg-gradient-to-r from-electric-cyan to-electric-sky hover:to-white shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
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

      {/* Editor Modal */}
      {editingTestimonial && (
        <div className="rounded-2xl p-6 bg-space-900 border border-electric-cyan/40 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h4 className="text-base font-bold text-white">
              {isCreating ? 'Add Client Testimonial' : `Edit Testimonial: ${editingTestimonial.clientName}`}
            </h4>
            <button
              onClick={() => {
                setEditingTestimonial(null);
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
                  Client Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingTestimonial.clientName || ''}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, clientName: e.target.value })}
                  placeholder="e.g. Adv. Rajesh V. Sharma"
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Role / Title
                </label>
                <input
                  type="text"
                  value={editingTestimonial.clientRole || ''}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, clientRole: e.target.value })}
                  placeholder="e.g. Senior Partner / Managing Trustee"
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Organization / Chamber
                </label>
                <input
                  type="text"
                  value={editingTestimonial.organization || ''}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, organization: e.target.value })}
                  placeholder="e.g. Sharma & Associates Law Chambers"
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Project Reference
                </label>
                <input
                  type="text"
                  value={editingTestimonial.projectRef || ''}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, projectRef: e.target.value })}
                  placeholder="e.g. Legal Chamber Practice Portal"
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Star Rating (1 - 5)
                </label>
                <select
                  value={editingTestimonial.rating || 5}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, rating: parseInt(e.target.value) || 5 })}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white bg-space-950"
                >
                  <option value={5}>5 Stars ★★★★★</option>
                  <option value={4}>4 Stars ★★★★☆</option>
                  <option value={3}>3 Stars ★★★☆☆</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Client Testimonial Quote *
              </label>
              <textarea
                rows={3}
                required
                value={editingTestimonial.quote || ''}
                onChange={(e) => setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white resize-none"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-300">
              <input
                type="checkbox"
                checked={editingTestimonial.visible !== false}
                onChange={(e) => setEditingTestimonial({ ...editingTestimonial, visible: e.target.checked })}
                className="w-4 h-4 rounded text-electric-cyan"
              />
              <span>Visible on Public Portfolio Testimonials Section</span>
            </label>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setEditingTestimonial(null);
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
                <span>Save Testimonial</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="rounded-2xl p-6 bg-space-900/60 border border-white/10 flex flex-col justify-between group hover:border-white/20 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <div className="flex items-center gap-1">
                  {t.visible !== false ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-mono flex items-center gap-1">
                      <Eye className="w-2.5 h-2.5" /> Visible
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-mono flex items-center gap-1">
                      <EyeOff className="w-2.5 h-2.5" /> Hidden
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-300 italic mb-4 leading-relaxed">
                "{t.quote}"
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <div>
                <h5 className="text-xs font-bold text-white">{t.clientName}</h5>
                <p className="text-[11px] text-slate-400">{t.clientRole} · {t.organization}</p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setEditingTestimonial(t);
                    setIsCreating(false);
                  }}
                  className="p-1.5 rounded-lg bg-space-850 hover:bg-space-800 text-slate-300 hover:text-white"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteId(t.id)}
                  className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Testimonial"
        message="Are you sure you want to delete this testimonial? It will be removed from your portfolio."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};

