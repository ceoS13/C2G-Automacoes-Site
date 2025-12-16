import React, { useEffect, useState, useCallback, Suspense } from 'react';
import AOS from 'aos';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

// Eager Load (Carregamento Padrão)
import { ChatDemo } from './components/ChatDemo';
import { Solutions } from './components/Solutions';
import { BentoGrid } from './components/BentoGrid';
import { TechSpecs } from './components/TechSpecs';
import { Partners } from './components/Partners';
import { Pricing } from './components/Pricing';
import { ImplementationJourney } from './components/ImplementationJourney';
import { About } from './components/About';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';

// Mantemos Lazy Load apenas para páginas/modais secundários
const TermsPage = React.lazy(() => 
  import('./components/TermsPage').then(module => ({ default: module.TermsPage }))
);

// Define AOS type globally for debugging access via window.AOS
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
    // 1. Configuração do Scroll
    document.documentElement.style.scrollBehavior = 'auto';
    
    // 2. Inicialização do AOS (Migrado para NPM)
    AOS.init({
      duration: 1000,
      once: true, // Anima apenas uma vez para melhor performance
      easing: 'ease-out-cubic',
      offset: 50, 
    });

    // Expose AOS to window for debugging or legacy checks
    window.AOS = AOS;
    
    // Garante que o layout esteja calculado e força refresh inicial
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
    
    // Força refresh do AOS ao voltar para Home
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
      
      {/* Renderização Direta */}
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