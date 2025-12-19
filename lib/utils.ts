
import { WHATSAPP_LINK } from './constants';

export const openWhatsApp = () => {
  window.open(WHATSAPP_LINK, '_blank', 'noopener=yes,noreferrer=yes');
};

/**
 * Otimiza imagens do Google Drive usando o proxy gratuito wsrv.nl.
 * Implementa lógica de dimensionamento inteligente para mobile.
 */
export const getOptimizedImageUrl = (url: string, width?: number, height?: number, crop: boolean = false) => {
  if (!url) return '';
  
  // Detecção básica de mobile para reduzir largura se não especificado
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  let targetWidth = width;
  
  // Se estiver no mobile e pedir uma imagem muito grande, reduzimos para economizar bytes
  if (isMobile && width && width > 800) {
    targetWidth = 800;
  } else if (isMobile && !width) {
    targetWidth = 480; // Default seguro para mobile
  }

  // Parâmetros base: output webp, qualidade 80% (Sweet spot performance/qualidade)
  let query = `?url=${url}&output=webp&q=80`;
  
  if (targetWidth) query += `&w=${targetWidth}`;
  if (height) query += `&h=${height}`;
  
  if (crop) query += `&fit=cover&a=top`;

  return `https://wsrv.nl/${query}`;
};
