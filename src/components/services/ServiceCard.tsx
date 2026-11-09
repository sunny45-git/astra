import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Scale, Landmark, Building2, HeartHandshake, Cpu, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Service } from '../../types';

interface ServiceCardProps {
  service: Service;
  index: number;
  onSelect: (service: Service) => void;
  onEnquire: (serviceTitle: string) => void;
}

// Icon mapper
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  UserCheck,
  Scale,
  Landmark,
  Building2,
  HeartHandshake,
  Cpu,
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  index,
  onSelect,
  onEnquire,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const IconComponent = iconMap[service.icon] || Cpu;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // 3D tilt response
    setRotateX(-y / 20);
    setRotateY(x / 20);
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
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        animate={{
          rotateX,
          rotateY,
        }}
        className="relative h-full rounded-3xl p-7 bg-gradient-to-b from-space-900/85 via-space-900/60 to-space-950/90 border border-white/10 hover:border-electric-cyan/40 backdrop-blur-xl shadow-glass-md flex flex-col justify-between group transition-colors duration-300 overflow-hidden"
      >
        {/* Subtle Ambient Hover Glow */}
        <div
          className={`absolute -top-20 -right-20 w-44 h-44 rounded-full bg-electric-cyan/15 blur-[60px] pointer-events-none transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div>
          {/* Card Top: Category and Icon */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
              {service.category}
            </span>
            <div className="w-12 h-12 rounded-2xl bg-space-850/90 border border-white/10 flex items-center justify-center text-electric-cyan group-hover:scale-110 group-hover:border-electric-cyan/50 group-hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all duration-300">
              <IconComponent className="w-6 h-6" />
            </div>
          </div>

          {/* Service Title */}
          <h3 className="text-xl font-bold font-display text-white mb-3 group-hover:text-electric-cyan transition-colors">
            {service.title}
          </h3>

          {/* Short Description */}
          <p className="text-sm text-slate-300 font-sans leading-relaxed mb-6">
            {service.shortDescription}
          </p>

          {/* Capabilities / Deliverables sample */}
          <div className="space-y-2 mb-6">
            {service.deliverables.slice(0, 3).map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-electric-cyan shrink-0" />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {service.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer: Action Buttons */}
        <div className="pt-4 border-t border-white/10 flex items-center gap-2">
          <button
            onClick={() => onEnquire(service.title)}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider bg-electric-cyan/15 hover:bg-electric-cyan text-electric-cyan hover:text-space-950 border border-electric-cyan/30 transition-all duration-200 flex items-center justify-center gap-2 group/btn shadow-[0_0_10px_rgba(0,245,255,0.1)] hover:shadow-[0_0_15px_rgba(0,245,255,0.35)]"
          >
            <span>Contact Me</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onSelect(service)}
            className="p-2.5 rounded-xl bg-space-850 hover:bg-space-800 text-slate-400 hover:text-white border border-white/10 transition-colors"
            title="View Details"
            aria-label="View Details"
          >
            <Sparkles className="w-4 h-4 text-electric-cyan" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

