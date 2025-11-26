import React, { useState } from 'react';
import { Menu, X, Cpu } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

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

  // Custom Smooth Scroll Function
  const smoothScrollTo = (targetId: string, duration: number = 1500) => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const startPosition = window.scrollY;
    // Calculate distance. Subtracting a small offset (e.g., 20px) for visual breathing room
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - 20; 
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    // Easing function: easeInOutCubic
    // t: current time, b: start value, c: change in value, d: duration
    const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t * t + b;
      t -= 2;
      return c / 2 * (t * t * t + 2) + b;
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      
      const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    smoothScrollTo(targetId, 1200); // 1.2s duration for a smooth glide
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Soluções', href: '#solutions' },
    { name: 'Tecnologia', href: '#tech' },
    { name: 'Cases', href: '#cases' },
    { name: 'Preços', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ x: "-50%", y: 0, opacity: 1 }}
        animate={{ 
          x: "-50%",
          y: isVisible ? 0 : -100, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-6 left-1/2 w-[95%] max-w-5xl z-50"
      >
        <div className="relative bg-[#050505]/80 backdrop-blur-md border border-white/5 rounded-full px-6 py-3 shadow-2xl shadow-black/80 transition-all duration-300 flex items-center justify-between">
          
          {/* Logo - Left Align (Flex-1 ensures it pushes from left) */}
          <div className="flex-1 flex justify-start">
            <div 
              className="flex items-center gap-2 cursor-pointer group" 
              onClick={() => smoothScrollTo('root', 1000)} // Scroll to top if logo clicked
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <Cpu className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-lg tracking-tight text-zinc-100 group-hover:text-white transition-colors">
                C2G <span className="text-zinc-500 font-normal group-hover:text-zinc-400">Automações</span>
              </span>
            </div>
          </div>

          {/* Desktop Nav Links - Absolute Center for Perfect Symmetry */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-sm font-medium text-zinc-400 hover:text-white px-4 py-2 rounded-full hover:bg-white/5 transition-all duration-300 whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button & Mobile Toggle - Right Align (Flex-1 ensures it pushes from right) */}
          <div className="flex-1 flex justify-end items-center gap-4">
            <button 
              onClick={() => window.open('https://wa.me/', '_blank')}
              className="hidden md:flex items-center gap-2 bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-blue-600 hover:to-cyan-500 border border-white/5 text-white px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              Falar com Ísis ✨
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown (Detached Island) */}
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
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="block px-4 py-3 rounded-xl text-base font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="h-px bg-white/5 my-2" />
                <button 
                  onClick={() => window.open('https://wa.me/', '_blank')}
                  className="w-full mt-2 flex justify-center items-center gap-2 bg-gradient-to-r from-blue-700 to-cyan-600 text-white px-5 py-3 rounded-xl font-medium shadow-lg shadow-cyan-500/20"
                >
                  Falar com Ísis ✨
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};