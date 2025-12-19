
import React, { useState, useEffect, useMemo } from 'react';
import { Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export const AnalyticsWidget = () => {
    const pointsCount = 20; // Reduzido de 25 para 20
    const width = 500;
    const height = 200;
    const stepX = width / (pointsCount - 1);
    
    const [noiseData, setNoiseData] = useState<number[]>([]);
    const [roi, setRoi] = useState(450);
    const [savings, setSavings] = useState(12.1);
    
    useEffect(() => {
        const initialNoise = Array.from({ length: pointsCount }, () => (Math.random() * 30 - 15));
        setNoiseData(initialNoise);
    }, []);

    useEffect(() => {
        // Aumentado o intervalo de 1.2s para 3s para reduzir "Other Time"
        const interval = setInterval(() => {
            setNoiseData(prev => {
                const next = [...prev];
                next.shift();
                next.push((Math.random() * 40 - 20)); 
                return next;
            });
            setRoi(prev => {
                const change = Math.floor(Math.random() * 10) - 5; 
                let next = prev + change;
                if (next > 490) next = 490;
                if (next < 420) next = 420;
                return next;
            });
            setSavings(prev => {
                const change = (Math.random() * 0.2) - 0.1; 
                let next = prev + change;
                if (next > 13.5) next = 13.5;
                if (next < 11.0) next = 11.0;
                return next;
            });

        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const startY = 170;
    const endY = 40;
    
    const { d, fillD } = useMemo(() => {
        let d = "";
        let fillD = "";
        
        const points = noiseData.map((noise, i) => {
            const x = i * stepX;
            const trendY = startY - ((startY - endY) * (i / (pointsCount - 1)));
            let y = trendY + noise;
            y = Math.max(10, Math.min(190, y));
            return { x, y };
        });

        if (points.length > 0) {
            d = `M ${points[0].x},${points[0].y}`;
            fillD = `M ${points[0].x},${points[0].y}`;
            
            for (let i = 1; i < points.length; i++) {
                // Usando Curvas de Bezier suaves para reduzir a complexidade visual do path
                const prev = points[i - 1];
                const curr = points[i];
                const cp1x = prev.x + (curr.x - prev.x) / 2;
                d += ` C ${cp1x},${prev.y} ${cp1x},${curr.y} ${curr.x},${curr.y}`;
                fillD += ` C ${cp1x},${prev.y} ${cp1x},${curr.y} ${curr.x},${curr.y}`;
            }
            
            fillD += ` L ${width},${height} L 0,${height} Z`;
        }
        return { d, fillD };
    }, [noiseData]);

    const lastPoint = { 
        x: (noiseData.length - 1) * stepX, 
        y: Math.max(10, Math.min(190, (startY - ((startY - endY)) + (noiseData[noiseData.length - 1] || 0))))
    };

    return (
        <div className="h-full flex flex-col relative overflow-hidden z-10 min-h-[220px] md:min-h-0 [contain:strict]">
             <div className="flex items-center justify-between p-4 md:p-5 relative z-20">
                <div className="flex gap-8">
                    <div>
                        <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1 font-mono">ROI Atual</div>
                        <div className="text-2xl md:text-3xl font-bold text-emerald-400 flex items-center gap-2">
                          {roi}%
                        </div>
                    </div>
                    <div>
                         <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1 font-mono">Economia</div>
                         <div className="text-2xl md:text-3xl font-bold text-white">
                             R$ {savings.toFixed(1).replace('.', ',')}k
                         </div>
                    </div>
                </div>
             </div>

            <div className="absolute bottom-0 left-0 right-0 h-[65%] w-full overflow-hidden pointer-events-none z-10 will-change-transform">
                <svg viewBox="0 0 500 200" className="w-full h-full preserve-3d absolute bottom-0" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="financial-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path d={fillD} fill="url(#financial-gradient)" className="transition-all duration-1000" />
                    <path d={d} fill="none" stroke="#10b981" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" className="transition-all duration-1000"/>
                    <motion.circle cx={lastPoint.x} cy={lastPoint.y} r="3" fill="#fff" />
                </svg>
            </div>
        </div>
    );
};
