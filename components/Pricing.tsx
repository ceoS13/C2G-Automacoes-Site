import React from 'react';
import { Check, Building2, ArrowRight } from 'lucide-react';

const PricingCard: React.FC<{
  title: string;
  price: string;
  features: string[];
  highlight?: boolean;
  delay?: string;
}> = React.memo(({ title, price, features, highlight, delay }) => (
  <article 
    className={`relative p-8 rounded-3xl flex flex-col h-full border transition-all duration-300 hover:-translate-y-1 ${
      highlight 
        ? 'bg-[#0a0a0a] border-cyan-500/30 shadow-2xl shadow-cyan-900/20 z-10' 
        : 'bg-transparent border-white/10 hover:border-white/20'
    }`}
    data-aos="fade-up"
    data-aos-delay={delay}
  >
    {/* Animated Border for Highlighted Card */}
    {highlight && (
      <>
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
             <div className="absolute -inset-[100%] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#06b6d4_50%,#0000_100%)] animate-[spin_4s_linear_infinite] opacity-20" />
        </div>
        <div className="absolute inset-[1px] rounded-[23px] bg-[#0a0a0a]" />
        
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-cyan-500/30 z-20">
            Mais Popular
        </div>
      </>
    )}

    <div className="relative z-10 flex flex-col h-full">
        <h3 className={`text-xl font-bold mb-2 ${highlight ? 'text-cyan-400' : 'text-white'}`}>{title}</h3>
        <div className="text-3xl font-bold text-white mb-6">{price}<span className="text-sm text-zinc-500 font-normal">/mês</span></div>
        <ul className="space-y-4 mb-8 flex-1">
        {features.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-zinc-400 text-sm group">
            <Check size={16} className={`shrink-0 mt-0.5 transition-colors ${highlight ? 'text-cyan-400' : 'text-zinc-500 group-hover:text-cyan-400'}`} /> 
            <span className="group-hover:text-zinc-300 transition-colors">{item}</span>
            </li>
        ))}
        </ul>
        <button 
            type="button"
            onClick={() => window.open('https://wa.me/', '_blank')}
            className={`w-full py-3 rounded-xl transition-all font-medium relative overflow-hidden group ${
                highlight 
                ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' 
                : 'border border-white/20 hover:bg-white hover:text-black text-white'
            }`}
            aria-label={`Escolher plano ${title}`}
        >
            <span className="relative z-10">Começar</span>
            {highlight && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />}
        </button>
    </div>
  </article>
));

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-[#050505] relative overflow-hidden">
      
      {/* Background Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            A Realidade <span className="text-cyan-500">Comercial</span>
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed">Escolha o plano ideal para escalar sua operação.</p>
        </div>

        <div className="max-w-6xl mx-auto">
            {/* 3 Main Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <PricingCard 
                title="Standard" 
                price="R$ 687" 
                features={['Atendimento 24/7', 'Tira-Dúvidas (RAG Básico)', 'Até 1.000 mensagens/mês']} 
                delay="0"
              />
              <PricingCard 
                title="Plus" 
                price="R$ 997" 
                features={['Tudo do Standard', 'Follow-up Ativo (Recuperação)', 'Envio de Áudio e Imagem']} 
                delay="100"
              />
              <PricingCard 
                title="Pro" 
                price="R$ 1.497" 
                features={['Agendamento Automático', 'Integração com CRM', 'Memória de Longo Prazo']} 
                highlight
                delay="200"
              />
            </div>

            {/* Enterprise Card (Restored) */}
            <article 
              data-aos="zoom-in-up"
              className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#111] to-[#000] border border-white/10 p-8 md:p-12 shadow-2xl hover:border-cyan-500/20 transition-all group"
            >
                {/* Metallic Shine Effect */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-blue-900/10 to-transparent blur-3xl rounded-full transform translate-x-1/3 -translate-y-1/3 pointer-events-none group-hover:bg-blue-900/20 transition-colors" />
                
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-white/5 rounded-lg text-zinc-400 border border-white/5">
                                <Building2 size={24} />
                            </div>
                            <div className="uppercase tracking-widest text-xs font-bold text-zinc-500">Para Grandes Volumes</div>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Enterprise</h3>
                        <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
                            Infraestrutura dedicada com SLA garantido, Gerente de Conta exclusivo e desenvolvimento de conectores customizados para sistemas legados.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="flex flex-col gap-2 text-sm text-zinc-500">
                             <span className="flex items-center gap-2"><Check size={14} className="text-emerald-500"/> API Dedicada</span>
                             <span className="flex items-center gap-2"><Check size={14} className="text-emerald-500"/> Deploy On-Premise</span>
                        </div>
                        <button 
                            type="button"
                            onClick={() => window.open('https://wa.me/', '_blank')}
                            className="bg-white text-black hover:bg-zinc-200 px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 whitespace-nowrap"
                        >
                            Falar com Consultor <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </article>
        </div>
      </div>
    </section>
  );
};