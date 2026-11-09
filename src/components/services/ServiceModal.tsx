import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight, Sparkles, Target } from 'lucide-react';
import { Service } from '../../types';

interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
  onEnquire: (serviceTitle: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onEnquire,
}) => {
  if (!service) return null;

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
          className="relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-space-900 to-space-950 border border-white/15 backdrop-blur-2xl shadow-2xl z-10 my-8 overflow-hidden"
        >
          {/* Top Decorative Glow */}
          <div className="absolute -top-24 right-0 w-64 h-64 rounded-full bg-electric-cyan/20 blur-[90px] pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl bg-space-850 hover:bg-space-800 text-slate-400 hover:text-white border border-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="mb-6">
            <span className="inline-block text-xs font-mono uppercase tracking-widest text-electric-cyan mb-2">
              {service.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
              {service.title}
            </h3>
          </div>

          {/* Detailed Description */}
          <p className="text-base text-slate-300 leading-relaxed font-sans mb-6">
            {service.detailedDescription}
          </p>

          {/* Ideal For Target */}
          <div className="p-4 rounded-2xl bg-space-850/70 border border-white/10 mb-6 flex items-start gap-3">
            <Target className="w-5 h-5 text-electric-cyan shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                Ideal Organization &amp; Clients:
              </span>
              <span className="text-sm font-medium text-slate-200">
                {service.idealFor}
              </span>
            </div>
          </div>

          {/* Deliverables List */}
          <div className="mb-8">
            <h4 className="text-sm font-mono uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-electric-cyan" />
              <span>What I Deliver With This Solution</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-space-850/40 border border-white/5 text-xs text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-electric-cyan shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Badges */}
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
              Technologies &amp; Architecture:
            </span>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-electric-cyan"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-white/10">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-mono text-slate-400 hover:text-white transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onEnquire(service.title);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-space-950 bg-gradient-to-r from-electric-cyan to-electric-sky hover:to-white shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all flex items-center justify-center gap-2"
            >
              <span>Enquire For This Solution</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

