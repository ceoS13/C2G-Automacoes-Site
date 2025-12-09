import React from 'react';
import { motion } from 'framer-motion';

export const TeamWidget = () => {
    const roles = [
        { name: "Agente SDR", status: "Ativo", color: "bg-orange-400", shadowColor: "rgba(251,146,60,0.6)" },
        { name: "Agente Closer", status: "Ativo", color: "bg-emerald-400", shadowColor: "rgba(52,211,153,0.6)" },
        { name: "Bot Suporte", status: "Ocioso", color: "bg-blue-400", shadowColor: "rgba(96,165,250,0.6)" }
    ];
    return (
        <div className="p-4 md:p-5 flex flex-col justify-center h-full relative z-10 min-h-[140px] md:min-h-0">
            <div className="space-y-2 md:space-y-3">
                {roles.map((role, i) => (
                    <div key={i} className="flex items-center justify-between p-2 md:p-2.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-2 md:gap-3">
                            <motion.div 
                                animate={{ 
                                    scale: [1, 1.2, 1],
                                    boxShadow: [
                                        `0 0 2px ${role.shadowColor}`, 
                                        `0 0 8px ${role.shadowColor}`, 
                                        `0 0 2px ${role.shadowColor}`
                                    ] 
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
                                className={`w-2 h-2 rounded-full ${role.color}`} 
                            />
                            <span className="text-xs font-medium text-zinc-300">{role.name}</span>
                        </div>
                        <span className={`text-[10px] font-mono ${role.status === 'Ativo' ? 'text-zinc-400' : 'text-zinc-600'}`}>{role.status}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}