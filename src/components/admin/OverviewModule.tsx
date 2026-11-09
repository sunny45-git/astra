import React from 'react';
import { motion } from 'framer-motion';
import {
  FolderGit2,
  Layers,
  Inbox,
  Star,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  ExternalLink
} from 'lucide-react';

interface OverviewModuleProps {
  stats: {
    totalProjects: number;
    publishedProjects: number;
    draftProjects: number;
    totalServices: number;
    totalEnquiries: number;
    newEnquiries: number;
    readEnquiries: number;
    completedEnquiries: number;
    totalTestimonials: number;
  };
  onNavigateTab: (tabId: string) => void;
}

export const OverviewModule: React.FC<OverviewModuleProps> = ({ stats, onNavigateTab }) => {
  const cards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      subtext: `${stats.publishedProjects} Published · ${stats.draftProjects} Drafts`,
      icon: FolderGit2,
      color: 'from-cyan-500/20 to-blue-500/20',
      border: 'border-cyan-500/30',
      textColor: 'text-cyan-400',
      tab: 'projects',
    },
    {
      title: 'Active Services',
      value: stats.totalServices,
      subtext: 'Specialized Client Offerings',
      icon: Layers,
      color: 'from-violet-500/20 to-purple-500/20',
      border: 'border-violet-500/30',
      textColor: 'text-violet-400',
      tab: 'services',
    },
    {
      title: 'Client Enquiries',
      value: stats.totalEnquiries,
      subtext: `${stats.newEnquiries} New · ${stats.readEnquiries} In Review`,
      icon: Inbox,
      color: 'from-emerald-500/20 to-teal-500/20',
      border: 'border-emerald-500/30',
      textColor: 'text-emerald-400',
      tab: 'enquiries',
    },
    {
      title: 'Testimonials',
      value: stats.totalTestimonials,
      subtext: 'Client Endorsements & Proof',
      icon: Star,
      color: 'from-amber-500/20 to-orange-500/20',
      border: 'border-amber-500/30',
      textColor: 'text-amber-400',
      tab: 'testimonials',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-space-900 via-space-850 to-space-900 border border-white/10 backdrop-blur-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-cyan/15 border border-electric-cyan/30 text-xs font-mono text-electric-cyan mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ASTRA Command Center Active</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-2">
            Welcome to Your Digital Brand Manager
          </h2>
          <p className="text-sm text-slate-300 font-sans leading-relaxed">
            All modifications saved here instantly update your live public portfolio without requiring code redeployments.
          </p>
        </div>

        <div className="absolute top-1/2 right-6 -translate-y-1/2 hidden lg:flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-space-800 hover:bg-space-700 border border-white/10 text-xs font-mono text-slate-200 hover:text-white flex items-center gap-2 transition-colors"
          >
            <span>Live Portfolio</span>
            <ExternalLink className="w-3.5 h-3.5 text-electric-cyan" />
          </a>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.title}
              whileHover={{ y: -4 }}
              onClick={() => onNavigateTab(c.tab)}
              className={`rounded-2xl p-6 bg-gradient-to-b ${c.color} border ${c.border} backdrop-blur-xl shadow-glass-sm cursor-pointer transition-all flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  {c.title}
                </span>
                <div className={`p-2 rounded-xl bg-space-950/60 border border-white/10 ${c.textColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div>
                <div className={`text-3xl sm:text-4xl font-extrabold font-display ${c.textColor} mb-1`}>
                  {c.value}
                </div>
                <div className="text-xs text-slate-300 font-sans">{c.subtext}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Action Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => onNavigateTab('projects')}
          className="p-6 rounded-2xl bg-space-900/80 border border-white/10 hover:border-electric-cyan/40 transition-colors cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-electric-cyan/15 border border-electric-cyan/30 flex items-center justify-center text-electric-cyan mb-3 group-hover:scale-110 transition-transform">
            <FolderGit2 className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-white mb-1 group-hover:text-electric-cyan transition-colors">
            Manage Portfolio Projects
          </h4>
          <p className="text-xs text-slate-400 mb-4">
            Publish new works, upload screenshots, or reorder showcase items.
          </p>
          <span className="text-xs font-mono text-electric-cyan flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>Open Projects Module</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div
          onClick={() => onNavigateTab('enquiries')}
          className="p-6 rounded-2xl bg-space-900/80 border border-white/10 hover:border-emerald-500/40 transition-colors cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
            <Inbox className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
            Review Client Enquiries
          </h4>
          <p className="text-xs text-slate-400 mb-4">
            {stats.newEnquiries > 0
              ? `You have ${stats.newEnquiries} unread project enquiry waiting for your review.`
              : 'All recent client enquiries have been reviewed.'}
          </p>
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>View Client Messages</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div
          onClick={() => onNavigateTab('profile')}
          className="p-6 rounded-2xl bg-space-900/80 border border-white/10 hover:border-violet-500/40 transition-colors cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400 mb-3 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-white mb-1 group-hover:text-violet-400 transition-colors">
            Profile &amp; Contact Channels
          </h4>
          <p className="text-xs text-slate-400 mb-4">
            Update your bio, WhatsApp phone number, education, and location.
          </p>
          <span className="text-xs font-mono text-violet-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>Edit Profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};

