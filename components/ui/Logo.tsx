import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = "w-6 h-6", size = 24 }) => (
  <div className="flex items-center gap-3">
    <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20 shrink-0">
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        className={`text-white ${className}`} 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
          <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 3 2.5 2.5 0 0 0 .5 3.32 2.5 2.5 0 0 0 .5 3.32 2.5 2.5 0 0 0 1.32 3 2.5 2.5 0 0 0 1.98 3 2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 4.96.46 2.5 2.5 0 0 0 1.98-3 2.5 2.5 0 0 0 1.32-3 2.5 2.5 0 0 0-.5-3.32 2.5 2.5 0 0 0-.5-3.32 2.5 2.5 0 0 0-1.32-3 2.5 2.5 0 0 0-1.98-3 2.5 2.5 0 0 0-4.96.46Z" />
          <path d="M9 12h6" />
          <path d="M12 9v6" />
      </svg>
    </div>
    <span className="font-bold text-lg tracking-tight text-zinc-100 group-hover:text-white transition-colors hidden sm:inline-block">
        C2G <span className="text-zinc-500 font-normal group-hover:text-zinc-400">Automações</span>
    </span>
  </div>
);