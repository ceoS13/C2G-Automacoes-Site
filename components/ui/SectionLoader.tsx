import React from 'react';

export const SectionLoader: React.FC = () => {
    return (
        <div className="w-full h-[60vh] flex items-center justify-center bg-[#050505] relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

            <div className="flex flex-col items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full border-2 border-cyan-500/20 border-t-cyan-500 animate-spin" />
                <div className="h-2 w-32 bg-zinc-800 rounded overflow-hidden">
                    <div className="h-full bg-cyan-500/50 w-1/2 animate-[shimmer_1s_infinite_linear] skew-x-12" />
                </div>
            </div>

            <style>{`
                @keyframes shimmer {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(200%); }
                }
            `}</style>
        </div>
    );
};
