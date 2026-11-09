import React from 'react';

interface AstraLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const AstraLogo: React.FC<AstraLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      {/* Geometric Celestial Star Emblem */}
      <div
        className={`relative ${iconSizes[size]} rounded-2xl bg-space-900 border border-electric-cyan/40 flex items-center justify-center overflow-hidden shadow-[0_0_20px_-3px_rgba(0,245,255,0.35)] group-hover:border-electric-cyan transition-colors duration-300 shrink-0`}
      >
        {/* Ambient Backlight inside emblem */}
        <div className="absolute inset-0 bg-gradient-to-tr from-electric-cyan/20 via-transparent to-electric-violet/30 group-hover:scale-125 transition-transform duration-500" />

        {/* 4-Point Geometric Celestial Star Icon */}
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/5 h-3/5 relative z-10 transition-transform duration-500 group-hover:rotate-45"
        >
          <path
            d="M16 2L18.5 13.5L30 16L18.5 18.5L16 30L13.5 18.5L2 16L13.5 13.5L16 2Z"
            fill="url(#astraStarGrad)"
          />
          <circle cx="16" cy="16" r="3" fill="#ffffff" />
          <defs>
            <linearGradient id="astraStarGrad" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00f5ff" />
              <stop offset="0.5" stopColor="#3b82f6" />
              <stop offset="1" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Subtle pulsing orb */}
        <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-electric-cyan blur-[1px] animate-pulse" />
      </div>

      {/* Brand Wordmark & Subtle Founder Attribution */}
      <div className="flex flex-col">
        <span
          className={`font-display font-extrabold ${textSizes[size]} tracking-widest text-white group-hover:text-electric-cyan transition-colors flex items-center gap-1.5 leading-tight`}
        >
          ASTRA
          <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan inline-block shadow-[0_0_8px_#00f5ff] animate-pulse" />
        </span>
        {showSubtitle && (
          <span className="text-[10px] font-mono tracking-wider text-slate-400 group-hover:text-slate-300">
            Founded by Sunny Pendela
          </span>
        )}
      </div>
    </div>
  );
};
