import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileCode2, Palette, Code, Atom, Layers, Server, Terminal, Database, GitBranch, Github, Laptop } from 'lucide-react';
import { SkillItem } from '../../types';

interface SkillItemCardProps {
  skill: SkillItem;
  category: string;
  index: number;
}

const iconRegistry: Record<string, React.FC<{ className?: string }>> = {
  FileCode2,
  Palette,
  Code,
  Atom,
  Layers,
  Server,
  Terminal,
  Database,
  GitBranch,
  Github,
  Laptop,
};

export const SkillItemCard: React.FC<SkillItemCardProps> = ({ skill, category, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = iconRegistry[skill.icon] || Code;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 15 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-2xl p-6 bg-gradient-to-b from-space-900/80 to-space-950/80 border border-white/10 hover:border-electric-cyan/40 backdrop-blur-xl shadow-glass-sm group transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
    >
      {/* Glow on hover */}
      <div
        className={`absolute -top-12 -right-12 w-28 h-28 rounded-full bg-electric-cyan/20 blur-[40px] pointer-events-none transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div>
        {/* Icon & Category Tag */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-space-850 border border-white/10 flex items-center justify-center text-electric-cyan group-hover:scale-110 group-hover:border-electric-cyan/50 group-hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all duration-300">
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
            {category}
          </span>
        </div>

        {/* Skill Name */}
        <h4 className="text-lg font-bold font-display text-white mb-1 group-hover:text-electric-cyan transition-colors">
          {skill.name}
        </h4>

        {/* Skill Focus Tag */}
        <div className="text-xs font-mono text-electric-cyan/90 mb-3">
          {skill.tag}
        </div>

        {/* Description */}
        <p className="text-xs text-slate-300 font-sans leading-relaxed">
          {skill.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span>Verified Proficiency</span>
        <span className="text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Production Ready
        </span>
      </div>
    </motion.div>
  );
};

