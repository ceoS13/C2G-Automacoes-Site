import React, { useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { ArrowRight, Cpu } from 'lucide-react';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  
  // Mouse Follower Logic (Optimized with MotionValues for 60fps performance)
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Direct update avoids React Re-renders
      // -250 to center the 500px blob relative to the cursor
      mouseX.set(e.clientX - 250); 
      mouseY.set(e.clientY - 250);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Adjusted Parallax Values
  const yTitle = useTransform(scrollY, [0, 500], [0, 50]);
  const yText = useTransform(scrollY, [0, 500], [0, 100]);
  const yButtons = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      
      {/* Dynamic Cursor Spotlight - Instant Tracking */}
      <motion.div 
        className="fixed top-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-screen"
        style={{ x: mouseX, y: mouseY }}
        aria-hidden="true"
      />

      {/* Neural Network / Grid Background - Cyan Tint */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] z-0 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 text-center">
        
        <div 
            data-aos="fade-down"
            data-aos-duration="1000"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 bg-black/50"
        >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
            <span className="text-xs font-mono text-cyan-200/80 uppercase tracking-widest">Sistema Operacional: Online</span>
        </div>

        <div data-aos="fade-up" data-aos-duration="1000">
          <motion.h1 
            className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-8 leading-[1.1] md:leading-[0.9]"
            style={{ y: yTitle }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 uppercase">
              IA PARA
            </span>
            <span className="block relative uppercase mt-2 md:mt-0">
              SEU SUCESSO<span className="text-cyan-500">.</span>
              <div className="absolute -bottom-4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
            </span>
          </motion.h1>
        </div>

        <div data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
          <motion.p 
            className="max-w-3xl mx-auto text-lg md:text-xl text-zinc-400 mb-12 font-light leading-relaxed px-4"
            style={{ y: yText }}
          >
            Saia da micro-gestão. Desenvolvemos <span className="text-white font-medium">Ecossistemas de IA</span> que conectam Vendas, Financeiro, Processos e Atendimento em um fluxo único e autônomo. Sua empresa rodando sozinha, de ponta a ponta.
          </motion.p>
        </div>

        <div data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
            style={{ y: yButtons }}
          >
            <button 
              type="button"
              className="group relative px-8 py-4 bg-zinc-100 text-black font-bold text-lg rounded-lg overflow-hidden transition-all hover:scale-105 shadow-xl shadow-cyan-500/10 w-full sm:w-auto"
              onClick={() => document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-200 to-blue-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center justify-center gap-2">
                Ver Ecossistema Completo <ArrowRight size={20} />
              </span>
            </button>
            
            <button 
                type="button"
                onClick={() => document.getElementById('tech')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 text-zinc-500 hover:text-cyan-400 transition-colors uppercase text-sm tracking-widest font-mono py-2"
            >
              <Cpu size={16} /> Ver Stack Técnica
            </button>
          </motion.div>
        </div>
      </div>

      {/* Abstract Footer Decoration */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-20 pointer-events-none" aria-hidden="true" />
    </header>
  );
};