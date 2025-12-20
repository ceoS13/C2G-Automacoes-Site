
import React, { useEffect, useState, useCallback, Suspense } from 'react';
import AOS from 'aos';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ChatDemo } from './components/ChatDemo';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

// Importações Estáticas para garantir estabilidade do Layout e Scroll correto
import { Solutions } from './components/Solutions';
import { BentoGrid } from './components/BentoGrid';
import { TechSpecs } from './components/TechSpecs';
import { Partners } from './components/Partners';
import { Pricing } from './components/Pricing';
import { ImplementationJourney } from './components/ImplementationJourney';
import { About } from './components/About';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';

// Apenas páginas secundárias permanecem com Lazy Loading
const TermsPage = React.lazy(() => import('./components/TermsPage').then(module => ({ default: module.TermsPage })));

declare global {
  interface Window {
    AOS: typeof AOS;
  }
}

type PageView = 'home' | 'terms';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [targetTermsSection, setTargetTermsSection] = useState<string | undefined>(undefined);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
      offset: 50, 
    });

    window.AOS = AOS;
    
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleNavigateToTerms = useCallback((section?: string) => {
    setTargetTermsSection(section);
    setCurrentView('terms');
  }, []);

  const handleNavigateToHome = useCallback(() => {
    setCurrentView('home');
    setTargetTermsSection(undefined);
    window.scrollTo(0, 0);
    
    setTimeout(() => {
        AOS.refreshHard();
    }, 100);
  }, []);

  if (currentView === 'terms') {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <TermsPage onBack={handleNavigateToHome} initialSection={targetTermsSection} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-cyan-500/30 selection:text-white">
      <Navbar />
      
      {/* Componentes da Landing Page (Renderização Síncrona) */}
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
      <Footer onTermsClick={handleNavigateToTerms} />
    </div>
  );
};

export default App;
