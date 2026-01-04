
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ASCII_LOGO = `
  ██████╗    ██████╗     ██████╗ 
 ██╔════╝    ╚════██╗   ██╔════╝ 
 ██║          █████╔╝   ██║  ███╗
 ██║         ██╔═══╝    ██║   ██║
 ╚██████╗    ███████╗   ╚██████╔╝
  ╚═════╝    ╚══════╝    ╚═════╝ 
`;

interface IntroLoaderProps {
    onComplete: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);
  const [isExit, setIsExit] = useState(false);

  useEffect(() => {
    // Regra da Primeira Sessão: Se já viu, não mostra de novo.
    const hasSeenIntro = sessionStorage.getItem('c2g-boot-seen');
    if (hasSeenIntro) {
      setIsVisible(false);
      onComplete(); // Notifica o App imediatamente para mostrar o conteúdo
      return;
    }

    // Marca como visto
    sessionStorage.setItem('c2g-boot-seen', 'true');

    // Sequência de Logs Ajustada (Sincronizada com a animação de 2.5s)
    const sequence = [
      { text: "BIOS_CHECK... OK", delay: 500 },
      { text: "LOADING_KERNEL [#######.......]", delay: 1200 },
      { text: "CONNECTING_NEURAL_NET...", delay: 1900 },
      { text: "SYSTEM_READY.", delay: 2600 },
    ];

    let timeouts: ReturnType<typeof setTimeout>[] = [];

    sequence.forEach(({ text, delay }) => {
      const t = setTimeout(() => {
        setLogs(prev => [...prev, text]);
      }, delay);
      timeouts.push(t);
    });

    // Saída (Aumentado levemente para 3.2s para permitir o efeito completo do Zoom)
    const exitTimer = setTimeout(() => {
      setIsExit(true); // Trigger exit animation
      setTimeout(() => {
          setIsVisible(false);
          onComplete(); // Notifica o App APÓS a animação terminar
      }, 800); // Remove from DOM
    }, 3200);

    return () => {
        timeouts.forEach(clearTimeout);
        clearTimeout(exitTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center font-mono cursor-default" // Cursor corrigido para Default
      initial={{ y: 0 }}
      animate={isExit ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // Curva "Expo" para saída dramática
      onClick={() => setIsExit(true)} // Clique pula a animação
    >
        <div className="max-w-xl w-full px-6 flex flex-col items-center">
            
            {/* ASCII ART: Animação "Cinematográfica" idêntica ao Easter Egg (Zoom + Blur) */}
            <motion.pre
                initial={{ scale: 0.2, opacity: 0, filter: "blur(15px)" }} 
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }} // Curva suave do TerminalModal
                className="text-[10px] sm:text-xs md:text-sm font-bold leading-none text-center mb-8 whitespace-pre text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-blue-600 select-none"
            >
                {ASCII_LOGO}
            </motion.pre>

            {/* Logs Container */}
            <div className="h-24 w-full max-w-sm flex flex-col items-start justify-start space-y-1 overflow-hidden">
                {logs.map((log, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs md:text-sm text-zinc-400 font-medium"
                    >
                        <span className="text-cyan-500 mr-2">{`>`}</span>
                        {log}
                    </motion.div>
                ))}
            </div>

            {/* Loading Bar Decorativa */}
            <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "200px", opacity: 1 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                className="h-[2px] bg-zinc-800 mt-4 relative overflow-hidden rounded-full"
            >
                <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-cyan-500 w-1/2 blur-[2px]"
                />
            </motion.div>
            
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="mt-4 text-[10px] text-zinc-600 uppercase tracking-widest animate-pulse"
            >
                Inicializando Interface...
            </motion.p>
        </div>
    </motion.div>
  );
};
