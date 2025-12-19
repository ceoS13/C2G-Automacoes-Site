
import React, { memo, useRef } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface DashboardCardProps {
  title: string;
  icon: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  headerAction?: React.ReactNode;
  delay?: string;
  floatDelay?: string; 
}

export const DashboardCard: React.FC<DashboardCardProps> = memo(({ 
  title, 
  icon, 
  className = '', 
  children, 
  headerAction, 
  delay,
  floatDelay = '0s'
}) => {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  // Usando molas suaves para evitar jittering sem disparar repaints pesados
  const springConfig = { damping: 20, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    // Movemos os valores de movimento
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function handleMouseLeave() {
    mouseX.set(-500);
    mouseY.set(-500);
  }

  return (
    <article 
      className={`group/card relative bg-[#09090b]/80 border border-white/10 rounded-xl overflow-hidden flex flex-col hover:border-cyan-500/30 transition-all duration-500 will-change-transform animate-float-subtle ${className} [contain:layout_paint]`}
      style={{ animationDelay: floatDelay }}
      data-aos="fade-up"
      data-aos-delay={delay}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 
          OPTIMIZED SPOTLIGHT: 
          Em vez de animar a string 'radial-gradient' (que causa Style Recalculation),
          animamos um elemento físico via 'transform' (que é apenas Composition).
      */}
      <motion.div
        className="hidden md:block pointer-events-none absolute w-[400px] h-[400px] rounded-full opacity-0 group-hover/card:opacity-100 z-0 bg-cyan-500/10 blur-[80px]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      <header className="flex items-center justify-between px-4 py-3 md:px-5 md:py-4 border-b border-white/5 bg-white/[0.01] z-20 relative shrink-0">
        <div className="flex items-center gap-2 md:gap-3">
            <div className="text-zinc-400 group-hover/card:text-cyan-400 transition-colors">{icon}</div>
            <h3 className="text-xs md:text-sm font-semibold text-zinc-300 tracking-wide uppercase font-mono">{title}</h3>
        </div>
        <div>
            {headerAction || <MoreHorizontal size={16} className="text-zinc-600 cursor-pointer hover:text-white" />}
        </div>
      </header>

      <div className="relative flex-1 p-0 overflow-hidden h-full z-10">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-50" />
         {children}
      </div>
    </article>
  );
});
