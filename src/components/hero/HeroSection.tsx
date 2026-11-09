import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Send, Github, Linkedin, MessageCircle, Mail, Twitter, Shield } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { CanvasFallback } from './CanvasFallback';

const HeroCanvas = React.lazy(() =>
  import('./HeroCanvas').then((m) => ({ default: m.HeroCanvas }))
);

export const HeroSection: React.FC = () => {
  const { data } = usePortfolio();
  const hero = data?.hero;
  const profile = data?.profile;

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-space-950"
    >
      {/* 3D Celestial Core Interactive Scene */}
      <Suspense fallback={<CanvasFallback />}>
        <HeroCanvas />
      </Suspense>

      {/* Atmospheric Radial Gradients & Vignette for Readability */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-space-950/40 to-transparent pointer-events-none z-[1]" />
      <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-space-950/90 via-space-950/70 to-transparent pointer-events-none z-[1]" />

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-center min-h-[calc(100vh-6rem)]">
        <div className="max-w-3xl">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-space-900/80 border border-electric-cyan/25 backdrop-blur-md text-xs sm:text-sm font-mono uppercase tracking-widest text-electric-cyan mb-6 shadow-[0_0_20px_-5px_rgba(0,245,255,0.3)]"
          >
            <span className="w-2 h-2 rounded-full bg-electric-cyan animate-pulse shadow-[0_0_8px_#00f5ff]" />
            <span>{hero?.eyebrow || 'PREMIUM DIGITAL EXPERIENCES & WEB ARCHITECTURE'}</span>
          </motion.div>

          {/* Large ASTRA Wordmark & Animated Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono uppercase tracking-widest text-electric-cyan font-bold">
                ASTRA
              </span>
              <span className="h-px w-8 bg-electric-cyan/40" />
              <span className="text-xs font-mono text-slate-300">
                Founded by Sunny Pendela
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-display tracking-tight text-white leading-[1.04]">
              {hero?.brandName || 'ASTRA'}
              <span className="text-gradient-cyan block sm:inline sm:ml-4 text-3xl sm:text-5xl lg:text-6xl font-extrabold font-sans">
                {hero?.tagline || 'Ideas Beyond Limits.'}
              </span>
            </h1>
          </motion.div>

          {/* Supporting Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl text-slate-300 leading-relaxed font-sans max-w-2xl mb-10"
          >
            {hero?.description ||
              'I build world-class digital experiences and high-performance web applications that help ambitious leaders, legal practices, and organizations dominate their digital space.'}
          </motion.p>

          {/* Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <button
              onClick={() => handleScrollTo('projects')}
              className="relative group px-8 py-4 rounded-full font-semibold text-xs sm:text-sm uppercase tracking-wider text-space-950 bg-gradient-to-r from-electric-cyan to-electric-sky hover:to-white shadow-[0_0_25px_rgba(0,245,255,0.4)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center gap-2.5 overflow-hidden cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2 font-bold">
                <span>{hero?.ctaPrimaryText || 'Explore My Work'}</span>
                <Sparkles className="w-4 h-4 text-space-950" />
              </span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            </button>

            <button
              onClick={() => handleScrollTo('contact')}
              className="px-8 py-4 rounded-full font-semibold text-xs sm:text-sm uppercase tracking-wider text-slate-200 bg-space-900/60 hover:bg-space-850/80 border border-white/15 hover:border-electric-cyan/40 backdrop-blur-md shadow-glass-sm transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center gap-2.5 cursor-pointer"
            >
              <span>{hero?.ctaSecondaryText || "Let's Collaborate"}</span>
              <Send className="w-4 h-4 text-electric-cyan" />
            </button>
          </motion.div>

          {/* Social Links & Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-slate-400">
              Direct Channels:
            </div>
            <div className="flex items-center gap-3">
              {profile?.socials.github && (
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-space-900/60 border border-white/10 text-slate-400 hover:text-white hover:border-electric-cyan/40 hover:bg-space-850 transition-all"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {profile?.socials.linkedin && (
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-space-900/60 border border-white/10 text-slate-400 hover:text-white hover:border-electric-cyan/40 hover:bg-space-850 transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {profile?.socials.whatsapp && (
                <a
                  href={profile.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-space-900/60 border border-white/10 text-emerald-400 hover:text-emerald-300 hover:border-emerald-500/40 hover:bg-space-850 transition-all flex items-center gap-1.5 text-xs font-mono"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>
              )}
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="p-2.5 rounded-xl bg-space-900/60 border border-white/10 text-slate-400 hover:text-white hover:border-electric-cyan/40 hover:bg-space-850 transition-all"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>

            <div className="ml-auto hidden md:flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{hero?.availabilityText || 'Available for Q1 / Q2 Projects'}</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
          onClick={() => handleScrollTo('about')}
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
            Scroll to Explore
          </span>
          <div className="w-5 h-9 rounded-full border border-white/20 flex items-start justify-center p-1 backdrop-blur-xs">
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-electric-cyan shadow-[0_0_6px_#00f5ff]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
