
import React, { useRef, useCallback } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

interface DashboardCardProps {
  title: string;
  icon: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  headerAction?: React.ReactNode;
  delay?: string;
  floatDelay?: string; 
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  icon, 
  className = '', 
  children, 
  headerAction, 
  delay,
  floatDelay = '0s'
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  // Cache da geometria do card apenas quando o mouse entra ou no resize
  const updateRect = useCallback(() => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  }, []);

  function handleMouseMove(e: React.MouseEvent) {
    // Desabilita em dispositivos touch para economizar CPU
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    if (!rectRef.current) updateRect();

    if (rectRef.current) {
      mouseX.set(e.clientX - rectRef.current.left);
      mouseY.set(e.clientY - rectRef.current.top);
    }
  }

  return (
    <article 
      ref={cardRef}
      className={`group/card relative bg-[#09090b]/60 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden flex flex-col hover:border-cyan-500/30 transition-all duration-500 will-change-transform animate-float-subtle active:scale-[0.98] md:active:scale-100 ${className}`}
      style={{ animationDelay: floatDelay }}
      data-aos="fade-up"
      data-aos-delay={delay}
      onMouseMove={handleMouseMove}
      onMouseEnter={updateRect}
    >
      <motion.div
        className="hidden md:block pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover/card:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(6,182,212,0.10),
              transparent 80%
            )
          `,
        }}
      />

      <div className="md:hidden absolute inset-0 bg-cyan-500/10 opacity-0 transition-opacity duration-300 active:opacity-100 pointer-events-none z-0" />

      <header className="flex items-center justify-between px-4 py-3 md:px-5 md:py-4 border-b border-white/5 bg-white/[0.02] z-20 relative shrink-0">
        <div className="flex items-center gap-2 md:gap-3">
            <div className="text-zinc-400 group-hover/card:text-cyan-400 transition-colors" aria-hidden="true">
                {icon}
            </div>
            <h3 className="text-xs md:text-sm font-semibold text-zinc-300 tracking-wide uppercase font-mono">{title}</h3>
        </div>
        <div>
            {headerAction || <button type="button" aria-label="Opções" className="focus:outline-none"><MoreHorizontal size={16} className="text-zinc-600 cursor-pointer hover:text-white" /></button>}
        </div>
      </header>

      <div className="relative flex-1 p-0 overflow-hidden h-full z-10">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0 opacity-50" aria-hidden="true" />
         {children}
      </div>
    </article>
  );
};
