import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

// Eager Load (Carregamento Padrão)
// Garante que o AOS calcule corretamente a altura da página e as animações funcionem.
// Lazy Loading em Landing Pages verticais com AOS frequentemente causa "conteúdo invisível".
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

// Mantemos Lazy Load apenas para páginas/modais secundários que não afetam o scroll inicial
const TermsPage = React.lazy(() => 
  import('./components/TermsPage').then(module => ({ default: module.TermsPage }))
);

// Define AOS type to avoid @ts-ignore
declare global {
  interface Window {
    AOS: {
      init: (options: {
        duration?: number;
        once?: boolean;
        easing?: string;
        offset?: number;
      }) => void;
      refresh: () => void;
      refreshHard: () => void;
    };
  }
}

type PageView = 'home' | 'terms';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [targetTermsSection, setTargetTermsSection] = useState<string | undefined>(undefined);

  useEffect(() => {
    // 1. Configuração do Scroll
    document.documentElement.style.scrollBehavior = 'auto';
    
    // 2. Inicialização do AOS
    const initAOS = () => {
      if (window.AOS) {
        window.AOS.init({
          duration: 1000,
          once: true, // Anima apenas uma vez para melhor performance
          easing: 'ease-out-cubic',
          offset: 50, 
        });
        
        // Garante que o layout esteja calculado
        setTimeout(() => {
          window.AOS.refresh();
        }, 500);
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
        if(window.AOS) window.AOS.refreshHard();
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
      
      {/* 
        Renderização Direta (Sem Suspense para seções principais)
        Isso corrige o bug de elementos desaparecidos.
      */}
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