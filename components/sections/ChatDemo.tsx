
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { CheckCheck, Database, DollarSign, Headphones, Calendar, Send, Zap, Lock, ArrowLeft, Phone, Video, MoreVertical, Smile, Paperclip, Mic, FileText, Download, Brain, Shield } from 'lucide-react';

type Message = {
    id: number;
    role: 'ai' | 'user' | 'system';
    content: string;
    delay: number;
    actionStatus?: string;
    attachment?: {
        name: string;
        size: string;
        pages: string;
    };
};

type ScenarioKey = 'scheduling' | 'support' | 'finance';

const SCENARIOS: Record<ScenarioKey, Message[]> = {
    scheduling: [
        { id: 1, role: 'user', content: "Oi, boa tarde!", delay: 800, actionStatus: "Aguardando input..." },
        { id: 2, role: 'ai', content: "Boa tarde! 👋 Sou a Ísis, assistente virtual da C2G Automações. Como posso te ajudar hoje?", delay: 1200, actionStatus: "Gerando resposta..." },
        { id: 3, role: 'user', content: "Gostaria de agendar uma demonstração dos agentes de IA de vocês.", delay: 2500, actionStatus: "Aguardando usuário..." },
        { id: 4, role: 'system', content: "Verificando disponibilidade no Google Agenda...", delay: 600, actionStatus: "Conectando API Calendar..." },
        { id: 5, role: 'ai', content: "Claro! Deixa eu verificar a agenda do nosso consultor.", delay: 1000, actionStatus: "Gerando resposta..." },
        { id: 6, role: 'ai', content: "Amanhã está lotado, mas tenho dois horários na Quinta: 10h ou 14h. Qual funciona melhor pra você?", delay: 1500, actionStatus: "Gerando resposta..." },
        { id: 7, role: 'user', content: "Quinta às 14h por favor.", delay: 3000, actionStatus: "Aguardando usuário..." },
        { id: 8, role: 'system', content: "Enriquecendo dados do Lead (API Clearbit)...", delay: 800, actionStatus: "Processando dados..." },
        { id: 9, role: 'ai', content: "Perfeito, agendado! ✅", delay: 1000, actionStatus: "Finalizando..." },
        { id: 10, role: 'ai', content: "Vi que você é CTO na Vertex — já enviei o convite pro seu e-mail com o link da call e nossa documentação técnica.", delay: 1500, actionStatus: "Finalizando agendamento..." },
        { id: 11, role: 'user', content: "Que eficiência! Obrigado.", delay: 2500, actionStatus: "Aguardando usuário..." },
        { id: 12, role: 'ai', content: "Imagina! Qualquer dúvida antes da reunião é só chamar aqui. Até quinta! 🚀", delay: 1200, actionStatus: "Gerando resposta..." },
    ],
    support: [
        { id: 1, role: 'user', content: "Boa noite, meu pedido #4920 ainda não chegou.", delay: 1000, actionStatus: "Aguardando input..." },
        { id: 2, role: 'ai', content: "Boa noite! Vou consultar o status do seu pedido agora mesmo.", delay: 1000, actionStatus: "Gerando resposta..." },
        { id: 3, role: 'system', content: "Consultando API de Logística/ERP...", delay: 800, actionStatus: "Acessando Banco de Dados..." },
        { id: 4, role: 'ai', content: "Encontrei aqui. O pedido #4920 teve um atraso na transportadora por conta da chuva, mas já saiu para entrega hoje às 08:30.", delay: 2000, actionStatus: "Analisando rastreio..." },
        { id: 5, role: 'user', content: "Ah, entendi. Mas conseguem entregar até as 18h? Preciso pra hoje.", delay: 3000, actionStatus: "Aguardando usuário..." },
        { id: 6, role: 'system', content: "Consultando rota do motorista...", delay: 600, actionStatus: "Processando..." },
        { id: 7, role: 'ai', content: "Sim! A previsão atualizada é até as 16h45. Já notifiquei o motorista para priorizar sua rota. 🚚", delay: 1500, actionStatus: "Contatando motorista..." },
        { id: 8, role: 'user', content: "Ótimo, obrigado!", delay: 2000, actionStatus: "Aguardando usuário..." },
        { id: 9, role: 'ai', content: "Disponha! Vou te enviar uma notificação automática assim que o entregador estiver a 15 min da sua localização.", delay: 1200, actionStatus: "Gerando resposta..." },
        { id: 10, role: 'ai', content: "Precisa de mais alguma coisa?", delay: 1000, actionStatus: "Gerando resposta..." },
        { id: 11, role: 'user', content: "Não, era só isso. Valeu! 👍", delay: 2500, actionStatus: "Aguardando usuário..." },
    ],
    finance: [
        { id: 1, role: 'user', content: "Oi, preciso da 2ª via do boleto de Janeiro.", delay: 1000, actionStatus: "Aguardando input..." },
        { id: 2, role: 'ai', content: "Olá! Vou localizar seu boleto. Me dá um instante.", delay: 1000, actionStatus: "Gerando resposta..." },
        { id: 3, role: 'system', content: "Autenticando usuário e acessando banco...", delay: 800, actionStatus: "Validando token de segurança..." },
        { id: 4, role: 'ai', content: "Localizei. O boleto de Janeiro vencia dia 15/01 no valor de R$ 1.499,00. Deseja que eu gere um novo com data pra hoje sem juros?", delay: 2000, actionStatus: "Verificando regras de negócio..." },
        { id: 5, role: 'user', content: "Sim, por favor.", delay: 2500, actionStatus: "Aguardando usuário..." },
        { id: 6, role: 'system', content: "Gerando boleto atualizado...", delay: 800, actionStatus: "Gerando documento..." },
        { id: 7, role: 'ai', content: "Prontinho! Aqui está o boleto atualizado:", delay: 1200, actionStatus: "Enviando anexo..." },
        { id: 8, role: 'ai', content: "", delay: 800, actionStatus: "Enviando anexo...", attachment: { name: "Boleto_Jan_2025.pdf", size: "124 KB", pages: "1 página" } },
        { id: 9, role: 'ai', content: "Também enviei uma cópia pro seu e-mail financeiro. O vencimento é hoje até 23:59, sem multa nem juros. 😊", delay: 1500, actionStatus: "Finalizando..." },
        { id: 10, role: 'user', content: "Perfeito, muito obrigado!", delay: 2500, actionStatus: "Aguardando usuário..." },
        { id: 11, role: 'user', content: "Vocês são rápidos demais haha", delay: 1500, actionStatus: "Aguardando usuário..." },
        { id: 12, role: 'ai', content: "Haha, trabalhamos 24/7! Se precisar de mais alguma coisa é só chamar aqui. 💙", delay: 1200, actionStatus: "Gerando resposta..." },
    ]
};

