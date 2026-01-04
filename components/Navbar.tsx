
import React, { useState } from 'react';
import { Menu, X, MessageCircle, ChevronRight, Terminal } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Link, animateScroll as scroll } from 'react-scroll';
import { Logo } from './ui/Logo';
import { NAV_LINKS, WHATSAPP_LINK } from '../lib/constants';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    // Logic: Hide if scrolling down AND past 150px. Show if scrolling up.
    if (latest > previous && latest > 150) {
      setIsVisible(false);
      setIsOpen(false); // Close mobile menu if nav hides
    } else {
      setIsVisible(true);
    }
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Variantes OTIMIZADAS V2:
  // Removemos a animação de 'filter' (blur) que causava lag.
  // O blur agora é aplicado via classe CSS estática (backdrop-blur-md).
  const menuVariants: Variants = {
    closed: { 
      opacity: 0,
      y: -15,
      scaleY: 0.98,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    open: { 
      opacity: 1,
      y: 0,
      scaleY: 1,
      transition: { duration: 0.35, ease: "circOut", staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    closed: { x: -10, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <>
      <motion.header 
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100,
          x: "-50%",
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed top-4 md:top-6 left-1/2 w-[95%] md:w-full max-w-7xl z-50 will-change-transform"
      >
        {/* Navbar Container */}
        <nav className="relative bg-[#0a0a0a]/80 backdrop-blur-lg border border-white/10 rounded-full pl-4 pr-2 py-2 shadow-xl shadow-black/50 flex items-center justify-between transition-all duration-300 z-50">
          
          {/* 1. Logo - Left Align */}
          <div className="shrink-0 flex items-center">
            <motion.button 
              type="button"
              className="cursor-pointer group focus:outline-none rounded-lg" 
              onClick={() => scroll.scrollToTop()}
              whileHover={{ 
                scale: 1.1,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Voltar ao topo - C2G Automações"
            >
              <Logo className="h-11 w-auto" />
            </motion.button>
          </div>

          {/* 2. Navigation Cluster - Desktop */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center">
            <div className="flex items-center gap-1 bg-white/5 border border-white/5 rounded-full px-2 py-1">
              {NAV_LINKS.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href.replace('#', '')}
                  spy={true}
                  smooth={true}
                  offset={40} 
                  duration={1000}
                  className="cursor-pointer px-3 py-1.5 rounded-full text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-300 whitespace-nowrap focus:outline-none"
                  activeClass="!text-white !bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* 3. Actions - Right Align */}
          <div className="shrink-0 flex items-center gap-3">
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex relative group overflow-hidden items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_-5px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_-5px_rgba(6,182,212,0.6)] hover:scale-105 active:scale-95 border border-white/10"
            >
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 animate-shine" />
              
              <span className="relative z-10 flex items-center gap-2">
                Falar com Ísis
                <MessageCircle size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </a>

            {/* Mobile Menu Button */}
            <button 
              type="button"
              onClick={toggleMenu} 
              className={`md:hidden p-2.5 border rounded-full transition-all focus:outline-none active:scale-95 z-50 relative ${
                isOpen 
                  ? 'text-cyan-400 bg-cyan-950/30 border-cyan-500/50' 
                  : 'text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border-white/5'
              }`}
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown - OPTIMIZED BLUR HUD STYLE */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute top-[calc(100%+8px)] left-0 w-full md:hidden origin-top"
            >
              {/* 
                VISUAL FIX: 
                - bg-[#050505]/90: Alta opacidade para esconder o texto do Hero.
                - backdrop-blur-md: Blur estático (leve) para o efeito de vidro sem pesar na GPU.
                - Ring/Border: Mantém o visual tático.
              */}
              <div className="bg-[#050505]/90 backdrop-blur-md border border-cyan-900/30 rounded-2xl overflow-hidden shadow-2xl relative ring-1 ring-white/10">
                
                {/* HUD Corners */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-500/50 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-500/50 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan-500/50 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-500/50 rounded-br-lg" />
                
                {/* Static Grid (Decoration) */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                {/* Scanline Animation (GPU efficient) */}
                <motion.div 
                  initial={{ translateY: "-100%" }}
                  animate={{ translateY: "400%" }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 left-0 w-full h-[20%] bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent pointer-events-none z-0 will-change-transform"
                />

                <div className="relative z-10 p-2">
                   {/* Header System Status */}
                   <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 mb-2 bg-white/[0.02]">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-500 uppercase tracking-widest">
                        <Terminal size={12} />
                        System: Nav_Active
                      </div>
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_5px_rgba(6,182,212,0.8)]" />
                   </div>

                  <div className="flex flex-col space-y-1">
                    {NAV_LINKS.map((link) => (
                      <motion.div key={link.name} variants={itemVariants}>
                        <Link
                          to={link.href.replace('#', '')}
                          spy={true}
                          smooth={true}
                          offset={40} 
                          duration={1000}
                          onClick={() => setIsOpen(false)}
                          className="group cursor-pointer flex items-center justify-between px-4 py-3.5 rounded-lg text-sm font-mono uppercase tracking-wider text-zinc-400 hover:text-cyan-400 hover:bg-white/5 transition-colors border border-transparent hover:border-cyan-500/10"
                        >
                          <span className="flex items-center gap-3">
                             <span className="w-1 h-1 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500 transition-colors" />
                             {link.name}
                          </span>
                          <ChevronRight size={14} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-cyan-500" />
                        </Link>
                      </motion.div>
                    ))}
                    
                    <motion.div variants={itemVariants} className="pt-2 pb-1 px-1">
                      <a 
                        href={WHATSAPP_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative overflow-hidden group flex justify-center items-center gap-2 bg-gradient-to-r from-cyan-900 to-blue-900 text-white px-5 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider border border-cyan-500/30 shadow-lg"
                      >
                        {/* Light Shine Animation Added Here */}
                        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 animate-shine" />
                        
                        <div className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="relative z-10 flex items-center gap-2">
                          Iniciar Protocolo <MessageCircle size={16} />
                        </span>
                      </a>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};
