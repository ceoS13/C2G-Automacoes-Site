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
          offset: 50,
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
    <div className="min-h-screen text-white overflow-x-hidden selection:bg-cyan-500/30 selection:text-white relative">
      {/* Global Vignette (Vinheta) Overlay - Fixed to ensure grid depth effect focuses on center */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] opacity-80" aria-hidden="true" />
      
      <div className="relative z-10">
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
    </div>
  );
};

export default App;