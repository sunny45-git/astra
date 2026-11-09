import React, { useState } from 'react';
import { Service } from '../../types';
import { ConfirmModal } from './ConfirmModal';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
  Layers
} from 'lucide-react';

interface ServicesModuleProps {
  services: Service[];
  token: string;
  onRefresh: () => void;
}

export const ServicesModule: React.FC<ServicesModuleProps> = ({ services, token, onRefresh }) => {
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const availableIcons = [
    'UserCheck',
    'Scale',
    'Landmark',
    'Building2',
    'HeartHandshake',
    'Cpu',
    'Sparkles',
    'Code',
    'ShieldCheck',
  ];

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingService({
      id: `serv_${Date.now()}`,
      title: '',
      category: 'Specialized Solution',
      shortDescription: '',
      detailedDescription: '',
      technologies: ['React', 'Tailwind CSS', 'Node.js'],
      icon: 'Cpu',
      visible: true,
      order: services.length + 1,
      deliverables: ['Custom UI Prototype', 'Full-Stack Implementation', 'Deployment & SEO'],
      idealFor: 'Forward-thinking businesses and leaders',
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService || !editingService.title) return;

    setIsSaving(true);
    setStatusMessage(null);

    const isEdit = !isCreating && editingService.id;
    const url = isEdit ? `/api/admin/services/${editingService.id}` : '/api/admin/services';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingService),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setStatusMessage({ type: 'success', text: `Service ${isEdit ? 'updated' : 'created'} successfully.` });
        setEditingService(null);
        setIsCreating(false);
        onRefresh();
      } else {
        setStatusMessage({ type: 'error', text: json.message || 'Failed to save service.' });
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
      const res = await fetch(`/api/admin/services/${deleteId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setStatusMessage({ type: 'success', text: 'Service deleted successfully.' });
        setDeleteId(null);
        onRefresh();
      }
    } catch {
      setStatusMessage({ type: 'error', text: 'Failed to delete service.' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h3 className="text-xl font-bold font-display text-white">Services &amp; Offerings Management</h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Configure client solutions, deliverables, target audience, and visibility.
          </p>
        </div>
        <button
          onClick={handleStartCreate}
          className="px-5 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-space-950 bg-gradient-to-r from-electric-cyan to-electric-sky hover:to-white shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
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

      {editingService && (
        <div className="rounded-2xl p-6 bg-space-900 border border-electric-cyan/40 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h4 className="text-base font-bold text-white">
              {isCreating ? 'Create New Service' : `Edit Service: ${editingService.title}`}
            </h4>
            <button
              onClick={() => {
                setEditingService(null);
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
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingService.title || ''}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Category Tag
                </label>
                <input
                  type="text"
                  value={editingService.category || ''}
                  onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Icon Identifier
                </label>
                <select
                  value={editingService.icon || 'Cpu'}
                  onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white bg-space-950"
                >
                  {availableIcons.map((ic) => (
                    <option key={ic} value={ic}>
                      {ic}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={editingService.order || 1}
                  onChange={(e) => setEditingService({ ...editingService, order: parseInt(e.target.value) || 1 })}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Short Description (Card Overview)
              </label>
              <textarea
                rows={2}
                value={editingService.shortDescription || ''}
                onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white resize-none"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Detailed Description (Modal View)
              </label>
              <textarea
                rows={3}
                value={editingService.detailedDescription || ''}
                onChange={(e) => setEditingService({ ...editingService, detailedDescription: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Ideal For (Target Client Profile)
                </label>
                <input
                  type="text"
                  value={editingService.idealFor || ''}
                  onChange={(e) => setEditingService({ ...editingService, idealFor: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Technologies (comma-separated)
                </label>
                <input
                  type="text"
                  value={(editingService.technologies || []).join(', ')}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-300 pt-2">
              <input
                type="checkbox"
                checked={editingService.visible !== false}
                onChange={(e) => setEditingService({ ...editingService, visible: e.target.checked })}
                className="w-4 h-4 rounded text-electric-cyan"
              />
              <span>Visible on Portfolio Website</span>
            </label>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setEditingService(null);
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
                <span>Save Service</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services Table */}
      <div className="rounded-2xl border border-white/10 overflow-hidden bg-space-900/60 backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-space-950/80 text-slate-400 font-mono uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Service Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Icon</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 font-mono text-slate-500">#{s.order}</td>
                  <td className="px-4 py-3 font-bold text-white">{s.title}</td>
                  <td className="px-4 py-3 font-mono text-electric-cyan">{s.category}</td>
                  <td className="px-4 py-3 font-mono text-slate-400">{s.icon}</td>
                  <td className="px-4 py-3">
                    {s.visible !== false ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono inline-flex items-center gap-1">
                        <Eye className="w-2.5 h-2.5" /> Visible
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 text-[10px] font-mono inline-flex items-center gap-1">
                        <EyeOff className="w-2.5 h-2.5" /> Hidden
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingService(s);
                          setIsCreating(false);
                        }}
                        className="p-1.5 rounded-lg bg-space-850 hover:bg-space-800 text-slate-300 hover:text-white border border-white/10"
                        title="Edit Service"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteId(s.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20"
                        title="Delete Service"
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

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Service"
        message="Are you sure you want to delete this service offering? This will remove it from the ASTRA portfolio."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};

