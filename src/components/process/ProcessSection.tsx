import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { usePortfolio } from '../../context/PortfolioContext';
import { CheckCircle2, Compass, Palette, Code2, ShieldCheck, Rocket, Sparkles } from 'lucide-react';

const stepIcons: Record<string, React.FC<{ className?: string }>> = {
  '01': Compass,
  '02': Palette,
  '03': Code2,
  '04': ShieldCheck,
  '05': Rocket,
};

export const ProcessSection: React.FC = () => {
  const { data } = usePortfolio();
  const processSteps = data?.process || [];

  return (
    <section id="process" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-space-950 overflow-hidden">
      {/* Background Subtle Mesh */}
      <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full bg-electric-cyan/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          badge="Execution Lifecycle"
          title="From Idea"
          highlight="To Launch."
          description="A structured, transparent 5-stage engineering methodology ensuring predictability, rapid delivery, and immaculate quality."
        />

        {/* Timeline Container */}
        <div className="relative">
          {/* Glowing Connection Line (Desktop) */}
          <div className="hidden xl:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-electric-cyan/20 via-electric-blue/40 to-electric-violet/30 -translate-y-12 z-0" />

          {/* 5 Process Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 relative z-10">
            {processSteps.map((step, index) => {
              const StepIcon = stepIcons[step.step] || Sparkles;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.12 }}
                  className="relative rounded-3xl p-6 bg-gradient-to-b from-space-900/80 via-space-900/60 to-space-950/90 border border-white/10 hover:border-electric-cyan/40 backdrop-blur-xl shadow-glass-md group transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
                >
                  {/* Step Number Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-display font-black text-3xl text-gradient-cyan opacity-80 group-hover:opacity-100 transition-opacity">
                      {step.step}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-space-850 border border-white/10 flex items-center justify-center text-electric-cyan group-hover:scale-110 group-hover:border-electric-cyan/50 shadow-[0_0_12px_rgba(0,245,255,0.2)] transition-all">
                      <StepIcon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    {/* Phase Title */}
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
                      {step.number}
                    </span>
                    <h3 className="text-lg font-bold font-display text-white mb-1.5 group-hover:text-electric-cyan transition-colors">
                      {step.title}
                    </h3>

                    {/* Subtitle */}
                    <div className="text-[11px] font-mono text-electric-cyan mb-3">
                      {step.subtitle}
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-300 font-sans leading-relaxed mb-5">
                      {step.description}
                    </p>

                    {/* Stage Tasks List */}
                    <div className="space-y-1.5 pt-3 border-t border-white/5 mb-5">
                      {step.tasks.map((task, tIdx) => (
                        <div key={tIdx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-electric-cyan shrink-0 mt-0.5" />
                          <span className="leading-tight">{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stage Deliverable */}
                  <div className="pt-3 border-t border-white/10">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                      Milestone:
                    </span>
                    <span className="text-xs font-semibold text-slate-200">
                      {step.deliverable}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
