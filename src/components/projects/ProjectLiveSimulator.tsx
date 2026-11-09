import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Lock,
  RotateCw,
  Search,
  Send,
  Heart,
  Scale,
  Award,
  Calendar,
  MapPin,
  Sparkles
} from 'lucide-react';
import { Project } from '../../types';

interface ProjectLiveSimulatorProps {
  project: Project | null;
  onClose: () => void;
}

type DeviceMode = 'desktop' | 'tablet' | 'mobile';

export const ProjectLiveSimulator: React.FC<ProjectLiveSimulatorProps> = ({ project, onClose }) => {
  const [device, setDevice] = useState<DeviceMode>('desktop');
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [grievanceSubmitted, setGrievanceSubmitted] = useState<boolean>(false);
  const [donationImpact, setDonationImpact] = useState<number>(5000);

  if (!project) return null;

  const isRealExternalUrl =
    project.liveUrl &&
    !project.liveUrl.includes('example.com') &&
    project.liveUrl.startsWith('http');

  // Render high-fidelity simulated interactive web app inside device viewport
  const renderSimulatedApp = () => {
    switch (project.id) {
      case 'gandra-sathyanarayana-rao':
        return (
          <div className="w-full min-h-full bg-slate-950 text-slate-100 font-sans pb-12">
            {/* Nav Header */}
            <header className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center font-bold text-xs text-cyan-400">
                  GSR
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-tight">
                    Gandra Sathyanarayana Rao
                  </h4>
                  <p className="text-[10px] text-slate-400">Official Constituency Portal</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activeTab === 'overview' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Initiatives
                </button>
                <button
                  onClick={() => setActiveTab('grievance')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activeTab === 'grievance' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Citizen Grievance
                </button>
              </div>
            </header>

            {/* Content view */}
            {activeTab === 'overview' ? (
              <div className="p-4 sm:p-6 space-y-6">
                {/* Hero Banner */}
                <div className="rounded-2xl p-6 bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/20">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-[10px] font-mono uppercase tracking-wider mb-2 inline-block">
                    Constituency Action Hub
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    Transparent Governance, Citizen Care &amp; Development
                  </h3>
                  <p className="text-xs text-slate-300 max-w-xl">
                    Dedicated digital access point for constituency development projects, educational aid, healthcare facilities, and direct public liaison.
                  </p>
                </div>

                {/* Key Development Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Rural Roads Built', value: '142 KM', color: 'text-cyan-400' },
                    { label: 'Families Supported', value: '18,500+', color: 'text-emerald-400' },
                    { label: 'Schools Upgraded', value: '38 Campuses', color: 'text-indigo-400' },
                    { label: 'Grievance Resolution', value: '94.2%', color: 'text-amber-400' },
                  ].map((m, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                      <div className={`text-base sm:text-lg font-bold font-mono ${m.color}`}>{m.value}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Recent Public Initiatives */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Recent Constituency Works</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        title: 'Modern Drinking Water Purification Plants',
                        desc: 'Installed 12 high-capacity automated filtration units across surrounding rural habitations.',
                        date: 'November 2026',
                      },
                      {
                        title: 'Youth Digital Skills & Vocational Training Center',
                        desc: 'State-of-the-art computer labs established to train 500+ rural youth in modern IT skills.',
                        date: 'October 2026',
                      },
                    ].map((init, i) => (
                      <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                        <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 mb-1">
                          <span>Verified Project</span>
                          <span className="text-slate-500">{init.date}</span>
                        </div>
                        <h5 className="text-xs sm:text-sm font-bold text-white mb-1.5">{init.title}</h5>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{init.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 sm:p-6 max-w-lg mx-auto">
                <div className="rounded-2xl p-6 bg-slate-900 border border-cyan-500/30">
                  <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                    <Send className="w-4 h-4 text-cyan-400" />
                    <span>Citizen Grievance Submission</span>
                  </h4>
                  <p className="text-xs text-slate-400 mb-4">
                    Direct routing to the public representative's constituency office team.
                  </p>

                  {grievanceSubmitted ? (
                    <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs text-center space-y-2">
                      <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-400" />
                      <p className="font-bold">Grievance Registered Successfully!</p>
                      <p className="text-[11px] text-emerald-400">Tracking ID: GSR-2026-9812</p>
                      <button
                        onClick={() => setGrievanceSubmitted(false)}
                        className="mt-2 text-[10px] text-emerald-300 underline"
                      >
                        Submit another
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                          Citizen Full Name
                        </label>
                        <input
                          type="text"
                          defaultValue="P. Srinivas"
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                          Mandal / Village
                        </label>
                        <input
                          type="text"
                          defaultValue="Bhupalpally Mandal"
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                          Issue Category
                        </label>
                        <select className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white">
                          <option>Roads &amp; Rural Connectivity</option>
                          <option>Drinking Water Supply</option>
                          <option>Educational Scholarship Aid</option>
                          <option>Agriculture &amp; Irrigation</option>
                        </select>
                      </div>
                      <button
                        onClick={() => setGrievanceSubmitted(true)}
                        className="w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase font-mono transition-colors"
                      >
                        Submit Grievance to Office
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );

      case 'basanthi-foundation':
        return (
          <div className="w-full min-h-full bg-slate-950 text-slate-100 font-sans pb-12">
            <header className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400 flex items-center justify-center font-bold text-xs text-emerald-400">
                  BF
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-tight">BASANTHI FOUNDATION</h4>
                  <p className="text-[10px] text-emerald-400">Non-Profit Philanthropic Trust</p>
                </div>
              </div>
              <button
                onClick={() => setDonationImpact((prev) => (prev >= 15000 ? 2500 : prev + 2500))}
                className="px-3 py-1 rounded-md bg-emerald-500 text-slate-950 text-xs font-bold uppercase font-mono"
              >
                Donate ₹{donationImpact}
              </button>
            </header>

            <div className="p-4 sm:p-6 space-y-6">
              <div className="rounded-2xl p-6 bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/20 text-center">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono uppercase tracking-wider mb-2 inline-block">
                  Mission: Uplifting Every Deserving Child
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  Transforming Lives with Education, Healthcare &amp; Nutrition
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Over 10,000+ lives positively touched through free health screening camps and schooling support programs.
                </p>
              </div>

              {/* Impact Visualizer */}
              <div className="rounded-xl p-4 bg-slate-900 border border-slate-800">
                <h4 className="text-xs font-mono uppercase text-emerald-400 mb-2">
                  Interactive Impact Calculator
                </h4>
                <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
                  <span>Selected Contribution: ₹{donationImpact.toLocaleString()}</span>
                  <span className="text-emerald-400 font-bold">
                    Provides {Math.floor(donationImpact / 500)} full school kits &amp; meals
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (donationImpact / 15000) * 100)}%` }}
                  />
                </div>
              </div>

              {/* 3 Mission Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { title: 'Free Medical Camps', stat: '45+ Held', desc: 'Diagnostic tests and medicines supplied free.' },
                  { title: 'Scholarships for Girls', stat: '1,200+ Aided', desc: 'Sponsoring higher education tuition.' },
                  { title: 'Emergency Relief', stat: '100% Direct', desc: 'Immediate food distribution in crisis.' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
                    <div className="text-emerald-400 font-mono text-xs font-bold mb-1">{item.stat}</div>
                    <div className="text-xs font-bold text-white mb-1">{item.title}</div>
                    <div className="text-[11px] text-slate-400">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'premium-advocate-portfolio':
      default:
        return (
          <div className="w-full min-h-full bg-slate-950 text-slate-100 font-sans pb-12">
            <header className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-sky-500/20 border border-sky-400 flex items-center justify-center font-bold text-xs text-sky-400">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-tight">Advocate &amp; Legal Chambers</h4>
                  <p className="text-[10px] text-sky-400">High Court &amp; Appellate Counsel</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-500/30">
                Confidential Practice
              </span>
            </header>

            <div className="p-4 sm:p-6 space-y-6">
              <div className="rounded-2xl p-6 bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20">
                <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-400 text-[10px] font-mono uppercase tracking-wider mb-2 inline-block">
                  Practice Excellence &amp; Precedent
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  High-Stakes Legal Representation with Discretion &amp; Rigor
                </h3>
                <p className="text-xs text-slate-300 max-w-lg">
                  Specializing in Corporate Arbitration, Constitutional Writs, Commercial Litigation, and Complex Civil Disputes.
                </p>
              </div>

              {/* Practice domains */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { domain: 'Constitutional Writs', court: 'High Court' },
                  { domain: 'Corporate Arbitration', court: 'Tribunals' },
                  { domain: 'Commercial Contracts', court: 'Advisory' },
                  { domain: 'Civil Litigation', court: 'Appellate' },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-sky-400 font-mono">{item.court}</div>
                    <div className="text-xs font-bold text-white mt-1">{item.domain}</div>
                  </div>
                ))}
              </div>

              {/* Confidential intake preview */}
              <div className="rounded-xl p-4 bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-white">Need a Legal Assessment?</h5>
                  <p className="text-[11px] text-slate-400">Confidential inquiry form strictly protected under advocate-client privilege.</p>
                </div>
                <button className="px-3.5 py-2 rounded-lg bg-sky-500 text-slate-950 font-bold text-xs uppercase font-mono">
                  Book Intake
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-space-950/85 backdrop-blur-md"
        />

        {/* Modal Main Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="relative w-full max-w-5xl h-[92vh] max-h-[900px] rounded-3xl bg-space-900 border border-white/15 shadow-2xl flex flex-col z-10 overflow-hidden"
        >
          {/* Top Control Bar */}
          <div className="px-4 py-3 bg-space-950 border-b border-white/10 flex items-center justify-between shrink-0">
            {/* Title & URL status */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>

              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-space-900 border border-white/10 text-xs font-mono text-slate-300">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span className="truncate max-w-xs">{project.liveUrl || `${project.id}.com`}</span>
              </div>
            </div>

            {/* Device Frame Viewport Switchers */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-space-900 border border-white/10">
              <button
                onClick={() => setDevice('desktop')}
                className={`p-1.5 rounded-lg transition-colors ${
                  device === 'desktop' ? 'bg-electric-cyan text-space-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
                title="Desktop View"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDevice('tablet')}
                className={`p-1.5 rounded-lg transition-colors ${
                  device === 'tablet' ? 'bg-electric-cyan text-space-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
                title="Tablet View"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDevice('mobile')}
                className={`p-1.5 rounded-lg transition-colors ${
                  device === 'mobile' ? 'bg-electric-cyan text-space-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
                title="Mobile View"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            {/* Actions: Live Link (if configured) & Close */}
            <div className="flex items-center gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-electric-cyan/15 hover:bg-electric-cyan text-electric-cyan hover:text-space-950 text-xs font-mono transition-colors"
                >
                  <span>Open Direct Link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl bg-space-850 hover:bg-space-800 text-slate-400 hover:text-white border border-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Interactive Device Viewport Area */}
          <div className="flex-1 bg-space-950/70 p-3 sm:p-6 overflow-y-auto flex items-center justify-center">
            <motion.div
              layout
              transition={{ duration: 0.3 }}
              className={`h-full transition-all duration-300 rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-slate-950 flex flex-col ${
                device === 'desktop'
                  ? 'w-full max-w-4xl'
                  : device === 'tablet'
                  ? 'w-[640px] max-w-full'
                  : 'w-[375px] max-w-full'
              }`}
            >
              {renderSimulatedApp()}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

