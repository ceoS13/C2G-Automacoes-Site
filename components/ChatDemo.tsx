
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Bot, Terminal, Wifi, Cpu, Activity, Clock, Database, ShieldCheck, ChevronRight } from 'lucide-react';

type StepType = 'log' | 'message';

type MessagePart = {
  type: StepType;
  content: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'system';
};

type ChatEvent = {
  id: number;
  role: 'ai' | 'user';
  parts: MessagePart[];
  delay: number;
};

// Cenário Unificado: Agenda + CRM
const SCENARIO: ChatEvent[] = [
  {
    id: 1,
    role: 'user',
    delay: 1000,
    parts: [{ type: 'message', content: "Gostaria de agendar uma call técnica." }]
  },
  {
    id: 2,
    role: 'ai',
    delay: 2000,
    parts: [
      { type: 'log', content: "Reading Context: Customer_ID #9021 found in CRM (Pipedrive)...", variant: 'system' },
      { type: 'log', content: "Checking Availability: Google Calendar API (GET /free-busy)...", variant: 'default' },
      { type: 'message', content: "Olá! Localizei seu cadastro. Vejo que a agenda da equipe de engenharia está cheia amanhã, mas tenho um slot livre na Quinta-feira às 14:00. Funciona para você?" }
    ]
  },
  {
    id: 3,
    role: 'user',
    delay: 5000,
    parts: [{ type: 'message', content: "Quinta 14h está ótimo." }]
  },
  {
    id: 4,
    role: 'ai',
    delay: 6500,
    parts: [
      { type: 'log', content: "Processing Intent: CONFIRM_SLOT", variant: 'success' },
      { type: 'log', content: "Function Call: createCalendarEvent(2025-10-24, 14:00)", variant: 'warning' },
      { type: 'log', content: "Triggering Webhook: Update CRM Deal Stage -> 'Meeting Scheduled'", variant: 'system' },
      { type: 'message', content: "Confirmado! O convite foi enviado para seu e-mail e o link do Google Meet já está lá. Algo mais?" }
    ]
  }
];

