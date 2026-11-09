import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles, Layers, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Project } from '../../types';
import { ProjectBrowserMockup } from './ProjectBrowserMockup';

interface ProjectCardProps {
  project: Project;
  index: number;
  onViewDetails: (project: Project) => void;
  onOpenLiveDemo: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  onViewDetails,
  onOpenLiveDemo,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Sophisticated subtle 3D perspective response
    setRotateX(-y / 24);
    setRotateY(x / 24);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <div
      style={{ perspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="h-full"
    >
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.12 }}
        animate={{
          rotateX,
          rotateY,
        }}
        className="relative h-full rounded-3xl p-6 sm:p-7 bg-gradient-to-b from-space-900/80 via-space-900/60 to-space-950/90 border border-white/10 hover:border-electric-cyan/40 backdrop-blur-xl shadow-glass-md flex flex-col justify-between group transition-all duration-300 overflow-hidden"
      >
        {/* Glow behind card on hover */}
        <div
          className={`absolute -top-24 -right-24 w-56 h-56 rounded-full bg-electric-cyan/15 blur-[70px] pointer-events-none transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div>
          {/* Top Category Badge & Client Type */}
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-space-850 border border-white/10 text-[10px] font-mono uppercase tracking-wider text-electric-cyan">
              <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan" />
              {project.category}
            </span>

            <span className="text-[11px] font-mono text-slate-400">
              {project.clientType}
            </span>
          </div>

          {/* Floating 3D Browser Mockup Preview */}
          <div className="mb-6 transform group-hover:scale-[1.02] transition-transform duration-300">
            <ProjectBrowserMockup project={project} />
          </div>

          {/* Project Title */}
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-2 group-hover:text-electric-cyan transition-colors">
            {project.title}
          </h3>

          {/* Short Description */}
          <p className="text-sm text-slate-300 font-sans leading-relaxed mb-5">
            {project.shortDescription}
          </p>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons: Live Demo & View Details */}
        <div className="pt-4 border-t border-white/10 flex items-center gap-3">
          <button
            onClick={() => onOpenLiveDemo(project)}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider bg-electric-cyan text-space-950 hover:bg-white shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all duration-200 flex items-center justify-center gap-2 group/btn font-sans"
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
          </button>

          <button
            onClick={() => onViewDetails(project)}
            className="py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider bg-space-850 hover:bg-space-800 text-slate-200 hover:text-white border border-white/10 hover:border-electric-cyan/40 transition-colors flex items-center justify-center gap-1.5 font-sans"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-electric-cyan" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

