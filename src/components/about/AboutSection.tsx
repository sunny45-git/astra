import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { ProfileCard3D } from './ProfileCard3D';
import { Target, Layers, Laptop, MessageSquareHeart, Sparkles } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AboutSection: React.FC = () => {
  const { data } = usePortfolio();
  const profile = data?.profile;

  const pillars = [
    {
      icon: Target,
      title: "My Development Approach",
      description:
        "I view every website as a strategic digital asset rather than just an online placeholder. My focus is on writing clean, modular, and maintainable code tailored precisely to each client's organizational purpose.",
      borderColor: "border-electric-cyan/30",
    },
    {
      icon: Layers,
      title: "Modern Web Technologies",
      description:
        "I leverage the latest modern web ecosystem—React, Vite, Three.js, and Tailwind CSS—to craft lightning-fast interfaces that stay ahead of digital design curves without cumbersome legacy overhead.",
      borderColor: "border-electric-violet/30",
    },
    {
      icon: Laptop,
      title: "Quality & Responsive Design",
      description:
        "Every layout is rigorously engineered from mobile screens to 4K displays. I ensure seamless touch gestures, fluid typography scaling, cross-browser compatibility, and sub-second load times.",
      borderColor: "border-electric-blue/30",
    },
    {
      icon: MessageSquareHeart,
      title: "Client-Centric Collaboration",
      description:
        "Great websites stem from clear understanding. I partner directly with you from discovery to launch, translating complex requirements into an intuitive, high-impact digital presence.",
      borderColor: "border-emerald-500/30",
    },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-space-950 overflow-hidden">
      {/* Background Decorative Mesh */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-electric-cyan/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 rounded-full bg-electric-violet/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          badge="About ASTRA & Founder"
          title="Building Digital Experiences"
          highlight="With Purpose."
          description={profile?.attribution ? `${profile.attribution} — Crafting bespoke, high-performance web solutions for advocates, public representatives, foundations, and modern enterprises.` : "Founded by Sunny Pendela — Crafting bespoke, high-performance web solutions for advocates, public representatives, foundations, and modern enterprises."}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-16">
          {/* Left Column: 3D Interactive Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex justify-center"
          >
            <ProfileCard3D />
          </motion.div>

          {/* Right Column: Professional Introduction & Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6"
          >
            <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-space-900/80 to-space-950/80 border border-white/10 backdrop-blur-xl shadow-glass-md relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Sparkles className="w-24 h-24 text-electric-cyan" />
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-cyan/10 border border-electric-cyan/20 text-xs font-mono text-electric-cyan uppercase tracking-wider mb-4">
                <span>Founder Spotlight • Sunny Pendela</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-5 leading-snug">
                {profile?.subtitle || 'Turning your vision into an authoritative, unforgettable web presence.'}
              </h3>

              <div className="space-y-4 text-slate-300 font-sans text-base leading-relaxed">
                <p>
                  I am <strong className="text-white font-semibold">{profile?.founderName || 'Sunny Pendela'}</strong>, the founder, principal architect, and full-stack developer behind <strong className="text-electric-cyan font-semibold">ASTRA</strong>. Holding a <span className="text-slate-200 font-medium">{profile?.education || 'B.Tech in Computer Science & Engineering'}</span>, I established ASTRA with a distinct mission: to bridge cinematic 3D visual storytelling with resilient, enterprise-grade engineering.
                </p>
                <p>
                  {profile?.bio ||
                    'Specializing in bespoke digital solutions for senior advocates, public representatives, philanthropic foundations, and forward-thinking corporations, I handle the complete engineering lifecycle from concept and 3D experience design to full-stack cloud deployment.'}
                </p>
                <p>
                  At ASTRA, every project is engineered with intentionality. Rather than relying on generic off-the-shelf templates, I build custom-tailored web platforms that deliver sub-second performance, intuitive user experience, and a commanding visual authority that converts visitors into dedicated clients.
                </p>
              </div>

              {/* Direct Strengths */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 mt-6 border-t border-white/10">
                {(profile?.stats || []).map((stat, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="font-display font-bold text-2xl text-gradient-cyan">
                      {stat.value}
                    </span>
                    <span className="text-xs text-slate-400 font-mono mt-1">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* 4 Pillars of Development Approach */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative rounded-2xl p-6 bg-gradient-to-b from-space-900/60 to-space-950/80 border ${pillar.borderColor} backdrop-blur-xl hover:border-electric-cyan/50 transition-all duration-300 group hover:-translate-y-1.5 shadow-glass-sm`}
              >
                <div className="w-12 h-12 rounded-xl bg-space-850/80 border border-white/10 flex items-center justify-center text-electric-cyan mb-5 group-hover:scale-110 group-hover:border-electric-cyan/40 transition-transform">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold font-display text-white mb-2 group-hover:text-electric-cyan transition-colors">
                  {pillar.title}
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
