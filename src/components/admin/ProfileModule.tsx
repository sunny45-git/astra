import React, { useState } from 'react';
import { ProfileData } from '../../types';
import { Save, CheckCircle2, AlertCircle, Upload, User, Mail, Phone, MapPin, GraduationCap } from 'lucide-react';

interface ProfileModuleProps {
  profile: ProfileData;
  token: string;
  onUpdateSuccess: (updated: ProfileData) => void;
}

export const ProfileModule: React.FC<ProfileModuleProps> = ({
  profile,
  token,
  onUpdateSuccess,
}) => {
  const [formData, setFormData] = useState<ProfileData>(profile);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (field: keyof ProfileData, val: any) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSocialChange = (key: string, val: string) => {
    setFormData((prev) => ({
      ...prev,
      socials: { ...prev.socials, [key]: val },
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append('image', file);
    setIsUploading(true);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });
      const json = await res.json();
      if (res.ok && json.success) {
        handleChange('avatar', json.fileUrl);
        setStatusMessage({ type: 'success', text: 'Profile photograph uploaded successfully.' });
      } else {
        setStatusMessage({ type: 'error', text: json.message || 'Image upload failed.' });
      }
    } catch {
      setStatusMessage({ type: 'error', text: 'Error uploading image file.' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setStatusMessage({ type: 'success', text: 'Profile updated successfully and synced with public website.' });
        onUpdateSuccess(json.profile);
      } else {
        setStatusMessage({ type: 'error', text: json.message || 'Failed to update profile.' });
      }
    } catch {
      setStatusMessage({ type: 'error', text: 'Network error saving profile changes.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
      {/* Module Title */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h3 className="text-xl font-bold font-display text-white">Profile Management</h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Configure your personal identity, credentials, bio, and direct liaison channels.
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

      {/* Profile Photo / Avatar */}
      <div className="rounded-2xl p-6 bg-space-900/80 border border-white/10 space-y-4">
        <label className="text-xs font-mono uppercase tracking-wider text-slate-300 block">
          Profile Photograph / Emblem
        </label>
        <div className="flex flex-wrap items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-space-850 border border-electric-cyan/40 flex items-center justify-center overflow-hidden">
            {formData.avatar ? (
              <img src={formData.avatar} alt="Avatar preview" className="w-full h-full object-cover" />
            ) : (
              <User className="w-8 h-8 text-electric-cyan" />
            )}
          </div>
          <div className="space-y-2">
            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-space-800 hover:bg-space-700 border border-white/10 text-xs font-mono text-slate-200 cursor-pointer transition-colors">
              <Upload className="w-3.5 h-3.5 text-electric-cyan" />
              <span>{isUploading ? 'Uploading Image...' : 'Upload Image File'}</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
            <p className="text-[11px] text-slate-500 font-mono">
              Accepts PNG, JPG, WEBP, SVG (Max 5MB)
            </p>
          </div>
        </div>
      </div>

      {/* Brand & Founder Attribution */}
      <div className="rounded-2xl p-6 bg-space-900/80 border border-electric-cyan/20 space-y-5">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-electric-cyan animate-pulse" />
            <span>ASTRA Brand &amp; Founder Attribution</span>
          </h4>
          <span className="text-[11px] font-mono text-electric-cyan px-2 py-0.5 rounded bg-electric-cyan/10 border border-electric-cyan/20">
            Brand Identity Settings
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              Dominant Brand Name
            </label>
            <input
              type="text"
              value={formData.brandName || 'ASTRA'}
              onChange={(e) => handleChange('brandName', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white font-semibold"
            />
            <p className="text-[11px] text-slate-500 font-mono mt-1">
              Primary brand name across navigation, hero, and logos.
            </p>
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              Founder Name
            </label>
            <input
              type="text"
              value={formData.founderName || 'Sunny Pendela'}
              onChange={(e) => handleChange('founderName', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white font-semibold"
            />
            <p className="text-[11px] text-slate-500 font-mono mt-1">
              Official founder name (e.g. Sunny Pendela).
            </p>
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              Founder Professional Title
            </label>
            <input
              type="text"
              value={formData.founderTitle || 'Founder & Principal Web Architect'}
              onChange={(e) => handleChange('founderTitle', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
            />
            <p className="text-[11px] text-slate-500 font-mono mt-1">
              Appears on profile cards &amp; founder badge.
            </p>
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              Founder Attribution Tagline
            </label>
            <input
              type="text"
              value={formData.attribution || 'Founded by Sunny Pendela'}
              onChange={(e) => handleChange('attribution', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
            />
            <p className="text-[11px] text-slate-500 font-mono mt-1">
              Subtle tagline displayed beneath logo and hero headline.
            </p>
          </div>
        </div>
      </div>

      {/* Basic Details */}
      <div className="rounded-2xl p-6 bg-space-900/80 border border-white/10 space-y-5">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <User className="w-4 h-4 text-electric-cyan" />
          <span>Core Bio &amp; Credentials</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              Display Name
            </label>
            <input
              type="text"
              value={formData.displayName}
              onChange={(e) => handleChange('displayName', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              Professional Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              Education / Degree
            </label>
            <input
              type="text"
              value={formData.education}
              onChange={(e) => handleChange('education', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
            About Me / Professional Bio
          </label>
          <textarea
            rows={4}
            value={formData.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white resize-none"
          />
        </div>
      </div>

      {/* Direct Communication Details */}
      <div className="rounded-2xl p-6 bg-space-900/80 border border-white/10 space-y-5">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Phone className="w-4 h-4 text-emerald-400" />
          <span>Contact &amp; Social Liaison</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              Primary Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              WhatsApp Display Number
            </label>
            <input
              type="text"
              value={formData.whatsapp}
              onChange={(e) => handleChange('whatsapp', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              WhatsApp Link Number (Digits only with country code)
            </label>
            <input
              type="text"
              value={formData.whatsappNumber}
              onChange={(e) => handleChange('whatsappNumber', e.target.value)}
              placeholder="919876543210"
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              Availability Status
            </label>
            <input
              type="text"
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              GitHub URL
            </label>
            <input
              type="url"
              value={formData.socials.github}
              onChange={(e) => handleSocialChange('github', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              LinkedIn URL
            </label>
            <input
              type="url"
              value={formData.socials.linkedin}
              onChange={(e) => handleSocialChange('linkedin', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

