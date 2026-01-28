
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

  const neonShadows: Record<string, string> = {
    "cyan-400": "shadow-[0_0_20px_2px_rgba(34,211,238,0.8)]",
    "emerald-400": "shadow-[0_0_20px_2px_rgba(52,211,153,0.8)]",
    "indigo-400": "shadow-[0_0_20px_2px_rgba(129,140,248,0.8)]",
    "purple-400": "shadow-[0_0_20px_2px_rgba(192,132,252,0.8)]",
    "orange-400": "shadow-[0_0_20px_2px_rgba(251,146,60,0.8)]",
  };

  const shadowClass = neonShadows[accentColor] || "shadow-[0_0_20px_2px_rgba(255,255,255,0.5)]";

  return (
    <motion.div
      ref={cardRef}
      className="group relative h-full card-premium rounded-2xl overflow-hidden will-change-transform"
      onMouseMove={handleMouseMove}
      onMouseEnter={updateRect}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: delay ? parseInt(delay) / 1000 : 0 }}
    >
      <div className="h-full w-full animate-float-subtle" style={{ animationDelay: floatDelay }}>
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
            <div className={`w-full h-[1px] bg-gradient-to-r ${gradient} ${shadowClass} opacity-80`} />
            <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${gradient} blur-[3px] opacity-60 animate-pulse-slow`} />
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
              <li key={i} className="flex items-start gap-3 text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                <div className={`w-1.5 h-1.5 shrink-0 rounded-full bg-gradient-to-r ${gradient} shadow-[0_0_5px_rgba(6,182,212,0.5)] mt-1.5`} />
                <span className="leading-snug">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export const Solutions: React.FC = () => {
  return (
    <section id="solutions" className="py-16 md:py-24 bg-[#050505] relative overflow-hidden critical-hide">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] z-0 pointer-events-none opacity-50" />

      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#050505] to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#050505] to-transparent z-20 pointer-events-none" />

      <div className="max-w-[95rem] mx-auto px-6 md:px-8 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass-panel mb-6 md:mb-8 bg-black/50">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
            <span className="text-[10px] md:text-xs font-mono text-cyan-200/80 uppercase tracking-widest">Agentes Inteligentes: Online</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Nossos Agentes
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Adicione inteligência autônoma ao seu ecossistema de negócios.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <SolutionCard
            title="Personal (Vida)"
            description="Seu segundo cérebro no WhatsApp. Gerencie agenda, e-mails, contatos e pesquisas na web com um comando de voz."
            icon={<Sparkles size={28} />}
            gradient="from-orange-500 to-amber-500"
            accentColor="orange-400"
            features={[
              "Organização de Agenda (Google/Outlook)",
              "Resumo e Resposta de E-mails",
              "Pesquisas de Mercado e Notícias",
              "Anotações e Lembretes"
            ]}
            delay="0"
            floatDelay="0s"
          />
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
            floatDelay="1s"
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
    </section >
  );
};
