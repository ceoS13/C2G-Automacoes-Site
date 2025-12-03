import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-[#050505] z-50 flex flex-col items-center justify-center transition-opacity duration-300">
      <div className="relative">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full" />
        <Loader2 size={48} className="text-cyan-400 animate-spin relative z-10" />
      </div>
      <p className="mt-4 text-zinc-500 font-mono text-sm animate-pulse tracking-widest uppercase">Carregando Módulos...</p>
    </div>
  );
};