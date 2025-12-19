
import React, { memo } from 'react';
import { MessageSquare, Rocket, Lock, Settings, Sparkles } from 'lucide-react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface SolutionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  gradient: string;
  accentColor: string; 
  delay?: string;
  floatDelay?: string;
}

const SolutionCard: React.FC<SolutionCardProps> = memo(({ title, description, icon, features, gradient, accentColor, delay, floatDelay = "0s" }) => {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const springConfig = { damping: 25, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function handleMouseLeave() {
    mouseX.set(-500);
    mouseY.set(-500);
  }

  const neonShadows: Record<string, string> = {
    "cyan-400": "shadow-[0_0_20px_2px_rgba(34,211,238,0.8)]",
    "emerald-400": "shadow-[0_0_20px_2px_rgba(52,211,153,0.8)]",
    "indigo-400": "shadow-[0_0_20px_2px_rgba(129,140,248,0.8)]",
    "purple-400": "shadow-[0_0_20px_2px_rgba(192,132,252,0.8)]",
    "orange-400": "shadow-[0_0_20px_2px_rgba(251,146,60,0.8)]",
  };

  const shadowClass = neonShadows[accentColor] || "shadow-[0_0_20px_2px_rgba(255,255,255,0.5)]";

  return (
    <div 
      className="group relative h-full bg-zinc-900/30 border border-white/10 rounded-2xl overflow-hidden animate-float-subtle will-change-transform [contain:layout_paint]"
      style={{ animationDelay: floatDelay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      {/* Optimized Spotlight using TranslateX/Y */}
      <motion.div
        className="hidden md:block pointer-events-none absolute w-[500px] h-[500px] rounded-full opacity-0 group-hover:opacity-100 z-0 bg-cyan-500/5 blur-[100px]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Card Content */}
      <div className="relative h-full p-6 lg:p-8 flex flex-col z-10">
        
        <div className="absolute top-0 left-0 w-full z-20">
             <div className={`w-full h-[2px] bg-gradient-to-r ${gradient} ${shadowClass} opacity-90`} />
             <div className={`absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r ${gradient} blur-[4px] opacity-60 animate-pulse-slow`} />
        </div>
        
        <div className="flex justify-between items-start mb-6">
            <div className={`p-3 rounded-xl bg-white/5 border border-white/5 text-${accentColor} relative group-hover:scale-105 transition-transform duration-500`}>
                <div className={`absolute inset-0 bg-${accentColor} opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500 rounded-xl`} />
                <span className="relative z-10">{icon}</span>
            </div>

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
});

export const Solutions: React.FC = () => {
  return (
    <section id="solutions" className="py-16 md:py-24 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] z-0 pointer-events-none opacity-50" />
      <div className="max-w-[95rem] mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-20" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass-panel mb-6 md:mb-8 bg-black/50">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
              <span className="text-[10px] md:text-xs font-mono text-cyan-200/80 uppercase tracking-widest">Agentes Inteligentes: Online</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Nossos Agentes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <SolutionCard 
            title="Personal"
            description="Seu segundo cérebro no WhatsApp. Gerencie agenda, e-mails, contatos e pesquisas na web."
            icon={<Sparkles size={28} />}
            gradient="from-orange-500 to-amber-500"
            accentColor="orange-400"
            features={["Agenda", "E-mails", "Pesquisas", "Lembretes"]}
            delay="0"
          />
          <SolutionCard 
            title="Ísis"
            description="Atendimento imediato que nunca deixa um lead esfriar e agenda reuniões automaticamente."
            icon={<MessageSquare size={28} />}
            gradient="from-blue-600 to-cyan-500"
            accentColor="cyan-400"
            features={["Vendas 24/7", "Recuperação", "Agendamento", "CRM"]}
            delay="0"
          />
          <SolutionCard 
            title="Growth"
            description="Prospecção ativa que busca e qualifica decisores no LinkedIn e E-mail todos os dias."
            icon={<Rocket size={28} />}
            gradient="from-emerald-500 to-teal-400"
            accentColor="emerald-400"
            features={["Pipeline", "Enriquecimento", "LinkedIn", "E-mail"]}
            delay="100"
          />
          <SolutionCard 
            title="Ops"
            description="Elimine o gargalo administrativo. Conecte RH, Financeiro e Operações em fluxos autônomos."
            icon={<Settings size={28} />}
            gradient="from-purple-600 to-fuchsia-500"
            accentColor="purple-400"
            features={["Onboarding", "NFs", "OCR", "ERP"]}
            delay="200"
          />
          <SolutionCard 
            title="Governança"
            description="Auditoria em tempo real que garante que sua marca seja representada com perfeição."
            icon={<Lock size={28} />}
            gradient="from-indigo-600 to-blue-500"
            accentColor="indigo-400"
            features={["Auditoria", "LGPD", "Segurança", "Score"]}
            delay="300"
          />
        </div>
      </div>
    </section>
  );
};
