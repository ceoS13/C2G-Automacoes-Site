
import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Cpu } from 'lucide-react';
import { scroller } from 'react-scroll';
import { LOGO_HQ_URL } from '../lib/constants';
import { getOptimizedImageUrl } from '../lib/utils';

interface HeroProps {
  onOpenTerminal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  const { scrollY } = useScroll();
  const [clickCount, setClickCount] = useState(0);
  
  const yTitle = useTransform(scrollY, [0, 500], [0, 50]);
  const yText = useTransform(scrollY, [0, 500], [0, 100]);
  const yButtons = useTransform(scrollY, [0, 500], [0, 150]);

  const scrollToSection = (sectionId: string) => {
    scroller.scrollTo(sectionId, {
      duration: 1000,
      delay: 0,
      smooth: true,
      offset: 40, 
    });
  };

  const handleBadgeClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount >= 5) {
      if (onOpenTerminal) onOpenTerminal();
      setClickCount(0);
    }
  };

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-12 md:pt-20 md:pb-0">
      
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-900/20 via-black to-black md:hidden -z-10" aria-hidden="true" />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, -50, 0],
          y: [0, -30, 30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-[120px] mix-blend-screen pointer-events-none z-0 will-change-transform"
        aria-hidden="true"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -50, 50, 0],
          y: [0, 40, -40, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="hidden md:block absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none z-0 will-change-transform"
        aria-hidden="true"
      />

      {/* Watermark Logo Container */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[600px] md:h-[900px] z-0 pointer-events-none select-none" aria-hidden="true">
        <div className="w-full h-full [mask-image:radial-gradient(circle,black_30%,transparent_70%)]">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
              animate={{ 
                opacity: 0.15, 
                scale: 1, 
                filter: "blur(0px)" 
              }}
              transition={{ 
                duration: 1.8,
                ease: "easeOut",
                delay: 0.2 
              }}
              className="w-full h-full will-change-[opacity,filter,transform]"
            >
               <motion.div
                 animate={{ scale: [1, 1.05, 1] }}
                 transition={{ 
                   duration: 8, 
                   repeat: Infinity, 
                   ease: "easeInOut" 
                 }}
                 className="w-full h-full"
               >
                  <img 
                      src={getOptimizedImageUrl(LOGO_HQ_URL, 1200)} 
                      alt="" 
                      className="w-full h-full object-contain mix-blend-screen" 
                      width="1200"
                      height="1200"
                      fetchPriority="high"
                      loading="eager"
                      decoding="sync"
                  />
               </motion.div>
            </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] z-0 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div 
            data-aos="fade-down"
            data-aos-duration="1500"
            className="flex justify-center mb-6 md:mb-8"
        >
            <button 
                onClick={handleBadgeClick}
                className={`
                  group inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass-panel bg-black/50 transition-all duration-200 active:scale-95
                  /* EFEITO GLITCH/HINT: Borda brilha e sombra estoura no hover */
                  hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] hover:bg-cyan-950/40
                  ${clickCount > 0 ? 'border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : ''}
                `}
                role="status"
                title={clickCount > 0 ? `${5 - clickCount} cliques para acesso root...` : "Status do Sistema"}
            >
                <span className={`
                  w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)] 
                  ${clickCount > 0 ? 'animate-ping' : 'animate-pulse'}
                  /* HINT: Led fica branco e pisca rápido no hover */
                  group-hover:bg-white group-hover:shadow-[0_0_15px_white] group-hover:animate-[ping_0.5s_linear_infinite]
                `} />
                <span className={`
                  text-[10px] md:text-xs font-mono text-cyan-200/80 uppercase tracking-widest transition-colors duration-200
                  /* HINT: Texto fica branco brilhante */
                  group-hover:text-white group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]
                `}>
                  {clickCount >= 3 ? "Acesso Root..." : "Sistema Operacional: Online"}
                </span>
            </button>
        </div>

        <div data-aos="fade-up" data-aos-duration="1500">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6 md:mb-8 leading-[1.1] md:leading-[0.9] will-change-transform"
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
              <div className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
            </span>
          </motion.h1>
        </div>

        <div data-aos="fade-up" data-aos-delay="200" data-aos-duration="1500">
          <motion.p 
            className="max-w-3xl mx-auto text-base md:text-lg lg:text-xl text-zinc-400 mb-8 md:mb-12 font-light leading-relaxed px-2 md:px-4 will-change-transform"
            style={{ y: yText }}
          >
            Pare de inflar sua folha de pagamento. Implementamos <span className="text-white font-medium">Ecossistemas de Receita Autônoma</span> que prospectam, vendem e atendem seus clientes 24/7. Cresça seu faturamento, não seus custos fixos.
          </motion.p>
        </div>

        <div data-aos="fade-up" data-aos-delay="400" data-aos-duration="1500">
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 will-change-transform"
            style={{ y: yButtons }}
          >
            <motion.button 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              type="button"
              className="group relative px-6 py-3.5 md:px-8 md:py-4 bg-zinc-100 text-black font-bold text-base md:text-lg rounded-lg overflow-hidden transition-all hover:scale-105 shadow-xl shadow-cyan-500/10 w-full sm:w-auto"
              onClick={() => scrollToSection('pricing')}
              aria-label="Automatizar Minha Empresa (Ver Preços)"
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
                aria-label="Ver arquitetura técnica"
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
