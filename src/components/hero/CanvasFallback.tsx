import React from 'react';

export const CanvasFallback: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Radial Glows */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-electric-cyan/15 blur-[120px] -top-20 -right-20 animate-pulse-glow" />
      <div className="absolute w-[450px] h-[450px] rounded-full bg-electric-violet/15 blur-[130px] bottom-10 right-10" />

      {/* Decorative Floating Glass Rings */}
      <div className="relative w-80 h-80 rounded-full border border-electric-cyan/20 backdrop-blur-md animate-float-slow flex items-center justify-center shadow-[0_0_50px_rgba(0,245,255,0.1)]">
        <div className="w-56 h-56 rounded-full border border-electric-violet/30 animate-spin" style={{ animationDuration: '24s' }} />
        <div className="absolute w-24 h-24 rounded-2xl bg-gradient-to-tr from-electric-cyan/20 to-electric-violet/20 border border-white/20 backdrop-blur-xl rotate-45 animate-pulse" />
      </div>
    </div>
  );
};

