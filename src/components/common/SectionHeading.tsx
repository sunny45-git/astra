import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  badge: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: 'center' | 'left';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  highlight,
  description,
  align = 'center',
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-16 md:mb-20 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-2xl'} ${className}`}>
      {/* Glass Eyebrow Badge */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-space-900/80 border border-electric-cyan/20 backdrop-blur-md text-xs font-mono tracking-wider uppercase text-electric-cyan mb-4 shadow-[0_0_15px_-4px_rgba(0,245,255,0.25)] ${isCenter ? 'mx-auto' : ''}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse" />
        <span>{badge}</span>
      </motion.div>

      {/* Main Title */}
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white leading-tight mb-4"
      >
        {title}{' '}
        {highlight && (
          <span className="text-gradient-cyan block sm:inline">
            {highlight}
          </span>
        )}
      </motion.h2>

      {/* Supporting Description */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

