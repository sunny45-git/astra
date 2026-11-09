import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { SkillItemCard } from './SkillItemCard';
import { usePortfolio } from '../../context/PortfolioContext';

export const SkillsSection: React.FC = () => {
  const { data } = usePortfolio();
  const allSkills = data?.skills || [];
  const [activeTab, setActiveTab] = useState<'ALL' | 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'TOOLS'>('ALL');

  const tabs: Array<'ALL' | 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'TOOLS'> = [
    'ALL',
    'FRONTEND',
    'BACKEND',
    'DATABASE',
    'TOOLS',
  ];

  const displayedSkills = allSkills.filter(
    (s) => activeTab === 'ALL' || s.category === activeTab
  );

  return (
    <section id="skills" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-space-950 overflow-hidden">
      {/* 3D Orbiting Ambient Elements in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/[0.04] pointer-events-none animate-spin" style={{ animationDuration: '60s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-dashed border-electric-cyan/[0.05] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-electric-violet/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          badge="Technical Proficiency"
          title="Technologies"
          highlight="Behind ASTRA."
          description="A specialized modern stack chosen for execution speed, maintainability, rock-solid security, and interactive visual polish."
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 sm:mb-16">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'text-space-950 font-bold bg-gradient-to-r from-electric-cyan to-electric-sky shadow-[0_0_20px_rgba(0,245,255,0.4)] scale-105'
                    : 'text-slate-400 hover:text-white bg-space-900/80 border border-white/10 hover:border-white/20'
                }`}
              >
                <span>{tab}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {displayedSkills.map((skill, index) => (
              <SkillItemCard
                key={`${skill.id || skill.name}-${skill.category}`}
                skill={skill}
                category={skill.category || 'FRONTEND'}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Authenticity Guarantee Note */}
        <div className="mt-12 text-center">
          <p className="text-xs font-mono text-slate-400">
            * Every technology displayed is actively utilized in production environments for client delivery.
          </p>
        </div>
      </div>
    </section>
  );
};
