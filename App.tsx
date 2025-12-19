
import React, { useEffect, useState, useCallback, Suspense, lazy } from 'react';
import AOS from 'aos';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

// Eager Load: Apenas o que é visível imediatamente
import { ChatDemo } from './components/ChatDemo';

// Lazy Load: Componentes abaixo da dobra para reduzir o bundle inicial
const Solutions = lazy(() => import('./components/Solutions').then(m => ({ default: m.Solutions })));
const BentoGrid = lazy(() => import('./components/BentoGrid').then(m => ({ default: m.BentoGrid })));
const TechSpecs = lazy(() => import('./components/TechSpecs').then(m => ({ default: m.TechSpecs })));
const Partners = lazy(() => import('./components/Partners').then(m => ({ default: m.Partners })));
const Pricing = lazy(() => import('./components/Pricing').then(m => ({ default: m.Pricing })));
const ImplementationJourney = lazy(() => import('./components/ImplementationJourney').then(m => ({ default: m.ImplementationJourney })));
const About = lazy(() => import('./components/About').then(m => ({ default: m.About })));
const FAQ = lazy(() => import('./components/FAQ').then(m => ({ default: m.FAQ })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));

const TermsPage = React.lazy(() => 
  import('./components/TermsPage').then(module => ({ default: module.TermsPage }))
);

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
    
    // 2. Inicialização do AOS
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-quart',
      offset: 50,
      disable: 'mobile' // Opcional: Desabilitar em mobile se performance for crítica, mas mantemos para layout
    });

    window.AOS = AOS;
    
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 100);

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
      
      <Hero />
      <ChatDemo />
      
      {/* Suspense envolve o conteúdo pesado para não travar o carregamento do Hero */}
      <Suspense fallback={<div className="h-96 bg-[#050505]" />}>
        <Solutions />
        <BentoGrid />
        <TechSpecs />
        <Partners />
        <Pricing />
        <ImplementationJourney />
        <About />
        <FAQ />
        <Footer onTermsClick={handleNavigateToTerms} />
      </Suspense>
    </div>
  );
};

export default App;
