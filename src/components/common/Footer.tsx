import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { AstraLogo } from './AstraLogo';
import { Github, Linkedin, MessageCircle, Mail, ArrowUp, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const { data } = usePortfolio();
  const profile = data?.profile;
  const services = data?.services || [];
  const settings = data?.settings;
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Process', href: '#process' },
    { label: 'Why ASTRA', href: '#why-astra' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative bg-space-950 border-t border-white/10 pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden text-slate-300">
      {/* Subtle Ambient Cosmic Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-electric-cyan/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <AstraLogo size="md" />

            <p className="text-sm text-slate-400 font-sans leading-relaxed max-w-sm">
              {settings?.footerText ||
                'Ideas Beyond Limits. Architecting immersive digital experiences for leaders, advocates, and forward-thinking enterprises.'}
            </p>

            <div className="flex items-center gap-3 pt-2">
              {profile?.socials.github && (
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-space-900 border border-white/10 hover:border-electric-cyan/50 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {profile?.socials.linkedin && (
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-space-900 border border-white/10 hover:border-electric-blue/50 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {profile?.socials.whatsapp && (
                <a
                  href={profile.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-space-900 border border-emerald-500/30 hover:border-emerald-400 flex items-center justify-center text-emerald-400 hover:text-emerald-300 transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              )}
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="w-9 h-9 rounded-xl bg-space-900 border border-white/10 hover:border-electric-cyan/50 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-slate-400 hover:text-electric-cyan transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution Offerings */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 mb-4">
              Specialized Solutions
            </h4>
            <ul className="space-y-2 text-sm">
              {services.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    onClick={(e) => handleNavClick(e, '#services')}
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-electric-cyan" />
                    <span>{s.title}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-white/5">
              <Link
                to="/admin/login"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-electric-cyan transition-colors"
              >
                <Lock className="w-3.5 h-3.5 text-electric-cyan" />
                <span>Private Admin Portal</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; {currentYear} {settings?.copyrightText || 'ASTRA. Founded by Sunny Pendela. All rights reserved.'} Engineered with 3D Celestial Aesthetics.
          </div>

          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-space-900 border border-white/10 hover:border-electric-cyan/40 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-electric-cyan" />
          </button>
        </div>
      </div>
    </footer>
  );
};
