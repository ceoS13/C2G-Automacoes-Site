
import React, { useRef, useCallback } from 'react';
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

const SolutionCard: React.FC<SolutionCardProps> = ({ title, description, icon, features, gradient, accentColor, delay, floatDelay = "0s" }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const updateRect = useCallback(() => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  }, []);

  function handleMouseMove(e: React.MouseEvent) {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    if (!rectRef.current) updateRect();
    
    if (rectRef.current) {
      mouseX.set(e.clientX - rectRef.current.left);
      mouseY.set(e.clientY - rectRef.current.top);
    }
  }

  const accentTextMap: Record<string, string> = {
    "cyan-400": "text-cyan-400",
    "emerald-400": "text-emerald-400",
    "indigo-400": "text-indigo-400",
    "purple-400": "text-purple-400",
    "orange-400": "text-orange-400",
  };

  const accentBgMap: Record<string, string> = {
    "cyan-400": "bg-cyan-400",
    "emerald-400": "bg-emerald-400",
    "indigo-400": "bg-indigo-400",
    "purple-400": "bg-purple-400",
    "orange-400": "bg-orange-400",
  };

  return (
    <div 
      ref={cardRef}
      className="group relative h-full bg-zinc-900/30 border border-white/10 rounded-2xl overflow-hidden animate-float-subtle will-change-transform"
      style={{ animationDelay: floatDelay }}
      onMouseMove={handleMouseMove}
      onMouseEnter={updateRect}
      data-aos="fade-up"
      data-aos-delay={delay}
    >
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

      <div className="relative h-full p-6 lg:p-8 flex flex-col z-10">
        <div className="absolute top-0 left-0 w-full z-20">
             <div className={`w-full h-[2px] bg-gradient-to-r ${gradient} opacity-90`} />
             <div className={`absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r ${gradient} blur-[4px] opacity-60 animate-pulse-slow`} />
        </div>
        
        <div className="flex justify-between items-start mb-6">
            <motion.div 
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className={`p-3 rounded-xl bg-white/5 border border-white/5 ${accentTextMap[accentColor]} relative group-hover:scale-105 transition-transform duration-500`}
            >
                <div className={`absolute inset-0 ${accentBgMap[accentColor]} opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500 rounded-xl`} />
                <span className="relative z-10">{icon}</span>
            </motion.div>

            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm group-hover:border-white/20 transition-all">
                <span className="relative flex h-2 w-2">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${accentBgMap[accentColor]} opacity-75`}></span>
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${accentBgMap[accentColor]} shadow-[0_0_8px_rgba(255,255,255,0.3)]`}></span>
                </span>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest group-hover:text-white transition-colors">Online</span>
            </div>
        </div>
        
        <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">{title}</h3>
        <p className="text-zinc-400 mb-8 text-sm lg:text-base h-auto min-h-[5rem] leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">{description}</p>
        
        <ul className="space-y-3 flex-1">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
              <div className={`w-1.5 h-1.5 shrink-0 rounded-full bg-gradient-to-r ${gradient}`} />
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
    <section id="solutions" className="py-16 md:py-24 bg-[#050505] relative overflow-hidden critical-hide">
      <div className="max-w-[95rem] mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Nossos Agentes</h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">Ecossistemas de negócios autônomos.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <SolutionCard 
            title="Personal"
            description="Seu segundo cérebro no WhatsApp. Gerencie agenda e e-mails com um comando de voz."
            icon={<Sparkles size={28} />}
            gradient="from-orange-500 to-amber-500"
            accentColor="orange-400"
            features={["Agenda", "Resumo de E-mails", "Pesquisas", "Lembretes"]}
            delay="0"
          />
          <SolutionCard 
            title="Ísis"
            description="Transforme curiosos em pagantes. Atendimento imediato 24/7."
            icon={<MessageSquare size={28} />}
            gradient="from-blue-600 to-cyan-500"
            accentColor="cyan-400"
            features={["Atendimento 24/7", "Recuperação de leads", "Agendamento", "Integração CRM"]}
            delay="0"
          />
          <SolutionCard 
            title="Growth"
            description="Encha a agenda do seu time comercial com prospecção ativa."
            icon={<Rocket size={28} />}
            gradient="from-emerald-500 to-teal-400"
            accentColor="emerald-400"
            features={["Pipeline Previsível", "Enriquecimento de dados", "Abordagem em massa", "Nutrição automática"]}
            delay="100"
          />
          <SolutionCard 
            title="Ops"
            description="Elimine o gargalo administrativo com fluxos autônomos."
            icon={<Settings size={28} />}
            gradient="from-purple-600 to-fuchsia-500"
            accentColor="purple-400"
            features={["Onboarding", "Automação Financeira", "Gestão OCR", "Integração ERP"]}
            delay="200"
          />
          <SolutionCard 
            title="Governança"
            description="Auditoria em tempo real para garantir segurança jurídica total."
            icon={<Lock size={28} />}
            gradient="from-indigo-600 to-blue-500"
            accentColor="indigo-400"
            features={["Bloqueio de erros", "Auditoria Score", "Proteção de dados", "LGPD Compliance"]}
            delay="300"
          />
        </div>
      </div>
    </section>
  );
};
