
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

    // --- EASTER EGG: CONSOLE LOG FIX ---
    // Delay aumentado para garantir que apareça por último no console
    const consoleTimer = setTimeout(() => {
        const asciiArt = [
          "  ██████╗    ██████╗     ██████╗ ",
          " ██╔════╝    ╚════██╗   ██╔════╝ ",
          " ██║          █████╔╝   ██║  ███╗",
          " ██║         ██╔═══╝    ██║   ██║",
          " ╚██████╗    ███████╗   ╚██████╔╝",
          "  ╚═════╝    ╚══════╝    ╚═════╝ "
        ].join('\n');

        // 1. Log da Arte (Apenas cor, sem background para evitar quebra de linha feia)
        console.log(`%c${asciiArt}`, 'color: #06b6d4; font-weight: bold; line-height: 1.2;');

        // 2. Log da Mensagem (Com formatação mista)
        console.log(
            `%c👋 Olá, Dev! Curioso sobre nossa arquitetura?\n\n` +
            `%cNós construímos ecossistemas autônomos que realmente funcionam.\n` +
            `Estamos sempre em busca de mentes brilhantes e parceiros estratégicos.\n\n` +
            `%c📩 Mande um ping: c2gautomacoes@gmail.com`,
            // Estilo do Título
            'color: #ffffff; font-family: system-ui, sans-serif; font-size: 14px; font-weight: bold;',
            // Estilo do Corpo
            'color: #a1a1aa; font-family: system-ui, sans-serif; font-size: 12px; line-height: 1.5;',
            // Estilo do Botão/Email (Caixa ciano)
            'color: #06b6d4; font-family: monospace; font-size: 12px; background: #0a0a0a; border: 1px solid #06b6d4; padding: 6px; border-radius: 4px; margin-top: 10px;'
        );
    }, 2000);

    return () => {
        clearTimeout(timer);
        clearTimeout(consoleTimer);
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
