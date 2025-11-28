import React from 'react';

export const Stats: React.FC = () => {
  return (
    <section className="py-12 bg-[#050505] border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
          
          <div className="text-center pt-8 md:pt-0" data-aos="fade-up" data-aos-delay="0">
            <div className="text-4xl md:text-5xl font-mono font-bold text-cyan-400 mb-2 text-glow">
              +500k
            </div>
            <div className="text-sm text-zinc-500 uppercase tracking-widest font-medium">
              Mensagens Processadas
            </div>
          </div>

          <div className="text-center pt-8 md:pt-0" data-aos="fade-up" data-aos-delay="100">
            <div className="text-4xl md:text-5xl font-mono font-bold text-cyan-400 mb-2 text-glow">
              99.9%
            </div>
            <div className="text-sm text-zinc-500 uppercase tracking-widest font-medium">
              SLA Garantido
            </div>
          </div>

          <div className="text-center pt-8 md:pt-0 pb-8 md:pb-0" data-aos="fade-up" data-aos-delay="200">
            <div className="text-4xl md:text-5xl font-mono font-bold text-cyan-400 mb-2 text-glow">
              24/7
            </div>
            <div className="text-sm text-zinc-500 uppercase tracking-widest font-medium">
              Disponibilidade
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
