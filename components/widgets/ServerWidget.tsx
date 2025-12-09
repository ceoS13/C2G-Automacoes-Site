import React from 'react';
import { Terminal, Server, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export const ServerWidget = () => {
    return (
        <div className="p-4 md:p-5 flex flex-col justify-center h-full gap-4 md:gap-5 relative z-10 min-h-[160px] md:min-h-0">
             <div>
                 <div className="flex justify-between text-xs mb-1.5">
                     <span className="text-zinc-500 flex items-center gap-1"><Terminal size={10}/> WORKERS n8n</span>
                     <span className="text-cyan-400 font-mono text-[10px] bg-cyan-900/20 px-1 rounded">OPERACIONAL</span>
                 </div>
                 <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                     <motion.div 
                        animate={{ width: ["85%", "92%", "88%", "90%"] }}
                        transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
                        className="h-full bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.6)]" 
                     />
                 </div>
             </div>
             <div>
                 <div className="flex justify-between text-xs mb-1.5">
                     <span className="text-zinc-500 flex items-center gap-1"><Server size={10}/> MEMÓRIA REDIS</span>
                     <span className="text-blue-400 font-mono text-[10px] bg-blue-900/20 px-1 rounded">OTIMIZADO</span>
                 </div>
                 <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                     <motion.div 
                        animate={{ width: ["78%", "82%", "80%", "81%"] }}
                        transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
                        className="h-full bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]" 
                     />
                 </div>
             </div>
             <div>
                 <div className="flex justify-between text-xs mb-1.5">
                     <span className="text-zinc-500 flex items-center gap-1"><Activity size={10}/> LATÊNCIA API</span>
                     <span className="text-emerald-400 font-mono text-[10px]">24ms</span>
                 </div>
                 <div className="flex gap-0.5 mt-1">
                     {[...Array(20)].map((_, i) => (
                         <motion.div 
                            key={i} 
                            animate={{ opacity: i < 15 ? [0.5, 1, 0.5] : 1 }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05 }}
                            className={`h-3 w-1 rounded-sm ${i < 15 ? 'bg-emerald-500' : 'bg-zinc-800'}`} 
                         />
                     ))}
                 </div>
             </div>
        </div>
    )
}