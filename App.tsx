
import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

// Lazy Load da página de termos para reduzir o bundle inicial
// Como TermsPage é um export nomeado, precisamos adaptar o import
const TermsPage = React.lazy(() => 
  import('./components/TermsPage').then(module => ({ default: module.TermsPage }))
);

// Define AOS type to avoid @ts-ignore and enable intellisense
declare global {
  interface Window {
    AOS: {
      init: (options: any) => void;
      refresh: () => void;
      refreshHard: () => void;
    };
  }
}

type PageView = 'home' | 'terms';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [targetTermsSection, setTargetTermsSection] = useState<string | undefined>(undefined);

  // Inicializa o AOS globalmente
  useEffect(() => {
    // Garante comportamento padrão de scroll do navegador antes do JS assumir
    document.documentElement.style.scrollBehavior = 'auto';
    
    const initAOS = () => {
      if (window.AOS) {
        window.AOS.init({
          duration: 1000,
          once: true,
          easing: 'ease-out-cubic',
          offset: 100, // Trigger point otimizado
        });
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

  // Otimização: useCallback impede que a Navbar renderize novamente sem necessidade
  const handleNavigateToTerms = useCallback((section?: string) => {
    setTargetTermsSection(section);
    setCurrentView('terms');
  }, []);

  const handleNavigateToHome = useCallback(() => {
    setCurrentView('home');
    setTargetTermsSection(undefined);
    // Reset manual para garantir
    window.scrollTo(0, 0);
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
      <Home onTermsClick={handleNavigateToTerms} />
    </div>
  );
};

export default App;