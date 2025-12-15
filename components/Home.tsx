import React, { useEffect } from 'react';
import { Hero } from './Hero';
import { Partners } from './Partners';
import { ChatDemo } from './ChatDemo';
import { Solutions } from './Solutions';
import { BentoGrid } from './BentoGrid';
import { TechSpecs } from './TechSpecs';
import { Pricing } from './Pricing';
import { ImplementationJourney } from './ImplementationJourney';
import { FAQ } from './FAQ';
import { About } from './About';
import { Footer } from './Footer';
import AOS from 'aos';

interface HomeProps {
  onTermsClick: (section?: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onTermsClick }) => {
  
  useEffect(() => {
    // Força o AOS a recalcular (hard refresh) a posição dos elementos assim que a Home é montada
    // Isso garante que os elementos 'fade-up' não fiquem invisíveis (opacity: 0) ao voltar de outra página
    AOS.refreshHard();
      
    // Fallback de segurança para garantir que elementos pesados carregaram
    setTimeout(() => {
      AOS.refreshHard();
    }, 500); 
  }, []);

  return (
    <main className="relative z-10">
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
      <Footer onTermsClick={onTermsClick} />
    </main>
  );
};