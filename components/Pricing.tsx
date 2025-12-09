import React from 'react';
import { Check, Building2, ArrowRight, Activity } from 'lucide-react';
import { CONSULTANT_NUMBER, ISIS_NUMBER } from '../lib/constants';
import { CountUp } from './ui/CountUp';
import { HyperText } from './ui/HyperText';
import { PRICING_PLANS, ENTERPRISE_PLAN, PricingPlan } from '../data/pricing';

const PricingCard: React.FC<PricingPlan> = React.memo(({ title, subtitle, price, description, features, benefit, highlight, delay, floatDelay }) => {
  
  const handlePlanClick = () => {
    const message = `Olá Ísis, vim pelo site! Tenho interesse no plano ${title}.`;
    const url = `https://wa.me/${ISIS_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener=yes,noreferrer=yes');
  };

  return (
    <article 
      className={`relative rounded-3xl flex flex-col h-full transition-all duration-300 animate-float-subtle group/card will-change-transform`}
      style={{ animationDelay: floatDelay }}
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      {/* Highlight Badge */}
      {highlight && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-cyan-500/30 z-30 animate-pulse">
              Mais Popular
          </div>
      )}

      {/* Inner Card Container */}
      <div className={`relative h-full flex flex-col p-8 rounded-3xl overflow-hidden border transition-all duration-500
          ${highlight 
              ? 'bg-[#0a0a0a] border-cyan-500/30 shadow-2xl shadow-cyan-900/20 z-10 animate-pulse-glow' 
              : 'bg-[#0a0a0a]/50 border-white/10 hover:border-white/20'
          }
      `}>
          
          {/* Animated Tech Grid Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
              <div className={`absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-grid-scroll ${highlight ? 'opacity-30' : 'opacity-10'}`} />
              <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
          </div>

          {/* Highlight Effects - Background Spinner */}
          {highlight && (
              <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none z-0" aria-hidden="true">
                  <div className="absolute -inset-[100%] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#06b6d4_50%,#0000_100%)] animate-[spin_4s_linear_infinite] opacity-10" />
              </div>
          )}

          <div className="relative z-10 flex flex-col h-full">
              <header className="mb-2 flex items-center gap-2">
                <h3 className={`text-xl font-bold ${highlight ? 'text-cyan-400' : 'text-white'}`}>{title}</h3>
                {subtitle && <span className={`text-[10px] uppercase tracking-wider border px-2 py-0.5 rounded-full whitespace-nowrap ${highlight ? 'border-cyan-500/30 text-cyan-400 bg-cyan-950/20' : 'border-white/10 text-zinc-500'}`}>{subtitle}</span>}
              </header>

              <div className="text-3xl font-bold text-white mb-4">
                <CountUp value={price} prefix="" />
                <span className="text-sm text-zinc-500 font-normal">/mês</span>
              </div>
              
              {description && <p className="text-sm text-zinc-400 mb-6 leading-relaxed min-h-[40px] md:min-h-[60px]">{description}</p>}

              <ul className="space-y-4 mb-8 flex-1">
              {features.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-400 text-sm group">
                  <Check size={16} className={`shrink-0 mt-0.5 transition-colors ${highlight ? 'text-cyan-400' : 'text-zinc-500 group-hover:text-cyan-400'}`} aria-hidden="true" /> 
                  <span className="group-hover:text-zinc-300 transition-colors">{item}</span>
                  </li>
              ))}
              </ul>

              {benefit && (
                <div className={`mb-6 p-3 rounded-lg border text-xs italic ${highlight ? 'bg-cyan-950/10 border-cyan-500/20 text-cyan-200/80' : 'bg-white/5 border-white/5 text-zinc-400'}`}>
                    "{benefit}"
                </div>
              )}

              <button 
                  type="button"
                  onClick={handlePlanClick}
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
  );
});

export const Pricing: React.FC = () => {
  const handleEnterpriseClick = () => {
    const message = "Olá Guilherme C., vim pelo site! Tenho interesse no plano Enterprise.";
    const url = `https://wa.me/${CONSULTANT_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener=yes,noreferrer=yes');
  };

  return (
    <section id="pricing" className="py-20 md:py-32 bg-[#050505] relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.12)_0%,transparent_70%)] pointer-events-none z-0" aria-hidden="true" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none z-0" aria-hidden="true" />
      
      {/* Feathering Gradients */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#050505] to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#050505] to-transparent z-20 pointer-events-none" />

      <div className="max-w-[100rem] mx-auto px-6 md:px-8 relative z-10">
        
        {/* Header */}
        <header className="text-center mb-16 relative" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass-panel mb-6 md:mb-8 bg-black/50">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                <span className="text-[10px] md:text-xs font-mono text-cyan-200/80 uppercase tracking-widest">Análise de Custos: Online</span>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-32 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent blur-xl animate-[pulse_4s_ease-in-out_infinite] -z-10" aria-hidden="true" />

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Realidade <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400"><HyperText text="Comercial" /></span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Planos desenhados para ROI imediato. Cancele ferramentas isoladas e centralize sua inteligência.
            </p>
        </header>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-full mx-auto">
          
          {PRICING_PLANS.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}

          {/* Enterprise Card - Custom Layout */}
          <article 
            className="relative rounded-3xl flex flex-col h-full bg-[#0a0a0a] border border-zinc-800 px-5 py-8 transition-all duration-300 hover:border-white/30 animate-float-subtle group/card overflow-hidden"
            style={{ animationDelay: "3s" }}
            data-aos="fade-up"
            data-aos-delay="300"
          >
              <div className="flex-1 flex flex-col">
                <header className="mb-2 flex items-center gap-1.5">
                    <h3 className="text-xl font-bold text-white">{ENTERPRISE_PLAN.title}</h3>
                    <span className="text-[10px] uppercase tracking-wide border border-white/10 text-zinc-500 px-1.5 py-0.5 rounded-full whitespace-nowrap">{ENTERPRISE_PLAN.subtitle}</span>
                </header>
                <div className="text-3xl font-bold text-white mb-4">Sob Medida</div>
                <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                    {ENTERPRISE_PLAN.description}
                </p>

                <ul className="space-y-4 mb-8 flex-1">
                    {ENTERPRISE_PLAN.features.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-zinc-400 text-sm group">
                            <Building2 size={16} className="shrink-0 mt-0.5 text-zinc-600 group-hover:text-white transition-colors" aria-hidden="true" />
                            <span className="group-hover:text-zinc-300 transition-colors">{item}</span>
                        </li>
                    ))}
                </ul>

                <div className="mb-6 p-3 rounded-lg border text-xs italic bg-white/5 border-white/5 text-zinc-400">
                    "{ENTERPRISE_PLAN.quote}"
                </div>
              </div>

              <button 
                  type="button"
                  onClick={handleEnterpriseClick}
                  className="w-full py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 group"
                  aria-label="Falar com Consultor sobre plano Enterprise"
              >
                  Falar com Consultor <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>
          </article>

        </div>
        
        {/* Footer Note */}
        <div className="mt-12 text-center" data-aos="fade-up" data-aos-delay="400">
            <p className="text-zinc-500 text-sm flex items-center justify-center gap-2">
                <Activity size={14} className="text-emerald-500" aria-hidden="true" />
                Setup Gratuito no plano trimestral. Sem fidelidade no mensal.
            </p>
        </div>

      </div>
    </section>
  );
};