import React from 'react';
import { getOptimizedImageUrl } from '../lib/utils';

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
          {/* 
             Fix Visual Bug: Wrap image and border in a container to ensure border is always on top.
             Using a separate div for the border avoids z-fighting or clipping issues with the img tag.
          */}
          <div className="relative w-full h-full rounded-full transition-all duration-500 group-hover:scale-105 group-hover:rotate-3 bg-zinc-900">
             
             <img 
               // Otimização: Crop quadrado (400x400) focado no rosto
               src={getOptimizedImageUrl(imageSrc, 400, 400, true)} 
               alt={name} 
               className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 relative z-0"
               loading="lazy"
               decoding="async"
               width="400"
               height="400"
             />

             {/* Border Overlay - Ensures visibility above image */}
             <div className="absolute inset-0 rounded-full border-2 border-zinc-800/80 group-hover:border-cyan-500/50 transition-colors duration-500 z-10 pointer-events-none" />
          </div>
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass-panel mb-6 md:mb-8 bg-black/50">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
              <span className="text-[10px] md:text-xs font-mono text-cyan-200/80 uppercase tracking-widest">Sobre Nós</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">
            A Engenharia por trás da <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Autonomia</span>.
          </h2>

          <div className="space-y-6 text-lg md:text-xl text-zinc-300 font-light leading-relaxed">
            <p>
              A C2G nasceu de uma inconformidade. Olhamos para o mercado e vimos um abismo: de um lado, o hype da Inteligência Artificial prometendo milagres. Do outro, empresas reais travadas com ferramentas que não se conversam e chatbots que não resolvem problemas.
            </p>
            <p>
              Decidimos construir a ponte. Não vendemos "prompts". Construímos <span className="font-semibold text-white">Infraestrutura de Automação</span>. Nossa missão é fechar o Execution Gap a distância entre saber que a IA existe e fazê-la gerar receita no seu caixa.
            </p>
            <p className="font-medium text-white">
              Nós codificamos o futuro do trabalho autônomo.
            </p>
          </div>
        </div>

        {/* Leadership Grid Title */}
        <div id="team" className="text-center pt-8 mb-16" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass-panel bg-black/50">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                <span className="text-[10px] md:text-xs font-mono text-cyan-200/80 uppercase tracking-widest">Nossa Equipe</span>
            </div>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-24 gap-x-8 max-w-6xl mx-auto pt-10">
          <TeamCard 
            name="Guilherme C."
            description="Mente por trás da engenharia, Guilherme C. é o arquiteto de soluções de IA. Especialista em construir as robustas e inovadoras arquiteturas multiagente que são o coração da C2G."
            imageSrc="https://lh3.googleusercontent.com/d/12YdaYeZh-7ZUe-GOKvK0za10O68mYOd3"
            delay="0"
          />
          <TeamCard 
            name="Caíque R."
            description="Com um olhar estratégico afiado para negócios e parcerias, Caique R é o motor que impulsiona a C2G para novos horizontes, traduzindo a visão em oportunidades concretas."
            imageSrc="https://lh3.googleusercontent.com/d/1t5_gwVOvQEmNqj8zIdvgb86OHCdAe1Ua"
            delay="100"
          />
          <TeamCard 
            name="Guilherme R."
            description="Especialista em engenharia de software, com foco em LLMs e visão estratégica. Responsável por garantir entregas eficientes e transformar tecnologia em resultados práticos."
            imageSrc="https://lh3.googleusercontent.com/d/138PVe_N_ZzkX7UwSNh6UAidHWHLOV0ZO"
            delay="200"
          />
        </div>

      </div>
    </section>
  );
};