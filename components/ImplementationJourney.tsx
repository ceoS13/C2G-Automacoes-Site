
import React, { useEffect } from 'react';
import { Rocket, Code2, Zap, ArrowRight } from 'lucide-react';
import { WHATSAPP_LINK } from '../lib/constants';
import { motion, useMotionValue, useTransform, animate, MotionValue } from 'framer-motion';

const STEPS = [
  {
    id: '01',
    title: 'Kickoff & Mapeamento',
    description: 'Alinhamento estratégico e liberação de acessos. Mapeamos suas regras de negócio para garantir que a IA siga seus processos.',
    duration: 'Semana 1',
    icon: Rocket,
    color: 'cyan',
    shadowColor: 'rgba(6,182,212,0.6)', // Cyan glow
    gradient: 'from-cyan-500 to-blue-500',
    // Ranges: [Start, Peak, End] of the beam progress (0-100)
    activationRange: [0, 16, 32],
    features: [
        "Reunião de Alinhamento",
        "Mapeamento de Processos",
        "Definição de Persona",
        "Acesso às Plataformas"
    ]
  },
  {
    id: '02',
    title: 'Engenharia & Setup',
    description: 'Nossos engenheiros constroem os fluxos no n8n, integram os bancos de dados e configuram os guard-rails de segurança.',
    duration: 'Semana 2-3',
    icon: Code2,
    color: 'purple',
    shadowColor: 'rgba(168,85,247,0.6)', // Purple glow
    gradient: 'from-purple-500 to-indigo-500',
    activationRange: [34, 50, 66],
    features: [
        "Desenvolvimento de Fluxos (n8n)",
        "Integração de APIs/CRM",
        "Configuração de Segurança",
        "Testes de Stress"
    ]
  },
  {
    id: '03',
    title: 'Go-Live & Monitoramento',
    description: 'Virada de chave. O ecossistema entra no ar. Monitoramos as primeiras interações em tempo real para calibração fina.',
    duration: 'Semana 4',
    icon: Zap,
    color: 'emerald',
    shadowColor: 'rgba(16,185,129,0.6)', // Emerald glow
    gradient: 'from-emerald-400 to-teal-500',
    activationRange: [68, 84, 100],
    features: [
        "Deploy em Produção",
        "Monitoramento Real-time",
        "Ajustes de Calibragem",
        "Treinamento da Equipe"
    ]
  }
];

