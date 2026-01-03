
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal, ShieldAlert, CheckCircle2, Copy, MessageSquare } from 'lucide-react';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sub-componente Typewriter Otimizado
const Typewriter = ({ 
  text, 
  speed = 10, 
  onComplete 
}: { 
  text: string; 
  speed?: number; 
  onComplete?: () => void 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayText('');
    setIsDone(false);
    
    const timer = setInterval(() => {
      if (i < text.length) {
        i++;
        setDisplayText(text.substring(0, i));
      } else {
        clearInterval(timer);
        if (!isDone) {
            setIsDone(true);
            if (onComplete) onComplete();
        }
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]); // Removed onComplete from dependency to avoid loop if parent changes reference

  return <span>{displayText}</span>;
};

const ASCII_ART = `
  ██████╗    ██████╗     ██████╗ 
 ██╔════╝    ╚════██╗   ██╔════╝ 
 ██║          █████╔╝   ██║  ███╗
 ██║         ██╔═══╝    ██║   ██║
 ╚██████╗    ███████╗   ╚██████╔╝
  ╚═════╝    ╚══════╝    ╚═════╝ 
`;

// Logs sem delay fixo - a sequência é controlada pelo término da linha anterior
const ALL_LOGS = [
  { text: "System rebooted successfully." },
  { text: "Establishing secure connection..." },
  { text: "Iniciando conexão segura (SSH)..." },
  { text: "Bypassing firewall [Port 443]..." },
  { text: "Acesso root detectado." },
  { text: "Descriptografando banco de dados..." },
  { text: "Analisando perfil do usuário..." },
  { text: "Gerando hash de desconto único..." },
  { text: "ACESSO CONCEDIDO.", type: 'success' }
];

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [bootPhase, setBootPhase] = useState<'loading' | 'logs' | 'complete'>('loading');
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Controle Sequencial de Logs
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  
  const [showReward, setShowReward] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. Reset ao abrir
  useEffect(() => {
    if (isOpen) {
      setBootPhase('loading');
      setShowProgressBar(false);
      setProgress(0);
      setCurrentLogIndex(0); // Reseta para a primeira linha
      setShowReward(false);
    }
  }, [isOpen]);

  // 2. Barra de Progresso (Fase Loading)
  useEffect(() => {
    if (isOpen && showProgressBar && bootPhase === 'loading') {
        const interval = setInterval(() => {
            setProgress((prev) => {
              const increment = Math.floor(Math.random() * 8) + 2; 
              const next = prev + increment;
              
              if (next >= 100) {
                clearInterval(interval);
                setTimeout(() => setBootPhase('logs'), 800); 
                return 100;
              }
              return next;
            });
          }, 60);
    
          return () => clearInterval(interval);
    }
  }, [isOpen, showProgressBar, bootPhase]);

  // Auto-scroll sempre que uma nova linha começa
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentLogIndex, bootPhase]);

  // Callback chamado quando uma linha termina de ser digitada
  const handleLineComplete = () => {
     // Pequeno delay aleatório entre linhas para parecer humano/processamento
     const randomDelay = Math.floor(Math.random() * 300) + 100;
     
     setTimeout(() => {
         if (currentLogIndex < ALL_LOGS.length - 1) {
             setCurrentLogIndex(prev => prev + 1);
         } else {
             // Terminou todos os logs
             setTimeout(() => {
                 setBootPhase('complete');
                 setShowReward(true);
             }, 500);
         }
     }, randomDelay);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("DEV_MODE_ON");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderProgressBar = (pct: number) => {
    const totalBars = 30;
    const filledBars = Math.floor((pct / 100) * totalBars);
    const emptyBars = totalBars - filledBars;
    return `[${'#'.repeat(filledBars)}${'.'.repeat(emptyBars)}] ${pct}%`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-xl bg-[#0a0a0a] border border-green-500/30 rounded-lg shadow-[0_0_80px_rgba(34,197,94,0.1)] overflow-hidden font-mono text-sm flex flex-col h-[500px]"
          >
            <div className="bg-[#111] px-4 py-2 flex items-center justify-between border-b border-green-900/30 shrink-0 z-20">
              <div className="flex items-center gap-2 text-green-500">
                <Terminal size={14} />
                <span className="text-xs font-bold tracking-wider">C2G_ROOT_ACCESS</span>
              </div>
              <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>

            <div className="relative flex-1 p-6 flex flex-col overflow-hidden bg-black/50">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none z-10 opacity-20" />
              <div className="absolute inset-0 bg-green-500/5 pointer-events-none z-0 animate-pulse" style={{ animationDuration: '4s' }} />
              
              <AnimatePresence mode="wait">
                
                {/* STATE 1: BOOT SEQUENCE */}
                {bootPhase === 'loading' && (
                    <motion.div
                        key="boot-screen"
                        className="flex-1 flex flex-col items-center justify-center text-green-500 relative z-20"
                        exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
                        transition={{ duration: 0.8 }}
                    >
                         <motion.pre 
                            initial={{ scale: 0.2, opacity: 0, filter: "blur(15px)", z: -100 }}
                            animate={{ scale: 1, opacity: 1, filter: "blur(0px)", z: 0 }}
                            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }} 
                            onAnimationComplete={() => setShowProgressBar(true)}
                            className="font-bold text-[10px] sm:text-xs md:text-sm leading-none text-center mb-12 whitespace-pre text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.6)]"
                         >
                            {ASCII_ART}
                         </motion.pre>
                         
                         {showProgressBar && (
                             <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="w-full max-w-xs text-center space-y-2"
                             >
                                 <div className="text-xs uppercase tracking-widest text-green-600 animate-pulse">Carregando Sistema...</div>
                                 <div className="font-bold text-green-400 whitespace-pre font-mono text-xs sm:text-sm">
                                    {renderProgressBar(progress)}
                                 </div>
                             </motion.div>
                         )}
                    </motion.div>
                )}

                {/* STATE 2: HACKING LOGS */}
                {bootPhase !== 'loading' && (
                   <motion.div
                        key="log-screen"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex-1 flex flex-col relative z-20 h-full"
                   >
                        <div 
                            ref={scrollRef} 
                            className="flex-1 overflow-y-auto overflow-x-hidden space-y-2 mb-4 text-green-400/80 break-words whitespace-pre-wrap font-bold pr-2 custom-scrollbar"
                        >
                            {/* Renderização Sequencial: Só mostra até o índice atual */}
                            {ALL_LOGS.map((log, i) => {
                                if (i > currentLogIndex) return null; // Ainda não chegou a vez desta linha

                                return (
                                    <div 
                                        key={i}
                                        className={`${log.type === 'success' ? 'text-green-300 drop-shadow-[0_0_5px_rgba(74,222,128,0.8)]' : ''}`}
                                    >
                                        <span className="mr-2 opacity-50 select-none">{`>`}</span>
                                        
                                        {/* Se for a linha anterior, mostra texto estático (otimização). Se for a atual, anima. */}
                                        {i < currentLogIndex ? (
                                            <span>{log.text}</span>
                                        ) : (
                                            <Typewriter 
                                                text={log.text} 
                                                speed={15} 
                                                onComplete={handleLineComplete} 
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {showReward && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="border-t border-green-500/30 pt-4 mt-auto"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20 text-green-400 shrink-0 animate-pulse">
                                        <ShieldAlert size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-white font-bold mb-1">Acesso Root Concedido</h4>
                                        <p className="text-zinc-400 text-xs mb-3">
                                        Use este código secreto para desbloquear <strong className="text-white">5% OFF</strong> no seu setup.
                                        </p>
                                        
                                        <button
                                            onClick={handleCopy}
                                            className="w-full bg-green-950/30 border border-green-500/30 border-dashed rounded px-3 py-2.5 text-center relative group hover:bg-green-900/30 transition-all flex items-center justify-center gap-2 mb-2"
                                        >
                                            <span className="text-green-400 font-bold tracking-[0.2em] text-lg font-mono">DEV_MODE_ON</span>
                                            {copied ? <CheckCircle2 size={16} className="text-green-400" /> : <Copy size={16} className="text-green-700 group-hover:text-green-400" />}
                                        </button>
                                        
                                        <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-500 mt-2">
                                            <MessageSquare size={10} />
                                            <span>Envie este código para o consultor ou Ísis no WhatsApp</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                   </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
