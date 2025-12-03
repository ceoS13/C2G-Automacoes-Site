
import React from 'react';
import { MessageSquare, Rocket, Lock, Settings } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

interface SolutionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  gradient: string;
  accentColor: string; // Tailwind color class for text/bg (e.g. "cyan-400")
  delay?: string;
  floatDelay?: string;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ title, description, icon, features, gradient, accentColor, delay, floatDelay = "0s" }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    // Optimization: Disable calculation on mobile/touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Mapeamento de sombras neon baseadas na cor de destaque
  const neonShadows: Record<string, string> = {
    "cyan-400": "shadow-[0_0_20px_2px_rgba(34,211,238,0.8)]",
    "emerald-400": "shadow-[0_0_20px_2px_rgba(52,211,153,0.8)]",
    "indigo-400": "shadow-[0_0_20px_2px_rgba(129,140,248,0.8)]",
    "purple-400": "shadow-[0_0_20px_2px_rgba(192,132,252,0.8)]",
  };

  const shadowClass = neonShadows[accentColor] || "shadow-[0_0_20px_2px_rgba(255,255,255,0.5)]";

  return (
    <div 
      className="group relative h-full bg-zinc-900/30 border border-white/10 rounded-2xl overflow-hidden animate-float-subtle will-change-transform"
      style={{ animationDelay: floatDelay }}
      onMouseMove={handleMouseMove}
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      {/* Shimmer Loading Effect (One-time) */}
      <motion.div
        initial={{ x: '-100%', opacity: 0 }}
        whileInView={{ x: '200%', opacity: 0.5 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
        className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
      />

      {/* Spotlight Effect Layer - Hidden on Mobile */}
      <motion.div
        className="hidden md:block pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(6,182,212,0.1),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Spotlight Border Reveal - Hidden on Mobile */}
      <motion.div
        className="hidden md:block pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(6,182,212,0.3),
              transparent 80%
            )
          `,
          maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          WebkitMaskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />

      {/* Card Content */}
      <div className="relative h-full p-6 lg:p-8 flex flex-col z-10">
        
        {/* Top Neon Gradient Line (LIVING EFFECT) */}
        <div className="absolute top-0 left-0 w-full z-20">
             {/* Base Line with Strong Shadow */}
             <div className={`w-full h-[2px] bg-gradient-to-r ${gradient} ${shadowClass} opacity-90`} />
             
             {/* Breathing Blur Layer */}
             <div className={`absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r ${gradient} blur-[4px] opacity-60 animate-pulse-slow`} />
        </div>
        
        {/* Header: Icon & Status */}
        <div className="flex justify-between items-start mb-6">
            <motion.div 
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className={`p-3 rounded-xl bg-white/5 border border-white/5 text-${accentColor} relative group-hover:scale-105 transition-transform duration-500`}
            >
                {/* Glow behind icon on hover */}
                <div className={`absolute inset-0 bg-${accentColor} opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500 rounded-xl`} />
                <span className="relative z-10">{icon}</span>
            </motion.div>

            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm">
                <span className="relative flex h-1.5 w-1.5">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${accentColor} opacity-75`}></span>
                    <span className={`relative inline-flex rounded-full h-1.5 w-1.5 bg-${accentColor}`}></span>
                </span>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider group-hover:text-white transition-colors">Online</span>
            </div>
        </div>
        
        <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">{title}</h3>
        <p className="text-zinc-400 mb-8 text-sm lg:text-base h-auto min-h-[5rem] leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">{description}</p>
        
        <ul className="space-y-3 flex-1">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
              <div className={`w-1.5 h-1.5 shrink-0 rounded-full bg-gradient-to-r ${gradient} shadow-[0_0_5px_rgba(6,182,212,0.5)]`} />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const Solutions: React.FC = () => {
  return (
    <section id="solutions" className="py-16 md:py-24 bg-[#050505] relative overflow-hidden">
      
      {/* Background decoration: Subtle moving grid or noise */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] z-0 pointer-events-none opacity-50" />

      <div className="max-w-[90rem] mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-20" data-aos="fade-up">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass-panel mb-6 md:mb-8 bg-black/50">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
              <span className="text-[10px] md:text-xs font-mono text-cyan-200/80 uppercase tracking-widest">Agentes Inteligentes: Online</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Nossos Agentes
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Não contrate mais funcionários. Contrate inteligência que gera receita.
          </p>
        </div>

        {/* Updated Grid Layout for 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SolutionCard 
            title="Ísis (Conversão)"
            description="Transforme curiosos em pagantes. Atendimento imediato que nunca deixa um lead esfriar e agenda reuniões automaticamente."
            icon={<MessageSquare size={28} />}
            gradient="from-blue-600 to-cyan-500"
            accentColor="cyan-400"
            features={[
              "Atendimento 24/7 sem fila",
              "Recuperação de leads inativos",
              "Agendamento direto no Calendar",
              "Integração total com seu CRM"
            ]}
            delay="0"
            floatDelay="0s"
          />
          <SolutionCard 
            title="Growth (Prospecção)"
            description="Encha a agenda do seu time comercial. Prospecção ativa que busca e qualifica decisores no LinkedIn e E-mail todos os dias."
            icon={<Rocket size={28} />}
            gradient="from-emerald-500 to-teal-400"
            accentColor="emerald-400"
            features={[
              "Geração de Pipeline Previsível",
              "Enriquecimento de dados",
              "Abordagem personalizada em massa",
              "Nutrição automática de leads"
            ]}
            delay="100"
            floatDelay="2.5s"
          />
          <SolutionCard 
            title="Ops (Eficiência)"
            description="Elimine o gargalo administrativo. Conecte RH, Financeiro e Operações em fluxos autônomos, reduzindo o erro humano a zero."
            icon={<Settings size={28} />}
            gradient="from-purple-600 to-fuchsia-500"
            accentColor="purple-400"
            features={[
              "Onboarding de Colaboradores",
              "Automação Financeira (NFs)",
              "Gestão de Documentos (OCR)",
              "Orquestração de ERP"
            ]}
            delay="200"
            floatDelay="1s"
          />
          <SolutionCard 
            title="Governança (Segurança)"
            description="Durma tranquilo. Auditoria em tempo real que garante que sua marca seja representada com perfeição e segurança jurídica."
            icon={<Lock size={28} />}
            gradient="from-indigo-600 to-blue-500"
            accentColor="indigo-400"
            features={[
              "Bloqueio de respostas erradas",
              "Auditoria de qualidade (Score)",
              "Proteção total dos seus dados",
              "Conformidade com LGPD"
            ]}
            delay="300"
            floatDelay="1.5s"
          />
        </div>
      </div>
    </section>
  );
};
