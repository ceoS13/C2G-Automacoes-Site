import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Partners } from './components/Partners';
import { ChatDemo } from './components/ChatDemo';
import { Solutions } from './components/Solutions';
import { BentoGrid } from './components/BentoGrid';
import { TechSpecs } from './components/TechSpecs';
import { Pricing } from './components/Pricing';
import { ImplementationJourney } from './components/ImplementationJourney';
import { FAQ } from './components/FAQ';
import { About } from './components/About';
import { Footer } from './components/Footer';

// Define AOS type to avoid @ts-ignore
declare global {
  interface Window {
    AOS: {
      init: (options: any) => void;
      refresh: () => void;
    };
  }
}

const App: React.FC = () => {
  // Smooth scroll behavior and AOS Initialization
  useEffect(() => {
    // Determine if we want native smooth scroll or JS controlled. 
    // Setting it to auto here allows our custom smoothScrollTo to work without fighting native behavior.
    document.documentElement.style.scrollBehavior = 'auto';
    
    const initAOS = () => {
      if (window.AOS) {
        window.AOS.init({
          duration: 1200, // Increased from 1000 to 1200 for smoother entrance
          once: true,
          easing: 'ease-out-cubic',
          offset: 150, // Increased offset to trigger animations later (when scrolling to the right height)
        });
        // Force refresh to detect elements rendered by React
        setTimeout(() => {
          window.AOS.refresh();
        }, 100);
      }
    };

    if (document.readyState === 'complete') {
      initAOS();
    } else {
      window.addEventListener('load', initAOS);
    }
    
    return () => {
      window.removeEventListener('load', initAOS);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-cyan-500/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <ChatDemo />
        <Solutions />
        <BentoGrid />
        <TechSpecs />
        <Partners />
        <Pricing />
        <ImplementationJourney />
        <About />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default App;