/* WhatsApp Dark Mode Colors */
const WA = {
    bg: '#0b141a',
    headerBg: '#1f2c34',
    inputBarBg: '#1f2c34',
    inputFieldBg: '#2a3942',
    outgoing: '#005c4b',
    incoming: '#202c33',
    systemBg: '#182229',
    textPrimary: '#e9edef',
    textSecondary: '#8696a0',
    timestamp: '#8696a0',
    readReceipt: '#53bdeb',
    green: '#00a884',
    divider: '#222d34',
    typing: '#53bdeb',
};

/* PDF Attachment Component */
const PdfAttachment: React.FC<{ name: string; size: string; pages: string; time: string }> = ({ name, size, pages, time }) => (
    <div className="w-[260px]">
        <div className="rounded-lg overflow-hidden" style={{ backgroundColor: '#1a3a34' }}>
            {/* PDF Preview Header */}
            <div className="flex items-center gap-3 px-3 py-3">
                <div className="w-10 h-12 rounded bg-red-500/90 flex items-center justify-center shrink-0">
                    <span className="text-white text-[10px] font-bold">PDF</span>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium truncate" style={{ color: WA.textPrimary }}>{name}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: WA.textSecondary }}>{pages} · {size}</p>
                </div>
                <Download size={18} style={{ color: WA.textSecondary }} className="shrink-0" />
            </div>
        </div>
        {/* Timestamp under attachment */}
        <div className="flex items-center justify-end gap-1 mt-1 pr-1">
            <span className="text-[10px]" style={{ color: WA.timestamp }}>{time}</span>
            <CheckCheck size={15} className="shrink-0" style={{ color: WA.readReceipt }} />
        </div>
    </div>
);

