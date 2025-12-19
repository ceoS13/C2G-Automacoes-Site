import React, { memo, useMemo } from 'react';
import { MessageSquare, Rocket, Lock, Settings, Sparkles } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

interface SolutionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  gradient: string;
  accentColor: "orange-400" | "cyan-400" | "emerald-400" | "purple-400" | "indigo-400";
  delay?: string;
  floatDelay?: string;
}

const SolutionCard = memo(({ title, description, icon, features, gradient, accentColor, delay, floatDelay = "0s" }: SolutionCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Mapeamentos literais para garantir que o Tailwind JIT compile as classes corretamente
  const accentColorClasses = {
    "orange-400": "text-orange-400",
    "cyan-400": "text-cyan-400",
    "emerald-400": "text-emerald-400",
    "purple-400": "text-purple-400",
    "indigo-400": "text-indigo-400",
  };

  const bgColorClasses = {
    "orange-400": "bg-orange-400",
    "cyan-400": "bg-cyan-400",
    "emerald-400": "bg-emerald-400",
    "purple-400": "bg-purple-400",
    "indigo-400": "bg-indigo-400",
  };

  const neonShadows = {
    "orange-400": "shadow-[0_0_20px_rgba(251,146,60,0.3)]",
    "cyan-400": "shadow-[0_0_20px_rgba(34,211,238,0.3)]",
    "emerald-400": "shadow-[0_0_20px_rgba(52,211,153,0.3)]",
    "purple-400": "shadow-[0_0_20px_rgba(192,132,252,0.3)]",
    "indigo-400": "shadow-[0_0_20px_rgba(129,140,248,0.3)]",
  };

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (window.innerWidth < 1024) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <article 
      className="group relative h-full transition-all duration-300 animate-float-subtle will-change-transform"
      style={{ animationDelay: floatDelay }}
      onMouseMove={handleMouseMove}
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      {/* Container Principal com Glassmorphism Profundo */}
      <div className="relative h-full flex flex-col p-6 lg:p-8 rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl transition-all duration-500 group-hover:border-white/20 z-10">
        
        {/* Grid Técnico Animado de Fundo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-grid-scroll opacity-10" />
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        </div>

        {/* Efeito Spotlight Interativo (Desktop) */}
        <motion.div
          className="hidden lg:block pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                450px circle at ${mouseX}px ${mouseY}px,
                rgba(255,255,255,0.05),
                transparent 80%
              )
            `,
          }}
        />

        {/* Faixa Neon Superior com Efeito de Difusão (Glow) */}
        <div className="absolute top-0 left-0 w-full z-20">
             <div className={`w-full h-[2px] bg-gradient-to-r ${gradient} ${neonShadows[accentColor]}`} />
             <div className={`absolute top-0 left-0 w-full h-[15px] blur-[10px] bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
        </div>
        
        {/* Conteúdo */}
        <div className="relative z-10 flex flex-col h-full">
            <header className="flex justify-between items-start mb-8">
                <div className={`p-3 rounded-2xl bg-white/5 border border-white/5 ${accentColorClasses[accentColor]} group-hover:scale-110 transition-transform duration-500`}>
                    {icon}
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/40 border border-white/10">
                    <span className={`flex h-1.5 w-1.5 rounded-full ${bgColorClasses[accentColor]} animate-pulse shadow-[0_0_8px_currentColor]`}></span>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Active</span>
                </div>
            </header>
            
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-white transition-colors">
              {title}
            </h3>
            <p className="text-zinc-400 mb-8 text-sm leading-relaxed font-light">
              {description}
            </p>
            
            <div className="mt-auto">
                <div className="h-px w-full bg-white/5 mb-6" />
                <ul className="space-y-4">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs text-zinc-500 group/item">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${gradient} opacity-40 group-hover/item:opacity-100 transition-opacity`} />
                      <span className="group-hover/item:text-zinc-300 transition-colors">{feature}</span>
                    </li>
                  ))}
                </ul>
            </div>
        </div>
      </div>
    </article>
  );
});

export const Solutions: React.FC = () => {
  return (
    <section id="solutions" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Overlay de Atmosfera */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.03)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none opacity-50" />
      
      <div className="max-w-[100rem] mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-20" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel mb-8 bg-black/50">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
              <span className="text-[10px] font-mono text-cyan-200/80 uppercase tracking-widest">ECOSSISTEMAS ATIVOS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Nossa <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">Força de Trabalho</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Agentes autônomos treinados para funções específicas, operando em harmonia para escalar seu faturamento e liberar seu tempo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <SolutionCard 
            title="Personal"
            description="Seu segundo cérebro no WhatsApp. Gerencie agenda e e-mails com comandos de voz e raciocínio lógico avançado."
            icon={<Sparkles size={24} />}
            gradient="from-orange-500 to-amber-500"
            accentColor="orange-400"
            features={["Agenda Google/Outlook", "Resumo de E-mails", "Anotações e Lembretes"]}
            delay="0"
            floatDelay="0s"
          />
          <SolutionCard 
            title="Ísis"
            description="Atendimento imediato que nunca deixa um lead esfriar. Vende, qualifica e agenda enquanto você foca no estratégico."
            icon={<MessageSquare size={24} />}
            gradient="from-blue-600 to-cyan-500"
            accentColor="cyan-400"
            features={["Atendimento 24/7", "Agendamento Automático", "Integração CRM"]}
            delay="50"
            floatDelay="1s"
          />
          <SolutionCard 
            title="Growth"
            description="Prospecção ativa que qualifica decisores e gera pipeline previsível todos os dias, integrando bases de dados."
            icon={<Rocket size={24} />}
            gradient="from-emerald-500 to-teal-400"
            accentColor="emerald-400"
            features={["Pipeline Previsível", "Enriquecimento de Dados", "Abordagem em Massa"]}
            delay="100"
            floatDelay="2s"
          />
          <SolutionCard 
            title="Ops"
            description="Conecte RH, Financeiro e Operações em fluxos autônomos que eliminam gargalos e falhas humanas."
            icon={<Settings size={24} />}
            gradient="from-purple-600 to-fuchsia-500"
            accentColor="purple-400"
            features={["Onboarding Digital", "Automação Financeira", "Gestão de Documentos"]}
            delay="150"
            floatDelay="3s"
          />
          <SolutionCard 
            title="Governança"
            description="Auditoria em tempo real que garante conformidade, segurança de dados e perfeição em cada interação de IA."
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