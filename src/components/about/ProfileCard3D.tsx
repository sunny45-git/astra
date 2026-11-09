import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MapPin, GraduationCap, Github, Linkedin, MessageCircle, Mail, Sparkles, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const ProfileCard3D: React.FC = () => {
  const { data } = usePortfolio();
  const profile = data?.profile;

  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y / 15);
    setRotateY(x / 15);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="w-full max-w-md mx-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={cardRef}
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        className="relative rounded-3xl p-8 bg-gradient-to-b from-space-900/90 via-space-900/75 to-space-950/95 border border-white/10 backdrop-blur-2xl shadow-glass-lg overflow-hidden group"
      >
        {/* Subtle Ambient Backlight Glow */}
        <div className="absolute -top-24 -right-24 w-52 h-52 rounded-full bg-electric-cyan/20 blur-[80px] pointer-events-none group-hover:bg-electric-cyan/30 transition-all duration-500" />
        <div className="absolute -bottom-24 -left-24 w-52 h-52 rounded-full bg-electric-violet/20 blur-[80px] pointer-events-none group-hover:bg-electric-violet/30 transition-all duration-500" />

        {/* Card Header: Brand Emblem & Status */}
        <div className="flex items-start justify-between mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-space-850 to-space-900 border border-electric-cyan/40 flex items-center justify-center shadow-[0_0_20px_-3px_rgba(0,245,255,0.3)] overflow-hidden">
              {profile?.avatar && profile.avatar !== '/astra-avatar.png' ? (
                <img src={profile.avatar} alt="Founder Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <span className="font-display font-extrabold text-3xl text-gradient-cyan">
                    SP
                  </span>
                  <span className="text-[9px] font-mono text-electric-cyan tracking-widest uppercase">
                    ASTRA
                  </span>
                </div>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-space-950 border-2 border-space-950 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
              ASTRA Founder
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-medium mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {profile?.status || 'Available for Projects'}
            </span>
          </div>
        </div>

        {/* Founder & Brand Identity Details */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-electric-cyan/10 border border-electric-cyan/20 text-[10px] font-mono text-electric-cyan uppercase tracking-wider mb-2">
            <span>ASTRA Lead Architect</span>
          </div>
          <h3 className="text-2xl font-bold font-display text-white mb-0.5">
            {profile?.founderName || 'Sunny Pendela'}
          </h3>
          <p className="text-xs text-electric-cyan font-mono mb-3">
            {profile?.founderTitle || profile?.title || 'Founder & Principal Web Architect'}
          </p>

          <div className="flex flex-col gap-1.5 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-electric-cyan shrink-0" />
              <span>{profile?.location || 'Hyderabad, India / Global'}</span>
            </div>
            {profile?.education && (
              <div className="flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-electric-violet shrink-0" />
                <span>{profile.education}</span>
              </div>
            )}
          </div>
        </div>

        {/* Founder Professional Links */}
        <div className="flex items-center gap-2 pt-4 pb-4 border-t border-white/10 mb-4">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mr-1">
            Connect:
          </span>
          {profile?.socials.github && (
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-space-850 hover:bg-space-800 border border-white/10 hover:border-electric-cyan/40 text-slate-300 hover:text-white transition-all"
              aria-label="Sunny Pendela GitHub"
              title="GitHub Profile"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          )}
          {profile?.socials.linkedin && (
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-space-850 hover:bg-space-800 border border-white/10 hover:border-electric-cyan/40 text-slate-300 hover:text-white transition-all"
              aria-label="Sunny Pendela LinkedIn"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          )}
          {profile?.socials.whatsapp && (
            <a
              href={profile.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-space-850 hover:bg-space-800 border border-white/10 hover:border-emerald-500/40 text-emerald-400 transition-all"
              aria-label="WhatsApp Sunny Pendela"
              title="Direct WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </a>
          )}
          {profile?.email && (
            <a
              href={`mailto:${profile.email}`}
              className="p-2 rounded-xl bg-space-850 hover:bg-space-800 border border-white/10 hover:border-electric-cyan/40 text-slate-300 hover:text-white transition-all"
              aria-label="Email Sunny Pendela"
              title="Direct Email"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Developer Core Competencies */}
        <div className="space-y-2.5 pt-4 border-t border-white/10 mb-5 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-electric-cyan shrink-0" />
            <span>Founded ASTRA to build exceptional digital experiences</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-electric-cyan shrink-0" />
            <span>High-Fidelity 3D Web &amp; Responsive Civic Platforms</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-electric-cyan shrink-0" />
            <span>End-to-End Full-Stack Architecture (Node, Express, Mongo)</span>
          </div>
        </div>

        {/* Tech Stack Mini Pills */}
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
          {['React', 'Three.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'].map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
