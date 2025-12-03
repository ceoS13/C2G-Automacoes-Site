
import React, { useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { ArrowRight, Cpu } from 'lucide-react';
import { scroller } from 'react-scroll';
import { LOGO_HQ_URL } from '../lib/constants';
import { getOptimizedImageUrl } from '../lib/utils';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  
  // Mouse Follower Logic (Optimized with MotionValues for 60fps performance)
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  useEffect(() => {
    // Only enable mouse follower on non-touch devices for performance
    if (window.matchMedia("(pointer: fine)").matches) {
      const handleMouseMove = (e: MouseEvent) => {
        mouseX.set(e.clientX - 250); 
        mouseY.set(e.clientY - 250);
      };
      // Passive listener for better scrolling performance
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);

  // Adjusted Parallax Values
  const yTitle = useTransform(scrollY, [0, 500], [0, 50]);
  const yText = useTransform(scrollY, [0, 500], [0, 100]);
  const yButtons = useTransform(scrollY, [0, 500], [0, 150]);

  const scrollToSection = (sectionId: string) => {
    scroller.scrollTo(sectionId, {
      duration: 1000,
      delay: 0,
      smooth: true,
      offset: -140, // Increased offset for navbar
    });
  };

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-12 md:pt-20 md:pb-0">
      
      {/* 1. Aurora Background - Optimized for Mobile */}
      {/* Mobile: Static Gradient (Zero GPU usage) */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-900/20 via-black to-black md:hidden -z-10" />

      {/* Desktop: Living Light Orbs (Animated) */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, -50, 0],
          y: [0, -30, 30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="hidden md:block absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-[120px] mix-blend-screen pointer-events-none z-0"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -50, 50, 0],
          y: [0, 40, -40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="hidden md:block absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none z-0"
      />

      {/* Dynamic Cursor Spotlight - Instant Tracking (Hidden on mobile) */}
      <motion.div 
        className="hidden md:block fixed top-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-screen will-change-transform"
        style={{ x: mouseX, y: mouseY }}
        aria-hidden="true"
      />

      {/* Logo Watermark - Brand Atmosphere */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 2 }}
        // mix-blend-screen on the parent container handles the blending of the child image content against the background
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[600px] md:h-[900px] z-0 pointer-events-none select-none mix-blend-screen"
      >
         {/* Optimization: Use Optimized Image Proxy for large watermark (1200px width for quality) */}
         <img 
            src={getOptimizedImageUrl(LOGO_HQ_URL, 1200)} 
            alt="" 
            className="w-full h-full object-contain mix-blend-screen" 
         />
      </motion.div>

      {/* Neural Network / Grid Background - Cyan Tint */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] z-0 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 text-center">
        
        <div 
            data-aos="fade-down"
            data-aos-duration="1500"
            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass-panel mb-6 md:mb-8 bg-black/50"
        >
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
            <span className="text-[10px] md:text-xs font-mono text-cyan-200/80 uppercase tracking-widest">Sistema Operacional: Online</span>
        </div>

        <div data-aos="fade-up" data-aos-duration="1500">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6 md:mb-8 leading-[1.1] md:leading-[0.9]"
            style={{ y: yTitle }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 uppercase">
              IA PARA O SEU
            </span>
            <span className="block relative uppercase mt-1 md:mt-0">
              {/* Shimmer Effect on Text */}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-white bg-[length:200%_auto] animate-text-shimmer inline-block px-2">
                SUCESSO
              </span>
              <span className="text-cyan-500">.</span>
              <div className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
            </span>
          </motion.h1>
        </div>

        <div data-aos="fade-up" data-aos-delay="200" data-aos-duration="1500">
          <motion.p 
            className="max-w-3xl mx-auto text-base md:text-lg lg:text-xl text-zinc-400 mb-8 md:mb-12 font-light leading-relaxed px-2 md:px-4"
            style={{ y: yText }}
          >
            Pare de inflar sua folha de pagamento. Implementamos <span className="text-white font-medium">Ecossistemas de Receita Autônoma</span> que prospectam, vendem e atendem seus clientes 24/7. Cresça seu faturamento, não seus custos fixos.
          </motion.p>
        </div>

        <div data-aos="fade-up" data-aos-delay="400" data-aos-duration="1500">
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
            style={{ y: yButtons }}
          >
            {/* Levitation Button */}
            <motion.button 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              type="button"
              className="group relative px-6 py-3.5 md:px-8 md:py-4 bg-zinc-100 text-black font-bold text-base md:text-lg rounded-lg overflow-hidden transition-all hover:scale-105 shadow-xl shadow-cyan-500/10 w-full sm:w-auto"
              onClick={() => scrollToSection('solutions')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-200 to-blue-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center justify-center gap-2">
                Automatizar Minha Empresa <ArrowRight size={20} />
              </span>
            </motion.button>
            
            <button 
                type="button"
                onClick={() => scrollToSection('tech')}
                className="flex items-center gap-2 text-zinc-500 hover:text-cyan-400 transition-colors uppercase text-xs md:text-sm tracking-widest font-mono py-2"
            >
              <Cpu size={16} /> Ver Arquitetura
            </button>
          </motion.div>
        </div>
      </div>

      {/* Abstract Footer Decoration */}
      <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-gradient-to-t from-[#050505] to-transparent z-20 pointer-events-none" aria-hidden="true" />
    </header>
  );
};
