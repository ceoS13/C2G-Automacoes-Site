
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
import { TerminalModal } from './components/ui/TerminalModal'; // Easter Egg

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
  
  // Easter Egg State
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

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

    // --- EASTER EGG: CONSOLE LOG ---
    // Mensagem secreta para desenvolvedores que inspecionarem o site
    const consoleStyles = [
      'font-size: 12px', 
      'font-family: monospace', 
      'background: #050505', 
      'color: #06b6d4', 
      'padding: 20px', 
      'border: 1px solid #06b6d4',
      'border-radius: 5px',
      'line-height: 1.5'
    ].join(';');

    const asciiArt = `
  ██████╗    ██████╗     ██████╗ 
 ██╔════╝    ╚════██╗   ██╔════╝ 
 ██║          █████╔╝   ██║  ███╗
 ██║         ██╔═══╝    ██║   ██║
 ╚██████╗    ███████╗   ╚██████╔╝
  ╚═════╝    ╚══════╝    ╚═════╝ 
    `;

    const consoleMessage = `
${asciiArt}

👋 Olá, Dev! Curioso sobre nossa arquitetura?

Nós construímos ecossistemas autônomos que realmente funcionam.
Estamos sempre em busca de mentes brilhantes e parceiros estratégicos.

📩 Mande um ping: c2gautomacoes@gmail.com
    `;

    // Timeout para garantir que apareça depois dos logs padrões do navegador/vite
    setTimeout(() => {
      console.log(`%c${consoleMessage}`, consoleStyles);
    }, 1000);

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
      <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />
      <ChatDemo />
      <Solutions />
      <BentoGrid />
      <TechSpecs />
      <Partners />
      <Pricing />
      <ImplementationJourney />
      <About />
      <FAQ />
      <Footer onTermsClick={handleNavigateToTerms} onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Easter Egg Modal */}
      <TerminalModal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
    </div>
  );
};

export default App;
