import React, { useState } from 'react';
import { WebsiteSettings } from '../../types';
import { Save, CheckCircle2, AlertCircle, Settings, Globe, Shield, Key } from 'lucide-react';

interface SettingsModuleProps {
  settings: WebsiteSettings;
  token: string;
  onUpdateSuccess: (updated: WebsiteSettings) => void;
}

export const SettingsModule: React.FC<SettingsModuleProps> = ({ settings, token, onUpdateSuccess }) => {
  const [formData, setFormData] = useState<WebsiteSettings>(settings);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [passMessage, setPassMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (field: keyof WebsiteSettings, val: any) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setStatusMessage({ type: 'success', text: 'Website settings saved and applied to public meta headers & footer.' });
        onUpdateSuccess(json.settings);
      } else {
        setStatusMessage({ type: 'error', text: json.message || 'Failed to save settings.' });
      }
    } catch {
      setStatusMessage({ type: 'error', text: 'Error connecting to database.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChangingPass(true);
    setPassMessage(null);

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setPassMessage({ type: 'success', text: 'Administrator password changed successfully.' });
        setCurrentPassword('');
        setNewPassword('');
      } else {
        setPassMessage({ type: 'error', text: json.message || 'Failed to change password.' });
      }
    } catch {
      setPassMessage({ type: 'error', text: 'Network error updating password.' });
    } finally {
      setIsChangingPass(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h3 className="text-xl font-bold font-display text-white">Website &amp; Brand Settings</h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Manage site metadata, SEO tags, footer copyright, and administrator credentials.
          </p>
        </div>
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

      {/* Brand & SEO Form */}
      <form onSubmit={handleSaveSettings} className="space-y-6">
        <div className="rounded-2xl p-6 bg-space-900/80 border border-white/10 space-y-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-electric-cyan" />
            <span>SEO &amp; Identity</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Website Meta Title
              </label>
              <input
                type="text"
                value={formData.siteTitle}
                onChange={(e) => handleChange('siteTitle', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Logo Wordmark
              </label>
              <input
                type="text"
                value={formData.logoText}
                onChange={(e) => handleChange('logoText', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              Search Engine (SEO) Meta Description
            </label>
            <textarea
              rows={3}
              value={formData.seoDescription}
              onChange={(e) => handleChange('seoDescription', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              Footer Brief / Description
            </label>
            <textarea
              rows={2}
              value={formData.footerText}
              onChange={(e) => handleChange('footerText', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              Footer Copyright Notice
            </label>
            <input
              type="text"
              value={formData.copyrightText}
              onChange={(e) => handleChange('copyrightText', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-space-950 bg-electric-cyan hover:bg-white flex items-center gap-2"
            >
              {isSaving ? <div className="w-3.5 h-3.5 border-2 border-space-950 border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Website Settings</span>
            </button>
          </div>
        </div>
      </form>

      {/* Admin Security & Password Change */}
      <div className="rounded-2xl p-6 bg-space-900/80 border border-white/10 space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Key className="w-4 h-4 text-amber-400" />
          <span>Change Administrator Password</span>
        </h4>
        <p className="text-xs text-slate-400 font-mono">
          Update the secure password used to access this dashboard.
        </p>

        {passMessage && (
          <div
            className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${
              passMessage.type === 'success'
                ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/60 border border-rose-500/40 text-rose-300'
            }`}
          >
            {passMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
            <span>{passMessage.text}</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-lg">
          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              Current Password
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              New Secure Password (Min 8 characters)
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
            />
          </div>

          <button
            type="submit"
            disabled={isChangingPass}
            className="px-5 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-white bg-space-800 hover:bg-space-700 border border-white/20 flex items-center gap-2"
          >
            {isChangingPass ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

