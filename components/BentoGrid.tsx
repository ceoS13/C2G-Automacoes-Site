import React from 'react';
import { BrainCircuit, Lock, Zap, Code2, Users, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const BentoCard: React.FC<{
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  delay?: string;
}> = ({ title, subtitle, icon, className, children, delay }) => (
  <div 
    className={`group relative p-6 rounded-3xl glass-panel overflow-hidden transition-all duration-500 hover:border-cyan-500/30 hover:scale-[1.02] flex flex-col justify-between ${className}`}
    data-aos="fade-up"
    data-aos-delay={delay}
  >
    <div className="relative z-10">
      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300 group-hover:bg-cyan-600 group-hover:text-white">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-zinc-100 mb-2">{title}</h3>
      <p className="text-zinc-400 text-sm">{subtitle}</p>
    </div>
    
    <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowUpRight className="text-white" size={20} />
    </div>

    {/* Background Gradient on Hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    
    {children}
  </div>
);

export const BentoGrid: React.FC = () => {
  return (
    <section id="solutions" className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-6">
            O Sistema Operacional <br/>
            <span className="text-zinc-500">da sua Empresa.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-4 gap-4 h-[1200px] md:h-[800px]">
          
          {/* Main Feature - Large */}
          <BentoCard 
            title="Ísis - Atendimento & Vendas"
            subtitle="A IA que substitui o SDR. Qualifica leads e agenda reuniões automaticamente."
            icon={<BrainCircuit size={20} />}
            className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-blue-900/10 to-transparent"
            delay="0"
          >
             <div className="mt-8 relative h-full w-full rounded-xl bg-black/40 border border-white/10 p-4 font-mono text-xs text-zinc-400 overflow-hidden">
                <div className="text-emerald-400">$ initializing_context...</div>
                <div className="text-cyan-400">$ loading_user_history...</div>
                <div className="opacity-50 mt-2">
                    {`{
  "user_id": "8821",
  "intent": "purchase",
  "sentiment": "high",
  "next_action": "close_deal"
}`}
                </div>
                <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black to-transparent" />
             </div>
          </BentoCard>

          {/* Secondary Feature - Tall */}
          <BentoCard 
            title="Growth Autônomo"
            subtitle="O motor que busca clientes no LinkedIn e E-mail e alimenta seu funil 24/7."
            icon={<Zap size={20} />}
            className="md:col-span-1 md:row-span-2"
            delay="100"
          >
            <div className="mt-auto pt-8 flex items-end justify-center">
                <div className="w-full bg-white/5 rounded-lg p-3 space-y-2">
                    <div className="h-2 w-3/4 bg-zinc-700 rounded animate-pulse" />
                    <div className="h-2 w-1/2 bg-zinc-700 rounded animate-pulse delay-75" />
                    <div className="h-2 w-full bg-zinc-700 rounded animate-pulse delay-150" />
                </div>
            </div>
          </BentoCard>

          {/* Third Feature - Square */}
          <BentoCard 
            title="Auditoria A.V.A."
            subtitle='Nosso "Agente Fiscal" que monitora todas as conversas para garantir segurança.'
            icon={<Lock size={20} />}
            className="md:col-span-1 md:row-span-1"
            delay="200"
          />

          {/* Fourth Feature - Square */}
          <BentoCard 
            title="Stack de Elite"
            subtitle="Construído com n8n, Supabase e OpenAI para máxima performance."
            icon={<Code2 size={20} />}
            className="md:col-span-1 md:row-span-1"
            delay="250"
          />

          {/* Wide Feature */}
          <BentoCard 
            title="Multi-Agentes"
            subtitle="Crie times inteiros de IAs trabalhando em conjunto."
            icon={<Users size={20} />}
            className="md:col-span-2 md:row-span-1"
            delay="300"
          >
             <div className="absolute bottom-4 right-4 flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-red-500 border-2 border-[#050505]" />
                <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-[#050505]" />
                <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-[#050505]" />
             </div>
          </BentoCard>

          {/* Last Feature - Wide */}
          <BentoCard 
            title="Analytics em Tempo Real"
            subtitle="Dashboards completos de performance."
            icon={<ArrowUpRight size={20} />}
            className="md:col-span-2 md:row-span-1"
            delay="350"
          />
          
        </div>
      </div>
    </section>
  );
};