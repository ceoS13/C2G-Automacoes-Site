
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
  const [progress, setProgress] = useState(0);
  const [isExit, setIsExit] = useState(false);

  useEffect(() => {
    // Regra da Primeira Sessão: Se já viu, não mostra de novo.
    const hasSeenIntro = sessionStorage.getItem('c2g-boot-seen');
    if (hasSeenIntro) {
      setIsVisible(false);
      onComplete();
      return;
    }

    // Marca como visto
    sessionStorage.setItem('c2g-boot-seen', 'true');

    // Sequência Otimizada (Mais rápida para melhor UX)
    const sequence = [
      { text: "BIOS_CHECK... OK", delay: 200 },
      { text: "LOADING_KERNEL...", delay: 600 },
      { text: "CONNECTING_NEURAL_NET...", delay: 1100 },
      { text: "SYSTEM_READY.", delay: 1700 },
    ];

    let timeouts: ReturnType<typeof setTimeout>[] = [];

    // Dispara os logs
    sequence.forEach(({ text, delay }) => {
      const t = setTimeout(() => {
        setLogs(prev => [...prev, text]);
      }, delay);
      timeouts.push(t);
    });

    // Simulação de Progresso 0% -> 100% (Acelerada)
    const progressInterval = setInterval(() => {
        setProgress(prev => {
            if (prev >= 100) {
                clearInterval(progressInterval);
                return 100;
            }
            // Incremento mais rápido (4 a 8%)
            const increment = Math.random() * 4 + 4; 
            return Math.min(prev + increment, 100);
        });
    }, 60); // 60ms tick

    // Saída Otimizada (Total ~2.1s)
    const exitTimer = setTimeout(() => {
      setProgress(100);
      setIsExit(true); // Trigger exit animation
      setTimeout(() => {
          setIsVisible(false);
          onComplete(); // Notifica o App
      }, 700); // Remove from DOM
    }, 2100);

    return () => {
        timeouts.forEach(clearTimeout);
        clearTimeout(exitTimer);
        clearInterval(progressInterval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center font-mono cursor-default will-change-transform"
      initial={{ y: 0 }}
      animate={isExit ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      onClick={() => setIsExit(true)}
    >
        <div className="max-w-xl w-full px-6 flex flex-col items-center">
            
            {/* ASCII ART */}
            <motion.pre
                initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }} 
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-[10px] sm:text-xs md:text-sm font-bold leading-none text-center mb-6 whitespace-pre text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-blue-600 select-none"
            >
                {ASCII_LOGO}
            </motion.pre>

            {/* Logs Container */}
            <div className="h-20 w-full max-w-sm flex flex-col items-start justify-start space-y-1 overflow-hidden">
                {logs.map((log, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs md:text-sm text-zinc-400 font-medium"
                    >
                        <span className="text-cyan-500 mr-2">{`>`}</span>
                        {log}
                    </motion.div>
                ))}
            </div>

            {/* Loading Bar Real (0 a 100%) */}
            <div className="w-full max-w-xs mt-4">
                <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.6)]"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="flex justify-between items-center mt-2 text-[10px] uppercase tracking-widest font-mono">
                    <span className="text-zinc-500 animate-pulse">Booting...</span>
                    <span className="text-cyan-400 font-bold">{Math.floor(progress)}%</span>
                </div>
            </div>
            
        </div>
    </motion.div>
  );
};
