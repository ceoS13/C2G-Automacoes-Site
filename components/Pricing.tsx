import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const PricingCard: React.FC<{
  title: string;
  price: string;
  features: string[];
  highlight?: boolean;
  delay?: string;
}> = ({ title, price, features, highlight, delay }) => (
  <div 
    className={`relative p-8 rounded-3xl flex flex-col h-full border transition-all duration-300 hover:scale-[1.02] ${highlight ? 'bg-[#0a0a0a] border-cyan-500/30 shadow-2xl shadow-cyan-900/20' : 'bg-transparent border-white/10 hover:border-white/20'}`}
    data-aos="fade-up"
    data-aos-delay={delay}
  >
    {highlight && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-cyan-500/30">
        Mais Popular
      </div>
    )}
    <h3 className={`text-xl font-bold mb-2 ${highlight ? 'text-cyan-400' : 'text-zinc-100'}`}>{title}</h3>
    <div className="text-3xl font-bold text-zinc-100 mb-6">{price}<span className="text-sm text-zinc-500 font-normal">/mês</span></div>
    <ul className="space-y-4 mb-8 flex-1">
      {features.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-zinc-400 text-sm">
          <Check size={16} className={`shrink-0 mt-0.5 ${highlight ? 'text-cyan-400' : 'text-zinc-500'}`} /> {item}
        </li>
      ))}
    </ul>
    <button className={`w-full py-3 rounded-xl transition-all font-medium ${highlight ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'border border-white/20 hover:bg-white hover:text-black text-white'}`}>
      Começar
    </button>
  </div>
);

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-32 bg-[#050505] relative overflow-hidden">
      
      {/* Background Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-6">
            A Realidade <span className="text-cyan-500">Comercial</span>
          </h2>
          <p className="text-zinc-400">Escolha o plano ideal para escalar sua operação.</p>
        </div>

        <div className="max-w-6xl mx-auto">
            {/* 3 Main Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <PricingCard 
                title="Standard" 
                price="R$ 497" 
                features={['Atendimento 24/7', 'Tira-Dúvidas (RAG Básico)', 'Até 1.000 mensagens']} 
                delay="0"
              />
              <PricingCard 
                title="Plus" 
                price="R$ 897" 
                features={['Tudo do Standard', 'Follow-up Ativo (Recuperação)', 'Envio de Áudio e Imagem']} 
                delay="100"
              />
              <PricingCard 
                title="Pro" 
                price="R$ 1.250" 
                features={['Agendamento Automático (Google Agenda)', 'Integração com CRM', 'Memória de Longo Prazo']} 
                highlight
                delay="200"
              />
            </div>

            {/* Enterprise "Black Card" */}
            <div 
              data-aos="zoom-in-up"
              className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#111] to-[#000] border border-white/10 p-10 md:p-12 shadow-2xl hover:border-cyan-500/20 transition-colors"
            >
                {/* Metallic Shine Effect */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-blue-900/10 to-transparent blur-3xl rounded-full transform translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
                    <div>
                            <div className="uppercase tracking-widest text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">C2G Enterprise</div>
                            <h3 className="text-3xl font-bold text-zinc-100 mb-2">Plano Enterprise</h3>
                            <p className="text-zinc-400 max-w-xl">
                            Para organizações que precisam de orquestração complexa. Inclui Integração com Estoque/ERP, API de Tribunais e Gestor Dedicado.
                            </p>
                    </div>
                    <button className="group flex items-center gap-3 text-white text-lg font-medium bg-white/5 hover:bg-white/10 px-8 py-4 rounded-full border border-white/10 transition-all hover:border-cyan-500/30">
                        Falar com Consultor <ArrowRight className="group-hover:text-cyan-400 transition-colors" />
                    </button>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};