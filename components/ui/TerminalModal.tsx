
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal, ShieldAlert, CheckCircle2, Copy } from 'lucide-react';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sub-componente para o efeito de digitação (Robust Version)
const Typewriter = ({ text, speed = 15, onComplete }: { text: string; speed?: number; onComplete?: () => void }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    setDisplayText('');
    
    const timer = setInterval(() => {
      if (i < text.length) {
        i++;
        setDisplayText(text.substring(0, i));
      } else {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, onComplete]);

  return <span>{displayText}</span>;
};

const ASCII_ART = `
   ___ ___  ____ 
  / __|_  )/ ___|
 | (__ / /| (_ | 
  \\___/___|\\___| 
`;

const LOG_LINES = [
  { text: "Iniciando conexão segura (SSH)...", delay: 100 },
  { text: "Bypassing firewall [Port 443]...", delay: 800 },
  { text: "Acesso root detectado.", delay: 1600 },
  { text: "Descriptografando banco de dados...", delay: 2400 },
  { text: "Analisando perfil do usuário...", delay: 3200 },
  { text: "Gerando hash de desconto único...", delay: 4200 },
  { text: "ACESSO CONCEDIDO.", delay: 5200, type: 'success' }
];

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [bootPhase, setBootPhase] = useState<'loading' | 'logs' | 'complete'>('loading');
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<{ text: string; type?: string }[]>([]);
  const [showReward, setShowReward] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // 1. Sequência de Boot (Loading Bar)
  useEffect(() => {
    if (isOpen) {
      // Reset States
      setBootPhase('loading');
      setProgress(0);
      setLogs([]);
      setShowReward(false);
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];

      // Animação da barra de progresso
      const interval = setInterval(() => {
        setProgress((prev) => {
          const increment = Math.floor(Math.random() * 15) + 5; // Incremento aleatório
          const next = prev + increment;
          if (next >= 100) {
            clearInterval(interval);
            setTimeout(() => setBootPhase('logs'), 500); // Pequeno delay antes dos logs
            return 100;
          }
          return next;
        });
      }, 150);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  // 2. Sequência de Logs (Só inicia quando bootPhase === 'logs')
  useEffect(() => {
    if (isOpen && bootPhase === 'logs') {
      LOG_LINES.forEach((line, index) => {
        const timeout = setTimeout(() => {
          setLogs(prev => [...prev, line]);
          
          if (index === LOG_LINES.length - 1) {
            setTimeout(() => {
                setBootPhase('complete');
                setShowReward(true);
            }, 1500);
          }
        }, line.delay);
        timeoutsRef.current.push(timeout);
      });
    }
    
    return () => timeoutsRef.current.forEach(clearTimeout);
  }, [isOpen, bootPhase]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, progress, bootPhase]);

  const handleCopy = () => {
    navigator.clipboard.writeText("DEV_MODE_ON");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper para desenhar a barra de progresso em texto
  const renderProgressBar = (pct: number) => {
    const totalBars = 20;
    const filledBars = Math.floor((pct / 100) * totalBars);
    const emptyBars = totalBars - filledBars;
    return `[${'#'.repeat(filledBars)}${'.'.repeat(emptyBars)}] ${pct}%`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Terminal Window */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-[#0c0c0c] border border-green-500/30 rounded-lg shadow-[0_0_50px_rgba(34,197,94,0.15)] overflow-hidden font-mono text-sm"
          >
            {/* Header */}
            <div className="bg-[#1a1a1a] px-4 py-2 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-2 text-green-500">
                <Terminal size={14} />
                <span className="text-xs font-bold tracking-wider">C2G_ROOT_ACCESS</span>
              </div>
              <button 
                onClick={onClose}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 min-h-[400px] flex flex-col relative">
              {/* Scanline Effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none z-10 opacity-20" />
              
              <div 
                ref={scrollRef} 
                className="flex-1 overflow-y-auto overflow-x-hidden space-y-2 mb-4 max-h-[300px] text-green-400/80 break-words whitespace-pre-wrap font-bold"
              >
                {/* 1. ASCII ART HEADER */}
                <div className="text-green-500 leading-none mb-6 opacity-80 select-none">
                    {ASCII_ART}
                </div>

                {/* 2. LOADING PHASE */}
                {bootPhase === 'loading' && (
                    <div className="space-y-2">
                        <div>Inicializando módulos do sistema...</div>
                        <div className="text-green-400">{renderProgressBar(progress)}</div>
                    </div>
                )}

                {/* 3. LOGS PHASE - Mantém o histórico do loading visível mas foca nos logs */}
                {bootPhase !== 'loading' && (
                    <>
                        <div className="text-green-500/50 mb-4 text-xs">
                             {`> Sistema carregado com sucesso.`}
                             <br/>
                             {`> Executando scripts de intrusão...`}
                        </div>
                        {logs.map((log, i) => (
                        <div 
                            key={i}
                            className={`${log.type === 'success' ? 'text-green-400 font-bold' : ''}`}
                        >
                            <span className="mr-2 opacity-50 select-none">{`>`}</span>
                            <Typewriter text={log.text} />
                        </div>
                        ))}
                    </>
                )}
              </div>

              <AnimatePresence>
                {showReward && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-t border-green-500/20 pt-6 mt-auto"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20 text-green-400 shrink-0 animate-pulse">
                        <ShieldAlert size={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-bold mb-1">Desconto de Desenvolvedor</h4>
                        <p className="text-zinc-400 text-xs mb-3">
                          Você encontrou a falha na matrix. Use este código para ganhar <strong className="text-white">5% OFF</strong> no setup da sua automação.
                        </p>
                        
                        <button
                          onClick={handleCopy}
                          className="w-full bg-green-900/20 border border-green-500/30 border-dashed rounded px-3 py-2 text-center relative group hover:bg-green-900/30 transition-colors flex items-center justify-center gap-2"
                        >
                          <span className="text-green-400 font-bold tracking-[0.2em] text-lg">DEV_MODE_ON</span>
                          {copied ? <CheckCircle2 size={16} className="text-green-400" /> : <Copy size={16} className="text-green-600 group-hover:text-green-400" />}
                        </button>
                        <p className="text-[10px] text-zinc-600 mt-2 text-center">
                          *Informe este código ao consultor no WhatsApp.
                        </p>
                      </div>
                    </div>
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
