
import React, { useEffect, useRef } from 'react';
import { Rocket, Code2, Zap, ArrowRight } from 'lucide-react';
import { WHATSAPP_LINK } from '../lib/constants';
import { motion, useMotionValue, useTransform, animate, MotionValue, useInView, useMotionTemplate } from 'framer-motion';

const STEPS = [
  {
    id: '01',
    title: 'Kickoff & Mapeamento',
    description: 'Alinhamento estratégico e liberação de acessos. Mapeamos suas regras de negócio para garantir que a IA siga seus processos.',
    duration: 'Semana 1',
    icon: Rocket,
    hexColor: '#22d3ee',
    shadowColor: 'rgba(6,182,212,0.6)', 
    gradientStyle: 'linear-gradient(to right, #06b6d4, #3b82f6)',
    activationRange: [0, 16, 32],
    features: ["Reunião de Alinhamento", "Mapeamento de Processos", "Definição de Persona", "Acesso às Plataformas"]
  },
  {
    id: '02',
    title: 'Engenharia & Setup',
    description: 'Nossos engenheiros constroem os fluxos no n8n, integram os bancos de dados e configuram os guard-rails de segurança.',
    duration: 'Semana 2-3',
    icon: Code2,
    hexColor: '#c084fc',
    shadowColor: 'rgba(168,85,247,0.6)',
    gradientStyle: 'linear-gradient(to right, #a855f7, #6366f1)',
    activationRange: [34, 50, 66],
    features: ["Desenvolvimento de Fluxos (n8n)", "Integração de APIs/CRM", "Configuração de Segurança", "Testes de Stress"]
  },
  {
    id: '03',
    title: 'Go-Live & Monitoramento',
    description: 'Virada de chave. O ecossistema entra no ar. Monitoramos as primeiras interações em tempo real para calibração fina.',
    duration: 'Semana 4',
    icon: Zap,
    hexColor: '#34d399',
    shadowColor: 'rgba(16,185,129,0.6)',
    gradientStyle: 'linear-gradient(to right, #34d399, #14b8a6)',
    activationRange: [68, 84, 100],
    features: ["Deploy em Produção", "Monitoramento Real-time", "Ajustes de Calibragem", "Treinamento da Equipe"]
  }
];

interface JourneyCardProps {
    step: typeof STEPS[0];
    progress: MotionValue<number>;
    index: number;
}

const JourneyCard: React.FC<JourneyCardProps> = ({ step, progress, index }) => {
    const activeOpacity = useTransform(progress, step.activationRange, [0, 1, 0]);
    const borderOpacity = useTransform(progress, step.activationRange, [0, 1, 0]);
    const scale = useTransform(progress, step.activationRange, [1, 1.02, 1]);
    const titleColor = useTransform(progress, step.activationRange, ["#d4d4d8", "#ffffff", "#d4d4d8"]);
    const descColor = useTransform(progress, step.activationRange, ["#a1a1aa", "#ffffff", "#a1a1aa"]);

    return (
        <motion.div className="group relative h-full will-change-transform" style={{ scale }} data-aos="fade-up" data-aos-delay={index * 150}>
            <div className="relative h-full bg-[#0a0a0a]/95 rounded-[2rem] p-8 overflow-hidden border border-white/10 z-10 flex flex-col">
                <motion.div className="absolute inset-0 rounded-[2rem] border-2 pointer-events-none" style={{ opacity: borderOpacity, borderColor: step.hexColor }} />
                <motion.div style={{ opacity: activeOpacity }} className="absolute top-0 left-0 w-full z-20">
                    <div className="w-full h-[2px]" style={{ background: step.gradientStyle }} />
                </motion.div>
                <div className="absolute -right-6 -bottom-10 text-[140px] font-bold font-mono text-white/[0.02] select-none leading-none z-0">{step.id}</div>
                <div className="relative z-10 mb-6">
                    <div className="w-14 h-14 mb-6 flex items-center justify-center border border-white/10 rounded-2xl bg-white/5">
                        <step.icon size={28} style={{ color: step.hexColor }} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider border border-white/10 text-zinc-500 px-2 py-0.5 rounded">Fase {step.id}</span>
                        <span className="text-xs font-mono text-zinc-500">{step.duration}</span>
                    </div>
                    <motion.h3 style={{ color: titleColor }} className="text-2xl font-bold">{step.title}</motion.h3>
                </div>
                <div className="relative z-10 flex-1">
                    <motion.p style={{ color: descColor }} className="leading-relaxed text-sm mb-6 border-l-2 border-white/5 pl-4 ml-1">{step.description}</motion.p>
                    <div className="space-y-3 pt-6 border-t border-white/5">
                        {step.features.map((f, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-zinc-500">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: step.hexColor }} /> {f}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export const ImplementationJourney: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { amount: 0.1 });
  const beamProgress = useMotionValue(0);

  useEffect(() => {
    let controls;
    if (isInView) {
        controls = animate(beamProgress, 100, { duration: 8, ease: "linear", repeat: Infinity });
    }
    return () => controls?.stop();
  }, [isInView]);

  // FIX: Usando 'x' (transform) em vez de 'left' para evitar Reflow
  const beamX = useTransform(beamProgress, [0, 100], ["0%", "500%"]);
  const beamColor = useTransform(beamProgress, [0, 33, 66, 100], ["#22d3ee", "#c084fc", "#34d399", "#22d3ee"]);
  const beamGradient = useMotionTemplate`linear-gradient(to right, transparent, ${beamColor}, transparent)`;

  return (
    <section id="process" ref={containerRef} className="py-24 bg-[#050505] relative overflow-hidden border-t border-white/5 [contain:paint]">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20" data-aos="fade-up">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Do Zero à Autonomia em <span className="text-cyan-400">3 Passos</span></h2>
                <p className="text-zinc-400 text-lg">Processo estruturado via engenharia, sem achismos.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -translate-y-1/2 z-0 overflow-hidden">
                    <motion.div style={{ x: beamX, background: beamGradient }} className="absolute top-0 w-[100px] h-full blur-[1px]" />
                </div>
                {STEPS.map((step, index) => <JourneyCard key={step.id} step={step} index={index} progress={beamProgress} />)}
            </div>
        </div>
    </section>
  );
};
