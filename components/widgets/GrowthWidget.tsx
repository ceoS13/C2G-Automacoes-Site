import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const GrowthWidget = () => {
    const bars = [30, 45, 35, 60, 50, 75, 65, 90];
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    
    return (
        <div className="h-full flex flex-col p-4 md:p-5 relative z-10 min-h-[200px] md:min-h-0">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <div className="text-xs text-zinc-500 font-mono mb-1">RECEITA GERADA</div>
                    <div className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                      +124k
                      <span className="flex h-2 w-2 relative">
                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                         <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    </div>
                </div>
                <div className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-xs text-emerald-400 font-mono flex items-center gap-1 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                    <ArrowUpRight size={12} /> 12%
                </div>
            </div>

            <div className="flex-1 flex items-end justify-between gap-1.5 md:gap-2" onMouseLeave={() => setHoveredIndex(null)}>
                {bars.map((height, i) => (
                    <div key={i} className="relative w-full h-full flex items-end justify-center group">
                        {/* Tooltip */}
                        <AnimatePresence>
                            {hoveredIndex === i && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 4, scale: 0.95, x: "-50%" }}
                                    animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                                    exit={{ opacity: 0, y: 2, scale: 0.95, x: "-50%" }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    style={{ bottom: `${height}%`, marginBottom: '12px' }}
                                    className="absolute left-1/2 z-30 flex flex-col items-center pointer-events-none"
                                >
                                    <div className="relative bg-[#09090b] border border-emerald-500/30 text-emerald-400 text-[10px] font-bold px-2.5 py-1.5 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.5)] whitespace-nowrap">
                                        {`R$ ${(height * 0.15).toFixed(1).replace('.', ',')}k`}
                                        <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#09090b] border-r border-b border-emerald-500/30 transform rotate-45"></div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.div
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: i * 0.15, type: "spring", stiffness: 80 }}
                            onMouseEnter={() => setHoveredIndex(i)}
                            style={{ height: `${height}%`, transformOrigin: 'bottom' }}
                            className={`
                                w-full rounded-t-sm relative overflow-hidden transition-all duration-300
                                ${hoveredIndex === i ? 'bg-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-zinc-800'}
                            `}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-emerald-400 opacity-80 ${hoveredIndex === i ? 'opacity-100' : ''}`} />
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-emerald-300 shadow-[0_0_10px_2px_rgba(52,211,153,0.5)]" />
                        </motion.div>
                    </div>
                ))}
            </div>
            
            <div className="mt-2 flex justify-between text-[8px] md:text-[10px] text-zinc-600 font-mono">
                <span>SEG</span><span>TER</span><span>QUA</span><span>QUI</span><span>SEX</span><span>SAB</span><span>DOM</span>
            </div>
        </div>
    );
};