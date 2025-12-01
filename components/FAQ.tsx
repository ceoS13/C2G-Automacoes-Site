import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  id: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = `faq-panel-${id}`;
  const headerId = `faq-header-${id}`;

  return (
    <div 
      className={`
        relative rounded-xl border transition-all duration-300 overflow-hidden group
        ${isOpen 
          ? 'bg-white/[0.08] border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
          : 'bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/[0.07]'
        }
      `}
    >
      <button 
        id={headerId}
        className="w-full p-5 md:p-6 flex justify-between items-center text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <div className="flex items-center gap-4 pr-4">
           <span className={`text-base md:text-lg font-medium transition-colors duration-300 ${isOpen ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>
             {question}
           </span>
        </div>
        
        {/* Ícone Container */}
        <div className={`
           shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300
           ${isOpen 
             ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400 rotate-90' 
             : 'bg-white/5 border-white/10 text-zinc-500 group-hover:border-white/20 group-hover:text-white'
           }
        `}>
           <Plus 
              size={18} 
              className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`} 
            />
        </div>
      </button>
      
      <div 
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className={`grid overflow-hidden transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="px-5 md:px-6 pb-6 pr-12 md:pr-16">
            <p className="text-zinc-400 leading-relaxed text-sm md:text-base border-l border-white/10 pl-4">
               {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FAQ: React.FC = () => {
  const faqData = [
    {
      id: 'alucinacao',
      question: "A IA pode 'alucinar' e falar besteira para o cliente?",
      answer: "Não. Utilizamos uma arquitetura de RAG (Retrieval-Augmented Generation) com camadas de segurança. A Ísis só responde baseada nos documentos que você aprovar. Além disso, temos o A.V.A. (nosso auditor digital) que monitora as interações. Se a IA não tiver certeza da resposta, ela transfere imediatamente para um humano, jamais inventa dados."
    },
    {
      id: 'numero',
      question: "Preciso mudar meu número de WhatsApp?",
      answer: "Não. Nossa tecnologia se conecta ao seu WhatsApp Business existente. Você mantém seu número, seu histórico de conversas e seus clientes continuam chamando no contato que já conhecem, sem fricção."
    },
    {
      id: 'integracao',
      question: "Como funciona a integração com meu sistema?",
      answer: 'Nossa arquitetura é "API First". Conectamos nativamente com qualquer sistema moderno (ERPs, CRMs, Planilhas) via API ou Webhooks utilizando nossa infraestrutura em n8n. Para sistemas legados ou bancos de dados específicos, nossa engenharia desenvolve conectores seguros sob medida.'
    },
    {
      id: 'implementacao',
      question: "Qual o tempo de implementação?",
      answer: "Somos ágeis. Para os planos Standard e Plus, entregamos sua IA configurada e treinada em até 5 a 7 dias úteis. Para projetos Enterprise (com integrações profundas de estoque ou jurídico), o cronograma é definido no diagnóstico técnico, variando geralmente entre 15 a 30 dias."
    }
  ];

  return (
    <section id="faq" className="py-20 md:py-32 bg-transparent">
      <div className="max-w-3xl mx-auto px-6 md:px-8" data-aos="fade-up">
        
        {/* Standardized Header Badge */}
        <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass-panel bg-black/50">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                <span className="text-[10px] md:text-xs font-mono text-cyan-200/80 uppercase tracking-widest">Base de Conhecimento</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-6 mb-4">
               Perguntas Frequentes
            </h2>
            <p className="text-zinc-500">
               Tudo o que você precisa saber sobre a implementação.
            </p>
        </div>
        
        <div className="space-y-4">
          {faqData.map((item) => (
            <FAQItem 
              key={item.id}
              id={item.id}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};