// Sub-componente para isolar a lógica de transformação de cada card
const JourneyCard = ({ step, progress, index }: { step: typeof STEPS[0], progress: MotionValue<number>, index: number }) => {
    
    // Transforma o progresso (0-100) em opacidade (0-1-0) baseada no range do card
    const activeOpacity = useTransform(
        progress,
        step.activationRange, 
        [0, 1, 0] 
    );

    // Borda Brilhante: Controla a opacidade da borda colorida
    const borderOpacity = useTransform(progress, step.activationRange, [0, 1, 0]);
    
    // Sombra Neon: Cria um "Glow" externo quando a luz passa
    const boxShadow = useTransform(
        progress, 
        step.activationRange, 
        [`0 0 0px transparent`, `0 0 30px ${step.shadowColor}`, `0 0 0px transparent`]
    );

    const scale = useTransform(progress, step.activationRange, [1, 1.02, 1]);

    return (
        <motion.div 
            className="group relative h-full"
            style={{ scale }}
            data-aos="fade-up"
            data-aos-delay={index * 150}
        >
            {/* Card Structure */}
            <div className="relative h-full bg-[#0a0a0a]/90 backdrop-blur-xl rounded-[2rem] p-8 overflow-hidden transition-all duration-500 z-10 flex flex-col group/card">
                
                {/* 1. THE ACTIVE BORDER (Neon Effect) */}
                {/* Esta div fica por cima e acende com a cor específica e sombra */}
                <motion.div 
                    className={`absolute inset-0 rounded-[2rem] border-2 border-${step.color}-500 transition-colors duration-100 pointer-events-none`}
                    style={{ 
                        opacity: borderOpacity,
                        boxShadow: boxShadow
                    }} 
                />
                
                {/* 2. Static Border (Always visible, faint) */}
                <div className="absolute inset-0 rounded-[2rem] border border-white/10 pointer-events-none" />

                {/* 3. Top Neon Strip (Controlled by Beam) */}
                {/* Mantemos a faixa superior pois ela conecta visualmente com o fio */}
                <motion.div style={{ opacity: activeOpacity }} className="absolute top-0 left-0 w-full z-20">
                    <div className={`w-full h-[2px] bg-gradient-to-r ${step.gradient}`} />
                    <div className={`absolute top-0 left-0 w-full h-[15px] bg-gradient-to-r ${step.gradient} blur-[10px]`} />
                </motion.div>

                {/* Giant Background Number */}
                <div className="absolute -right-6 -bottom-10 text-[140px] font-bold font-mono text-white/[0.03] group-hover:text-white/[0.05] transition-colors duration-500 select-none leading-none tracking-tighter z-0">
                    {step.id}
                </div>

                {/* Card Header */}
                <div className="relative z-10 mb-6">
                    {/* Icon Container */}
                    <div className="relative w-14 h-14 mb-6 flex items-center justify-center">
                        
                        {/* Icon Background Glow (Controlled by Beam) */}
                        <motion.div 
                            style={{ opacity: activeOpacity }}
                            className={`absolute inset-0 bg-gradient-to-br ${step.gradient} rounded-2xl blur-md opacity-40`} 
                        />
                        
                        <div className="absolute inset-0 border border-white/10 rounded-2xl bg-white/5" />
                        <step.icon size={28} className={`relative z-10 text-${step.color}-400`} />
                    </div>

                    <div className="flex items-center justify-between mb-2">
                        <motion.span 
                            style={{ 
                                borderColor: useTransform(activeOpacity, [0, 1], ['rgba(255,255,255,0.1)', `rgba(var(--${step.color}-rgb), 0.5)`]),
                                color: useTransform(activeOpacity, [0, 1], ['rgba(113, 113, 122, 1)', `rgba(var(--${step.color}-rgb), 1)`]) // Zinc-500 to Color-500
                            }}
                            className={`text-[10px] font-bold uppercase tracking-wider border px-2 py-0.5 rounded transition-colors duration-300`}
                        >
                            Fase {step.id}
                        </motion.span>
                        <span className="text-xs font-mono text-zinc-500">{step.duration}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-50 transition-colors">
                        {step.title}
                    </h3>
                </div>

                {/* Content */}
                <div className="relative z-10 flex-1 flex flex-col">
                    <p className="text-zinc-400 leading-relaxed text-sm mb-6 flex-1 border-l-2 border-white/5 pl-4 ml-1">
                        {step.description}
                    </p>
                    
                    <div className="space-y-3 pt-6 border-t border-white/5">
                        {step.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
                                <motion.div 
                                    style={{ opacity: useTransform(activeOpacity, [0, 0.5, 1], [0.3, 1, 1]) }}
                                    className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.gradient}`} 
                                />
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export const ImplementationJourney: React.FC = () => {
  // Global Progress Value (0 to 100)
  const beamProgress = useMotionValue(0);

  useEffect(() => {
    // Slower animation (10 seconds) for the "Scanning" effect
    const controls = animate(beamProgress, 100, {
      duration: 10,
      ease: "linear",
      repeat: Infinity,
      repeatDelay: 1 // Small pause before restarting
    });
    return controls.stop;
  }, []);

  // Map beam progress to the visual line position (0% to 100% width/left)
  const beamLeft = useTransform(beamProgress, (value) => `${value}%`);

  return (
    <section id="process" className="py-24 md:py-32 bg-[#050505] relative overflow-hidden border-t border-white/5">
        
        {/* Background Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(6,182,212,0.05)_0%,transparent_60%)] pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-20 md:mb-24" data-aos="fade-up">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass-panel mb-6 md:mb-8 bg-black/50">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                    <span className="text-[10px] md:text-xs font-mono text-cyan-200/80 uppercase tracking-widest">Metodologia Ágil</span>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  Do Zero à Autonomia em <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">3 Passos</span>
                </h2>
                <p className="text-zinc-400 text-lg leading-relaxed">
                    Transformamos sua operação com uma esteira de implementação segura, transparente e rápida.
                </p>
            </div>

            {/* Holographic Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                
                {/* Connecting Line (Desktop Only) - The "Rail" */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -translate-y-1/2 z-0 overflow-hidden rounded-full">
                    {/* The Active Beam moving across */}
                    <motion.div 
                        style={{ left: beamLeft }}
                        className="absolute top-0 w-[20%] h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[2px] shadow-[0_0_15px_rgba(34,211,238,0.8)]" 
                    />
                     {/* The Head of the beam (Brighter) */}
                     <motion.div 
                        style={{ left: beamLeft }}
                        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)]" 
                    />
                </div>

                {STEPS.map((step, index) => (
                    <JourneyCard 
                        key={step.id} 
                        step={step} 
                        index={index} 
                        progress={beamProgress} 
                    />
                ))}
            </div>

            {/* CTA */}
            <div className="mt-16 text-center" data-aos="fade-up" data-aos-delay="400">
                 <button 
                     onClick={() => window.open(WHATSAPP_LINK, '_blank', 'noopener=yes,noreferrer=yes')}
                     className="relative inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold text-sm md:text-base hover:bg-cyan-50 transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)] overflow-hidden group"
                >
                    <span className="relative z-10 flex items-center gap-2">Iniciar Projeto Agora <ArrowRight size={18} /></span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
                <p className="mt-4 text-xs text-zinc-600">
                    Disponibilidade de setup para este mês: <span className="text-emerald-500 font-bold">2 vagas</span>
                </p>
            </div>

        </div>
    </section>
  );
};
