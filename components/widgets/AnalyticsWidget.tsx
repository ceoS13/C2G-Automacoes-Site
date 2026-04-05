import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Activity } from 'lucide-react';

export const AnalyticsWidget = () => {
    const pointsCount = 25;
    const width = 500;
    const height = 200;
    const stepX = width / (pointsCount - 1);

    const [state, setState] = useState(() => ({
        noiseData: Array.from({ length: pointsCount }, () => (Math.random() * 40 - 20)),
        roi: 450,
        savings: 12.1,
    }));

    useEffect(() => {
        const interval = setInterval(() => {
            setState(prev => {
                const nextNoise = [...prev.noiseData];
                nextNoise.shift();
                nextNoise.push((Math.random() * 50 - 25));

                let nextRoi = prev.roi + Math.floor(Math.random() * 15) - 7;
                if (nextRoi > 490) nextRoi = 490;
                if (nextRoi < 420) nextRoi = 420;

                let nextSavings = prev.savings + (Math.random() * 0.4) - 0.2;
                if (nextSavings > 13.5) nextSavings = 13.5;
                if (nextSavings < 11.0) nextSavings = 11.0;

                return { noiseData: nextNoise, roi: nextRoi, savings: nextSavings };
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const startY = 170;
    const endY = 40;

    const { d, fillD } = useMemo(() => {
        let d = "";
        let fillD = "";

        const points = state.noiseData.map((noise, i) => {
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
                d += ` L ${points[i].x},${points[i].y}`;
                fillD += ` L ${points[i].x},${points[i].y}`;
            }

            fillD += ` L ${width},${height} L 0,${height} Z`;
        }
        return { d, fillD };
    }, [state.noiseData]);

    const lastPoint = useMemo(() => ({
        x: (state.noiseData.length - 1) * stepX,
        y: Math.max(10, Math.min(190, (startY - ((startY - endY)) + (state.noiseData[state.noiseData.length - 1] || 0))))
    }), [state.noiseData]);

    return (
        <div className="h-full flex flex-col relative overflow-hidden z-10 min-h-[220px] md:min-h-0">
             <div className="flex items-center justify-between p-4 md:p-5 relative z-20">
                <div className="flex gap-8">
                    <div>
                        <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1 font-mono">ROI Atual</div>
                        <div className="text-2xl md:text-3xl font-bold text-emerald-400 flex items-center gap-2">
                          {state.roi}%
                          <Activity size={16} className="animate-pulse" />
                        </div>
                    </div>
                    <div>
                         <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1 font-mono">Economia</div>
                         <div className="text-2xl md:text-3xl font-bold text-white">
                             R$ {state.savings.toFixed(1).replace('.', ',')}k
                         </div>
                    </div>
                </div>
             </div>

            <div className="absolute bottom-0 left-0 right-0 h-[65%] w-full overflow-hidden pointer-events-none z-10">
                <svg viewBox="0 0 500 200" className="w-full h-full preserve-3d absolute bottom-0" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="financial-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#34d399" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path d={fillD} fill="url(#financial-gradient)" className="transition-none" />
                    <path d={d} fill="none" stroke="#34d399" strokeWidth="2" strokeLinejoin="miter" vectorEffect="non-scaling-stroke" className="drop-shadow-[0_0_8px_rgba(52,211,153,0.5)] transition-none"/>
                    <circle cx={lastPoint.x} cy={lastPoint.y} r="3" fill="#fff" />
                    <circle cx={lastPoint.x} cy={lastPoint.y} r="8" fill="#34d399" opacity="0.4" />
                </svg>
            </div>
        </div>
    );
};
