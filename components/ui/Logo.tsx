import React, { useState } from 'react';

// ----------------------------------------------------------------------
// CONFIGURAÇÃO DO LOGO
// ----------------------------------------------------------------------
// Para usar sua própria logo:
// 1. Se tiver o arquivo, coloque na pasta 'public' e use: "/nome-do-arquivo.png"
// 2. Se tiver um link, cole ele aqui. Ex: "https://minhaempresa.com/logo.png"
// 3. Deixe vazio ("") para usar o ícone padrão do template.
// ----------------------------------------------------------------------
// Link atualizado para um formato de CDN do Google mais estável
const CUSTOM_LOGO_URL = "https://lh3.googleusercontent.com/d/1Q5HtlHfFAB3PKNx-S__o4YlQ7M1qnrZd"; 

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = "w-6 h-6", size = 24 }) => {
  const [imgError, setImgError] = useState(false);
  
  // Só tenta usar a imagem se houver URL e não tiver dado erro anterior
  const useImage = CUSTOM_LOGO_URL && !imgError;

  return (
    <div className="flex items-center gap-3">
      {useImage ? (
        // Renderização com Imagem Customizada
        <div className="h-10 flex items-center justify-center shrink-0">
           <img 
              src={CUSTOM_LOGO_URL} 
              alt="Logo C2G" 
              className="h-full w-auto object-contain max-w-[150px]" 
              onError={() => setImgError(true)}
           />
        </div>
      ) : (
        // Renderização Padrão (Ícone SVG do Template) - Fallback caso a imagem quebre
        <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20 shrink-0">
          <svg 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            className={`text-white ${className}`} 
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

      {/* Texto da Marca */}
      <span className="font-bold text-lg tracking-tight text-white group-hover:text-white transition-colors hidden sm:inline-block">
          C2G <span className="text-zinc-500 font-normal group-hover:text-zinc-400 hidden lg:inline">Automações</span>
      </span>
    </div>
  );
};