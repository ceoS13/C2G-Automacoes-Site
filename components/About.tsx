
import React, { useRef, useEffect } from 'react';
import { getOptimizedImageUrl } from '../lib/utils';
import { AlertTriangle, Workflow, Cpu } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue, useInView, animate, useTransform } from 'framer-motion';

const TeamCard: React.FC<{
  name: string;
  description: string;
  imageSrc: string;
  delay: string;
}> = ({ name, description, imageSrc, delay }) => (
  <article 
    className="relative group" 
    data-aos="fade-up"
    data-aos-delay={delay}
  >
    <div className="h-full bg-black border border-zinc-800 rounded-[2.5rem] px-6 md:px-8 pb-10 pt-20 text-center relative mt-12 md:mt-0 transition-all duration-500 hover:-translate-y-3 hover:border-cyan-500/30 hover:shadow-[0_20px_40px_-15px_rgba(6,182,212,0.15)]">
       {/* Image Overlay - Absolute on top border */}
       <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-black p-2 z-10">
          <div className="relative w-full h-full rounded-full transition-all duration-500 group-hover:scale-105 group-hover:rotate-3 bg-zinc-900">
             <img 
               src={getOptimizedImageUrl(imageSrc, 400, 400, true)} 
               alt={name} 
               className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 relative z-0"
               loading="lazy"
               decoding="async"
               width="400"
               height="400"
             />
             {/* Border Overlay - Ensures visibility above image */}
             <div className="absolute inset-0 rounded-full border-2 border-zinc-800/80 group-hover:border-cyan-500/50 transition-colors duration-500 z-10 pointer-events-none" />
          </div>
       </div>

       <h3 className="text-3xl font-bold text-white mb-6 tracking-tight">{name}</h3>
       <p className="text-zinc-400 text-sm leading-relaxed font-light">
         {description}
       </p>
    </div>
  </article>
);

const MANIFESTO_NODES = [
    {
        id: "problem",
        label: "INPUT: O PROBLEMA",
        title: "A Inconformidade",
        icon: AlertTriangle,
        description: "Vimos um abismo no mercado: de um lado, o hype da IA prometendo milagres. Do outro, empresas reais travadas com ferramentas desconectadas e chatbots que falham na primeira complexidade.",
        color: "red",
        delay: 0
    },
    {
        id: "solution",
        label: "PROCESS: A ENGENHARIA",
        title: "Infraestrutura Real",
        icon: Workflow,
        description: "Não vendemos 'prompts'. Fechamos o 'Execution Gap' combinando LLMs com engenharia robusta (n8n, Supabase) para criar um ecossistema que não apenas conversa, mas executa e gera receita.",
        color: "cyan",
        delay: 150
    },
    {
        id: "mission",
        label: "OUTPUT: O FUTURO",
        title: "Força de Trabalho Digital",
        icon: Cpu,
        description: "Codificamos o futuro do trabalho autônomo. Entregamos uma operação 24/7 segura que devolve ao empresário o ativo mais valioso de todos: a liberdade.",
        color: "purple",
        delay: 300
    }
];

// Configuration for colors and neon effects
const COLORS_CONFIG: Record<string, { text: string; border: string; bg: string; hoverBorder: string; hoverShadow: string; rgb: string }> = {
    red: {
        text: "text-red-400",
        border: "border-red-500/20",
        bg: "bg-red-500/10",
        hoverBorder: "group-hover/card:border-red-500",
        hoverShadow: "group-hover/card:shadow-[0_0_25px_-5px_rgba(239,68,68,0.4)]",
        rgb: "239, 68, 68"
    },
    cyan: {
        text: "text-cyan-400",
        border: "border-cyan-500/20",
        bg: "bg-cyan-500/10",
        hoverBorder: "group-hover/card:border-cyan-500",
        hoverShadow: "group-hover/card:shadow-[0_0_25px_-5px_rgba(6,182,212,0.4)]",
        rgb: "6, 182, 212"
    },
    purple: {
        text: "text-purple-400",
        border: "border-purple-500/20",
        bg: "bg-purple-500/10",
        hoverBorder: "group-hover/card:border-purple-500",
        hoverShadow: "group-hover/card:shadow-[0_0_25px_-5px_rgba(168,85,247,0.4)]",
        rgb: "168, 85, 247"
    }
};

