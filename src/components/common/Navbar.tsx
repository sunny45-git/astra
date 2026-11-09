import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles, MessageCircle, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import { AstraLogo } from './AstraLogo';

export const Navbar: React.FC = () => {
  const { data } = usePortfolio();
  const profile = data?.profile;
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ['hero', 'about', 'services', 'projects', 'skills', 'process', 'why-astra', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Process', href: '#process', id: 'process' },
    { label: 'Why ASTRA', href: '#why-astra', id: 'why-astra' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-3 sm:py-4 px-4 sm:px-6 lg:px-8 flex justify-center ${
          isScrolled ? 'backdrop-blur-md bg-space-950/75 border-b border-white/5 py-3' : 'bg-transparent'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo / Brand Name */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="focus:outline-none"
          >
            <AstraLogo size="md" />
          </a>

          {/* Desktop Floating Glass Nav Pill */}
          <nav className="hidden xl:flex items-center px-4 py-1.5 rounded-full bg-space-900/60 border border-white/10 backdrop-blur-xl shadow-glass-sm">
            <ul className="flex items-center gap-0.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.id} className="relative">
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`relative px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all duration-200 block ${
                        isActive
                          ? 'text-white font-semibold'
                          : 'text-slate-400 hover:text-slate-100'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activePill"
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-electric-cyan/20 to-electric-blue/20 border border-electric-cyan/40 shadow-[0_0_12px_rgba(0,245,255,0.25)]"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{link.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Action: Admin Access, Let's Talk CTA & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            {/* Quick Admin Portal Link */}
            <Link
              to="/admin/login"
              className="p-2.5 rounded-xl bg-space-900/60 hover:bg-space-850 border border-white/10 hover:border-electric-cyan/40 text-slate-400 hover:text-electric-cyan transition-colors"
              title="ASTRA Admin Portal"
              aria-label="ASTRA Admin Portal"
            >
              <Lock className="w-4 h-4" />
            </Link>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="relative hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-electric-blue/80 to-electric-cyan/80 hover:from-electric-blue hover:to-electric-cyan shadow-[0_0_20px_-3px_rgba(0,245,255,0.4)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] border border-electric-cyan/40 group overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
              <Sparkles className="w-3.5 h-3.5 text-electric-cyan animate-pulse" />
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-xl bg-space-900/80 border border-white/10 text-slate-300 hover:text-white hover:border-electric-cyan/50 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-electric-cyan" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-20 z-40 xl:hidden rounded-2xl bg-space-900/95 border border-white/10 backdrop-blur-2xl p-6 shadow-2xl flex flex-col gap-4 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                ASTRA Navigation
              </span>
              <Link
                to="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-mono text-electric-cyan flex items-center gap-1 hover:underline"
              >
                <Lock className="w-3 h-3" />
                <span>Admin Login</span>
              </Link>
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-electric-cyan/15 text-electric-cyan border border-electric-cyan/30'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <div className="w-2 h-2 rounded-full bg-electric-cyan shadow-[0_0_8px_#00f5ff]" />}
                  </a>
                );
              })}
            </nav>

            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-electric-blue to-electric-cyan text-white font-semibold text-sm shadow-[0_0_15px_rgba(0,245,255,0.3)]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Let's Talk About Your Project</span>
              </a>
              {profile?.socials.whatsapp && (
                <a
                  href={profile.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-space-850 border border-white/10 text-slate-300 hover:text-white text-xs font-mono"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Direct Chat</span>
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
