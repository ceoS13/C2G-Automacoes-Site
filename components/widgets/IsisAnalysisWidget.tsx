import React, { useState } from 'react';
import { ScanEye, User, Briefcase, Target, Smile, Code2, Play, Loader2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const IsisAnalysisWidget = () => {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const progress = 92;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const [actionStatus, setActionStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleActionClick = () => {
    if (actionStatus !== 'idle') return;

    setActionStatus('loading');
    setTimeout(() => {
        setActionStatus('success');
        setTimeout(() => {
            setActionStatus('idle');
        }, 3000);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full p-4 md:p-5 relative z-10 font-mono text-xs select-none gap-4">
        {/* Topo */}
        <div className="flex justify-between items-center pb-2 border-b border-white/5">
           <div className="flex items-center gap-2 text-zinc-500">
              <ScanEye size={12} />
              <span>ID: <span className="text-zinc-300">#8X92-A</span></span>
           </div>
           <motion.div 
             animate={{ opacity: [1, 0.4, 1] }}
             transition={{ duration: 2.0, repeat: Infinity }}
             className="flex items-center gap-1.5 text-emerald-400 font-bold tracking-wider"
           >
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_#34d399]" />
              ANÁLISE AO VIVO
           </motion.div>
        </div>

        {/* Grid Modular */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col justify-center gap-2 hover:bg-white/10 transition-colors"
            >
                <div className="flex items-center gap-2 text-zinc-400 mb-1">
                    <div className="p-1.5 bg-blue-500/10 rounded text-blue-400"><User size={14} /></div>
                    <span className="text-[10px] uppercase tracking-wide">Lead</span>
                </div>
                <div>
                    <div className="text-white font-bold text-sm">Carlos Mendes</div>
                    <div className="flex items-center gap-1.5 mt-1">
                        <Briefcase size={10} className="text-zinc-500"/>
                        <span className="text-[10px] text-zinc-300">Dir. Comercial @ <span className="text-cyan-400 font-bold">Vtex</span></span>
                    </div>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col justify-center gap-3 hover:bg-white/10 transition-colors"
            >
                <div className="flex items-center justify-between md:block">
                    <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] uppercase mb-1"><Target size={10} /> Intenção</div>
                    <div className="text-white font-bold">Agendamento</div>
                </div>
                <div className="flex flex-col md:block w-full">
                    <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] uppercase mb-1"><Smile size={10} /> Sentimento</div>
                    <div className="flex items-center gap-2 w-full">
                        <div className="h-1.5 flex-1 bg-zinc-800 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} whileInView={{ width: '98%' }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }} className="h-full bg-emerald-500" />
                        </div>
                        <span className="text-emerald-400 font-bold">0.98</span>
                    </div>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white/5 border border-white/5 rounded-xl p-2 flex flex-row md:flex-col items-center justify-between md:justify-center relative hover:bg-white/10 transition-colors group h-16 md:h-auto px-4 md:px-2"
            >
                <div className="text-[10px] text-zinc-500 uppercase tracking-wide md:absolute md:top-2 md:left-2">Nota</div>
                <div className="relative w-12 h-12 md:w-20 md:h-20 flex items-center justify-center md:mt-2">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="50%" cy="50%" r={radius} stroke="currentColor" strokeWidth="5" fill="transparent" className="text-zinc-800"/>
                        <motion.circle initial={{ strokeDashoffset: circumference }} whileInView={{ strokeDashoffset: strokeDashoffset }} viewport={{ once: true }} transition={{ duration: 2.0, ease: "easeOut", delay: 0.5 }} cx="50%" cy="50%" r={radius} stroke="currentColor" strokeWidth="5" fill="transparent" strokeDasharray={circumference} strokeLinecap="round" className="text-emerald-500 drop-shadow-[0_0_4px_rgba(16,185,129,0.6)]"/>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-sm md:text-xl font-bold text-white">92</span>
                    </div>
                </div>
                <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">Lead Quente</span>
            </motion.div>
        </div>

        {/* Action Button - REFACTORED */}
        <motion.button 
           initial={{ opacity: 0, y: 5 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.4 }}
           onClick={handleActionClick}
           disabled={actionStatus !== 'idle'}
           className={`
               relative w-full border rounded-xl p-3 flex items-center justify-between transition-all duration-300 group outline-none shrink-0 overflow-hidden
               ${actionStatus === 'idle' 
                    ? 'bg-gradient-to-r from-cyan-950/40 to-blue-900/30 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:border-cyan-400 hover:scale-[1.02] active:scale-95 cursor-pointer' 
                    : actionStatus === 'success' 
                        ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-400 cursor-default' 
                        : 'bg-black/40 border-zinc-700 text-zinc-400 cursor-wait'}
           `}
        >
            {actionStatus === 'idle' && (
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 animate-shine" />
            )}

            <AnimatePresence mode="wait">
                {actionStatus === 'idle' && (
                    <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-between w-full px-1">
                        <div className="flex flex-col items-start">
                             <div className="flex items-center gap-2 mb-0.5">
                                <Code2 size={12} className="text-cyan-400"/>
                                <span className="font-mono tracking-tight text-[11px] font-bold text-cyan-100">{`> Agenda_API.exec()`}</span>
                             </div>
                             <span className="text-[9px] text-cyan-500/70 font-mono uppercase tracking-widest pl-5">Manual Trigger</span>
                        </div>
                        <div className="flex items-center gap-2 bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
                            <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-wider">EXECUTAR</span>
                            <Play size={10} className="fill-cyan-400 text-cyan-400" />
                        </div>
                    </motion.div>
                )}
                {actionStatus === 'loading' && (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center w-full gap-2">
                        <Loader2 size={14} className="animate-spin" />
                        <span className="font-mono text-[11px]">Processando requisição...</span>
                    </motion.div>
                )}
                {actionStatus === 'success' && (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center w-full gap-2">
                        <Check size={14} className="stroke-[3]" />
                        <span className="font-mono text-[11px] font-bold">Convite Enviado!</span>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {actionStatus === 'loading' && (
                <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.5, ease: "easeInOut" }} className="absolute bottom-0 left-0 h-[2px] bg-cyan-500" />
            )}
        </motion.button>
    </div>
  );
};