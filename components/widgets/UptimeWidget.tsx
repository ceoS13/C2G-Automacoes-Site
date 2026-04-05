import React, { useState, useEffect, useRef } from 'react';

export const UptimeWidget = () => {
    const [percent, setPercent] = useState("99.98");
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const rand = Math.random();
            let next = "99.98";
            if (rand > 0.7) next = "99.99";
            else if (rand < 0.2) next = "99.97";

            if (next !== "99.98") {
                setPercent(next);
                timeoutRef.current = setTimeout(() => setPercent("99.98"), 800);
            }
        }, 5000);

        return () => {
            clearInterval(interval);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
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
