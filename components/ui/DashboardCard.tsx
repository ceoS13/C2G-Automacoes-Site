import React from 'react';
import { MoreHorizontal } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  icon: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  headerAction?: React.ReactNode;
  delay?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  icon, 
  className = '', 
  children, 
  headerAction, 
  delay 
}) => {
  return (
    <article 
      className={`group relative bg-[#09090b]/60 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden flex flex-col hover:border-cyan-500/30 transition-all duration-500 will-change-transform ${className}`}
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      {/* Widget Header */}
      <header className="flex items-center justify-between px-4 py-3 md:px-5 md:py-4 border-b border-white/5 bg-white/[0.02] z-20 relative shrink-0">
        <div className="flex items-center gap-2 md:gap-3">
            <div className="text-zinc-400 group-hover:text-cyan-400 transition-colors" aria-hidden="true">
                {icon}
            </div>
            <h3 className="text-xs md:text-sm font-semibold text-zinc-300 tracking-wide uppercase font-mono">{title}</h3>
        </div>
        <div>
            {headerAction || <button type="button" aria-label="Opções" className="focus:outline-none"><MoreHorizontal size={16} className="text-zinc-600 cursor-pointer hover:text-white" /></button>}
        </div>
      </header>

      {/* Widget Body */}
      <div className="relative flex-1 p-0 overflow-hidden h-full">
         {/* Grid Background */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0" aria-hidden="true" />
         {children}
      </div>
    </article>
  );
};