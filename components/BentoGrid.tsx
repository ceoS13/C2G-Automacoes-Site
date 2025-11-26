import React, { useState, useEffect } from 'react';
import { BrainCircuit, Lock, Zap, Code2, Users, ArrowUpRight, ShieldCheck, Terminal } from 'lucide-react';

const BentoCard: React.FC<{
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  delay?: string;
}> = React.memo(({ title, subtitle, icon, className, children, delay }) => (
  <article 
    className={`group relative p-6 rounded-3xl glass-panel overflow-hidden transition-all duration-500 hover:border-cyan-500/30 hover:scale-[1.02] flex flex-col justify-between ${className}`}
    data-aos="fade-up"
    data-aos-delay={delay}
  >
    <div className="relative z-10">
      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300 group-hover:bg-cyan-600 group-hover:text-white">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-zinc-100 mb-2">{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed">{subtitle}</p>
    </div>
    
    <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowUpRight className="text-white" size={20} />
    </div>

    {/* Background Gradient on Hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    
    {children}
  </article>
));

const AvaTerminal = () => {
  const [step, setStep] = useState(0);
  const logs = [
    { text: "Iniciando A.V.A v2...", color: "text-zinc-500" },
    { text: "Conectando Supabase...", color: "text-blue-400" },
    { text: "Analisando Fidelidade...", color: "text-yellow-400" },
    { text: "Verificando Tom de Voz...", color: "text-purple-400" },
    { text: "Score: 98/100", color: "text-cyan-400" },
    { text: "STATUS: APROVADO ✅", color: "text-emerald-400 font-bold" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % (logs.length + 2)); // +2 for pause at end
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-4 bg-black/50 rounded-lg p-3 border border-white/10 font-mono text-[10px] h-[120px] flex flex-col gap-1 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[size:100%_4px] pointer-events-none z-20 opacity-20" />
      {logs.map((log, index) => (
        <div 
          key={index} 
          className={`${log.color} transition-opacity duration-300 ${index <= step ? 'opacity-100' : 'opacity-0'}`}
        >
          <span className="text-zinc-600 mr-2">{`>`}</span>{log.text}
        </div>
      ))}
      {step >= logs.length && (
        <div className="absolute bottom-2 right-2 w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
      )}
    </div>
  );
};

export const BentoGrid: React.FC = () => {
  return (
    <section id="solutions" className="py-20 md:py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-6">
            O Sistema Operacional <br/>
            <span className="text-zinc-500">da sua Empresa.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[minmax(280px,auto)] gap-6">
          
          <BentoCard 
            title="Ísis - Atendimento & Vendas"
            subtitle="A IA que substitui o SDR. Qualifica leads, acessa o estoque e agenda reuniões automaticamente."
            icon={<BrainCircuit size={20} />}
            className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-blue-900/10 to-transparent min-h-[400px]"
            delay="0"
          >
             <div className="mt-8 relative h-full w-full rounded-xl bg-black/40 border border-white/10 p-4 font-mono text-xs text-zinc-400 overflow-hidden">
                <div className="text-emerald-400 mb-1">$ inicializando_contexto...</div>
                <div className="text-cyan-400 mb-2">$ carregando_historico_usuario...</div>
                <div className="opacity-70 bg-white/5 p-2 rounded border border-white/5 text-[10px] leading-relaxed">
                    <span className="text-purple-400">{"{"}</span><br/>
                    &nbsp;&nbsp;<span className="text-blue-300">"lead_id"</span>: <span className="text-orange-300">"8821"</span>,<br/>
                    &nbsp;&nbsp;<span className="text-blue-300">"intent"</span>: <span className="text-emerald-300">"agendamento_pro"</span>,<br/>
                    &nbsp;&nbsp;<span className="text-blue-300">"confidence"</span>: <span className="text-blue-300">0.99</span>,<br/>
                    &nbsp;&nbsp;<span className="text-blue-300">"action"</span>: <span className="text-orange-300">"check_calendar_slot"</span><br/>
                    <span className="text-purple-400">{"}"}</span>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black to-transparent" />
             </div>
          </BentoCard>

          <BentoCard 
            title="Growth Autônomo"
            subtitle="Fábrica de Leads que prospecta no LinkedIn e E-mail, gerando pipeline 24/7."
            icon={<Zap size={20} />}
            className="md:col-span-1 md:row-span-2"
            delay="100"
          >
            <div className="mt-auto pt-8 flex items-end justify-center">
                <div className="w-full bg-white/5 rounded-lg p-3 space-y-2 border border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Disparo Ativo</span>
                    </div>
                    <div className="h-1.5 w-3/4 bg-zinc-700 rounded animate-pulse" />
                    <div className="h-1.5 w-1/2 bg-zinc-700 rounded animate-pulse delay-75" />
                    <div className="h-1.5 w-full bg-zinc-700 rounded animate-pulse delay-150" />
                </div>
            </div>
          </BentoCard>

          <BentoCard 
            title="Governança (A.V.A.)"
            subtitle='Auditoria em tempo real de todas as conversas para garantir segurança e compliance.'
            icon={<ShieldCheck size={20} />}
            className="md:col-span-1 md:row-span-1"
            delay="200"
          >
            <AvaTerminal />
          </BentoCard>

          <BentoCard 
            title="Stack de Elite"
            subtitle="Arquitetura robusta com n8n, Memória Redis, Evolution API e Supabase Vector."
            icon={<Code2 size={20} />}
            className="md:col-span-1 md:row-span-1"
            delay="250"
          />

          <BentoCard 
            title="Multi-Agentes"
            subtitle="Crie times inteiros de IAs (SDR + Closer + Suporte) trabalhando em conjunto."
            icon={<Users size={20} />}
            className="md:col-span-2 md:row-span-1"
            delay="300"
          >
             <div className="absolute bottom-4 right-4 flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 border-2 border-[#050505] shadow-lg" title="SDR" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 border-2 border-[#050505] shadow-lg" title="Suporte" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 border-2 border-[#050505] shadow-lg" title="Closer" />
             </div>
          </BentoCard>

          <BentoCard 
            title="Analytics em Tempo Real"
            subtitle="Dashboards completos de performance e conversão."
            icon={<ArrowUpRight size={20} />}
            className="md:col-span-2 md:row-span-1"
            delay="350"
          />
          
        </div>
      </div>
    </section>
  );
};