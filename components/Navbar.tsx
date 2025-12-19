import React, { useState, memo } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link, animateScroll as scroll } from 'react-scroll';
import { Logo } from './ui/Logo';
import { NAV_LINKS, WHATSAPP_LINK } from '../lib/constants';

export const Navbar: React.FC = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setIsVisible(false);
      setIsOpen(false);
    } else {
      setIsVisible(true);
    }
  });

  return (
    <motion.header 
      initial={{ y: -100, x: "-50%", opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100,
        x: "-50%",
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed top-4 left-1/2 w-[95%] max-w-7xl z-50 will-change-transform"
    >
      <nav className="relative bg-[#0a0a0a]/70 backdrop-blur-lg border border-white/10 rounded-full pl-4 pr-2 py-2 shadow-2xl flex items-center justify-between">
        
        <div className="shrink-0 flex items-center">
          <button 
            type="button"
            className="cursor-pointer group hover:scale-105 transition-transform" 
            onClick={() => scroll.scrollToTop()}
          >
            <Logo className="h-10 w-auto" />
          </button>
        </div>

        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center">
          <div className="flex items-center gap-1 bg-white/5 border border-white/5 rounded-full px-2 py-1">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.name} 
                to={link.href.replace('#', '')}
                spy={true}
                smooth={true}
                offset={0}
                duration={800}
                className="cursor-pointer px-3 py-1.5 rounded-full text-[11px] font-medium text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
                activeClass="!text-white !bg-white/10"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider hover:scale-105 transition-all shadow-lg shadow-cyan-900/20"
          >
            Falar com Ísis <MessageCircle size={14} />
          </a>

          <button 
            type="button"
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden p-2 text-zinc-400 hover:text-white bg-white/5 rounded-full"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full mt-3 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.href.replace('#', '')}
                spy={true}
                smooth={true}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
});