import React, { useState } from 'react';
import { HeroData } from '../../types';
import { Save, CheckCircle2, AlertCircle, Sparkles, Eye } from 'lucide-react';

interface HeroModuleProps {
  hero: HeroData;
  token: string;
  onUpdateSuccess: (updated: HeroData) => void;
}

export const HeroModule: React.FC<HeroModuleProps> = ({ hero, token, onUpdateSuccess }) => {
  const [formData, setFormData] = useState<HeroData>(hero);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (field: keyof HeroData, val: any) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/admin/hero', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setStatusMessage({ type: 'success', text: 'Hero configuration updated and live on public homepage.' });
        onUpdateSuccess(json.hero);
      } else {
        setStatusMessage({ type: 'error', text: json.message || 'Failed to update hero settings.' });
      }
    } catch {
      setStatusMessage({ type: 'error', text: 'Network error saving hero changes.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h3 className="text-xl font-bold font-display text-white">Hero Section Configuration</h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Manage your headline, tagline, CTAs, and 3D visual toggles.
          </p>
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-space-950 bg-gradient-to-r from-electric-cyan to-electric-sky hover:to-white shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isSaving ? <div className="w-3.5 h-3.5 border-2 border-space-950 border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save Changes</span>
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

      {/* Main Copy */}
      <div className="rounded-2xl p-6 bg-space-900/80 border border-white/10 space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-electric-cyan" />
          <span>Headlines &amp; Tagline</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              Brand Wordmark
            </label>
            <input
              type="text"
              value={formData.brandName}
              onChange={(e) => handleChange('brandName', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              Brand Tagline
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => handleChange('tagline', e.target.value)}
              placeholder="Ideas Beyond Limits."
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
            Eyebrow Badge Text
          </label>
          <input
            type="text"
            value={formData.eyebrow}
            onChange={(e) => handleChange('eyebrow', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
          />
        </div>

        <div>
          <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
            Hero Supporting Description
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white resize-none"
          />
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="rounded-2xl p-6 bg-space-900/80 border border-white/10 space-y-4">
        <h4 className="text-sm font-bold text-white">Call To Action Buttons</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              Primary Button Label
            </label>
            <input
              type="text"
              value={formData.ctaPrimaryText}
              onChange={(e) => handleChange('ctaPrimaryText', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              Primary Button Target / Anchor
            </label>
            <input
              type="text"
              value={formData.ctaPrimaryLink}
              onChange={(e) => handleChange('ctaPrimaryLink', e.target.value)}
              placeholder="#projects"
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              Secondary Button Label
            </label>
            <input
              type="text"
              value={formData.ctaSecondaryText}
              onChange={(e) => handleChange('ctaSecondaryText', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              Secondary Button Target / Anchor
            </label>
            <input
              type="text"
              value={formData.ctaSecondaryLink}
              onChange={(e) => handleChange('ctaSecondaryLink', e.target.value)}
              placeholder="#contact"
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
            />
          </div>
        </div>
      </div>

      {/* 3D Visual Controls */}
      <div className="rounded-2xl p-6 bg-space-900/80 border border-white/10 space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Eye className="w-4 h-4 text-electric-violet" />
          <span>3D &amp; Visual Element Controls</span>
        </h4>

        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.show3DCore}
              onChange={(e) => handleChange('show3DCore', e.target.checked)}
              className="w-4 h-4 rounded text-electric-cyan bg-space-950 border-white/20 focus:ring-electric-cyan"
            />
            <span className="text-sm text-slate-200">
              Enable ASTRA 3D Celestial Core Canvas on Desktop / Tablet
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.showParticles}
              onChange={(e) => handleChange('showParticles', e.target.checked)}
              className="w-4 h-4 rounded text-electric-cyan bg-space-950 border-white/20 focus:ring-electric-cyan"
            />
            <span className="text-sm text-slate-200">
              Enable Ambient Cosmic Stardust Particles
            </span>
          </label>
        </div>
      </div>
    </form>
  );
};

