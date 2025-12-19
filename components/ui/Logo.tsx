
import React, { useState } from 'react';
import { LOGO_URL } from '../../lib/constants';
import { getOptimizedImageUrl } from '../../lib/utils';

interface LogoProps {
  className?: string;
  size?: number;
  showFullText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-10 w-auto", size = 24, showFullText = false }) => {
  const [imgError, setImgError] = useState(false);
  
  const useImage = LOGO_URL && !imgError;

  return (
    <div className={`flex items-center relative select-none ${className.includes('h-') ? '' : 'h-10'}`}>
      {useImage ? (
        <div className={`flex items-center justify-center shrink-0 ${className}`}>
           <img 
              src={getOptimizedImageUrl(LOGO_URL, 400)} 
              alt="Logo C2G" 
              className="h-full w-auto object-contain scale-150" 
              width="400"
              height="80"
              onError={() => setImgError(true)}
              decoding="async"
           />
        </div>
      ) : (
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

      <span className={`font-bold text-lg tracking-tight text-white group-hover:text-white transition-colors ml-1 relative z-10 ${showFullText ? 'inline-block' : 'hidden sm:inline-block'}`}>
          C2G <span className={`text-zinc-500 font-normal group-hover:text-zinc-400 ${showFullText ? 'inline' : 'hidden lg:inline'}`}>Automações</span>
      </span>
    </div>
  );
};
