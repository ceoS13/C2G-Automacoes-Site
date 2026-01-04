
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Bot, Loader2, Database, CheckCircle2, DollarSign, Headphones, Calendar, Send, Sparkles, Zap, BrainCircuit, Lock } from 'lucide-react';

type Message = {
  id: number;
  role: 'ai' | 'user' | 'system';
  content: string;
  delay: number;
  actionStatus?: string; // Texto que aparecerá no header durante o delay (Ex: "Consultando CRM...")
};

type ScenarioKey = 'scheduling' | 'support' | 'finance';

const SCENARIOS: Record<ScenarioKey, Message[]> = {
  scheduling: [
    { id: 1, role: 'user', content: "Gostaria de agendar uma demonstração.", delay: 1000, actionStatus: "Aguardando input..." },
    { id: 2, role: 'system', content: "Verificando disponibilidade no Google Agenda...", delay: 600, actionStatus: "Conectando API Calendar..." },
    { id: 3, role: 'ai', content: "Amanhã a agenda está lotada, mas tenho disponibilidade na Quinta às 14h. Qual prefere?", delay: 1500, actionStatus: "Gerando resposta..." },
    { id: 4, role: 'user', content: "Quinta às 14h.", delay: 3000, actionStatus: "Aguardando usuário..." }, 
    { id: 5, role: 'system', content: "Enriquecendo dados do Lead (API Clearbit)...", delay: 800, actionStatus: "Processando dados..." },
    { id: 6, role: 'ai', content: "Agendado! Vi que você é CTO na Vertex. Enviei o convite e nossa documentação técnica no seu e-mail.", delay: 1500, actionStatus: "Finalizando agendamento..." },
  ],
  support: [
    { id: 1, role: 'user', content: "Meu pedido #4920 ainda não chegou.", delay: 1000, actionStatus: "Aguardando input..." },
    { id: 2, role: 'system', content: "Consultando API de Logística/ERP...", delay: 800, actionStatus: "Acessando Banco de Dados..." },
    { id: 3, role: 'ai', content: "Consultei aqui. O pedido #4920 teve um atraso na transportadora, mas saiu para entrega hoje às 08:30.", delay: 2000, actionStatus: "Analisando rastreio..." },
    { id: 4, role: 'user', content: "Ah, entendi. Conseguem entregar até as 18h?", delay: 3500, actionStatus: "Aguardando usuário..." },
    { id: 5, role: 'ai', content: "Sim! A previsão atualizada é até as 16h45. Já notifiquei o motorista priorizar sua rota.", delay: 1500, actionStatus: "Contatando motorista..." },
  ],
  finance: [
    { id: 1, role: 'user', content: "Preciso da 2ª via do boleto de Janeiro.", delay: 1000, actionStatus: "Aguardando input..." },
    { id: 2, role: 'system', content: "Autenticando Usuário e Acessando Banco...", delay: 800, actionStatus: "Validando token de segurança..." },
    { id: 3, role: 'ai', content: "Localizei. O boleto vencia dia 15/01. Deseja que eu gere um novo com data para hoje sem juros?", delay: 2000, actionStatus: "Verificando regras de negócio..." },
    { id: 4, role: 'user', content: "Sim, por favor.", delay: 2500, actionStatus: "Aguardando usuário..." },
    { id: 5, role: 'system', content: "Gerando PDF e Enviando para WhatsApp...", delay: 800, actionStatus: "Gerando documento..." },
    { id: 6, role: 'ai', content: "Prontinho! Acabei de enviar o PDF aqui e no seu e-mail financeiro.", delay: 1500, actionStatus: "Enviando anexo..." },
  ]
};

