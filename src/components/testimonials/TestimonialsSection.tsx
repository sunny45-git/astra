import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { usePortfolio } from '../../context/PortfolioContext';
import { Star, Quote, ShieldCheck, Building } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { data } = usePortfolio();
  const testimonials = data?.testimonials || [];

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-space-950 overflow-hidden">
      {/* Background Decorative Mesh */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-electric-cyan/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          badge="Verified Client Feedback"
          title="Endorsements"
          highlight="&amp; Trust."
          description="Direct feedback from legal counsel, public representatives, and organizational leaders who partnered with ASTRA."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {testimonials.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="relative rounded-3xl p-8 bg-gradient-to-b from-space-900/80 via-space-900/60 to-space-950/90 border border-white/10 hover:border-electric-cyan/40 backdrop-blur-xl shadow-glass-md flex flex-col justify-between group transition-all duration-300 hover:-translate-y-2"
            >
              {/* Subtle quote accent */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-16 h-16 text-electric-cyan" />
              </div>

              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-6 text-amber-400">
                  {Array.from({ length: test.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Testimonial Quote */}
                <p className="text-slate-300 text-sm leading-relaxed font-sans mb-8 italic relative z-10">
                  "{test.quote}"
                </p>
              </div>

              {/* Client Info */}
              <div className="pt-5 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-electric-cyan transition-colors">
                    {test.clientName}
                  </h4>
                  <p className="text-xs text-slate-400 font-sans">
                    {test.clientRole}
                  </p>
                  <p className="text-[11px] text-electric-cyan font-mono mt-0.5 flex items-center gap-1">
                    <Building className="w-3 h-3" />
                    <span>{test.organization}</span>
                  </p>
                </div>

                {test.projectRef && (
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-400 shrink-0">
                    {test.projectRef}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

