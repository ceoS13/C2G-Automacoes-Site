
import React, { useRef, useEffect } from 'react';
import { getOptimizedImageUrl } from '../lib/utils';
import { AlertTriangle, Workflow, Cpu } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue, useInView, animate, useTransform } from 'framer-motion';

const TeamCard: React.FC<{ name: string; description: string; imageSrc: string; delay: string; }> = ({ name, description, imageSrc, delay }) => (
  <article className="relative group h-full" data-aos="fade-up" data-aos-delay={delay}>
    <div className="h-full bg-black border border-zinc-800 rounded-[2.5rem] px-6 pb-10 pt-20 text-center relative mt-12 transition-all duration-500 hover:border-cyan-500/30">
       <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-black p-2 z-10">
          <img src={getOptimizedImageUrl(imageSrc, 400, 400, true)} alt={name} className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
       </div>
       <h3 className="text-2xl font-bold text-white mb-4">{name}</h3>
       <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
    </div>
  </article>
);

export const About: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.2 });
  const beamProgress = useMotionValue(0);

  useEffect(() => {
    let controls;
    if (isInView) {
        controls = animate(beamProgress, 100, { duration: 5, ease: "linear", repeat: Infinity });
    }
    return () => controls?.stop();
  }, [isInView]);

  // FIX: x (transform) em vez de left
  const beamX = useTransform(beamProgress, [0, 100], ["0%", "500%"]);

  return (
    <section id="about" className="py-24 md:py-40 bg-[#050505] relative border-t border-white/5 [contain:paint]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Engenharia por trás da <span className="text-cyan-400">Autonomia</span></h2>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-16 relative mb-32">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2 z-0 overflow-hidden">
                <motion.div style={{ x: beamX }} className="absolute top-0 w-[150px] h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[2px]" />
            </div>
            
            {[
                { title: "A Inconformidade", icon: AlertTriangle, desc: "Vimos um abismo no mercado: IA prometendo milagres versus empresas travadas.", color: "border-red-500/20" },
                { title: "Infraestrutura Real", icon: Workflow, desc: "Não vendemos prompts. Fechamos o Execution Gap com engenharia robusta.", color: "border-cyan-500/20" },
                { title: "Força de Trabalho Digital", icon: Cpu, desc: "Codificamos o futuro do trabalho autônomo, devolvendo sua liberdade.", color: "border-purple-500/20" }
            ].map((node, i) => (
                <div key={i} className={`bg-[#0a0a0a] border ${node.color} rounded-2xl p-8 relative z-10`} data-aos="fade-up" data-aos-delay={i * 100}>
                    <node.icon className="text-cyan-400 mb-4" size={24} />
                    <h3 className="text-xl font-bold text-white mb-3">{node.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{node.desc}</p>
                </div>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <TeamCard name="Guilherme C." description="Arquiteto de soluções de IA e idealizador da engenharia multiagente da C2G." imageSrc="https://lh3.googleusercontent.com/d/12YdaYeZh-7ZUe-GOKvK0za10O68mYOd3" delay="0" />
          <TeamCard name="Caíque R." description="Estrategista de negócios e parcerias, impulsionando a visão em oportunidades reais." imageSrc="https://lh3.googleusercontent.com/d/1t5_gwVOvQEmNqj8zIdvgb86OHCdAe1Ua" delay="100" />
          <TeamCard name="Guilherme R." description="Engenheiro de software focado em LLMs, garantindo entregas eficientes e práticas." imageSrc="https://lh3.googleusercontent.com/d/138PVe_N_ZzkX7UwSNh6UAidHWHLOV0ZO" delay="200" />
        </div>
      </div>
    </section>
  );
};
