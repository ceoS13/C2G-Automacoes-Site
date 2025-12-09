import React, { useState, useEffect, useRef } from 'react';
import { Lock } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

export const SecurityWidget = () => {
    const [lines, setLines] = useState<string[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.4 });
    
    useEffect(() => {
        if (!isInView) return;

        const allLogs = [
          "Iniciando Protocolo AVA v2.4...",
          "Verificando integridade...",
          "Escaneando intenção...",
          "Analisando sentimento...",
          "Verificando padrões PII...",
          "Validando regras de negócio...",
          "Conectando Secure Gateway...",
          "Criptografia (AES-256): OK",
          "Acesso permitido."
        ];
        
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex < allLogs.length) {
                const logToAdd = allLogs[currentIndex];
                setLines(prev => {
                    const newLines = [...prev, logToAdd];
                    if (newLines.length > 50) newLines.shift(); 
                    return newLines;
                });
                currentIndex++;
            } else if (currentIndex < allLogs.length + 4) {
                currentIndex++;
            } else {
                currentIndex = 0;
                setLines([]);
            }
        }, 800);
        return () => clearInterval(interval);
    }, [isInView]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [lines]);

    return (
        <div ref={containerRef} className="flex flex-col h-[200px] md:h-full bg-[#050505] relative z-10">
             <div 
                ref={scrollRef}
                className="flex-1 p-4 font-mono text-[10px] text-zinc-400 space-y-2 overflow-y-auto flex flex-col [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: 'none' }}
             >
                {lines.map((line, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex gap-2 shrink-0"
                    >
                        <span className="text-zinc-600 shrink-0">{`>`}</span>
                        <span className={`truncate ${line && line.includes("permitido") ? "text-emerald-400 font-bold" : "text-zinc-400"}`}>
                          {line}
                        </span>
                    </motion.div>
                ))}
                {lines.length > 0 && lines.length < 9 && (
                    <motion.div 
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="w-2 h-4 bg-zinc-600 ml-4 shrink-0"
                    />
                )}
             </div>
             <div className="h-10 bg-emerald-950/30 border-t border-emerald-500/20 flex items-center justify-between px-4 shrink-0">
                 <div className="flex items-center gap-2">
                     <Lock size={12} className="text-emerald-500" />
                     <span className="text-[10px] font-bold text-emerald-400 tracking-wider">SEGURANÇA</span>
                 </div>
                 <motion.div 
                    animate={{ opacity: [0.6, 1, 0.6], boxShadow: ["0 0 0px rgba(16,185,129,0)", "0 0 10px rgba(16,185,129,0.5)", "0 0 0px rgba(16,185,129,0)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20"
                 >
                     APROVADO
                 </motion.div>
             </div>
        </div>
    );
};