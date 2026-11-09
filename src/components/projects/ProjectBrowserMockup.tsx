import React from 'react';
import { Lock, ExternalLink, ShieldCheck, Heart, User, Scale, Award } from 'lucide-react';
import { Project } from '../../types';

interface ProjectBrowserMockupProps {
  project: Project;
}

export const ProjectBrowserMockup: React.FC<ProjectBrowserMockupProps> = ({ project }) => {
  // Generate bespoke aesthetic mockup interiors tailored to the specific project domain
  const renderInterior = () => {
    switch (project.id) {
      case 'gandra-sathyanarayana-rao':
        return (
          <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-space-900 via-space-950 to-space-900 text-slate-200">
            {/* Header banner */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-electric-cyan/20 border border-electric-cyan/40 flex items-center justify-center text-electric-cyan text-[10px] font-bold">
                  GSR
                </div>
                <span className="text-xs font-bold text-white tracking-wide">
                  Gandra Sathyanarayana Rao
                </span>
              </div>
              <div className="flex gap-2 text-[10px] font-mono text-slate-400">
                <span className="text-electric-cyan">Initiatives</span>
                <span>Constituency</span>
                <span>Press</span>
              </div>
            </div>

            {/* Mock Content Body */}
            <div className="my-auto py-3 space-y-2.5">
              <div className="inline-block px-2 py-0.5 rounded bg-electric-cyan/15 text-electric-cyan text-[9px] font-mono uppercase">
                Official Constituency Portal
              </div>
              <h4 className="text-sm sm:text-base font-bold font-display text-white leading-tight">
                Empowering Communities Through Transparent Governance &amp; Action
              </h4>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                Official development records, community welfare works, rural infrastructure progress, and citizen grievance outreach.
              </p>

              {/* Progress metric bars */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                  <div className="text-[10px] text-slate-400">Welfare Funds</div>
                  <div className="text-xs font-bold text-electric-cyan">100% Tracked</div>
                </div>
                <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                  <div className="text-[10px] text-slate-400">Grievances</div>
                  <div className="text-xs font-bold text-emerald-400">Direct Route</div>
                </div>
                <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                  <div className="text-[10px] text-slate-400">Updates</div>
                  <div className="text-xs font-bold text-slate-200">Live Press</div>
                </div>
              </div>
            </div>

            {/* Bottom status */}
            <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 pt-2 border-t border-white/5">
              <span>Bilingual: English &amp; Regional</span>
              <span className="text-electric-cyan">SSL Secured Citizen Portal</span>
            </div>
          </div>
        );

      case 'gandra-venkata-ramana-reddy':
        return (
          <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-space-900 via-indigo-950/40 to-space-950 text-slate-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-electric-blue/20 border border-electric-blue/40 flex items-center justify-center text-electric-blue text-[10px] font-bold">
                  GVR
                </div>
                <span className="text-xs font-bold text-white tracking-wide">
                  Gandra Venkata Ramana Reddy
                </span>
              </div>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-electric-blue/20 text-electric-blue font-mono">
                Public Leader
              </span>
            </div>

            <div className="my-auto py-3 space-y-2">
              <span className="text-[9px] font-mono uppercase tracking-widest text-electric-blue">
                Constituency Leadership &amp; Milestones
              </span>
              <h4 className="text-sm sm:text-base font-bold font-display text-white leading-tight">
                Decades of Dedicated Public Service &amp; Infrastructure Transformation
              </h4>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                A modern political communication hub showcasing public milestones, welfare distribution schedules, and constituency progress.
              </p>

              <div className="flex items-center gap-3 pt-2">
                <div className="px-3 py-1.5 rounded-lg bg-electric-blue/15 border border-electric-blue/30 text-xs text-white font-medium flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-electric-blue" />
                  <span>Public Milestones</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300">
                  Constituency Map
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 pt-2 border-t border-white/5">
              <span>Official Media Room</span>
              <span>Ultra-fast 99 Mobile Score</span>
            </div>
          </div>
        );

      case 'madhu-sudhana-chary':
        return (
          <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-space-900 via-purple-950/30 to-space-950 text-slate-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-electric-violet/20 border border-electric-violet/40 flex items-center justify-center text-electric-violet text-[10px] font-bold">
                  MSC
                </div>
                <span className="text-xs font-bold text-white tracking-wide">
                  Madhu Sudhana Chary
                </span>
              </div>
              <span className="text-[9px] font-mono text-electric-violet">Executive Archive</span>
            </div>

            <div className="my-auto py-3 space-y-2">
              <span className="text-[9px] font-mono uppercase tracking-widest text-electric-violet">
                Leadership Legacy &amp; Speeches
              </span>
              <h4 className="text-sm sm:text-base font-bold font-display text-white leading-tight">
                Distinguished Public Service, Legislative Insights &amp; Vision
              </h4>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                Comprehensive biographical archive, parliamentary contributions, keynote addresses, and high-resolution photo archives.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="p-2 rounded bg-white/5 text-[10px] flex items-center gap-2 text-slate-300">
                  <User className="w-3.5 h-3.5 text-electric-violet" />
                  <span>Biographical Records</span>
                </div>
                <div className="p-2 rounded bg-white/5 text-[10px] flex items-center gap-2 text-slate-300">
                  <Award className="w-3.5 h-3.5 text-electric-violet" />
                  <span>Keynote Addresses</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 pt-2 border-t border-white/5">
              <span>Distinguished Personal Identity</span>
              <span>Sub-Second Load</span>
            </div>
          </div>
        );

      case 'basanthi-foundation':
        return (
          <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-space-900 via-emerald-950/30 to-space-950 text-slate-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-[10px] font-bold">
                  BF
                </div>
                <span className="text-xs font-bold text-white tracking-wide">
                  BASANTHI FOUNDATION
                </span>
              </div>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                NGO / Trust
              </span>
            </div>

            <div className="my-auto py-3 space-y-2">
              <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400">
                Social Welfare &amp; Community Empowerment
              </span>
              <h4 className="text-sm sm:text-base font-bold font-display text-white leading-tight">
                Empowering Underprivileged Lives Through Healthcare, Education &amp; Relief
              </h4>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                Transparent impact dashboards, medical camp registrations, volunteer recruitment conduits, and CSR partnership portals.
              </p>

              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="p-2 rounded bg-emerald-950/40 border border-emerald-500/20 text-center">
                  <div className="text-[9px] text-slate-400">Lives Touched</div>
                  <div className="text-xs font-bold text-emerald-400">10,000+</div>
                </div>
                <div className="p-2 rounded bg-emerald-950/40 border border-emerald-500/20 text-center">
                  <div className="text-[9px] text-slate-400">Free Camps</div>
                  <div className="text-xs font-bold text-emerald-400">45+ Held</div>
                </div>
                <div className="p-2 rounded bg-emerald-950/40 border border-emerald-500/20 text-center">
                  <div className="text-[9px] text-slate-400">Transparency</div>
                  <div className="text-xs font-bold text-emerald-400">Audited</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 pt-2 border-t border-white/5">
              <span>Donor Trust &amp; CSR Ready</span>
              <span className="text-emerald-400">Verified Impact</span>
            </div>
          </div>
        );

      case 'premium-advocate-portfolio':
      default:
        return (
          <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-space-900 via-sky-950/40 to-space-950 text-slate-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-electric-cyan/20 border border-electric-cyan/40 flex items-center justify-center text-electric-cyan text-[10px] font-bold">
                  LEX
                </div>
                <span className="text-xs font-bold text-white tracking-wide">
                  High Court Advocate &amp; Counsel
                </span>
              </div>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-electric-cyan/20 text-electric-cyan font-mono">
                Legal Practice
              </span>
            </div>

            <div className="my-auto py-3 space-y-2">
              <span className="text-[9px] font-mono uppercase tracking-widest text-electric-cyan">
                Practice Areas: Corporate, Civil &amp; Constitutional
              </span>
              <h4 className="text-sm sm:text-base font-bold font-display text-white leading-tight">
                Strategic Legal Representation, Precedent Research &amp; Chamber Counsel
              </h4>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                Chamber prestige, confidential client consultation intake, landmark judgment analysis, and professional credentials.
              </p>

              <div className="flex items-center gap-3 pt-2">
                <div className="px-3 py-1.5 rounded-lg bg-electric-cyan/15 border border-electric-cyan/30 text-xs text-white font-medium flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-electric-cyan" />
                  <span>Confidential Intake Form</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300">
                  Landmark Precedents
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 pt-2 border-t border-white/5">
              <span>Confidential &amp; Secure Client Portal</span>
              <span>High Authority</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full rounded-2xl bg-space-950/90 border border-white/15 overflow-hidden shadow-2xl flex flex-col group/mockup">
      {/* Browser Chrome Header */}
      <div className="px-4 py-2.5 bg-space-900/90 border-b border-white/10 flex items-center justify-between">
        {/* Mac OS Window Traffic Dots */}
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>

        {/* Address Bar */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-space-950/80 border border-white/10 text-[10px] font-mono text-slate-400 max-w-xs truncate mx-2">
          <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
          <span className="text-slate-300 truncate">
            {project.liveUrl ? project.liveUrl.replace('https://', '') : `${project.id}.com`}
          </span>
        </div>

        {/* Status indicator */}
        <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
      </div>

      {/* Screen Viewport with Aspect Ratio */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
        {renderInterior()}

        {/* Subtle glass reflection overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.04] to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

