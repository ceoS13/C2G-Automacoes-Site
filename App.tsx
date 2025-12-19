
import React, { useEffect, useState, useCallback, Suspense } from 'react';
import AOS from 'aos';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ChatDemo } from './components/ChatDemo';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

// Lazy Loading para componentes abaixo da dobra para reduzir o JS inicial
const Solutions = React.lazy(() => import('./components/Solutions').then(m => ({ default: m.Solutions })));
const BentoGrid = React.lazy(() => import('./components/BentoGrid').then(m => ({ default: m.BentoGrid })));
const TechSpecs = React.lazy(() => import('./components/TechSpecs').then(m => ({ default: m.TechSpecs })));
const Partners = React.lazy(() => import('./components/Partners').then(m => ({ default: m.Partners })));
const Pricing = React.lazy(() => import('./components/Pricing').then(m => ({ default: m.Pricing })));
const ImplementationJourney = React.lazy(() => import('./components/ImplementationJourney').then(m => ({ default: m.ImplementationJourney })));
const About = React.lazy(() => import('./components/About').then(m => ({ default: m.About })));
const FAQ = React.lazy(() => import('./components/FAQ').then(m => ({ default: m.FAQ })));
const Footer = React.lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));
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
      
      {/* Componentes Críticos (Eager Load) */}
      <Hero />
      <ChatDemo />

      {/* Componentes Não Críticos (Lazy Load com Suspense para evitar layout shift) */}
      <Suspense fallback={<div className="h-96 bg-[#050505]" />}>
        <Solutions />
        <div className="critical-hide"><BentoGrid /></div>
        <div className="critical-hide"><TechSpecs /></div>
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
