import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Cpu } from 'lucide-react';
import { scroller } from 'react-scroll';
import { LOGO_HQ_URL } from '../lib/constants';
import { getOptimizedImageUrl } from '../lib/utils';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  
  // Usando useSpring para suavizar as transformações de parallax e reduzir carga na CPU
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const yTitleBase = useTransform(scrollY, [0, 500], [0, 50]);
  const yTextBase = useTransform(scrollY, [0, 500], [0, 100]);
  const yButtonsBase = useTransform(scrollY, [0, 500], [0, 150]);

  const yTitle = useSpring(yTitleBase, springConfig);
  const yText = useSpring(yTextBase, springConfig);
  const yButtons = useSpring(yButtonsBase, springConfig);

  const scrollToSection = (sectionId: string) => {
    scroller.scrollTo(sectionId, {
      duration: 1000,
      delay: 0,
      smooth: true,
      offset: 0,
    });
  };

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-12 md:pt-20 md:pb-0">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-900/20 via-black to-black md:hidden -z-10" aria-hidden="true" />

      {/* Background Blobs com renderização otimizada */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
          x: [0, 20, -20, 0],
          y: [0, -15, 15, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="hidden md:block absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none z-0 will-change-transform"
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[600px] md:h-[900px] z-0 pointer-events-none select-none">
        <div className="w-full h-full [mask-image:radial-gradient(circle,black_30%,transparent_70%)]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 0.12, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-full h-full will-change-transform"
            >
               <motion.div
                 animate={{ scale: [1, 1.03, 1] }}
                 transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                 className="w-full h-full"
               >
                  <img 
                      src={getOptimizedImageUrl(LOGO_HQ_URL, 1200)} 
                      alt="" 
                      className="w-full h-full object-contain mix-blend-screen" 
                      width="1200"
                      height="1200"
                      fetchpriority="high"
                      loading="eager"
                      decoding="async"
                  />
               </motion.div>
            </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] z-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div 
            data-aos="fade-down"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel mb-8 bg-black/50"
        >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono text-cyan-200/80 uppercase tracking-widest">ONLINE</span>
        </div>

        <motion.div style={{ y: yTitle }} className="will-change-transform">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-8 leading-[1.1] md:leading-[0.9]">
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 uppercase">
              IA PARA O SEU
            </span>
            <span className="block relative uppercase mt-1">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-white bg-[length:200%_auto] animate-text-shimmer inline-block">
                SUCESSO
              </span>
              <span className="text-cyan-500">.</span>
            </span>
          </h1>
        </motion.div>

        <motion.div style={{ y: yText }} className="will-change-transform">
          <p className="max-w-3xl mx-auto text-base md:text-lg lg:text-xl text-zinc-400 mb-12 font-light leading-relaxed">
            Pare de inflar sua folha de pagamento. Implementamos <span className="text-white font-medium">Ecossistemas de Receita Autônoma</span> que prospectam, vendem e atendem seus clientes 24/7.
          </p>
        </motion.div>

        <motion.div style={{ y: yButtons }} className="flex flex-col sm:flex-row items-center justify-center gap-6 will-change-transform">
            <button 
              type="button"
              className="group relative px-8 py-4 bg-zinc-100 text-black font-bold text-lg rounded-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-cyan-500/10 w-full sm:w-auto"
              onClick={() => scrollToSection('pricing')}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Começar agora <ArrowRight size={20} />
              </span>
            </button>
            
            <button 
                type="button"
                onClick={() => scrollToSection('tech')}
                className="flex items-center gap-2 text-zinc-500 hover:text-cyan-400 transition-colors uppercase text-sm font-mono tracking-widest"
            >
              <Cpu size={16} /> Arquitetura
            </button>
        </motion.div>
      </div>
    </header>
  );
};