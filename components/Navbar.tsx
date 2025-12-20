
import React, { useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
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
        <nav className="relative bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/10 rounded-full pl-4 pr-2 py-2 shadow-2xl shadow-black/50 flex items-center justify-between transition-all duration-300 hover:border-white/20 hover:shadow-black/70">
          
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

          {/* 2. Navigation Cluster - Absolute Center (The "Inner Capsule") */}
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
              className="md:hidden p-2.5 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 rounded-full transition-all focus:outline-none active:scale-95"
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-0 w-full mt-3 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-2 md:hidden max-h-[80vh] overflow-y-auto"
            >
              <div className="flex flex-col space-y-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href.replace('#', '')}
                    spy={true}
                    smooth={true}
                    offset={40} 
                    duration={1000}
                    onClick={() => setIsOpen(false)}
                    className="cursor-pointer block px-4 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/5"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="h-px bg-white/10 my-2 mx-2" />
                <a 
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-1 relative overflow-hidden group flex justify-center items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-cyan-900/20"
                >
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 animate-shine" />
                  <span className="relative z-10 flex items-center gap-2">
                    Falar com Ísis <MessageCircle size={16} />
                  </span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};
