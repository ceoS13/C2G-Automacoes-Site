import React, { useState, useCallback, Suspense, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Home } from './pages/Home';
import { TermsPage } from './pages/TermsPage';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

const TerminalModal = React.lazy(() => import('./components/ui/TerminalModal').then(module => ({ default: module.TerminalModal })));

type PageView = 'home' | 'terms';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [targetTermsSection, setTargetTermsSection] = useState<string | undefined>(undefined);

  // Easter Egg State
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Easter Egg do Console
  useEffect(() => {
    const consoleTimer = setTimeout(() => {
      const asciiArt = [
        "  ██████╗    ██████╗     ██████╗ ",
        " ██╔════╝    ╚════██╗   ██╔════╝ ",
        " ██║          █████╔╝   ██║  ███╗",
        " ██║         ██╔═══╝    ██║   ██║",
        " ╚██████╗    ███████╗   ╚██████╔╝",
        "  ╚═════╝    ╚══════╝    ╚═════╝ "
      ].join('\n');

      console.log(`%c${asciiArt}`, 'color: #06b6d4; font-weight: bold; line-height: 1.2;');
      console.log(
        `%c👋 Olá, Dev! Curioso sobre nossa arquitetura?\n\n` +
        `%cNós construímos ecossistemas autônomos que realmente funcionam.\n` +
        `Estamos sempre em busca de mentes brilhantes e parceiros estratégicos.\n\n` +
        `%c📩 Mande um ping: c2gautomacoes@gmail.com`,
        'color: #ffffff; font-family: system-ui, sans-serif; font-size: 14px; font-weight: bold;',
        'color: #a1a1aa; font-family: system-ui, sans-serif; font-size: 12px; line-height: 1.5;',
        'color: #06b6d4; font-family: monospace; font-size: 12px; background: #0a0a0a; border: 1px solid #06b6d4; padding: 6px; border-radius: 4px; margin-top: 10px;'
      );
    }, 2000);

    return () => clearTimeout(consoleTimer);
  }, []);

  const handleNavigateToTerms = useCallback((section?: string) => {
    setTargetTermsSection(section);
    setCurrentView('terms');
  }, []);

  const handleNavigateToHome = useCallback(() => {
    setCurrentView('home');
    setTargetTermsSection(undefined);
    window.scrollTo(0, 0);
  }, []);

  if (currentView === 'terms') {
    return (
      <div className="min-h-screen bg-[#050505] text-white">
        <TermsPage onBack={handleNavigateToHome} initialSection={targetTermsSection} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-cyan-500/30 selection:text-white">

      <Home
        onTermsClick={handleNavigateToTerms}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Easter Egg Modal Global */}
      <Suspense fallback={null}>
        <TerminalModal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
      </Suspense>

      <Analytics />
    </div>
  );
};

export default App;
