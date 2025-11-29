import React, { useRef } from 'react';
import { Rocket, Code, TrendingUp } from 'lucide-react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { WHATSAPP_LINK } from '../lib/constants';

const steps = [
  {
    icon: Rocket,
    title: 'Kickoff & Mapeamento',
    desc: 'Reunião de alinhamento estratégico e liberação de acessos (Dia 1).',
    id: 1
  },
  {
    icon: Code,
    title: 'Engenharia & Setup',
    desc: 'Construção dos fluxos, integração de bancos de dados e testes de estresse (Dias 2-14).',
    id: 2
  },
  {
    icon: TrendingUp,
    title: 'Go-Live & Monitoramento',
    desc: 'Seu ecossistema entra no ar. Acompanhamento em tempo real e otimização contínua.',
    id: 3
  }
];

interface StepItemProps {
  step: any;
  index: number;
  progress: any;
}

const StepItem: React.FC<StepItemProps> = ({ step, index, progress }) => {
  // Speed up trigger: index * 0.25 means:
  // Step 0: 0.0, Step 1: 0.25, Step 2: 0.50
  // This ensures all steps are lit up by the time the user scrolls halfway through the section
  const triggerPoint = index * 0.25; 
  const duration = 0.2; 

  const opacity = useTransform(progress, [triggerPoint, triggerPoint + duration], [0.3, 1]);
  const scale = useTransform(progress, [triggerPoint, triggerPoint + duration], [0.8, 1]);
  const y = useTransform(progress, [triggerPoint, triggerPoint + duration], [20, 0]);
  const glow = useTransform(progress, [triggerPoint, triggerPoint + duration], ["0px 0px 0px rgba(6,182,212,0)", "0px 0px 30px rgba(6,182,212,0.6)"]);
  const iconColor = useTransform(progress, [triggerPoint, triggerPoint + duration], ["#52525b", "#22d3ee"]);
  const borderColor = useTransform(progress, [triggerPoint, triggerPoint + duration], ["rgba(255,255,255,0.1)", "rgba(6,182,212,0.5)"]);

  const Icon = step.icon;

  return (
    <div className="relative flex flex-row md:flex-col items-start md:items-center gap-6 md:gap-0 z-10">
      <motion.div 
        style={{ scale, boxShadow: glow, borderColor }}
        className="relative w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-full bg-[#0a0a0a] border flex items-center justify-center z-10 transition-colors duration-200"
      >
        <motion.div style={{ color: iconColor }}>
          <Icon size={32} />
        </motion.div>
      </motion.div>

      <motion.div 
        style={{ opacity, y }}
        className="md:mt-8 text-left md:text-center pt-1 md:pt-0"
      >
        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
        <p className="text-zinc-400 leading-relaxed text-sm md:text-base max-w-xs mx-auto">{step.desc}</p>
      </motion.div>
    </div>
  );
};

export const ImplementationJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // "start 85%" -> animation starts when top of section is near bottom of viewport
    // "center center" -> animation finishes when center of section is at center of viewport
    // This creates a very fast, responsive feel
    offset: ["start 85%", "center center"] 
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map 0-0.75 progress to 0-1 scale to sync with the last item activation
  const lineScale = useTransform(smoothProgress, [0, 0.75], [0, 1]);

  return (
    <section ref={containerRef} className="py-20 md:py-32 bg-[#050505] relative overflow-hidden border-t border-white/5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-[#050505] to-[#050505] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
            <div className="text-center mb-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-cyan-950/20 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest">
                    Processo
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                    Do Kickoff à Autonomia em <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">3 Passos</span>
                </h2>
                <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                    Transformamos sua operação com uma metodologia ágil e segura, ativando sua infraestrutura em tempo recorde.
                </p>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                {/* Background Lines (Static) */}
                <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-[2px] bg-zinc-800/50 -z-10" />
                <div className="md:hidden absolute top-8 bottom-20 left-[2rem] w-[2px] bg-zinc-800/50 -z-10" />

                {/* Animated Neon Lines */}
                <motion.div 
                    style={{ scaleX: lineScale }}
                    className="hidden md:block absolute top-10 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 origin-left shadow-[0_0_20px_2px_rgba(6,182,212,0.6)] z-0"
                >
                  <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white to-transparent opacity-50 blur-[2px]" />
                </motion.div>

                <motion.div 
                    style={{ scaleY: lineScale }}
                    className="md:hidden absolute top-8 bottom-20 left-[2rem] w-[2px] bg-gradient-to-b from-cyan-500 via-blue-500 to-cyan-400 origin-top shadow-[0_0_20px_2px_rgba(6,182,212,0.6)] z-0"
                >
                   <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent opacity-50 blur-[2px]" />
                </motion.div>

                {steps.map((step, index) => (
                    <StepItem 
                      key={index} 
                      step={step} 
                      index={index} 
                      progress={smoothProgress} 
                    />
                ))}
            </div>
            
            <motion.div 
              style={{ opacity: smoothProgress }}
              className="text-center mt-16 md:mt-20"
            >
                <button 
                    onClick={() => window.open(WHATSAPP_LINK, '_blank')}
                    className="inline-flex items-center gap-2 text-sm font-mono text-zinc-500 hover:text-cyan-400 transition-colors border-b border-transparent hover:border-cyan-400 pb-0.5 group"
                >
                    Ver cronograma detalhado <TrendingUp size={14} className="group-hover:rotate-45 transition-transform"/>
                </button>
            </motion.div>
        </div>
    </section>
  );
};