import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

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
            group border rounded-xl overflow-hidden transition-all duration-300 ease-in-out
            ${isOpen
          ? 'bg-[#0a0a0a] border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
          : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.07]'
        }
        `}
    >
      <button
        id={headerId}
        className="w-full p-6 flex justify-between items-center text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className={`text-base md:text-lg font-medium pr-4 transition-colors duration-300 ${isOpen ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>
          {question}
        </span>

        {/* Animated Icon Container */}
        <div className={`
            shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300
            ${isOpen
            ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400 rotate-45'
            : 'bg-white/5 border-white/10 text-zinc-500 group-hover:border-white/30 group-hover:text-white rotate-0'
          }
        `}>
          <Plus size={16} />
        </div>

      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className={`grid overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 pt-0">
            <div className="h-px w-full bg-white/5 mb-4" /> {/* Divisor sutil interno */}
            <p className="text-zinc-400 leading-relaxed text-base font-light">
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
      answer: "Nossa infraestrutura foi desenhada para bloquear alucinações. Utilizamos RAG (Geração Aumentada por Recuperação) para restringir as respostas dos nossos agentes apenas aos documentos que você aprovar. Além disso, o protocolo A.V.A. audita a confiança de cada resposta em tempo real. Se a IA não encontrar a informação na sua base, ela é programada para não inventar: ela pede desculpas e transfere para um humano."
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
      answer: "Prezamos pela estabilidade. Para os planos Standard, Plus e Pro, nosso ciclo completo (Setup + Homologação + Testes de Carga) leva em média 30 dias. Para projetos Enterprise, o cronograma é desenhado sob medida após o diagnóstico técnico da sua infraestrutura atual."
    }
  ];

  return (
    <section id="faq" className="py-20 md:py-32 bg-[#050505] relative">

      {/* Top transition gradient */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#050505] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="max-w-3xl mx-auto px-6 md:px-8 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >

        {/* Standardized Header Badge */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass-panel bg-black/50 mb-6">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
            <span className="text-[10px] md:text-xs font-mono text-cyan-200/80 uppercase tracking-widest">Base de Conhecimento</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Dúvidas Frequentes
          </h2>
        </div>

        {/* Stack of Cards */}
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

      </motion.div>
    </section>
  );
};