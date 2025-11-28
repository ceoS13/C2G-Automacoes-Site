import React from 'react';
import { Terminal, TrendingUp, Settings2 } from 'lucide-react';

const TeamCard: React.FC<{
  name: string;
  role: string;
  subRole: string;
  description: string;
  icon: React.ReactNode;
  delay: string;
}> = ({ name, role, subRole, description, icon, delay }) => (
  <div 
    className="bg-zinc-900/50 border border-white/10 backdrop-blur-sm rounded-2xl p-8 hover:border-cyan-500/30 transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/5"
    data-aos="fade-up"
    data-aos-delay={delay}
  >
    <div className="flex items-center justify-between mb-6">
        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300 border border-blue-500/10">
            {icon}
        </div>
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest border border-white/5 px-2 py-1 rounded bg-black/20">
            {subRole}
        </span>
    </div>
    
    <h3 className="text-xl font-bold text-blue-400 mb-1 group-hover:text-cyan-400 transition-colors">{name}</h3>
    <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">{role}</div>
    <p className="text-zinc-300 leading-relaxed text-sm">
      {description}
    </p>
  </div>
);

export const About: React.FC = () => {
  return (
    <section id="sobre" className="py-20 md:py-32 bg-[#050505] relative overflow-hidden border-t border-white/5">
      {/* Subtle Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/5 via-[#050505] to-[#050505] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Manifesto Header */}
        <div className="text-center mb-10" data-aos="fade-up">
          <span className="block text-cyan-500 text-sm font-semibold tracking-widest uppercase mb-4">
            Sobre Nós
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
            A Engenharia por trás da <span className="text-cyan-400">Autonomia.</span>
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-6 text-lg md:text-xl leading-relaxed">
            <p className="text-white">
              A C2G nasceu de uma inconformidade. Olhamos para o mercado e vimos um abismo: de um lado, o hype da Inteligência Artificial prometendo milagres. Do outro, empresas reais travadas com ferramentas que não se conversam e chatbots que não resolvem problemas.
            </p>
            <p className="text-white">
              Decidimos construir a ponte. Não vendemos 'prompts'. Construímos Infraestrutura de Automação. Nossa missão é fechar o Execution Gap — a distância entre saber que a IA existe e fazê-la gerar receita no seu caixa.
            </p>
            <p className="text-white font-bold mt-4">
              Nós codificamos o futuro do trabalho autônomo.
            </p>
          </div>
        </div>

        {/* Team Title Separator */}
        <div data-aos="fade-up" className="text-center">
            <h3 className="text-2xl font-bold text-white mt-20 mb-8">
                Nossa Equipe
            </h3>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <TeamCard 
            name="Guilherme Cruz"
            role="CTO"
            subRole="Tech"
            description="Arquiteto de sistemas cognitivos e lógica de Nível 4."
            icon={<Terminal size={24} />}
            delay="0"
          />
          <TeamCard 
            name="Caique Rufino"
            role="Growth"
            subRole="Business"
            description="Estrategista de receita e expansão de ecossistemas."
            icon={<TrendingUp size={24} />}
            delay="100"
          />
          <TeamCard 
            name="Guilherme R."
            role="Ops"
            subRole="Infrastructure"
            description="Engenharia de confiabilidade e escala de infraestrutura."
            icon={<Settings2 size={24} />}
            delay="200"
          />
        </div>

      </div>
    </section>
  );
};