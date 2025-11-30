import React, { useEffect, useRef, useState } from 'react';
import { Check, Building2, ArrowRight, Activity, ScanLine } from 'lucide-react';
import { WHATSAPP_LINK } from '../lib/constants';

// HyperText Component for the Decoder Effect
const HyperText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const iterations = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#%&";

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    iterations.current = 0;

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iterations.current) {
              return text[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("")
      );

      if (iterations.current >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsScrambling(false);
      }

      iterations.current += 1 / 3;
    }, 30);
  };

  return (
    <span 
      onMouseEnter={scramble} 
      className={`inline-block cursor-default ${className}`}
    >
      {displayText}
    </span>
  );
};

const PricingCard: React.FC<{
  title: string;
  price: string;
  features: string[];
  highlight?: boolean;
  delay?: string;
  floatDelay?: string; // Prop for async levitation
}> = React.memo(({ title, price, features, highlight, delay, floatDelay = "0s" }) => (
  <article 
    className={`relative rounded-3xl flex flex-col h-full transition-all duration-300 animate-float-subtle group/card`}
    style={{ animationDelay: floatDelay }}
    data-aos="fade-up"
    data-aos-delay={delay}
  >
    {/* Highlight Badge - Moved outside overflow-hidden container to be visible */}
    {highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-cyan-500/30 z-30 animate-pulse">
            Mais Popular
        </div>
    )}

    {/* Inner Card Container - Handles Border & Background */}
    <div className={`relative h-full flex flex-col p-8 rounded-3xl overflow-hidden border transition-all duration-500
        ${highlight 
            ? 'bg-[#0a0a0a] border-cyan-500/30 shadow-2xl shadow-cyan-900/20 z-10 animate-pulse-glow' 
            : 'bg-[#0a0a0a]/50 border-white/10 hover:border-white/20'
        }
    `}>
        
        {/* Animated Tech Grid Background (Low Opacity) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className={`absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-grid-scroll ${highlight ? 'opacity-30' : 'opacity-10'}`} />
            {/* Fade bottom to blend */}
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        </div>

        {/* Highlight Effects (Only for Pro) - Background Spinner */}
        {highlight && (
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none z-0">
                <div className="absolute -inset-[100%] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#06b6d4_50%,#0000_100%)] animate-[spin_4s_linear_infinite] opacity-10" />
            </div>
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
                onClick={() => window.open(WHATSAPP_LINK, '_blank')}
                className={`w-full py-3 rounded-xl transition-all font-medium relative overflow-hidden group ${
                    highlight 
                    ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' 
                    : 'border border-white/20 hover:bg-white hover:text-black text-white'
                }`}
                aria-label={`Escolher plano ${title}`}
            >
                {/* Shine Effect */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 animate-shine" />
                
                <span className="relative z-10">Começar</span>
            </button>
        </div>
    </div>
  </article>
));

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-[#050505] relative overflow-hidden">
      
      {/* Seamless Radial Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.12)_0%,transparent_70%)] pointer-events-none z-0" />

      {/* Static Pattern Overlay (Base layer) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Terminal Header */}
        <div className="text-center mb-16 relative" data-aos="fade-up">
            
            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass-panel mb-6 md:mb-8 bg-black/50">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                <span className="text-[10px] md:text-xs font-mono text-cyan-200/80 uppercase tracking-widest">Análise de Custos: Online</span>
            </div>

            {/* Scanner Beam Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-32 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent blur-xl animate-[pulse_4s_ease-in-out_infinite] -z-10" />

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                A Realidade <HyperText text="Comercial" className="text-cyan-500 font-mono" />
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto">
                Escolha o plano ideal para escalar sua operação com infraestrutura de nível militar.
            </p>
        </div>

        <div className="max-w-6xl mx-auto">
            {/* 3 Main Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <PricingCard 
                title="Standard" 
                price="R$ 687" 
                features={['Atendimento 24/7', 'Tira-Dúvidas (RAG Básico)', 'Até 1.000 mensagens/mês']} 
                delay="0"
                floatDelay="0s"
              />
              <PricingCard 
                title="Plus" 
                price="R$ 997" 
                features={['Tudo do Standard', 'Follow-up Ativo (Recuperação)', 'Envio de Áudio e Imagem']} 
                delay="100"
                floatDelay="2.5s"
              />
              <PricingCard 
                title="Pro" 
                price="R$ 1.497" 
                features={['Agendamento Automático', 'Integração com CRM', 'Memória de Longo Prazo']} 
                highlight
                delay="200"
                floatDelay="1s"
              />
            </div>

            {/* Enterprise Card - with Levitation and Grid */}
            <article 
              data-aos="zoom-in-up"
              className="relative rounded-[2rem] animate-float-subtle group"
              style={{ animationDelay: '3.5s' }}
            >
                {/* Inner Container */}
                <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#111] to-[#000] border border-white/10 p-8 md:p-12 shadow-2xl hover:border-cyan-500/20 transition-all">
                    
                    {/* Animated Grid Background */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-grid-scroll opacity-10" />
                    </div>

                    {/* Metallic Shine Effect */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-blue-900/10 to-transparent blur-3xl rounded-full transform translate-x-1/3 -translate-y-1/3 pointer-events-none group-hover:bg-blue-900/20 transition-colors z-0" />
                    
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-white/5 rounded-lg text-zinc-400 border border-white/5 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-all">
                                    <Building2 size={24} />
                                </div>
                                <div className="uppercase tracking-widest text-xs font-bold text-zinc-500 font-mono">Para Grandes Volumes</div>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Enterprise</h3>
                            <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
                                Infraestrutura dedicada com SLA garantido, Gerente de Conta exclusivo e desenvolvimento de conectores customizados para sistemas legados.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <div className="flex flex-col gap-2 text-sm text-zinc-500">
                                <span className="flex items-center gap-2"><Activity size={14} className="text-emerald-500"/> API Dedicada</span>
                                <span className="flex items-center gap-2"><ScanLine size={14} className="text-emerald-500"/> Deploy On-Premise</span>
                            </div>
                            <button 
                                type="button"
                                onClick={() => window.open(WHATSAPP_LINK, '_blank')}
                                className="bg-white text-black hover:bg-zinc-200 px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 whitespace-nowrap relative overflow-hidden group"
                            >
                                {/* Shine Effect */}
                                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-black/10 opacity-40 animate-shine" />
                                
                                <span className="relative z-10 flex items-center gap-2">Falar com Consultor <ArrowRight size={18} /></span>
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        </div>
      </div>
    </section>
  );
};