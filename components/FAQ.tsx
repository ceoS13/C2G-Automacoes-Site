import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-800">
      <button 
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-zinc-100">{question}</span>
        {isOpen ? <ChevronUp className="text-zinc-500" /> : <ChevronDown className="text-zinc-500" />}
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}
      >
        <p className="text-zinc-400 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

export const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-24 bg-[#080808]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-zinc-100 mb-12 text-center">
          Perguntas Frequentes
        </h2>
        
        <div className="space-y-2">
          <FAQItem 
            question="A IA pode 'alucinar' e falar besteira para o cliente?"
            answer="Não. Utilizamos uma arquitetura de RAG (Retrieval-Augmented Generation) com camadas de segurança. A Ísis só responde baseada nos documentos que você aprovar. Além disso, temos o A.V.A. (nosso auditor digital) que monitora as interações. Se a IA não tiver certeza da resposta, ela transfere imediatamente para um humano, jamais inventa dados."
          />
          <FAQItem 
            question="Preciso mudar meu número de WhatsApp?"
            answer="Não. Nossa tecnologia se conecta ao seu WhatsApp Business existente. Você mantém seu número, seu histórico de conversas e seus clientes continuam chamando no contato que já conhecem, sem fricção."
          />
          <FAQItem 
            question="Como funciona a integração com meu sistema?"
            answer={'Nossa arquitetura é "API First". Conectamos nativamente com qualquer sistema moderno (ERPs, CRMs, Planilhas) via API ou Webhooks utilizando nossa infraestrutura em n8n. Para sistemas legados ou bancos de dados específicos, nossa engenharia desenvolve conectores seguros sob medida.'}
          />
          <FAQItem 
            question="Qual o tempo de implementação?"
            answer="Somos ágeis. Para os planos Standard e Plus, entregamos sua IA configurada e treinada em até 5 a 7 dias úteis. Para projetos Enterprise (com integrações profundas de estoque ou jurídico), o cronograma é definido no diagnóstico técnico, variando geralmente entre 15 a 30 dias."
          />
        </div>
      </div>
    </section>
  );
};