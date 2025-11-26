import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Loader2, Database, CheckCircle2, Check, Calendar } from 'lucide-react';

type Message = {
  id: number;
  role: 'ai' | 'user' | 'system';
  content: string;
  delay: number;
};

// Expanded Script showing Scheduling, Negotiation, Enrichment, CRM Integration, and Proactivity
const DEMO_SCRIPT: Message[] = [
  { id: 1, role: 'user', content: "Gostaria de agendar uma demonstração.", delay: 500 },
  { id: 2, role: 'system', content: "Checking Google Calendar availability...", delay: 1500 },
  { id: 3, role: 'ai', content: "Amanhã a agenda está lotada, mas tenho disponibilidade na Quinta às 14h ou Sexta às 10h. Qual prefere?", delay: 3000 },
  { id: 4, role: 'user', content: "Pode ser na Quinta às 14h.", delay: 4500 },
  { id: 5, role: 'ai', content: "Perfeito. Qual seu melhor e-mail corporativo para o convite?", delay: 5500 },
  { id: 6, role: 'user', content: "joao.silva@vertex.com.br", delay: 7000 },
  { id: 7, role: 'system', content: "Enriching Lead Data (Clearbit API)...", delay: 8000 },
  { id: 8, role: 'system', content: "Creating Deal in HubSpot CRM...", delay: 9500 },
  { id: 9, role: 'ai', content: "Agendado, João! Convite enviado. Como vi que você é CTO, aproveitei e anexei nossa documentação técnica no e-mail.", delay: 11000 },
];

export const ChatDemo: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  // Refs to manage execution state and cleanup strictly
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null); // Ref specifically for the scrollable message area
  const hasStartedRef = useRef(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Auto-scroll logic scoped ONLY to the chat container
  useEffect(() => {
    if (scrollAreaRef.current) {
        const scrollContainer = scrollAreaRef.current;
        scrollContainer.scrollTo({
            top: scrollContainer.scrollHeight,
            behavior: 'smooth'
        });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    const runDemo = () => {
      if (hasStartedRef.current) return;
      hasStartedRef.current = true;
      setMessages([]); // Ensure clear state start

      DEMO_SCRIPT.forEach((msg) => {
        // Outer timeout for message arrival
        const t1 = setTimeout(() => {
            if (msg.role === 'ai') setIsTyping(true);
            
            // Inner timeout for typing delay (if AI)
            const typingDelay = msg.role === 'ai' ? 1200 : 0; // Slightly longer typing for realism
            const t2 = setTimeout(() => {
                setIsTyping(false);
                setMessages((prev) => {
                    // Double check to prevent duplicates if something went wrong
                    if (prev.some(m => m.id === msg.id)) return prev;
                    return [...prev, msg];
                });
            }, typingDelay);
            
            timeoutsRef.current.push(t2);

        }, msg.delay);
        
        timeoutsRef.current.push(t1);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStartedRef.current) {
          runDemo();
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Strict Cleanup
    return () => {
      observer.disconnect();
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      hasStartedRef.current = false; // Reset on unmount
    };
  }, []);

  return (
    <section id="chat-demo" className="py-32 relative bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div ref={containerRef} data-aos="fade-right">
            <h2 className="text-4xl md:text-6xl font-bold text-zinc-100 mb-6 tracking-tight leading-tight">
              Menos "Bom dia", <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
                Mais Resultado.
              </span>
            </h2>
            <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
              Chatbots comuns travam quando o cliente sai do roteiro. A Ísis entende áudio, contexto e intenção. Ela não é um robô de menu, é uma funcionária digital que pensa.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-zinc-300">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Database size={24} /></div>
                <div>
                  <h4 className="font-bold">Conexão Real</h4>
                  <p className="text-sm text-zinc-500">Integração nativa com Google Calendar, RD Station e seu ERP.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-zinc-300">
                <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400"><CheckCircle2 size={24} /></div>
                <div>
                  <h4 className="font-bold">Raciocínio Lógico</h4>
                  <p className="text-sm text-zinc-500">Valida regras de negócio (ex: "não agendar no domingo") antes de responder.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Demo Interface */}
          <div className="relative" data-aos="fade-left">
            {/* Glow Effect behind phone */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-cyan-500/20 rounded-[3rem] blur-xl transform rotate-3" />
            
            <div className="relative bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-6 h-[650px] shadow-2xl overflow-hidden flex flex-col glass-panel">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <Bot size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Ísis AI</h3>
                    <p className="text-xs text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> Online
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages Area - Now with ref for scoped scrolling */}
              <div 
                ref={scrollAreaRef}
                className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar relative pb-4"
              >
                <AnimatePresence mode="popLayout">
                  {messages.map((msg, index) => {
                    const isLast = index === messages.length - 1;
                    const isSystemLoading = isLast && !isTyping;

                    return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} w-full`}
                    >
                      {msg.role === 'system' ? (
                         <div className="w-full text-center my-2">
                             <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono transition-colors duration-500 ${
                                 !isSystemLoading
                                 ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                                 : "bg-white/5 border-white/5 text-zinc-500"
                             }`}>
                                {isSystemLoading ? (
                                    <Loader2 size={12} className="animate-spin" />
                                ) : (
                                    <Check size={12} className="stroke-[3]" /> 
                                )}
                                {msg.content}
                             </span>
                         </div>
                      ) : (
                        <div
                          className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                            msg.role === 'user'
                              ? 'bg-zinc-100 text-black rounded-br-none'
                              : 'bg-white/5 text-zinc-100 border border-white/5 rounded-bl-none'
                          }`}
                        >
                          {msg.content}
                        </div>
                      )}
                    </motion.div>
                  )})}
                </AnimatePresence>
                
                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex justify-start w-full"
                  >
                      <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-bl-none flex gap-1 border border-white/5">
                          <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}/>
                          <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}/>
                          <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}/>
                      </div>
                  </motion.div>
                )}
                
              </div>

              {/* Input Area (Visual Only) */}
              <div className="pt-4 border-t border-white/5 mt-auto shrink-0">
                <div className="bg-white/5 rounded-full h-12 flex items-center px-4 border border-white/5 opacity-50">
                    <span className="text-zinc-500 text-sm">Digite uma mensagem...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};