import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechMarquee } from './components/TechMarquee';
import { ChatDemo } from './components/ChatDemo';
import { BentoGrid } from './components/BentoGrid';
import { TechSpecs } from './components/TechSpecs';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { About } from './components/About';
import { Stats } from './components/Stats';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  // Smooth scroll behavior and AOS Initialization
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Initialize AOS after React has mounted the component tree
    const initAOS = () => {
      // @ts-ignore
      if (window.AOS) {
        // @ts-ignore
        window.AOS.init({
          duration: 1000,
          once: true, // Optimization: Only animate once to save resources
          easing: 'ease-out-cubic',
          offset: 50,
        });
        // Force refresh to detect elements rendered by React
        setTimeout(() => {
          // @ts-ignore
          window.AOS.refresh();
        }, 100);
      }
    };

    // Check if AOS is loaded, if not wait for it
    if (document.readyState === 'complete') {
      initAOS();
    } else {
      window.addEventListener('load', initAOS);
    }
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      window.removeEventListener('load', initAOS);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-cyan-500/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <ChatDemo />
        <BentoGrid />
        <TechSpecs />
        <Pricing />
        <FAQ />
        <About />
        <Stats />
      </main>
      <Footer />
    </div>
  );
};

export default App;