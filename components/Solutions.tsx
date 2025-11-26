import React from 'react';
import { MessageSquare, Rocket, Lock, ArrowUpRight } from 'lucide-react';
import { Button } from './ui/Button';

// Memoized card component to prevent re-renders on parent state changes
const ProductCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  gradient: string;
  iconColor: string;
  delay?: string;
}> = React.memo(({ title, description, icon, features, gradient, iconColor, delay }) => (
  <div 
    className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 hover:bg-[#111] hover:border-cyan-500/20 transition-all duration-500 overflow-hidden hover:scale-[1.02]"
    data-aos="fade-up"
    data-aos-delay={delay}
  >
    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradient}`} />
    
    <div className={`mb-6 inline-flex p-3 rounded-lg bg-[#151515] ${iconColor} group-hover:scale-110 transition-transform duration-300`}>
      {icon}
    </div>
    
    <h3 className="text-2xl font-bold text-zinc-100 mb-2">{title}</h3>
    <p className="text-zinc-400 mb-6 h-20">{description}</p>
    
    <ul className="space-y-3 mb-8">
      {features.map((feature, i) => (
        <li key={i} className="flex items-center gap-2 text-sm text-zinc-300">
          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${gradient}`} />
          {feature}
        </li>
      ))}
    </ul>

    <Button 
      variant="ghost" 
      className="!p-0 hover:!bg-transparent group-hover:text-cyan-400 group-hover:gap-4 transition-all" 
      onClick={() => window.open('https://wa.me/', '_blank')}
      title={`Saiba mais sobre ${title}`}
    >
      Saiba mais <ArrowUpRight size={16} />
    </Button>
  </div>
));

export const Solutions: React.FC = () => {
  return (
    <section id="solutions" className="py-16 md:py-24 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-100 mb-6">
            Nossos Agentes
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Ecossistemas completos de inteligência artificial projetados para funções críticas de negócio.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <ProductCard 
            title="Ísis"
            description="Agente de Atendimento & Vendas que converte leads em clientes reais, 24 horas por dia."
            icon={<MessageSquare size={32} />}
            gradient="from-blue-600 to-cyan-500"
            iconColor="text-cyan-400"
            features={[
              "Memória de Longo Prazo",
              "Validação de Regras de Negócio",
              "Agendamento Automático (GCal/Outlook)",
              "Transbordo Inteligente"
            ]}
            delay="0"
          />
          <ProductCard 
            title="Growth Autônomo"
            description="SDR Digital que prospecta ativamente no LinkedIn e E-mail, gerando pipeline qualificado."
            icon={<Rocket size={32} />}
            gradient="from-cyan-500 to-emerald-400"
            iconColor="text-emerald-400"
            features={[
              "Prospecção Ativa (Outbound)",
              "Enriquecimento de Leads",
              "Personalização Contextual",
              "Integração CRM Direta"
            ]}
            delay="100"
          />
          <ProductCard 
            title="Governança (A.V.A.)"
            description="Camada de auditoria e segurança que garante que a IA opere dentro das diretrizes da empresa."
            icon={<Lock size={32} />}
            gradient="from-blue-700 to-indigo-500"
            iconColor="text-blue-400"
            features={[
              "Auditoria em Tempo Real",
              "Bloqueio de Alucinações",
              "Conformidade LGPD",
              "Logs Transparentes"
            ]}
            delay="200"
          />
        </div>
      </div>
    </section>
  );
};