export const ChatDemo: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>('scheduling');
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Estados de UI
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [headerStatus, setHeaderStatus] = useState("Online");
  const [isSendButtonActive, setIsSendButtonActive] = useState(false);
  
  const chatRef = useRef<HTMLElement>(null);
  const isInView = useInView(chatRef, { once: true, amount: 0.2 });
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Auto-scroll inteligente
  useEffect(() => {
    if (scrollAreaRef.current) {
        const scrollContainer = scrollAreaRef.current;
        setTimeout(() => {
            scrollContainer.scrollTo({
                top: scrollContainer.scrollHeight,
                behavior: 'smooth'
            });
        }, 100);
    }
  }, [messages, isAiTyping, inputValue]); // Adicionei inputValue para scrollar enquanto digita

  const wait = (ms: number, signal: AbortSignal) => new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => resolve(), ms);
      signal.addEventListener('abort', () => {
          clearTimeout(timer);
          reject(new Error('Aborted'));
      });
  });

  const typeIntoInput = async (text: string, signal: AbortSignal) => {
    setHeaderStatus("Digitando...");
    for (let i = 1; i <= text.length; i++) {
        if (signal.aborted) throw new Error('Aborted');
        setInputValue(text.substring(0, i));
        await wait(30 + Math.random() * 30, signal); 
    }
    setIsSendButtonActive(true); // Ativa brilho do botão
    await wait(600, signal); // Pausa dramática antes de enviar
    setIsSendButtonActive(false);
  };

  const runScenario = async (scenario: ScenarioKey) => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
    
    const controller = new AbortController();
    abortControllerRef.current = controller;
    const { signal } = controller;

    try {
        setMessages([]);
        setInputValue("");
        setIsAiTyping(false);
        setHeaderStatus("Iniciando sessão...");

        const script = SCENARIOS[scenario];

        for (const msg of script) {
            // Atualiza status do header baseado na próxima ação
            if (msg.actionStatus) setHeaderStatus(msg.actionStatus);

            await wait(msg.delay, signal);

            if (msg.role === 'user') {
                await typeIntoInput(msg.content, signal);
                setInputValue(""); 
                // Adiciona mensagem do usuário
                setMessages(prev => [...prev, msg]);
                setHeaderStatus("Enviado");
            } 
            else if (msg.role === 'ai') {
                setIsAiTyping(true);
                setHeaderStatus("Ísis está digitando...");
                await wait(1500, signal);
                setIsAiTyping(false);
                setMessages(prev => [...prev, msg]);
                setHeaderStatus("Online");
            } 
            else {
                // Mensagens de sistema
                setHeaderStatus("Processando...");
                setMessages(prev => [...prev, msg]);
                // Pequeno delay para ler a msg de sistema
                await wait(800, signal);
            }
        }
        setHeaderStatus("Aguardando novo comando...");
    } catch (error) {
        if ((error as Error).message !== 'Aborted') console.error(error);
    }
  };

  useEffect(() => {
    if (isInView) {
      runScenario(activeScenario);
    }
    return () => {
        if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [activeScenario, isInView]);

  // Cores dinâmicas para o ícone do header
  const getStatusColor = () => {
      if (headerStatus.includes("Digitando") || headerStatus.includes("Gerando")) return "text-cyan-400";
      if (headerStatus.includes("Conectando") || headerStatus.includes("Processando")) return "text-purple-400";
      if (headerStatus.includes("Online")) return "text-emerald-400";
      return "text-zinc-400";
  };

  return (
    <section id="chat-demo" className="py-16 md:py-32 relative bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Texto Explicativo (Esquerda) */}
          <div data-aos="fade-right" className="relative z-10 order-2 lg:order-1">
            <div className="bg-black/80 backdrop-blur-md md:bg-transparent md:backdrop-blur-none border border-white/10 md:border-none p-6 md:p-0 rounded-2xl shadow-xl md:shadow-none">
                <h2 className="text-3xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                Sua Força de <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
                    Trabalho Digital.
                </span>
                </h2>
                <p className="text-base md:text-xl text-zinc-400 mb-8 leading-relaxed">
                Delegue tarefas manuais para agentes que operam 24/7. Nossos sistemas orquestram seu Financeiro, Logística e Vendas com autonomia de Nível 4.
                </p>
                
                <ul className="space-y-4">
                    <li className="flex items-center gap-4 text-zinc-300 group">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 shrink-0 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors"><Database size={24} /></div>
                        <div>
                        <h4 className="font-bold text-sm md:text-base text-white">Integração Profunda</h4>
                        <p className="text-xs md:text-sm text-zinc-500">Conectamos WhatsApp ao seu ERP sem gambiarras.</p>
                        </div>
                    </li>
                    <li className="flex items-center gap-4 text-zinc-300 group">
                        <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 shrink-0 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors"><Zap size={24} /></div>
                        <div>
                        <h4 className="font-bold text-sm md:text-base text-white">Resposta Instantânea</h4>
                        <p className="text-xs md:text-sm text-zinc-500">Zero fila de espera. Atendimento em milissegundos.</p>
                        </div>
                    </li>
                </ul>
            </div>
          </div>

          {/* CHAT INTERFACE (Direita) */}
          <article ref={chatRef} className="relative w-full mt-8 lg:mt-0 order-1 lg:order-2" data-aos="fade-left">
            {/* Background Glow Behind Chat */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-cyan-500/10 rounded-[3rem] blur-2xl transform rotate-3 scale-95" />
            
            <div className="relative bg-[#0a0a0a] border border-white/10 rounded-[2rem] md:rounded-[2.5rem] p-4 md:p-6 h-[500px] md:h-[650px] shadow-2xl overflow-hidden flex flex-col glass-panel">
              
              {/* HEADER DO CHAT */}
              <header className="border-b border-white/5 pb-4 mb-4 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 shrink-0 border border-white/10">
                                <Bot size={20} className="text-white" />
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 bg-[#0a0a0a] rounded-full p-0.5">
                                <span className={`block w-3 h-3 rounded-full border-2 border-[#0a0a0a] ${headerStatus.includes('Online') ? 'bg-emerald-500 animate-pulse' : 'bg-cyan-500'}`} />
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-sm md:text-base flex items-center gap-2">
                                Ísis AI <span className="px-1.5 py-0.5 rounded text-[9px] bg-white/10 text-zinc-400 font-mono border border-white/5">v2.4</span>
                            </h3>
                            <p className={`text-[10px] md:text-xs font-mono flex items-center gap-1.5 transition-colors duration-300 ${getStatusColor()}`}>
                                {headerStatus === 'Online' ? <Sparkles size={10} /> : <BrainCircuit size={10} className="animate-pulse"/>}
                                {headerStatus}
                            </p>
                        </div>
                    </div>
                </div>

                {/* SCENARIO SELECTOR */}
                <div className="flex p-1 bg-black/40 rounded-xl border border-white/5 overflow-x-auto no-scrollbar">
                    {[
                        { id: 'scheduling', icon: Calendar, label: 'Comercial' },
                        { id: 'support', icon: Headphones, label: 'Logística' },
                        { id: 'finance', icon: DollarSign, label: 'Financeiro' }
                    ].map((item) => (
                        <button 
                            key={item.id}
                            type="button"
                            onClick={() => setActiveScenario(item.id as ScenarioKey)}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-medium transition-all whitespace-nowrap focus:outline-none ${
                                activeScenario === item.id 
                                ? 'bg-white/10 text-white shadow-sm border border-white/5' 
                                : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5 border border-transparent'
                            }`}
                        >
                            <item.icon size={14} className={activeScenario === item.id ? "text-cyan-400" : ""} /> 
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
              </header>

              {/* MESSAGE AREA */}
              <div 
                ref={scrollAreaRef}
                className="flex-1 overflow-y-auto space-y-5 pr-2 custom-scrollbar relative pb-4 px-1"
                aria-live="polite"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      layout
                      key={`${activeScenario}-${msg.id}`}
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className={`flex w-full ${
                          msg.role === 'user' ? 'justify-end' : 
                          msg.role === 'ai' ? 'justify-start' : 'justify-center'
                      }`}
                    >
                      {msg.role === 'system' ? (
                         <div className="w-full text-center my-2">
                             <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-black/40 border-cyan-900/30 text-cyan-500 text-[10px] md:text-xs font-mono shadow-[0_0_15px_-5px_rgba(6,182,212,0.15)]">
                                <CheckCircle2 size={10} className="text-cyan-400" />
                                {msg.content}
                             </span>
                         </div>
                      ) : (
                        <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            {/* Avatar for AI */}
                            {msg.role === 'ai' && (
                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                                    <Bot size={14} className="text-zinc-400" />
                                </div>
                            )}

                            <div
                              className={`
                                relative p-3 md:p-4 rounded-2xl text-xs md:text-sm leading-relaxed shadow-md
                                ${msg.role === 'user'
                                  ? 'bg-gradient-to-br from-white to-zinc-200 text-black rounded-tr-sm font-medium'
                                  : 'bg-white/5 text-zinc-100 border border-white/5 rounded-tl-sm backdrop-blur-sm'
                                }
                              `}
                            >
                              {msg.content}
                              
                              {/* Timestamp tiny */}
                              <div className={`text-[9px] mt-1.5 opacity-50 flex items-center gap-1 ${msg.role === 'user' ? 'justify-end text-black/60' : 'text-white/40'}`}>
                                  {msg.role === 'ai' && <Sparkles size={8} />}
                                  Agora
                              </div>
                            </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {isAiTyping && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, x: -10 }} 
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex justify-start w-full gap-3"
                  >
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                            <Bot size={14} className="text-zinc-500" />
                      </div>
                      <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 border border-white/5 items-center">
                          <span className="text-[10px] text-zinc-500 font-mono mr-2">Thinking</span>
                          <span className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}/>
                          <span className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}/>
                          <span className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}/>
                      </div>
                  </motion.div>
                )}
                
              </div>

              {/* INPUT AREA SIMULADA - COM GLOW */}
              <div className="pt-3 md:pt-4 border-t border-white/5 mt-auto shrink-0">
                <div className={`
                    bg-white/[0.03] rounded-xl h-12 md:h-14 flex items-center justify-between px-4 border transition-all duration-300 relative overflow-hidden
                    ${inputValue ? 'border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'border-white/5'}
                `}>
                    
                    {/* Texto digitado */}
                    <div className="flex-1 truncate mr-2 font-light flex items-center">
                        {inputValue ? (
                            <span className="text-white text-xs md:text-sm font-mono tracking-tight">
                                {inputValue}
                                {/* Cursor Piscante Cyan */}
                                <span className="inline-block w-[2px] h-4 bg-cyan-400 ml-0.5 align-middle animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                            </span>
                        ) : (
                            <span className="text-zinc-600 text-xs md:text-sm italic">Digite uma mensagem...</span>
                        )}
                    </div>

                    {/* Botão de Enviar Reativo */}
                    <div 
                        className={`
                            p-2.5 rounded-lg transition-all duration-200 flex items-center justify-center
                            ${isSendButtonActive 
                                ? 'bg-cyan-500 text-white scale-110 shadow-[0_0_15px_rgba(6,182,212,0.6)] rotate-12' 
                                : inputValue 
                                    ? 'bg-white/10 text-cyan-400' 
                                    : 'bg-transparent text-zinc-700'
                            }
                        `}
                    >
                        <Send size={18} className={isSendButtonActive ? "fill-white" : ""} />
                    </div>
                </div>
                
                {/* Footer info text */}
                <div className="flex justify-center mt-3 gap-4">
                    <span className="text-[9px] text-zinc-600 flex items-center gap-1">
                        <Lock size={8} /> End-to-end Encrypted
                    </span>
                    <span className="text-[9px] text-zinc-600 flex items-center gap-1">
                        <Zap size={8} /> Powered by n8n
                    </span>
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
