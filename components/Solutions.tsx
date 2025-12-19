import React, { memo } from 'react';
import { MessageSquare, Rocket, Lock, Settings, Sparkles } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

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

const SolutionCard = memo(({ title, description, icon, features, gradient, accentColor, delay, floatDelay = "0s" }: SolutionCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (window.innerWidth < 1024) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const neonShadows: Record<string, string> = {
    "cyan-400": "shadow-[0_0_20px_rgba(34,211,238,0.4)]",
    "emerald-400": "shadow-[0_0_20px_rgba(52,211,153,0.4)]",
    "indigo-400": "shadow-[0_0_20px_rgba(129,140,248,0.4)]",
    "purple-400": "shadow-[0_0_20px_rgba(192,132,252,0.4)]",
    "orange-400": "shadow-[0_0_20px_rgba(251,146,60,0.4)]",
  };

  const shadowClass = neonShadows[accentColor] || "";

  return (
    <div 
      className="group relative h-full bg-zinc-900/30 border border-white/10 rounded-2xl overflow-hidden animate-float-subtle will-change-transform"
      style={{ animationDelay: floatDelay }}
      onMouseMove={handleMouseMove}
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <motion.div
        className="hidden lg:block pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              rgba(6,182,212,0.1),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="relative h-full p-6 lg:p-8 flex flex-col z-10">
        <div className="absolute top-0 left-0 w-full z-20">
             <div className={`w-full h-[1px] bg-gradient-to-r ${gradient} ${shadowClass}`} />
        </div>
        
        <div className="flex justify-between items-start mb-6">
            <div className={`p-3 rounded-xl bg-white/5 border border-white/5 text-${accentColor}`}>
                {icon}
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/40 border border-white/10">
                <span className={`flex h-1.5 w-1.5 rounded-full bg-${accentColor}`}></span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Active</span>
            </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-zinc-400 mb-8 text-sm leading-relaxed">{description}</p>
        
        <ul className="space-y-3 flex-1">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-zinc-500">
              <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${gradient}`} />
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
    <section id="solutions" className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none opacity-50" />
      
      <div className="max-w-[95rem] mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-20" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel mb-8 bg-black/50">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] font-mono text-cyan-200/80 uppercase tracking-widest">ECOSSISTEMAS ATIVOS</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Nossos Agentes</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <SolutionCard 
            title="Personal"
            description="Seu segundo cérebro no WhatsApp. Gerencie agenda e e-mails com voz."
            icon={<Sparkles size={24} />}
            gradient="from-orange-500 to-amber-500"
            accentColor="orange-400"
            features={["Agenda Google/Outlook", "Resumo de E-mails", "Anotações e Lembretes"]}
            delay="0"
            floatDelay="0s"
          />
          <SolutionCard 
            title="Ísis"
            description="Atendimento imediato que nunca deixa um lead esfriar."
            icon={<MessageSquare size={24} />}
            gradient="from-blue-600 to-cyan-500"
            accentColor="cyan-400"
            features={["Atendimento 24/7", "Agendamento Automático", "Integração CRM"]}
            delay="50"
            floatDelay="1s"
          />
          <SolutionCard 
            title="Growth"
            description="Prospecção ativa que qualifica decisores todos os dias."
            icon={<Rocket size={24} />}
            gradient="from-emerald-500 to-teal-400"
            accentColor="emerald-400"
            features={["Pipeline Previsível", "Enriquecimento de Dados", "Abordagem em Massa"]}
            delay="100"
            floatDelay="2s"
          />
          <SolutionCard 
            title="Ops"
            description="Conecte RH, Financeiro e Operações em fluxos autônomos."
            icon={<Settings size={24} />}
            gradient="from-purple-600 to-fuchsia-500"
            accentColor="purple-400"
            features={["Onboarding Digital", "Automação Financeira", "Gestão de Documentos"]}
            delay="150"
            floatDelay="3s"
          />
          <SolutionCard 
            title="Governança"
            description="Auditoria em tempo real que garante perfeição e segurança."
            icon={<Lock size={24} />}
            gradient="from-indigo-600 to-blue-500"
            accentColor="indigo-400"
            features={["Bloqueio de Erros", "Auditoria de Qualidade", "Conformidade LGPD"]}
            delay="200"
            floatDelay="4s"
          />
        </div>
      </div>
    </section>
  );
};