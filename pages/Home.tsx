import React, { Suspense } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Hero } from '../components/sections/Hero';
import { SectionLoader } from '../components/ui/SectionLoader';

// Lazy Load de componentes pesados ou abaixo da dobra
const Partners = React.lazy(() => import('../components/sections/Partners').then(module => ({ default: module.Partners })));
const ChatDemo = React.lazy(() => import('../components/sections/ChatDemo').then(module => ({ default: module.ChatDemo })));
const Solutions = React.lazy(() => import('../components/sections/Solutions').then(module => ({ default: module.Solutions })));
const BentoGrid = React.lazy(() => import('../components/sections/BentoGrid').then(module => ({ default: module.BentoGrid })));
const TechSpecs = React.lazy(() => import('../components/sections/TechSpecs').then(module => ({ default: module.TechSpecs })));
const Pricing = React.lazy(() => import('../components/sections/Pricing').then(module => ({ default: module.Pricing })));
const ImplementationJourney = React.lazy(() => import('../components/sections/ImplementationJourney').then(module => ({ default: module.ImplementationJourney })));
const FAQ = React.lazy(() => import('../components/sections/FAQ').then(module => ({ default: module.FAQ })));
const About = React.lazy(() => import('../components/sections/About').then(module => ({ default: module.About })));
const Footer = React.lazy(() => import('../components/layout/Footer').then(module => ({ default: module.Footer })));

interface HomeProps {
  onTermsClick: (section?: string) => void;
  onOpenTerminal: () => void;
}

export const Home: React.FC<HomeProps> = ({ onTermsClick, onOpenTerminal }) => {
  return (
    <main className="relative z-10">
      <Navbar />

      {/* Hero carrega imediatamente para LCP rápido */}
      <Hero onOpenTerminal={onOpenTerminal} />

      {/* O restante carrega sob demanda com fallback */}
      <Suspense fallback={<SectionLoader />}>
        <ChatDemo />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Solutions />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <BentoGrid />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <TechSpecs />
      </Suspense>

      <Suspense fallback={<div className="h-20 bg-transparent" />}>
        <Partners />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Pricing />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <ImplementationJourney />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <About />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <FAQ />
      </Suspense>

      <Suspense fallback={<div className="h-96 bg-[#050505]" />}>
        <Footer onTermsClick={onTermsClick} onOpenTerminal={onOpenTerminal} />
      </Suspense>
    </main>
  );
};