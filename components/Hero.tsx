import React, { useEffect, useState } from 'react';
import { Button } from './ui/Button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Cpu, MousePointer2 } from 'lucide-react';

export const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  // Adjusted Parallax Values - kept subtle to work with AOS
  const yTitle = useTransform(scrollY, [0, 500], [0, 50]);
  const yText = useTransform(scrollY, [0, 500], [0, 100]);
  const yButtons = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      
      {/* Dynamic Cursor Spotlight - Cyan */}
      <div 
        className="fixed top-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none transition-transform duration-100 ease-out z-0 mix-blend-screen"
        style={{ 
          transform: `translate(${mousePosition.x - 250}px, ${mousePosition.y - 250}px)`,
        }}
      />

      {/* Neural Network / Grid Background - Cyan Tint */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] z-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
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
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-zinc-100 mb-8 leading-[0.9]"
            style={{ y: yTitle }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-500 uppercase">
              IA para
            </span>
            <span className="block relative uppercase">
              seu sucesso<span className="text-cyan-500">.</span>
              <div className="absolute -bottom-4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
            </span>
          </motion.h1>
        </div>

        <div data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
          <motion.p 
            className="max-w-3xl mx-auto text-xl text-zinc-400 mb-12 font-light leading-relaxed"
            style={{ y: yText }}
          >
            Transforme seu WhatsApp em uma <span className="text-zinc-100 font-medium">máquina de receita</span>. Nossos Agentes Autônomos (Nível 4) atendem, qualificam e agendam reuniões sozinhos, enquanto sua equipe foca em fechar negócios.
          </motion.p>
        </div>

        <div data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
            style={{ y: yButtons }}
          >
            <button 
              className="group relative px-8 py-4 bg-zinc-100 text-black font-bold text-lg rounded-lg overflow-hidden transition-all hover:scale-105 shadow-xl shadow-cyan-500/10"
              onClick={() => document.getElementById('chat-demo')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-200 to-blue-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                Conversar com Ísis <ArrowRight size={20} />
              </span>
            </button>
            
            <button className="flex items-center gap-2 text-zinc-500 hover:text-cyan-400 transition-colors uppercase text-sm tracking-widest font-mono">
              <Cpu size={16} /> Ver Stack Técnica
            </button>
          </motion.div>
        </div>
      </div>

      {/* Abstract Footer Decoration */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-20 pointer-events-none" />
    </section>
  );
};