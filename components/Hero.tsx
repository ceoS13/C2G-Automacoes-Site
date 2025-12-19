
import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Cpu } from 'lucide-react';
import { scroller } from 'react-scroll';
import { LOGO_HQ_URL } from '../lib/constants';
import { getOptimizedImageUrl } from '../lib/utils';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  
  const smoothY = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  const yTitle = useTransform(smoothY, [0, 500], [0, 50]);
  const yText = useTransform(smoothY, [0, 500], [0, 80]);
  const yButtons = useTransform(smoothY, [0, 500], [0, 120]);

  const scrollToSection = (sectionId: string) => {
    scroller.scrollTo(sectionId, {
      duration: 1000,
      delay: 0,
      smooth: true,
      offset: 0,
    });
  };

  return (
    <header id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-12 md:pt-20 md:pb-0 [contain:content]">
      
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-900/10 via-black to-black md:hidden -z-10" aria-hidden="true" />

      <div className="hidden md:block absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] will-change-transform"
          aria-hidden="true"
        />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[600px] md:h-[900px] z-0 pointer-events-none select-none" aria-hidden="true">
        <div className="w-full h-full [mask-image:radial-gradient(circle,black_30%,transparent_75%)]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 0.15, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-full h-full will-change-transform"
            >
               <motion.div
                 animate={{ scale: [1, 1.03, 1] }}
                 transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                 className="w-full h-full flex items-center justify-center"
               >
                  <img 
                      src={getOptimizedImageUrl(LOGO_HQ_URL, 800)} 
                      alt="" 
                      className="w-full h-full object-contain mix-blend-screen brightness-75" 
                      width="800"
                      height="800"
                      // Otimização Crítica: Avisa ao navegador que esta imagem é prioridade máxima
                      fetchpriority="high"
                      loading="eager"
                      decoding="async"
                  />
               </motion.div>
            </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] z-0 pointer-events-none opacity-50" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 text-center">
        
        <div 
            data-aos="fade-down"
            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass-panel mb-6 md:mb-8 bg-black/50"
            role="status"
        >
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
            <span className="text-[10px] md:text-xs font-mono text-cyan-200/80 uppercase tracking-widest">Sistema Operacional: Online</span>
        </div>

        <div data-aos="fade-up">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6 md:mb-8 leading-[1.1] md:leading-[0.9] will-change-transform translate-z-0"
            style={{ y: yTitle }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 uppercase">
              IA PARA O SEU
            </span>
            <span className="block relative uppercase mt-1 md:mt-0">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-white bg-[length:200%_auto] animate-text-shimmer inline-block px-2">
                SUCESSO
              </span>
              <span className="text-cyan-500">.</span>
            </span>
          </motion.h1>
        </div>

        <div data-aos="fade-up" data-aos-delay="100">
          <motion.p 
            className="max-w-3xl mx-auto text-base md:text-lg lg:text-xl text-zinc-400 mb-8 md:mb-12 font-light leading-relaxed px-2 md:px-4 will-change-transform translate-z-0"
            style={{ y: yText }}
          >
            Pare de inflar sua folha de pagamento. Implementamos <span className="text-white font-medium">Ecossistemas de Receita Autônoma</span> que prospectam, vendem e atendem seus clientes 24/7.
          </motion.p>
        </div>

        <div data-aos="fade-up" data-aos-delay="200">
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 will-change-transform translate-z-0"
            style={{ y: yButtons }}
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="group relative px-6 py-3.5 md:px-8 md:py-4 bg-zinc-100 text-black font-bold text-base md:text-lg rounded-lg overflow-hidden transition-all shadow-xl shadow-cyan-500/10 w-full sm:w-auto"
              onClick={() => scrollToSection('pricing')}
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
              <Cpu size={16} aria-hidden="true" /> Ver Arquitetura
            </button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-gradient-to-t from-[#050505] to-transparent z-20 pointer-events-none" aria-hidden="true" />
    </header>
  );
};
