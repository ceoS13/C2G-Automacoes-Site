
import React, { useEffect, useRef } from 'react';
import { Rocket, Code2, Zap, ArrowRight } from 'lucide-react';
import { WHATSAPP_LINK } from '../../lib/constants';
import { motion, useMotionValue, useTransform, animate, useInView, useMotionTemplate } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

const STEPS = [
    {
        id: '01',
        title: 'Kickoff & Mapeamento',
        description: 'Alinhamento estratégico e liberação de acessos. Mapeamos suas regras de negócio para garantir que a IA siga seus processos.',
        duration: 'Semana 1',
        icon: Rocket,
        hexColor: '#22d3ee', // Cyan-400
        shadowColor: 'rgba(6,182,212,0.6)',
        gradientStyle: 'linear-gradient(to right, #06b6d4, #3b82f6)', // Cyan-500 to Blue-500
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
        hexColor: '#c084fc', // Purple-400
        shadowColor: 'rgba(168,85,247,0.6)',
        gradientStyle: 'linear-gradient(to right, #a855f7, #6366f1)', // Purple-500 to Indigo-500
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
        hexColor: '#34d399', // Emerald-400
        shadowColor: 'rgba(16,185,129,0.6)',
        gradientStyle: 'linear-gradient(to right, #34d399, #14b8a6)', // Emerald-400 to Teal-500
        activationRange: [68, 84, 100],
        features: [
            "Deploy em Produção",
            "Monitoramento Real-time",
            "Ajustes de Calibragem",
            "Treinamento da Equipe"
        ]
    }
];

interface JourneyCardProps {
    step: typeof STEPS[0];
    progress: MotionValue<number>;
    index: number;
}