export const ChatDemo: React.FC = () => {
    const [activeScenario, setActiveScenario] = useState<ScenarioKey>('scheduling');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isAiTyping, setIsAiTyping] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [headerStatus, setHeaderStatus] = useState("online");
    const [isSendButtonActive, setIsSendButtonActive] = useState(false);

    const chatRef = useRef<HTMLElement>(null);
    const isInView = useInView(chatRef, { once: true, amount: 0.2 });
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
            const sc = scrollAreaRef.current;
            setTimeout(() => { sc.scrollTo({ top: sc.scrollHeight, behavior: 'smooth' }); }, 100);
        }
    }, [messages, isAiTyping]);

    const wait = (ms: number, signal: AbortSignal) => new Promise<void>((resolve, reject) => {
        const timer = setTimeout(() => resolve(), ms);
        signal.addEventListener('abort', () => { clearTimeout(timer); reject(new Error('Aborted')); });
    });

    const typeIntoInput = async (text: string, signal: AbortSignal) => {
        setHeaderStatus("online");
        for (let i = 1; i <= text.length; i++) {
            if (signal.aborted) throw new Error('Aborted');
            setInputValue(text.substring(0, i));
            await wait(30 + Math.random() * 30, signal);
        }
        setIsSendButtonActive(true);
        await wait(600, signal);
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
            setHeaderStatus("online");

            const script = SCENARIOS[scenario];
            for (const msg of script) {
                if (msg.actionStatus) setHeaderStatus(msg.actionStatus);
                await wait(msg.delay, signal);

                if (msg.role === 'user') {
                    await typeIntoInput(msg.content, signal);
                    setInputValue("");
                    setMessages(prev => [...prev, msg]);
                    setHeaderStatus("online");
                } else if (msg.role === 'ai') {
                    setIsAiTyping(true);
                    setHeaderStatus("digitando...");
                    await wait(1500, signal);
                    setIsAiTyping(false);
                    setMessages(prev => [...prev, msg]);
                    setHeaderStatus("online");
                } else {
                    setMessages(prev => [...prev, msg]);
                    await wait(800, signal);
                }
            }
            setHeaderStatus("online");
        } catch (error) {
            if ((error as Error).message !== 'Aborted') console.error(error);
        }
    };

    useEffect(() => {
        if (isInView) runScenario(activeScenario);
        return () => { if (abortControllerRef.current) abortControllerRef.current.abort(); };
    }, [activeScenario, isInView]);

    const getTime = () => {
        const now = new Date();
        return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    };

    return (
        <section id="chat-demo" className="py-16 md:py-32 relative bg-[#050505] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Texto Explicativo (Esquerda) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative z-10 order-2 lg:order-1"
                    >
                        <div className="bg-black/80 backdrop-blur-md md:bg-transparent md:backdrop-blur-none border border-white/10 md:border-none p-6 md:p-0 rounded-2xl shadow-xl md:shadow-none">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="text-3xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight"
                            >
                                Sua Força de <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
                                    Trabalho Digital
                                </span>
                                <span className="text-cyan-500">.</span>
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.15 }}
                                className="text-base md:text-xl text-zinc-400 mb-10 leading-relaxed"
                            >
                                Veja ao vivo como a <span className="text-white font-medium">Ísis</span> agenda reuniões, rastreia pedidos e gera boletos. Tudo pelo WhatsApp, sem intervenção humana.
                            </motion.p>

                            <ul className="space-y-5">
                                <motion.li
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="flex items-center gap-4 text-zinc-300 group"
                                >
                                    <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 shrink-0 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors"><Database size={22} /></div>
                                    <div>
                                        <h4 className="font-bold text-sm md:text-base text-white">Integração Real</h4>
                                        <p className="text-xs md:text-sm text-zinc-500">Conecta WhatsApp, ERP, CRM e APIs bancárias.</p>
                                    </div>
                                </motion.li>
                                <motion.li
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="flex items-center gap-4 text-zinc-300 group"
                                >
                                    <div className="p-2.5 bg-cyan-500/10 rounded-xl text-cyan-400 shrink-0 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors"><Brain size={22} /></div>
                                    <div>
                                        <h4 className="font-bold text-sm md:text-base text-white">Raciocínio Autônomo</h4>
                                        <p className="text-xs md:text-sm text-zinc-500">Decide, executa e aprende com cada interação.</p>
                                    </div>
                                </motion.li>
                                <motion.li
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className="flex items-center gap-4 text-zinc-300 group"
                                >
                                    <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 shrink-0 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors"><Shield size={22} /></div>
                                    <div>
                                        <h4 className="font-bold text-sm md:text-base text-white">Segurança Total</h4>
                                        <p className="text-xs md:text-sm text-zinc-500">Seus dados nunca treinam IA pública. LGPD compliant.</p>
                                    </div>
                                </motion.li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* WHATSAPP CHAT INTERFACE */}
                    <motion.article
                        ref={chatRef}
                        className="relative w-full mt-8 lg:mt-0 order-1 lg:order-2"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        {/* Glow */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/10 to-teal-500/10 rounded-[2rem] blur-2xl transform rotate-3 scale-95" />

                        <div
                            className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden flex flex-col h-[580px] md:h-[720px] shadow-2xl border border-white/5"
                            style={{ backgroundColor: WA.bg }}
                        >

                            {/* === WHATSAPP HEADER === */}
                            <header
                                className="px-4 py-2.5 flex items-center gap-3 shrink-0"
                                style={{ backgroundColor: WA.headerBg }}
                            >
                                <ArrowLeft size={20} style={{ color: WA.textSecondary }} className="md:hidden shrink-0" />
                                <div className="relative shrink-0">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: WA.green }}>
                                        ÍA
                                    </div>
                                    {headerStatus === 'online' && (
                                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2" style={{ backgroundColor: WA.green, borderColor: WA.headerBg }} />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-sm truncate" style={{ color: WA.textPrimary }}>Ísis AI</h3>
                                    <p className="text-xs truncate" style={{ color: headerStatus === 'digitando...' ? WA.typing : WA.textSecondary }}>
                                        {headerStatus}
                                    </p>
                                </div>
                                <div className="flex items-center gap-5">
                                    <Video size={20} style={{ color: WA.textSecondary }} className="hidden md:block" />
                                    <Phone size={18} style={{ color: WA.textSecondary }} className="hidden md:block" />
                                    <MoreVertical size={20} style={{ color: WA.textSecondary }} />
                                </div>
                            </header>

                            {/* === SCENARIO TABS === */}
                            <div className="flex items-center px-2 py-1.5 shrink-0" style={{ backgroundColor: WA.headerBg, borderBottom: `1px solid ${WA.divider}` }}>
                                {[
                                    { id: 'scheduling', icon: Calendar, label: 'Comercial' },
                                    { id: 'support', icon: Headphones, label: 'Logística' },
                                    { id: 'finance', icon: DollarSign, label: 'Financeiro' }
                                ].map((item, i, arr) => (
                                    <React.Fragment key={item.id}>
                                        <button
                                            type="button"
                                            onClick={() => setActiveScenario(item.id as ScenarioKey)}
                                            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap focus:outline-none"
                                            style={{
                                                color: activeScenario === item.id ? WA.green : WA.textSecondary,
                                                backgroundColor: activeScenario === item.id ? `${WA.green}15` : 'transparent',
                                                borderBottom: activeScenario === item.id ? `2px solid ${WA.green}` : '2px solid transparent',
                                            }}
                                        >
                                            <item.icon size={13} />
                                            <span>{item.label}</span>
                                        </button>
                                        {i < arr.length - 1 && (
                                            <div className="w-px h-4 shrink-0" style={{ backgroundColor: '#3b4a54' }} />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            {/* === CHAT MESSAGES === */}
                            <div
                                ref={scrollAreaRef}
                                className="relative flex-1 overflow-y-auto px-3 md:px-5 py-4 space-y-2"
                                style={{ backgroundColor: WA.bg }}
                                aria-live="polite"
                            >
                                {/* Grid wallpaper */}
                                <div
                                    className="pointer-events-none absolute inset-0 opacity-[0.04]"
                                    style={{
                                        backgroundImage: `linear-gradient(${WA.green}22 1px, transparent 1px), linear-gradient(90deg, ${WA.green}22 1px, transparent 1px)`,
                                        backgroundSize: '32px 32px',
                                    }}
                                />

                                <AnimatePresence mode="popLayout" initial={false}>
                                    {messages.map((msg, idx) => {
                                        const prevMsg = messages[idx - 1];
                                        const isFirstInGroup = !prevMsg || prevMsg.role !== msg.role;

                                        return (
                                            <motion.div
                                                layout
                                                key={`${activeScenario}-${msg.id}`}
                                                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                className={`flex w-full ${msg.role === 'user' ? 'justify-end' : msg.role === 'ai' ? 'justify-start' : 'justify-center'}`}
                                            >
                                                {msg.role === 'system' ? (
                                                    <div className="my-1">
                                                        <span
                                                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] shadow-sm"
                                                            style={{ backgroundColor: WA.systemBg, color: WA.textSecondary }}
                                                        >
                                                            <Lock size={9} />
                                                            {msg.content}
                                                        </span>
                                                    </div>
                                                ) : msg.attachment ? (
                                                    /* PDF Attachment bubble */
                                                    <div className={`${isFirstInGroup ? 'mt-2' : 'mt-[2px]'} ${isFirstInGroup ? 'wa-tail-left' : ''} rounded-lg ${isFirstInGroup ? 'rounded-tl-none' : ''} p-1.5 shadow-sm`} style={{ backgroundColor: WA.incoming }}>
                                                        <PdfAttachment name={msg.attachment.name} size={msg.attachment.size} pages={msg.attachment.pages} time={getTime()} />
                                                    </div>
                                                ) : (
                                                    /* Regular bubble */
                                                    <div
                                                        className={`relative max-w-[80%] px-3 pt-2 pb-2 rounded-lg text-[13px] md:text-sm leading-relaxed shadow-sm ${
                                                            isFirstInGroup ? 'mt-2' : 'mt-[2px]'
                                                        } ${
                                                            msg.role === 'user'
                                                                ? isFirstInGroup ? 'rounded-tr-none wa-tail-right' : ''
                                                                : isFirstInGroup ? 'rounded-tl-none wa-tail-left' : ''
                                                        }`}
                                                        style={{
                                                            backgroundColor: msg.role === 'user' ? WA.outgoing : WA.incoming,
                                                            color: WA.textPrimary,
                                                        }}
                                                    >
                                                        <span className="pr-[70px]">{msg.content}</span>
                                                        <span className="absolute bottom-[5px] right-[8px] flex items-center gap-1" style={{ color: WA.timestamp }}>
                                                            <span className="text-[10px]">{getTime()}</span>
                                                            {msg.role === 'user' && (
                                                                <CheckCheck size={15} className="shrink-0" style={{ color: WA.readReceipt }} />
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>

                                {/* Typing Indicator */}
                                {isAiTyping && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex justify-start"
                                    >
                                        <div
                                            className="px-4 py-2.5 rounded-lg rounded-tl-none wa-tail-left flex items-center gap-1.5 shadow-sm"
                                            style={{ backgroundColor: WA.incoming }}
                                        >
                                            <span className="flex gap-1 items-center">
                                                <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: WA.textSecondary, animationDelay: '0ms' }} />
                                                <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: WA.textSecondary, animationDelay: '150ms' }} />
                                                <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: WA.textSecondary, animationDelay: '300ms' }} />
                                            </span>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* === INPUT BAR === */}
                            <div className="px-3 py-3 flex items-center gap-2.5 shrink-0" style={{ backgroundColor: WA.bg }}>
                                <div className="flex items-center gap-1">
                                    <Smile size={22} style={{ color: WA.textSecondary }} className="shrink-0" />
                                    <Paperclip size={22} style={{ color: WA.textSecondary }} className="shrink-0 hidden md:block" />
                                </div>
                                <div
                                    className="flex-1 rounded-full px-4 py-2.5 flex items-center min-h-[42px]"
                                    style={{ backgroundColor: WA.inputFieldBg }}
                                >
                                    {inputValue ? (
                                        <span className="text-sm" style={{ color: WA.textPrimary }}>
                                            {inputValue}
                                            <span className="inline-block w-[2px] h-4 ml-0.5 align-middle animate-pulse" style={{ backgroundColor: WA.green }} />
                                        </span>
                                    ) : (
                                        <span className="text-sm" style={{ color: WA.textSecondary }}>Mensagem</span>
                                    )}
                                </div>
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-200"
                                    style={{
                                        backgroundColor: WA.green,
                                        transform: isSendButtonActive ? 'scale(1.15)' : 'scale(1)',
                                    }}
                                >
                                    {inputValue || isSendButtonActive ? (
                                        <Send size={18} className="text-[#111b21] fill-[#111b21]" style={{ transform: 'rotate(-45deg) translateX(1px)' }} />
                                    ) : (
                                        <Mic size={20} className="text-[#111b21]" />
                                    )}
                                </div>
                            </div>

                        </div>
                    </motion.article>
                </div>
            </div>

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#050505] to-transparent z-20 pointer-events-none" />

            <style>{`
                .wa-tail-right::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    right: -8px;
                    width: 8px;
                    height: 13px;
                    background: ${WA.outgoing};
                    clip-path: polygon(0 0, 0 100%, 100% 0);
                }
                .wa-tail-left::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: -8px;
                    width: 8px;
                    height: 13px;
                    background: ${WA.incoming};
                    clip-path: polygon(100% 0, 0 0, 100% 100%);
                }
            `}</style>
        </section>
    );
};
