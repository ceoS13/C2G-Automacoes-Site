
import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { TermsPage } from './components/TermsPage';

// Define AOS type to avoid @ts-ignore
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

  // Inicializa o AOS globalmente apenas uma vez
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    
    const initAOS = () => {
      if (window.AOS) {
        window.AOS.init({
          duration: 1200,
          once: true,
          easing: 'ease-out-cubic',
          offset: 150,
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

  const handleNavigateToTerms = () => {
    window.scrollTo(0, 0);
    setCurrentView('terms');
  };

  const handleNavigateToHome = () => {
    setCurrentView('home');
    window.scrollTo(0, 0);
    // O componente <Home /> cuidará de dar refreshHard no AOS ao ser montado
  };

  if (currentView === 'terms') {
    return <TermsPage onBack={handleNavigateToHome} />;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-cyan-500/30 selection:text-white">
      <Navbar />
      <Home onTermsClick={handleNavigateToTerms} />
    </div>
  );
};

export default App;
