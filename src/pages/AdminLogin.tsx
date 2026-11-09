import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Sparkles, Home } from 'lucide-react';
import { AstraLogo } from '../components/common/AstraLogo';
import { useAuth } from '../context/AuthContext';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        login(json.token, json.user);
        navigate('/admin/dashboard');
      } else {
        setErrorMessage(json.message || 'Authentication failed. Please verify credentials.');
      }
    } catch (err: any) {
      setErrorMessage('Could not connect to ASTRA authentication service.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-space-950 overflow-hidden font-sans">
      {/* Background Cosmic Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-electric-cyan/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-electric-violet/10 blur-[140px] pointer-events-none" />

      {/* Top Bar with Home Link */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          to="/"
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-space-900/80 border border-white/10 hover:border-electric-cyan/40 text-xs font-mono text-slate-300 hover:text-white transition-colors"
        >
          <Home className="w-3.5 h-3.5 text-electric-cyan" />
          <span>Back to Portfolio</span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-space-900/90 to-space-950/95 border border-white/15 backdrop-blur-2xl shadow-2xl z-10 overflow-hidden"
      >
        {/* Emblem & Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <AstraLogo size="lg" showSubtitle={false} className="mb-3" />
          <h2 className="text-2xl font-bold font-display text-white">
            ASTRA Command Center
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Private Content Management &amp; Analytics Portal
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs mb-6 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
              Administrator Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@astra.dev"
                className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm text-white placeholder-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm text-white placeholder-slate-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-6 rounded-xl font-semibold text-xs uppercase tracking-wider text-space-950 bg-gradient-to-r from-electric-cyan to-electric-sky hover:to-white shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-space-950 border-t-transparent rounded-full animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Access Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security Note */}
        <div className="mt-8 p-3.5 rounded-xl bg-space-850/60 border border-white/5 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5 text-electric-cyan font-bold mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Secure Admin Authentication:</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Enter your credentials as configured in your server environment (<span className="text-electric-cyan font-semibold">ADMIN_EMAIL</span> &amp; <span className="text-electric-cyan font-semibold">ADMIN_PASSWORD</span>).
          </p>
        </div>
      </motion.div>
    </div>
  );
};

