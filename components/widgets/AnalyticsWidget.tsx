import React, { useState, useEffect, useMemo } from 'react';
import { Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export const AnalyticsWidget = () => {
    const pointsCount = 15; // Reduzido para performance de renderização
    const width = 500;
    const height = 200;
    const stepX = width / (pointsCount - 1);
    
    const [noiseData, setNoiseData] = useState<number[]>([]);
    const [roi, setRoi] = useState(450);
    
    useEffect(() => {
        setNoiseData(Array.from({ length: pointsCount }, () => (Math.random() * 30 - 15)));
        
        const interval = setInterval(() => {
            setNoiseData(prev => {
                const next = [...prev];
                next.shift();
                next.push((Math.random() * 40 - 20)); 
                return next;
            });
            setRoi(prev => {
                const change = Math.floor(Math.random() * 11) - 5; 
                return Math.max(420, Math.min(495, prev + change));
            });
        }, 2000); // Frequência reduzida para poupar CPU
        return () => clearInterval(interval);
    }, []);

    const { d, fillD, lastPoint } = useMemo(() => {
        const startY = 160;
        const endY = 50;
        const points = noiseData.map((noise, i) => {
            const x = i * stepX;
            const trendY = startY - ((startY - endY) * (i / (pointsCount - 1)));
            return { x, y: Math.max(10, Math.min(190, trendY + noise)) };
        });

        if (points.length === 0) return { d: "", fillD: "", lastPoint: {x:0, y:0} };

        const dPath = `M ${points.map(p => `${p.x},${p.y}`).join(" L ")}`;
        const fillPath = `${dPath} L ${width},${height} L 0,${height} Z`;
        
        return { 
          d: dPath, 
          fillD: fillPath, 
          lastPoint: points[points.length - 1] 
        };
    }, [noiseData]);

    return (
        <div className="h-full flex flex-col relative overflow-hidden z-10 min-h-[220px]">
             <div className="flex items-center justify-between p-5 relative z-20">
                <div className="flex gap-8">
                    <div>
                        <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1 font-mono">ROI Projetado</div>
                        <div className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
                          {roi}%
                          <Activity size={14} className="animate-pulse" />
                        </div>
                    </div>
                    <div>
                         <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1 font-mono">Economia Real</div>
                         <div className="text-2xl font-bold text-white">R$ 14,2k</div>
                    </div>
                </div>
             </div>

            <div className="absolute bottom-0 left-0 right-0 h-[60%] w-full pointer-events-none z-10">
                <svg viewBox="0 0 500 200" className="w-full h-full" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="roi-grad" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#34d399" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <motion.path d={fillD} fill="url(#roi-grad)" transition={{ duration: 0.8 }} />
                    <motion.path d={d} fill="none" stroke="#34d399" strokeWidth="2" transition={{ duration: 0.8 }} className="drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]"/>
                    
                    <motion.circle 
                      cx={lastPoint.x} 
                      cy={lastPoint.y} 
                      r="4" 
                      fill="#fff"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                </svg>
            </div>
        </div>
    );
};