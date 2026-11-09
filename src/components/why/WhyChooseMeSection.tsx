import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { usePortfolio } from '../../context/PortfolioContext';
import { Sparkles, Smartphone, Cpu, Network, Zap, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Sparkles,
  Smartphone,
  Cpu,
  Network,
  Zap,
  MessageSquare,
  ShieldCheck,
};

export const WhyChooseMeSection: React.FC = () => {
  const { data } = usePortfolio();
  const reasons = data?.whyChooseUs || [];

  return (
    <section id="why-astra" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-space-950 overflow-hidden">
      {/* Background Decorative Mesh */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-electric-violet/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          badge="Direct Client Value"
          title="Why Choose"
          highlight="ASTRA?"
          description="A direct partnership with an experienced digital architect committed to quality, performance, and long-term client success."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((reason, index) => {
            const Icon = iconMap[reason.icon] || Sparkles;
            return (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative rounded-3xl p-7 bg-gradient-to-b from-space-900/80 via-space-900/50 to-space-950/80 border border-white/10 hover:border-electric-cyan/40 backdrop-blur-xl shadow-glass-md group transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
              >
                {/* Glow on hover */}
                <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-electric-cyan/15 blur-[50px] pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity duration-300" />

                <div>
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-space-850/80 border border-white/10 flex items-center justify-center text-electric-cyan mb-5 group-hover:scale-110 group-hover:border-electric-cyan/50 group-hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold font-display text-white mb-3 group-hover:text-electric-cyan transition-colors">
                    {reason.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-300 font-sans leading-relaxed mb-6">
                    {reason.description}
                  </p>
                </div>

                {/* Practical client benefit highlight */}
                <div className="pt-4 border-t border-white/5 flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="font-medium text-slate-200">{reason.benefit}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
