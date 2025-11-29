import React from 'react';

const TeamCard: React.FC<{
  name: string;
  description: string;
  imageSrc: string;
  delay: string;
}> = ({ name, description, imageSrc, delay }) => (
  <article 
    className="relative group" 
    data-aos="fade-up"
    data-aos-delay={delay}
  >
    <div className="h-full bg-black border border-zinc-800 rounded-[2.5rem] px-6 md:px-8 pb-10 pt-20 text-center relative mt-12 md:mt-0 transition-all duration-500 hover:-translate-y-3 hover:border-cyan-500/30 hover:shadow-[0_20px_40px_-15px_rgba(6,182,212,0.15)]">
       {/* Image Overlay - Absolute on top border */}
       <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-black p-2 z-10">
          <img 
            src={imageSrc} 
            alt={name} 
            className="w-full h-full rounded-full object-cover border border-zinc-800 group-hover:border-cyan-500/30 grayscale group-hover:grayscale-0 transition-all duration-500 bg-zinc-900 group-hover:scale-105 group-hover:rotate-3"
            loading="lazy"
          />
       </div>

       <h3 className="text-3xl font-bold text-white mb-6 tracking-tight">{name}</h3>
       <p className="text-zinc-400 text-sm leading-relaxed font-light">
         {description}
       </p>
    </div>
  </article>
);

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-40 bg-[#050505] relative border-t border-white/5 overflow-visible">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] z-0 pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Manifesto Section */}
        <div className="max-w-4xl mx-auto text-center mb-24" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono mb-6 uppercase tracking-widest">
            Sobre Nós
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">
            A Engenharia por trás da <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Autonomia</span>.
          </h2>

          <div className="space-y-6 text-lg md:text-xl text-zinc-300 font-light leading-relaxed">
            <p>
              A C2G nasceu de uma inconformidade. Olhamos para o mercado e vimos um abismo: de um lado, o hype da Inteligência Artificial prometendo milagres. Do outro, empresas reais travadas com ferramentas que não se conversam e chatbots que não resolvem problemas.
            </p>
            <p>
              Decidimos construir a ponte. Não vendemos "prompts". Construímos <span className="font-semibold text-white">Infraestrutura de Automação</span>. Nossa missão é fechar o Execution Gap — a distância entre saber que a IA existe e fazê-la gerar receita no seu caixa.
            </p>
            <p className="font-medium text-white">
              Nós codificamos o futuro do trabalho autônomo.
            </p>
          </div>
        </div>

        {/* Leadership Grid Title */}
        <div id="team" className="text-center pt-8 mb-16" data-aos="fade-up">
             <h3 className="text-3xl md:text-4xl font-bold text-white inline-block relative">
                Nossa Equipe
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-cyan-500 rounded-full"></div>
             </h3>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-24 gap-x-8 max-w-6xl mx-auto pt-10">
          <TeamCard 
            name="Guilherme C."
            description="Mente por trás da engenharia, Guilherme C. é o arquiteto de soluções de IA. Especialista em construir as robustas e inovadoras arquiteturas multiagente que são o coração da C2G."
            imageSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&h=250&auto=format&fit=crop"
            delay="0"
          />
          <TeamCard 
            name="Caíque R."
            description="Com um olhar estratégico afiado para negócios e parcerias, Caique R é o motor que impulsiona a C2G para novos horizontes, traduzindo a visão em oportunidades concretas."
            imageSrc="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=250&h=250&auto=format&fit=crop"
            delay="100"
          />
          <TeamCard 
            name="Guilherme R."
            description="Especialista em engenharia de software, com foco em LLMs e visão estratégica. Responsável por garantir entregas eficientes e transformar tecnologia em resultados práticos."
            imageSrc="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&h=250&auto=format&fit=crop"
            delay="200"
          />
        </div>

      </div>
    </section>
  );
};