const ManifestoCard: React.FC<{
    node: typeof MANIFESTO_NODES[0];
    isLast: boolean;
    index: number;
    total: number;
}> = ({ node, isLast, index, total }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        // Optimization: Disable calculation on mobile touches to save resources, rely on active state
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const config = COLORS_CONFIG[node.color];

    return (
        <div 
            className="relative group" 
            style={{ zIndex: 10 }} // Keep cards above the line
            data-aos="fade-up" 
            data-aos-delay={node.delay}
        >
            {/* Node Card Container - Interactive */}
            <div 
                onMouseMove={handleMouseMove}
                className={`
                    h-full 
                    bg-[#0a0a0a]/60 backdrop-blur-xl
                    border ${config.border} 
                    rounded-2xl p-6 md:p-8 
                    transition-all duration-500 relative z-10 overflow-hidden group/card
                    hover:-translate-y-2 
                    ${config.hoverBorder} ${config.hoverShadow}
                `}
            >
                {/* 1. Desktop Spotlight (Follows Mouse) */}
                <motion.div
                    className="hidden md:block pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover/card:opacity-100 z-0"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                600px circle at ${mouseX}px ${mouseY}px,
                                rgba(${config.rgb}, 0.10),
                                transparent 80%
                            )
                        `,
                    }}
                />

                {/* 2. Mobile Tap Glow (Static on Touch/Active) */}
                <div className={`md:hidden absolute inset-0 bg-[rgba(${config.rgb},0.05)] opacity-0 transition-opacity duration-300 active:opacity-100 pointer-events-none z-0`} />

                {/* Content Wrapper */}
                <div className="relative z-10">
                    
                    {/* Badge */}
                    <div className={`inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest mb-4 px-2 py-1 rounded border transition-colors ${config.text} ${config.border} ${config.bg}`}>
                        <node.icon size={12} />
                        {node.label}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover/card:text-white transition-colors">
                        {node.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed group-hover/card:text-zinc-300 transition-colors">
                        {node.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export const About: React.FC = () => {
  // Fix: Removed strict type generic to allow null initialization without TS issues in some strict configs
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.2, once: false });
  
  // Global Progress Value (0 to 100)
  const beamProgress = useMotionValue(0);

  useEffect(() => {
    let controls;

    if (isInView) {
        beamProgress.set(0);
        
        controls = animate(beamProgress, 100, {
            duration: 5,
            ease: "linear",
            repeat: Infinity,
            repeatDelay: 0
        });
    }

    return () => controls?.stop();
  }, [isInView, beamProgress]);

  const beamLeft = useTransform(beamProgress, (value) => `${value}%`);

  return (
    <section id="about" className="py-24 md:py-40 bg-[#050505] relative border-t border-white/5 overflow-visible">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] z-0 pointer-events-none" aria-hidden="true" />
      
      {/* Feathering Gradients */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#050505] to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#050505] to-transparent z-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-20" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass-panel mb-6 md:mb-8 bg-black/50">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
              <span className="text-[10px] md:text-xs font-mono text-cyan-200/80 uppercase tracking-widest">Sobre Nós</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Engenharia por trás da <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Autonomia</span>
          </h2>
          <p className="text-zinc-400 text-lg">
              Transformamos o caos operacional em processos estruturados via código.
          </p>
        </div>

        {/* BLUEPRINT MANIFESTO */}
        {/* Increased gap from md:gap-24 to md:gap-32 for even wider spacing as requested */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-32 relative mb-32">
            
            {/* Connecting Line (Desktop) - The "Rail" */}
            
            {/* 1. VISUAL FIX: Background Blocker (The "Cleaner") */}
            {/* This div sits BEHIND the rail and erases the background grid lines to prevent visual conflict/double lines */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-12 -translate-y-1/2 bg-[#050505] blur-xl z-0 pointer-events-none opacity-90" />
            
            <motion.div 
                initial={{ opacity: 0, scaleX: 0 }}
                animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2 z-0 overflow-hidden rounded-full origin-left"
            >
                {/* The Active Beam moving across */}
                <motion.div 
                    style={{ left: beamLeft }}
                    className="absolute top-0 w-[40%] h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[2px] shadow-[0_0_15px_rgba(34,211,238,0.8)]" 
                />
                 {/* The Head of the beam (Brighter) */}
                 <motion.div 
                    style={{ left: beamLeft }}
                    className="absolute top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)]" 
                />
            </motion.div>
            
            {MANIFESTO_NODES.map((node, index) => (
                <ManifestoCard 
                    key={node.id} 
                    node={node} 
                    index={index} 
                    total={MANIFESTO_NODES.length} 
                    isLast={index === MANIFESTO_NODES.length - 1} 
                />
            ))}
        </div>

        {/* Leadership Grid Title */}
        <div id="team" className="text-center pt-8 mb-16 border-t border-white/5" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass-panel bg-black/50 -mt-5">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                <span className="text-[10px] md:text-xs font-mono text-cyan-200/80 uppercase tracking-widest">Nossa Equipe</span>
            </div>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-24 gap-x-8 max-w-6xl mx-auto pt-10">
          <TeamCard 
            name="Guilherme C."
            description="Mente por trás da engenharia, Guilherme C. é o arquiteto de soluções de IA. Especialista em construir as robustas e inovadoras arquiteturas multiagente que são o coração da C2G."
            imageSrc="https://lh3.googleusercontent.com/d/12YdaYeZh-7ZUe-GOKvK0za10O68mYOd3"
            delay="0"
          />
          <TeamCard 
            name="Caíque R."
            description="Com um olhar estratégico afiado para negócios e parcerias, Caique R é o motor que impulsiona a C2G para novos horizontes, traduzindo a visão em oportunidades concretas."
            imageSrc="https://lh3.googleusercontent.com/d/1t5_gwVOvQEmNqj8zIdvgb86OHCdAe1Ua"
            delay="100"
          />
          <TeamCard 
            name="Guilherme R."
            description="Especialista em engenharia de software, com foco em LLMs e visão estratégica. Responsável por garantir entregas eficientes e transformar tecnologia em resultados práticos."
            imageSrc="https://lh3.googleusercontent.com/d/138PVe_N_ZzkX7UwSNh6UAidHWHLOV0ZO"
            delay="200"
          />
        </div>

      </div>
    </section>
  );
};
