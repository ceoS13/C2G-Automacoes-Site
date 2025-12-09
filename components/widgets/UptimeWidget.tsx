import React, { useState, useEffect } from 'react';

export const UptimeWidget = () => {
    const [percent, setPercent] = useState("99.98");
    
    useEffect(() => {
        const interval = setInterval(() => {
            const rand = Math.random();
            if (rand > 0.7) {
                setPercent("99.99");
                setTimeout(() => setPercent("99.98"), 800);
            } else if (rand < 0.2) {
                setPercent("99.97");
                setTimeout(() => setPercent("99.98"), 800);
            }
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="border-l border-white/5 p-4 md:p-5 flex flex-col justify-center relative z-10 h-full min-h-[140px] md:min-h-0">
            <div className="text-zinc-500 text-xs mb-2">DISPONIBILIDADE</div>
            <div className="text-xl md:text-2xl font-mono text-white flex items-center gap-2">
                {percent}%
                <span className="text-[10px] text-emerald-400 bg-emerald-900/20 px-1 rounded border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.3)]">ESTÁVEL</span>
            </div>
        </div>
    );
};