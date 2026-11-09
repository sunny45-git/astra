import React, { useState } from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { ProjectLiveSimulator } from './ProjectLiveSimulator';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project } from '../../types';

export const ProjectsSection: React.FC = () => {
  const { data } = usePortfolio();
  const projects = data?.projects || [];

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [simulatorProject, setSimulatorProject] = useState<Project | null>(null);

  // Derive unique categories from active projects
  const uniqueCategories = Array.from(new Set(projects.map((p) => p.category)));
  const categories = ['All', ...uniqueCategories];

  const getCategoryCount = (cat: string) => {
    if (cat === 'All') return projects.length;
    return projects.filter((p) => p.category.toLowerCase().includes(cat.toLowerCase())).length;
  };

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) =>
          p.category.toLowerCase().includes(selectedCategory.toLowerCase())
        );

  const handleOpenLiveDemo = (project: Project) => {
    if (project.liveUrl && !project.liveUrl.includes('example.com')) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    } else {
      setSimulatorProject(project);
    }
  };

  return (
    <section id="projects" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-space-950 overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/3 left-0 w-[550px] h-[550px] rounded-full bg-electric-cyan/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          badge="ASTRA Portfolio"
          title="Selected"
          highlight="Works."
          description="A curated gallery of completed web platforms engineered for public leaders, esteemed personal brands, charitable foundations, and legal practices."
        />

        {/* Category Filter Pills with Item Counts */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 sm:mb-16">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            const count = getCategoryCount(cat);
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'bg-electric-cyan text-space-950 font-bold shadow-[0_0_15px_rgba(0,245,255,0.4)] scale-105'
                    : 'bg-space-900/80 text-slate-400 hover:text-white border border-white/10 hover:border-white/25'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-space-950 text-electric-cyan font-bold' : 'bg-white/10 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onViewDetails={setActiveProject}
              onOpenLiveDemo={handleOpenLiveDemo}
            />
          ))}
        </div>

        {/* Bottom Note on Configurable Data & Interactive Simulator */}
        <div className="mt-14 p-4 rounded-2xl bg-space-900/50 border border-white/5 backdrop-blur-md text-center max-w-xl mx-auto text-xs text-slate-400 font-mono flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-electric-cyan animate-pulse" />
          <span>
            <strong className="text-electric-cyan">Database Powered:</strong> Manage, edit, or publish projects anytime via the ASTRA Admin Dashboard.
          </span>
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onOpenLiveDemo={handleOpenLiveDemo}
      />

      {/* Live Device Simulator Modal */}
      <ProjectLiveSimulator
        project={simulatorProject}
        onClose={() => setSimulatorProject(null)}
      />
    </section>
  );
};
