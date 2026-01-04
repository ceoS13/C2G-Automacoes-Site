
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Bot, Loader2, Database, CheckCircle2, Check, DollarSign, Headphones, Calendar, Send } from 'lucide-react';

type Message = {
  id: number;
  role: 'ai' | 'user' | 'system';
  content: string;
  delay: number; // Agora representa o tempo de espera ANTES de começar a ação
};

type ScenarioKey = 'scheduling' | 'support' | 'finance';

// Delays ajustados para serem RELATIVOS (tempo de espera antes da ação)
const SCENARIOS: Record<ScenarioKey, Message[]> = {
  scheduling: [
    { id: 1, role: 'user', content: "Gostaria de agendar uma demonstração.", delay: 800 },
    { id: 2, role: 'system', content: "Verificando disponibilidade no Google Agenda...", delay: 600 },
    { id: 3, role: 'ai', content: "Amanhã a agenda está lotada, mas tenho disponibilidade na Quinta às 14h. Qual prefere?", delay: 1500 },
    { id: 4, role: 'user', content: "Quinta às 14h.", delay: 2500 }, // Delay maior para "ler" a pergunta
    { id: 5, role: 'system', content: "Enriquecendo dados do Lead (API Clearbit)...", delay: 800 },
    { id: 6, role: 'ai', content: "Agendado! Vi que você é CTO na Vertex. Enviei o convite e nossa documentação técnica no seu e-mail.", delay: 1500 },
  ],
  support: [
    { id: 1, role: 'user', content: "Meu pedido #4920 ainda não chegou.", delay: 800 },
    { id: 2, role: 'system', content: "Consultando API de Logística/ERP...", delay: 800 },
    { id: 3, role: 'ai', content: "Consultei aqui. O pedido #4920 teve um atraso na transportadora, mas saiu para entrega hoje às 08:30.", delay: 1500 },
    { id: 4, role: 'user', content: "Ah, entendi. Conseguem entregar até as 18h?", delay: 3000 }, // Leitura + Digitação
    { id: 5, role: 'ai', content: "Sim! A previsão atualizada é até as 16h45. Já notifiquei o motorista priorizar sua rota.", delay: 1500 },
  ],
  finance: [
    { id: 1, role: 'user', content: "Preciso da 2ª via do boleto de Janeiro.", delay: 800 },
    { id: 2, role: 'system', content: "Autenticando Usuário e Acessando Banco...", delay: 800 },
    { id: 3, role: 'ai', content: "Localizei. O boleto vencia dia 15/01. Deseja que eu gere um novo com data para hoje sem juros?", delay: 1500 },
    { id: 4, role: 'user', content: "Sim, por favor.", delay: 2000 },
    { id: 5, role: 'system', content: "Gerando PDF e Enviando para WhatsApp...", delay: 800 },
    { id: 6, role: 'ai', content: "Prontinho! Acabei de enviar o PDF aqui e no seu e-mail financeiro.", delay: 1500 },
  ]
};

