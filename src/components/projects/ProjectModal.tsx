import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Sparkles, Layers, ShieldCheck, ArrowRight, Laptop } from 'lucide-react';
import { Project } from '../../types';
import { ProjectBrowserMockup } from './ProjectBrowserMockup';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenLiveDemo: (project: Project) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenLiveDemo,
}) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-space-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-space-900 to-space-950 border border-white/15 backdrop-blur-2xl shadow-2xl z-10 my-8 overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Top Decorative Glow */}
          <div className="absolute -top-24 right-0 w-72 h-72 rounded-full bg-electric-cyan/20 blur-[100px] pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl bg-space-850 hover:bg-space-800 text-slate-400 hover:text-white border border-white/10 transition-colors z-20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <span className="inline-block text-xs font-mono uppercase tracking-widest text-electric-cyan mb-2">
              {project.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
              {project.title}
            </h3>
            <span className="text-sm text-slate-400 font-mono">
              Client Category: {project.clientType}
            </span>
          </div>

          {/* Browser Mockup Showcase */}
          <div className="mb-6">
            <ProjectBrowserMockup project={project} />
          </div>

          {/* Detailed Narrative */}
          <div className="space-y-4 mb-8 text-slate-300 font-sans leading-relaxed text-sm sm:text-base">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Project Architecture &amp; Execution
            </h4>
            <p>{project.fullDescription}</p>
          </div>

          {/* Metrics & Statistics */}
          {project.stats && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {project.stats.map((s, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-space-850/60 border border-white/5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                    {s.label}
                  </span>
                  <span className="text-sm font-bold text-electric-cyan">
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Key Features Delivered */}
          <div className="mb-8">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-electric-cyan" />
              <span>Key Features &amp; Engineering Highlights</span>
            </h4>
            <div className="space-y-2">
              {project.keyFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-space-850/40 border border-white/5 text-xs text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-electric-cyan shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Stack */}
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
              Technologies Used:
            </span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-electric-cyan"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Configurable URL info note */}
          <div className="p-3.5 rounded-xl bg-space-850/40 border border-white/10 text-xs text-slate-400 font-mono flex items-center justify-between mb-8">
            <span className="truncate">URL: {project.liveUrl || 'Configured via projects.ts'}</span>
            <span className="text-emerald-400 text-[11px] shrink-0">Centralized Data</span>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-white/10">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-mono text-slate-400 hover:text-white transition-colors"
            >
              Back to Portfolio
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenLiveDemo(project);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-space-950 bg-gradient-to-r from-electric-cyan to-electric-sky hover:to-white shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all flex items-center justify-center gap-2"
            >
              <span>Launch Live Demo</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

