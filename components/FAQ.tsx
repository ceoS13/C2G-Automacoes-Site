import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
    <div className="border-b border-gray-800">
      <button 
        id={headerId}
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none focus:ring-2 focus:ring-cyan-500/50 rounded"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="text-lg font-medium text-white pr-4">{question}</span>
        <ChevronDown 
            className={`text-zinc-500 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
            aria-hidden="true" 
        />
      </button>
      <div 
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <p className="text-zinc-400 leading-relaxed text-base pt-2 pb-6">{answer}</p>
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
    <section id="faq" className="py-20 md:py-32 bg-[#080808]">
      <div className="max-w-3xl mx-auto px-6 md:px-8" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">
          Perguntas Frequentes
        </h2>
        
        <div className="space-y-2">
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