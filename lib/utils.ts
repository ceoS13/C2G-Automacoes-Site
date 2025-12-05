
import { WHATSAPP_LINK } from './constants';

export const openWhatsApp = () => {
  // Security Fix: Explicit feature strings
  window.open(WHATSAPP_LINK, '_blank', 'noopener=yes,noreferrer=yes');
};

/**
 * Otimiza imagens do Google Drive usando o proxy gratuito wsrv.nl (antigo images.weserv.nl).
 * - Converte para WebP (mais leve).
 * - Redimensiona para o tamanho necessário (economiza dados).
 * - Faz cache em CDN global (Cloudflare).
 */
export const getOptimizedImageUrl = (url: string, width?: number, height?: number, crop: boolean = false) => {
  if (!url) return '';
  
  // Passamos a URL completa (com https://) para garantir que o proxy consiga resolver o Google Drive corretamente
  const cleanUrl = url;
  
  // Parâmetros base: output webp, qualidade 80%
  let query = `?url=${cleanUrl}&output=webp&q=80`;
  
  if (width) query += `&w=${width}`;
  if (height) query += `&h=${height}`;
  
  // Se for crop (ex: fotos de perfil), foca no topo (rosto) e corta
  if (crop) query += `&fit=cover&a=top`;

  return `https://wsrv.nl/${query}`;
};