export const ChatDemo: React.FC = () => {
  const [events, setEvents] = useState<ChatEvent[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const chatRef = useRef<HTMLElement>(null);
  const isInView = useInView(chatRef, { once: true, amount: 0.3 });
  const scrollRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
        const scrollContainer = scrollRef.current;
        scrollContainer.scrollTo({
            top: scrollContainer.scrollHeight,
            behavior: 'smooth'
        });
    }
  }, [events, isTyping]);

  useEffect(() => {
    if (isInView) {
        // Reset and Run
        timeoutsRef.current.forEach(clearTimeout);
        setEvents([]);
        setIsTyping(false);

        let cumulativeDelay = 0;

        SCENARIO.forEach((evt) => {
            // Tempo para começar este evento
            const startEvent = setTimeout(() => {
                if (evt.role === 'ai') setIsTyping(true);
            }, cumulativeDelay);
            timeoutsRef.current.push(startEvent);

            // Tempo para exibir o conteúdo (simulando digitação/processamento)
            const processTime = evt.role === 'ai' ? 1500 : 500; 
            
            const showEvent = setTimeout(() => {
                setIsTyping(false);
                setEvents(prev => [...prev, evt]);
            }, cumulativeDelay + processTime);
            timeoutsRef.current.push(showEvent);

            cumulativeDelay += evt.delay;
        });
    }
    return () => timeoutsRef.current.forEach(clearTimeout);
  }, [isInView]);

  return (
    <section id="chat-demo" className="py-20 md:py-32 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-12 items-center">
            
            {/* Left Side: Copywriting */}
            <div className="lg:w-1/2" data-aos="fade-right">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-6">
                    <Terminal size={12} />
                    <span>Engenharia de Automação</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    Não é "Chatbot". <br/>
                    É <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Software Conversacional</span>.
                </h2>
                <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                    A maioria dos bots são apenas scripts de texto. Os agentes C2G são softwares completos que rodam dentro do WhatsApp. Eles consultam APIs, processam pagamentos e atualizam seu CRM em tempo real.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                        <Database className="text-cyan-400 mb-2" size={24} />
                        <h4 className="font-bold text-white mb-1">Memória Total</h4>
                        <p className="text-xs text-zinc-500">Lembra de todas as conversas passadas e dados do cliente.</p>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                        <ShieldCheck className="text-emerald-400 mb-2" size={24} />
                        <h4 className="font-bold text-white mb-1">Anti-Alucinação</h4>
                        <p className="text-xs text-zinc-500">Auditoria em tempo real que impede respostas inventadas.</p>
                    </div>
                </div>
            </div>

            {/* Right Side: The Terminal */}
            <article ref={chatRef} className="lg:w-1/2 w-full" data-aos="fade-left">
                
                {/* Glow Effect Behind Terminal */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

                {/* TERMINAL WINDOW */}
                <div className="relative bg-[#09090b] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl shadow-black ring-1 ring-white/5 font-mono text-sm">
                    
                    {/* Header: System Status Bar */}
                    <header className="bg-[#0f0f0f] border-b border-white/5 p-3 flex items-center justify-between select-none">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                        </div>
                        <div className="flex items-center gap-4 text-[10px] text-zinc-500 font-bold tracking-wider">
                            <span className="flex items-center gap-1.5"><Wifi size={10} className="text-emerald-500" /> CONNECTED</span>
                            <span className="flex items-center gap-1.5"><Cpu size={10} className="text-blue-500" /> CPU: 12%</span>
                            <span className="flex items-center gap-1.5"><Activity size={10} className="text-purple-500" /> LATENCY: 24ms</span>
                        </div>
                    </header>

                    {/* Chat Area */}
                    <div 
                        ref={scrollRef}
                        className="h-[450px] overflow-y-auto p-4 md:p-6 space-y-6 bg-black/50 scroll-smooth custom-scrollbar relative"
                    >
                        {/* Scanlines Effect */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,2px_100%] pointer-events-none z-0 opacity-50" />

                        <div className="relative z-10 text-center mb-8">
                            <span className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] border-b border-zinc-800 pb-1">Sessão Iniciada: {new Date().toLocaleDateString()}</span>
                        </div>

                        <AnimatePresence mode="popLayout">
                            {events.map((evt) => (
                                <motion.div 
                                    key={evt.id}
                                    initial={{ opacity: 0, x: evt.role === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex flex-col ${evt.role === 'user' ? 'items-end' : 'items-start'} gap-1 max-w-full`}
                                >
                                    {/* Avatar / Label */}
                                    <div className={`flex items-center gap-2 text-[10px] font-bold tracking-wider mb-1 ${evt.role === 'ai' ? 'text-cyan-500' : 'text-zinc-500'}`}>
                                        {evt.role === 'ai' ? <Bot size={12} /> : <span className="w-3 h-3 rounded-full bg-zinc-700"/>}
                                        {evt.role === 'ai' ? 'C2G_AGENT_v2.4' : 'VISITOR_192.168.x.x'}
                                    </div>

                                    {/* Message Parts Loop */}
                                    {evt.parts.map((part, idx) => {
                                        if (part.type === 'log') {
                                            return (
                                                <motion.div 
                                                    key={idx}
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    transition={{ delay: idx * 0.2 }}
                                                    className={`
                                                        text-[10px] md:text-[11px] font-mono px-3 py-1 rounded border-l-2 mb-1 w-fit max-w-[90%]
                                                        ${part.variant === 'system' ? 'text-purple-400 border-purple-500/30 bg-purple-900/10' :
                                                          part.variant === 'success' ? 'text-emerald-400 border-emerald-500/30 bg-emerald-900/10' :
                                                          part.variant === 'warning' ? 'text-amber-400 border-amber-500/30 bg-amber-900/10' :
                                                          'text-cyan-400 border-cyan-500/30 bg-cyan-900/10'}
                                                    `}
                                                >
                                                    <span className="opacity-50 mr-2">{`>`}</span>
                                                    {part.content}
                                                </motion.div>
                                            );
                                        }

                                        return (
                                            <motion.div 
                                                key={idx}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className={`
                                                    px-4 py-3 rounded-lg text-xs md:text-sm leading-relaxed max-w-[90%] md:max-w-[85%]
                                                    ${evt.role === 'user' 
                                                        ? 'bg-zinc-800 text-white border border-zinc-700 rounded-br-none' 
                                                        : 'bg-black border border-cyan-900/30 text-zinc-100 rounded-bl-none shadow-[0_0_15px_rgba(8,145,178,0.1)]'}
                                                `}
                                            >
                                                {part.content}
                                            </motion.div>
                                        );
                                    })}

                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {isTyping && (
                             <motion.div 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                className="flex items-center gap-2 text-cyan-500 text-[10px] font-mono pl-1"
                             >
                                <Activity size={10} className="animate-spin" />
                                <span>PROCESSING_REQUEST...</span>
                             </motion.div>
                        )}
                    </div>

                    {/* Input Area (Mock) */}
                    <div className="p-3 bg-[#0f0f0f] border-t border-white/10 flex items-center gap-3">
                        <span className="text-emerald-500 font-bold text-xs select-none shrink-0">user@c2g:~$</span>
                        <div className="flex-1 h-5 flex items-center">
                            <motion.span 
                                animate={{ opacity: [1, 0] }} 
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="w-2 h-4 bg-zinc-500 block"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex justify-between items-center text-[10px] text-zinc-600 font-mono px-2">
                    <div className="flex items-center gap-2">
                        <Clock size={10} />
                        <span>UPTIME: 99.99%</span>
                    </div>
                    <div>Encrypted connection (TLS 1.3)</div>
                </div>

            </article>
        </div>
      </div>
    </section>
  );
};
