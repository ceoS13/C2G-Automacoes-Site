import React from 'react';
import { MessageSquare, Rocket, Lock, ArrowUpRight } from 'lucide-react';
import { Button } from './ui/Button';
import { WHATSAPP_LINK } from '../lib/constants';
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
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div 
      className="group relative h-full bg-zinc-900/30 border border-white/10 rounded-2xl overflow-hidden animate-float-subtle"
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

      {/* Spotlight Effect Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
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
      
      {/* Spotlight Border Reveal */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
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
      <div className="relative h-full p-8 flex flex-col z-10">
        
        {/* Top Gradient Line */}
        <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
        
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
        
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">{title}</h3>
        <p className="text-zinc-400 mb-8 h-20 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">{description}</p>
        
        <ul className="space-y-3 mb-8 flex-1">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${gradient} shadow-[0_0_5px_rgba(6,182,212,0.5)]`} />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-auto">
            <Button 
            variant="ghost" 
            className="!p-0 hover:!bg-transparent text-zinc-500 group-hover:text-white group-hover:gap-4 transition-all duration-300 w-fit" 
            onClick={() => window.open(WHATSAPP_LINK, '_blank')}
            title={`Saiba mais sobre ${title}`}
            >
            Saiba mais <ArrowUpRight size={16} className="text-cyan-500" />
            </Button>
        </div>
      </div>
    </div>
  );
};

export const Solutions: React.FC = () => {
  return (
    <section id="solutions" className="py-16 md:py-24 bg-[#050505] relative overflow-hidden">
      
      {/* Background decoration: Subtle moving grid or noise */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] z-0 pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Nossos Agentes
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Ecossistemas completos de inteligência artificial projetados para funções críticas de negócio.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <SolutionCard 
            title="Ísis"
            description="Agente de Atendimento & Vendas que converte leads em clientes reais, 24 horas por dia."
            icon={<MessageSquare size={28} />}
            gradient="from-blue-600 to-cyan-500"
            accentColor="cyan-400"
            features={[
              "Memória de Longo Prazo",
              "Validação de Regras de Negócio",
              "Agendamento Automático (GCal/Outlook)",
              "Transbordo Inteligente"
            ]}
            delay="0"
            floatDelay="0s"
          />
          <SolutionCard 
            title="Growth Autônomo"
            description="SDR Digital que prospecta ativamente no LinkedIn e E-mail, gerando pipeline qualificado."
            icon={<Rocket size={28} />}
            gradient="from-emerald-500 to-teal-400"
            accentColor="emerald-400"
            features={[
              "Prospecção Ativa (Outbound)",
              "Enriquecimento de Leads",
              "Personalização Contextual",
              "Integração CRM Direta"
            ]}
            delay="100"
            floatDelay="2.5s"
          />
          <SolutionCard 
            title="Governança (A.V.A.)"
            description="Camada de auditoria e segurança que garante que a IA opere dentro das diretrizes da empresa."
            icon={<Lock size={28} />}
            gradient="from-indigo-600 to-blue-500"
            accentColor="indigo-400"
            features={[
              "Auditoria em Tempo Real",
              "Bloqueio de Alucinações",
              "Conformidade LGPD",
              "Logs Transparentes"
            ]}
            delay="200"
            floatDelay="1.5s"
          />
        </div>
      </div>
    </section>
  );
};