export const ChatDemo: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>('scheduling');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [inputValue, setInputValue] = useState(""); // Novo estado para o input real
  
  const chatRef = useRef<HTMLElement>(null);
  const isInView = useInView(chatRef, { once: true, amount: 0.2 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Ref para controlar o cancelamento do loop assíncrono se o usuário trocar de aba/cenário
  const abortControllerRef = useRef<AbortController | null>(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollAreaRef.current) {
        const scrollContainer = scrollAreaRef.current;
        scrollContainer.scrollTo({
            top: scrollContainer.scrollHeight,
            behavior: 'smooth'
        });
    }
  }, [messages, isAiTyping]);

  // Função auxiliar para esperar tempo (promisified setTimeout)
  const wait = (ms: number, signal: AbortSignal) => new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => resolve(), ms);
      signal.addEventListener('abort', () => {
          clearTimeout(timer);
          reject(new Error('Aborted'));
      });
  });

  // Função para simular digitação no input
  const typeIntoInput = async (text: string, signal: AbortSignal) => {
    for (let i = 1; i <= text.length; i++) {
        if (signal.aborted) throw new Error('Aborted');
        setInputValue(text.substring(0, i));
        // Velocidade de digitação variável para parecer humano
        await wait(30 + Math.random() * 40, signal); 
    }
    // Pausa breve antes de "enviar"
    await wait(400, signal);
  };

  const runScenario = async (scenario: ScenarioKey) => {
    // Cancela execução anterior se houver
    if (abortControllerRef.current) {
        abortControllerRef.current.abort();
    }
    
    const controller = new AbortController();
    abortControllerRef.current = controller;
    const { signal } = controller;

    try {
        setMessages([]);
        setInputValue("");
        setIsAiTyping(false);

        const script = SCENARIOS[scenario];

        for (const msg of script) {
            // 1. Delay Inicial (Leitura ou Processamento)
            await wait(msg.delay, signal);

            if (msg.role === 'user') {
                // Simula usuário digitando no campo de input
                await typeIntoInput(msg.content, signal);
                setInputValue(""); // Limpa input
                setMessages(prev => [...prev, msg]); // Envia mensagem
            } 
            else if (msg.role === 'ai') {
                // Simula IA pensando
                setIsAiTyping(true);
                await wait(1500, signal); // Tempo de "typing..." da IA
                setIsAiTyping(false);
                setMessages(prev => [...prev, msg]);
            } 
            else {
                // Mensagens de sistema (instantâneas após delay)
                setMessages(prev => [...prev, msg]);
            }
        }
    } catch (error) {
        // Ignora erros de abortamento (troca de cenário)
        if ((error as Error).message !== 'Aborted') console.error(error);
    }
  };

  // Inicia o cenário quando visível ou quando o usuário clica nos botões
  useEffect(() => {
    if (isInView) {
      runScenario(activeScenario);
    }
    return () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    };
  }, [activeScenario, isInView]);

  return (
    <section id="chat-demo" className="py-16 md:py-32 relative bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div ref={containerRef} data-aos="fade-right" className="relative z-10">
            <div className="bg-black/80 backdrop-blur-md md:bg-transparent md:backdrop-blur-none border border-white/10 md:border-none p-6 md:p-0 rounded-2xl shadow-xl md:shadow-none">
                <h2 className="text-3xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                Sua Força de <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
                    Trabalho Digital.
                </span>
                </h2>
                <p className="text-base md:text-xl text-zinc-400 mb-8 leading-relaxed">
                Delegue tarefas manuais para agentes que operam 24/7, com precisão consistente e alta eficiência de custos. Nossos sistemas orquestram seu Financeiro, Logística e Vendas com autonomia de Nível 4, permitindo que sua empresa cresça sem gargalos operacionais.
                </p>
                
                <ul className="space-y-4">
                    <li className="flex items-center gap-4 text-zinc-300">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 shrink-0"><Database size={24} /></div>
                        <div>
                        <h4 className="font-bold text-sm md:text-base">Maximize a Precisão Operacional</h4>
                        <p className="text-xs md:text-sm text-zinc-500">Dados cruzados entre WhatsApp, E-mail e ERP sem falhas de digitação.</p>
                        </div>
                    </li>
                    <li className="flex items-center gap-4 text-zinc-300">
                        <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 shrink-0"><CheckCircle2 size={24} /></div>
                        <div>
                        <h4 className="font-bold text-sm md:text-base">Redução de Custo Operacional</h4>
                        <p className="text-xs md:text-sm text-zinc-500">Escale o volume de atendimento sem precisar contratar mais pessoas.</p>
                        </div>
                    </li>
                </ul>
            </div>
          </div>

          <article ref={chatRef} className="relative w-full mt-8 lg:mt-0" data-aos="fade-left">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-cyan-500/20 rounded-[3rem] blur-xl transform rotate-3" />
            
            <div className="relative bg-[#0a0a0a] border border-white/10 rounded-[2rem] md:rounded-[2.5rem] p-4 md:p-6 h-[450px] md:h-[650px] shadow-2xl overflow-hidden flex flex-col glass-panel">
              
              <header className="border-b border-white/5 pb-4 mb-4 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 shrink-0">
                        <Bot size={18} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-sm md:text-base">Ísis AI</h3>
                        <p className="text-[10px] md:text-xs text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> Online
                        </p>
                    </div>
                    </div>
                </div>

                <div className="flex p-1 bg-white/5 rounded-xl border border-white/5 overflow-x-auto no-scrollbar scroll-smooth">
                    <button 
                        type="button"
                        onClick={() => setActiveScenario('scheduling')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${activeScenario === 'scheduling' ? 'bg-white/10 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                        aria-label="Ativar cenário de Agendamento"
                    >
                        <Calendar size={12} className="shrink-0" /> <span>Comercial</span>
                    </button>
                    <button 
                        type="button"
                        onClick={() => setActiveScenario('support')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${activeScenario === 'support' ? 'bg-white/10 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                        aria-label="Ativar cenário de Suporte"
                    >
                        <Headphones size={12} className="shrink-0" /> <span>Logística</span>
                    </button>
                    <button 
                        type="button"
                        onClick={() => setActiveScenario('finance')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${activeScenario === 'finance' ? 'bg-white/10 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                        aria-label="Ativar cenário Financeiro"
                    >
                        <DollarSign size={12} className="shrink-0" /> <span>Financeiro</span>
                    </button>
                </div>
              </header>

              <div 
                ref={scrollAreaRef}
                className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar relative pb-4"
                aria-live="polite"
              >
                <AnimatePresence mode="wait">
                  {messages.map((msg, index) => {
                    const isLast = index === messages.length - 1;
                    const isSystemLoading = isLast && !isAiTyping && !inputValue;

                    return (
                    <motion.div
                      key={`${activeScenario}-${msg.id}`}
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} w-full`}
                    >
                      {msg.role === 'system' ? (
                         <div className="w-full text-center my-2">
                             <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] md:text-xs font-mono transition-colors duration-500 ${
                                 !isSystemLoading
                                 ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                                 : "bg-white/5 border-white/5 text-zinc-500"
                             }`}>
                                {isSystemLoading ? (
                                    <Loader2 size={10} className="animate-spin" />
                                ) : (
                                    <Check size={10} className="stroke-[3]" /> 
                                )}
                                {msg.content}
                             </span>
                         </div>
                      ) : (
                        <div
                          className={`max-w-[85%] p-3 md:p-4 rounded-2xl text-xs md:text-sm leading-relaxed shadow-sm ${
                            msg.role === 'user'
                              ? 'bg-zinc-100 text-black rounded-br-none'
                              : 'bg-white/5 text-white border border-white/5 rounded-bl-none'
                          }`}
                        >
                          {msg.content}
                        </div>
                      )}
                    </motion.div>
                  )})}
                </AnimatePresence>
                
                {isAiTyping && (
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

              {/* INPUT AREA SIMULADA */}
              <div className="pt-3 md:pt-4 border-t border-white/5 mt-auto shrink-0">
                <div className="bg-white/5 rounded-full h-10 md:h-12 flex items-center justify-between px-4 border border-white/5 relative overflow-hidden transition-colors duration-300">
                    
                    {/* Texto digitado ou Placeholder */}
                    <div className="flex-1 truncate mr-2 font-light">
                        {inputValue ? (
                            <span className="text-white text-xs md:text-sm">
                                {inputValue}
                                <span className="inline-block w-[1px] h-4 bg-cyan-400 ml-0.5 align-middle animate-pulse" />
                            </span>
                        ) : (
                            <span className="text-zinc-600 text-xs md:text-sm animate-pulse">Digite uma mensagem...</span>
                        )}
                    </div>

                    {/* Botão de Enviar (Visual) */}
                    <div className={`p-2 rounded-full transition-all duration-300 ${inputValue ? 'bg-cyan-500 text-white scale-100' : 'bg-transparent text-zinc-700 scale-90'}`}>
                        <Send size={16} />
                    </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
      {/* Bottom Gradient for Smooth Transition */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#050505] to-transparent z-20 pointer-events-none" />
    </section>
  );
};