const JourneyCard: React.FC<JourneyCardProps> = ({ step, progress, index }) => {

    // 1. Logic for Beam Activation (0 -> 1 -> 0)
    const activeOpacity = useTransform(progress, step.activationRange, [0, 1, 0]);

    // 2. Border & Glow Effects
    const borderOpacity = useTransform(progress, step.activationRange, [0, 1, 0]);
    const boxShadow = useTransform(
        progress,
        step.activationRange,
        [`0 0 0px transparent`, `0 0 30px ${step.shadowColor}`, `0 0 0px transparent`]
    );
    // Card Scale (Container)
    const scale = useTransform(progress, step.activationRange, [1, 1.02, 1]);

    // 3. Text Content Synchronization (The "Acender e Crescer" Effect)

    // Title Scale: 1 -> 1.05 -> 1 (Ensures text grows on all cards)
    const titleScale = useTransform(progress, step.activationRange, [1, 1.05, 1]);

    // Title Color: Zinc-300 -> White -> Zinc-300
    const titleColor = useTransform(progress, step.activationRange, ["#d4d4d8", "#ffffff", "#d4d4d8"]);

    // Description Color: Zinc-400 -> White -> Zinc-400
    // Changed to pure white peak to ensure visibility on all cards
    const descColor = useTransform(progress, step.activationRange, ["#a1a1aa", "#ffffff", "#a1a1aa"]);
    // Description Scale: Add pulse to mimic movement
    const descScale = useTransform(progress, step.activationRange, [1, 1.02, 1]);

    // Features Color: Zinc-500 -> White -> Zinc-500
    const featureColor = useTransform(progress, step.activationRange, ["#71717a", "#ffffff", "#71717a"]);
    // Feature X Shift: Add slight movement
    const featureX = useTransform(progress, step.activationRange, [0, 4, 0]);

    // Bullet Point Color: Zinc-700 -> Step Color -> Zinc-700
    const bulletColor = useTransform(progress, step.activationRange, ["#3f3f46", step.hexColor, "#3f3f46"]);

    return (
        <motion.div
            className="group relative h-full"
            style={{ scale }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
        >
            {/* Card Structure */}
            <div className="relative h-full bg-[#0a0a0a]/90 backdrop-blur-xl rounded-[2rem] p-8 overflow-hidden transition-all duration-500 z-10 flex flex-col group/card hover:bg-[#0a0a0a]">

                {/* Neon Border */}
                <motion.div
                    className="absolute inset-0 rounded-[2rem] border-2 transition-colors duration-100 pointer-events-none"
                    style={{
                        opacity: borderOpacity,
                        boxShadow: boxShadow,
                        borderColor: step.hexColor
                    }}
                />

                {/* Static Border */}
                <div className="absolute inset-0 rounded-[2rem] border border-white/10 pointer-events-none" />

                {/* Top Neon Strip */}
                <motion.div style={{ opacity: activeOpacity }} className="absolute top-0 left-0 w-full z-20">
                    <div
                        className="w-full h-[2px]"
                        style={{ background: step.gradientStyle }}
                    />
                    <div
                        className="absolute top-0 left-0 w-full h-[15px] blur-[10px]"
                        style={{ background: step.gradientStyle }}
                    />
                </motion.div>

                {/* Giant Background Number */}
                <div className="absolute -right-6 -bottom-10 text-[140px] font-bold font-mono text-white/[0.03] group-hover:text-white/[0.05] transition-colors duration-500 select-none leading-none tracking-tighter z-0">
                    {step.id}
                </div>

                {/* Card Header */}
                <div className="relative z-10 mb-6">
                    {/* Icon Container - STATIC */}
                    <div className="relative w-14 h-14 mb-6 flex items-center justify-center">
                        <div className="absolute inset-0 border border-white/10 rounded-2xl bg-white/5" />
                        <step.icon size={28} className="relative z-10" style={{ color: step.hexColor }} />
                    </div>

                    <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider border border-white/10 text-zinc-500 px-2 py-0.5 rounded transition-all duration-300`}>
                            Fase {step.id}
                        </span>
                        <span className="text-xs font-mono text-zinc-500">{step.duration}</span>
                    </div>

                    {/* Title - Grows and Lights Up (OriginX: 0 prevents lateral shift) */}
                    <motion.h3
                        style={{ scale: titleScale, color: titleColor, originX: 0 }}
                        className="text-2xl font-bold"
                    >
                        {step.title}
                    </motion.h3>
                </div>

                {/* Content */}
                <div className="relative z-10 flex-1 flex flex-col">
                    {/* Description - Lights up and pulses */}
                    <motion.p
                        style={{ color: descColor, scale: descScale, originX: 0 }}
                        className="leading-relaxed text-sm mb-6 flex-1 border-l-2 border-white/5 pl-4 ml-1"
                    >
                        {step.description}
                    </motion.p>

                    <div className="space-y-3 pt-6 border-t border-white/5">
                        {step.features.map((feature, i) => (
                            <motion.div
                                key={i}
                                style={{ color: featureColor, x: featureX }}
                                className="flex items-center gap-2 text-xs"
                            >
                                <motion.div
                                    style={{ backgroundColor: bulletColor }}
                                    className="w-1.5 h-1.5 rounded-full bg-zinc-700"
                                />
                                {feature}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export const ImplementationJourney: React.FC = () => {
    const containerRef = useRef<HTMLElement>(null);
    const isInView = useInView(containerRef, { amount: 0.2, once: false });

    // Global Progress Value (0 to 100)
    const beamProgress = useMotionValue(0);

    useEffect(() => {
        let controls;

        if (isInView) {
            beamProgress.set(0);

            controls = animate(beamProgress, 100, {
                duration: 10,
                ease: "linear",
                repeat: Infinity,
                repeatDelay: 1
            });
        }

        return () => controls?.stop();
    }, [isInView, beamProgress]);

    const beamLeft = useTransform(beamProgress, (value) => `${value}%`);

    // Dynamic Beam Color - Transitions: Cyan -> Purple -> Green
    const beamColor = useTransform(
        beamProgress,
        [0, 32, 34, 66, 68, 100], // Ranges matching card activation
        [
            "rgba(34, 211, 238, 1)", // Cyan (Start - Card 1)
            "rgba(34, 211, 238, 1)", // Cyan (End - Card 1)
            "rgba(192, 132, 252, 1)", // Purple (Start - Card 2)
            "rgba(192, 132, 252, 1)", // Purple (End - Card 2)
            "rgba(52, 211, 153, 1)", // Green (Start - Card 3)
            "rgba(52, 211, 153, 1)"  // Green (End - Card 3)
        ]
    );

    // Dynamic Beam Shadow
    const beamShadowColor = useTransform(
        beamProgress,
        [0, 32, 34, 66, 68, 100],
        [
            "rgba(34, 211, 238, 0.8)",
            "rgba(34, 211, 238, 0.8)",
            "rgba(168, 85, 247, 0.8)",
            "rgba(168, 85, 247, 0.8)",
            "rgba(16, 185, 129, 0.8)",
            "rgba(16, 185, 129, 0.8)"
        ]
    );

    const beamGradient = useMotionTemplate`linear-gradient(to right, transparent, ${beamColor}, transparent)`;
    const beamBoxShadow = useMotionTemplate`0 0 15px ${beamShadowColor}`;

    return (
        <section
            id="process"
            ref={containerRef}
            className="py-24 md:py-32 bg-[#050505] relative overflow-hidden border-t border-white/5"
        >
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(6,182,212,0.05)_0%,transparent_60%)] pointer-events-none z-0" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] opacity-30 pointer-events-none" />

            {/* Feathering Gradients */}
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#050505] to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#050505] to-transparent z-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">

                {/* Header */}
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-20 md:mb-24"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
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
                </motion.div>

                {/* Holographic Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">

                    {/* Connecting Line (Desktop Only) - The "Rail" */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -translate-y-1/2 z-0 overflow-hidden rounded-full">
                        {/* The Active Beam moving across - Now with Dynamic Colors */}
                        <motion.div
                            style={{
                                left: beamLeft,
                                background: beamGradient,
                                boxShadow: beamBoxShadow
                            }}
                            className="absolute top-0 w-[20%] h-full blur-[2px]"
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
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
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
                </motion.div>

            </div>
        </section>
    );
};
