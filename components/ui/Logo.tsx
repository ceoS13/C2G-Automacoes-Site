
import React, { useState } from 'react';
import { LOGO_URL } from '../../lib/constants';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-10 w-auto", size = 24 }) => {
  const [imgError, setImgError] = useState(false);
  
  // Só tenta usar a imagem se houver URL e não tiver dado erro anterior
  const useImage = LOGO_URL && !imgError;

  return (
    // Adicionado transition-transform e hover:scale-110 para o efeito de 'bounce/pulse' sutil
    // Adicionado hover:drop-shadow para realce
    <div className={`flex items-center relative select-none transition-transform duration-300 ease-out hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] ${className.includes('h-') ? '' : 'h-10'}`}>
      {useImage ? (
        // Renderização Simples e Nativa (Imagem Transparente)
        <div className={`flex items-center justify-center shrink-0 ${className}`}>
           <img 
              src={LOGO_URL} 
              alt="Logo C2G" 
              // Mantido scale-150 para garantir o tamanho visual grande solicitado anteriormente
              className="h-full w-auto object-contain scale-150" 
              onError={() => setImgError(true)}
           />
        </div>
      ) : (
        // Renderização Padrão (Ícone SVG do Template) - Fallback
        <div className={`bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20 shrink-0 ${className}`}>
          <svg 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            className="text-white" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
              <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 3 2.5 2.5 0 0 0 .5 3.32 2.5 2.5 0 0 0 .5 3.32 2.5 2.5 0 0 0 1.32 3 2.5 2.5 0 0 0 1.98 3 2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 4.96.46 2.5 2.5 0 0 0 1.98-3 2.5 2.5 0 0 0 1.32-3 2.5 2.5 0 0 0-.5-3.32 2.5 2.5 0 0 0-.5-3.32 2.5 2.5 0 0 0-1.32-3 2.5 2.5 0 0 0-1.98-3 2.5 2.5 0 0 0-4.96.46Z" />
              <path d="M9 12h6" />
              <path d="M12 9v6" />
          </svg>
        </div>
      )}

      {/* Texto Removido conforme solicitado, deixando apenas o ícone */}
    </div>
  );
};
