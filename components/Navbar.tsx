import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Logo } from './ui/Logo';
import { NAV_LINKS, WHATSAPP_LINK } from '../lib/constants';
import { smoothScrollTo } from '../lib/utils';

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

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    smoothScrollTo(targetId, 1200);
    setIsOpen(false);
  };

  return (
    <>
      <motion.header 
        initial={{ x: "-50%", y: 0, opacity: 1 }}
        animate={{ 
          x: "-50%",
          y: isVisible ? 0 : -100, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-6 left-1/2 w-[95%] md:w-full max-w-5xl z-50"
      >
        <nav className="relative bg-[#050505]/80 backdrop-blur-md border border-white/5 rounded-full px-4 md:px-6 py-3 shadow-2xl shadow-black/80 transition-all duration-300 flex items-center justify-between">
          
          {/* Logo - Left Align */}
          <div className="flex-1 flex justify-start">
            <button 
              type="button"
              className="cursor-pointer group focus:outline-none focus:ring-2 focus:ring-cyan-500/50 rounded-lg" 
              onClick={() => smoothScrollTo('root', 1000)}
              aria-label="Voltar ao topo - C2G Automações"
            >
              <Logo className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop Nav Links - Absolute Center */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-xs lg:text-sm font-medium text-zinc-400 hover:text-white hover:[text-shadow:0_0_10px_rgba(34,211,238,0.5)] px-3 py-2 rounded-full hover:bg-white/5 transition-all duration-300 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button & Mobile Toggle - Right Align */}
          <div className="flex-1 flex justify-end items-center gap-4">
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-blue-600 hover:to-cyan-500 border border-white/5 text-white px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-cyan-500"
            >
              Falar com Ísis
            </a>

            {/* Mobile Menu Button */}
            <button 
              type="button"
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full mt-2 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-4 md:hidden"
            >
              <div className="flex flex-col space-y-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="block px-4 py-3 rounded-xl text-base font-medium text-zinc-300 hover:text-white hover:[text-shadow:0_0_10px_rgba(34,211,238,0.5)] hover:bg-white/5 transition-all"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="h-px bg-white/5 my-2" />
                <a 
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-2 flex justify-center items-center gap-2 bg-gradient-to-r from-blue-700 to-cyan-600 text-white px-5 py-3 rounded-xl font-medium shadow-lg shadow-cyan-500/20"
                >
                  Falar com Ísis
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};